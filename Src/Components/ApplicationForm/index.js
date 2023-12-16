'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { applicationFormSchema } from '@/Utils/Validators'
import axios from 'axios';

function getEliminacjeLabel(index) {
  switch (index) {
    case 0:
      return "ELIMINACJE";
    case 1:
      return "I ETAP";
    case 2:
      return "II ETAP";
    case 3:
      return "FINAŁ";
    default:
      return `ELIMINACJE ${index + 1}`;
  }
}
const ApplicationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(applicationFormSchema),
  });

  console.log(errors);

  const [loading, setLoading] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState({
    recommendation: null,
    photo: null,
    confirmation_of_payment: null,
    recording: null,
    // participant_declaration: null,
  });

  const [fileProgress, setFileProgress] = useState({
    recommendation: 0,
    photo: 0,
    confirmation_of_payment: 0,
    recording: 0,
    // participant_declaration: 0,
  });

  const onFileChange = (key, e) => {
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [key]: e.target.files[0],
    }));
  };

  const updateFileProgress = (key, progress) => {
    setFileProgress((prevProgress) => ({
      ...prevProgress,
      [key]: progress,
    }));
  };

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // Step 1: Upload files to Strapi
      const uploadPromises = Object.keys(selectedFiles).map(async (key) => {
        if (key !== 'attachment' && selectedFiles[key]) {
          const fileData = new FormData();
          fileData.append('files', selectedFiles[key]);

          const response = await axios.post(`${process.env.api_endpoint}/upload`, fileData, {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              updateFileProgress(key, progress);
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          });

          return response.data[0].id;
        }
        return null;
      });

      const uploadedFileIds = await Promise.all(uploadPromises);

      // Step 2: Prepare the form data
      const formData = {
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
        competition: 2,
        birthdate: data.data.birthdate,
        nationality: data.data.nationality,
        address: data.data.address,
        leading_teacher: data.data.leading_teacher,
        university_school: data.data.university_school,
        artistic_cv: data.data.artistic_cv,
        recommendation: uploadedFileIds[0],
        photo: uploadedFileIds[1],
        confirmation_of_payment: uploadedFileIds[2],
        recording: uploadedFileIds[3],
        // participant_declaration: uploadedFileIds[4],
        repertoire: data.data.repertoire.map((song) => ({
          song_1: song.song_1,
          song_2: song.song_2,
          song_3: song.song_3,
        })),
      };
      // Step 3: Send the form data to the Strapi endpoint for participants as JSON
      console.log(formData)
      const formSubmitResponse = await axios.post(`${process.env.api_endpoint}/participants`, { data: formData });

      console.log('Form submitted successfully:', formSubmitResponse.data);
      setLoading(false)
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <div>*Imie i nazwisko</div>
          <input type="text" {...register('data.name')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.name && <p className="mt-2 text-red-500">{errors.data.name.message}</p>}
        </label>
        <label className="block">
          <div>*Data urodzenia</div>
          <input type="date" {...register('data.birthdate')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.birthdate && <p className="mt-2 text-red-500">{errors.data.birthdate.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <div>*Narodowość</div>
          <input type="text" {...register('data.nationality')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.nationality && <p className="mt-2 text-red-500">{errors.data.nationality.message}</p>}
        </label>
        <label className="block">
          <div>*Adres zamieszkania</div>
          <input type="text" {...register('data.address')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.address && <p className="mt-2 text-red-500">{errors.data.address.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <div>*Email</div>
          <input type="text" {...register('data.email')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.email && <p className="mt-2 text-red-500">{errors.data.email.message}</p>}
        </label>
        <label className="block">
          <div>*Numer telefonu</div>
          <input type="text" {...register('data.phone')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.phone && <p className="mt-2 text-red-500">{errors.data.phone.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <div>Pedagog</div>
          <input type="text" {...register('data.leading_teacher')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.leading_teacher && <p className="mt-2 text-red-500">{errors.data.leading_teacher.message}</p>}
        </label>

        <label className="block">
          <div>Uczelnia</div>
          <input type="text" {...register('data.university_school')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.university_school && <p className="mt-2 text-red-500">{errors.data.university_school.message}</p>}
        </label>
      </div>
      <div>
        <p className="my-4"><strong>Opowiedz nam o swojej  ścieżce kariery.</strong></p>
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <div>Artystyczne CV</div>
            <textarea {...register('data.artistic_cv')} className="w-full outline-none" />
            {errors && errors.data?.artistic_cv && <p className="mt-2 text-red-500">{errors.data.artistic_cv.message}</p>}
          </label>
        </div>
      </div>
      {/* Repertoire */}
      <label className="flex flex-col gap-8">
        Repertuar:
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-full p-4 mt-2 bg-transparent border border-white">
            <strong>{getEliminacjeLabel(index)}</strong>
            <label className="block mt-2">
              Utwór 1 - Kompozytor, nazwa utworu oraz czas trwania:
              <input type="text" {...register(`data.repertoire[${index}].song_1`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
              {errors && errors.data?.repertoire && errors.data.repertoire[index]?.song_1 && (
                <p className="mt-2 text-red-500">{errors.data.repertoire[index].song_1.message}</p>
              )}
            </label>

            <label className="block mt-2">
              Utwór 2 - Kompozytor, nazwa utworu oraz czas trwania:
              <input type="text" {...register(`data.repertoire[${index}].song_2`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
              {errors && errors.data?.repertoire && errors.data.repertoire[index]?.song_2 && (
                <p className="mt-2 text-red-500">{errors.data.repertoire[index].song_2.message}</p>
              )}
            </label>

            <label className="block mt-2">
              Utwór 3 - Kompozytor, nazwa utworu oraz czas trwania:
              <input type="text" {...register(`data.repertoire[${index}].song_3`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
              {errors && errors.data?.repertoire && errors.data.repertoire[index]?.song_3 && (
                <p className="mt-2 text-red-500">{errors.data.repertoire[index].song_3.message}</p>
              )}
            </label>
          </div>
        ))}
        {errors && errors.data?.repertoire && <p className="mt-2 text-red-500">{errors.data.repertoire.message}</p>}
      </label>
      <div>
        <p className="my-4"><strong>Wymagane załączniki</strong></p>
        <div className="grid grid-cols-2 gap-6">
          <label className="block">
            <div>*Potwierdzenie przelewu <br/><small>(w wysokości 1.100 PLN / 250 EURO)</small></div>
            <input type="file" {...register('data.confirmation_of_payment')} onChange={(e) => onFileChange('confirmation_of_payment', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
            {errors && errors.data?.confirmation_of_payment && <p className="mt-2 text-red-500">{errors.data.confirmation_of_payment.message}</p>}
          </label>
          <label className="block">
            <div>*Twoje nagranie <br/> <small>(W formacie mp4)</small></div>
            <input type="file" {...register('data.recording')} onChange={(e) => onFileChange('recording', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
            {errors && errors.data?.recording && <p className="mt-2 text-red-500">{errors.data.recording.message}</p>}
          </label>
        </div>
      </div>
      <div>
        <p className="my-4">Dodatkowe załączniki:</p>
        <div className="grid grid-cols-2 gap-6">
          <label className="block">
            <div>Rekomendacje <br/><small>(Rekomendacje od koncertującego pianisty lub pedagoga.)</small></div>
            <input type="file" onChange={(e) => onFileChange('recommendation', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
          </label>
          <label className="block">
            <div>Zdjęcie <br/><small>(Do wykorzystania w materiałach informacyjnych konkursu.)</small></div>
            <input type="file" onChange={(e) => onFileChange('photo', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
          </label>
        </div>
      </div>
      {/* <label className="block">
        Participant Declaration:
        <input type="file" onChange={(e) => onFileChange('participant_declaration', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
        {fileProgress.participant_declaration > 0 && (
          <progress value={fileProgress.participant_declaration} max="100" />
        )}
      </label> */}
      <button type="submit" className="flex flex-row items-center justify-center gap-4 px-6 py-4 mt-6 text-black bg-white border border-white border-solid">
        {!loading && <div>Wyślij zgłoszenie</div>}
        {loading &&<><div>Proszę czekać trwa przesyłanie formularza</div><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#BF0C10]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></>}
      </button>
    </form>
  );
};

export default ApplicationForm;
