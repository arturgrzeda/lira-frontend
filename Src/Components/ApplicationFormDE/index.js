'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { applicationFormSchemaDE } from '@/Utils/Validators'
import axios from 'axios';
import { useRouter } from 'next/navigation'

function getEliminacjeLabel(index) {
  switch (index) {
    case 0:
      return "ELIMINIERUNGEN";
    case 1:
      return "STUFE I";
    case 2:
      return "STUFE II";
    case 3:
      return "FINALE";
    default:
      return `ELIMINIERUNGEN ${index + 1}`;
  }
}
const ApplicationForm = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(applicationFormSchemaDE),
  });

  // console.log(errors);

  const [loading, setLoading] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState({
    recommendation: null,
    photo: null,
    confirmation_of_payment: null,
    recording: null,
  });

  const [fileProgress, setFileProgress] = useState({
    recommendation: 0,
    photo: 0,
    confirmation_of_payment: 0,
    recording: 0,
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
      const formData = {
        competition: 2,
        name: data.data.name,
        birthdate: data.data.birthdate,
        email: data.data.email,
        phone: data.data.phone,
        nationality: data.data.nationality,
        address: data.data.address,
        leading_teacher: data.data.leading_teacher,
        university_school: data.data.university_school,
        artistic_cv: data.data.artistic_cv,
        recommendation: uploadedFileIds[0],
        photo: uploadedFileIds[1],
        confirmation_of_payment: uploadedFileIds[2],
        recording: uploadedFileIds[3],
        accommodation: data.data.accommodation,
        accept_rules_and_consent: data.data.accept_rules_and_consent,
        repertoire_2: data.data.repertoire_2.map((song, index) => {
          if (index === 1 || index === 2) {
            return {
              __component: 'repertoire.repertoire-single',
              song_1: song.song_1,
            };
          } else {
            return {
              __component: 'repertoire.repertoire',
              song_1: song.song_1,
              song_2: song.song_2,
              song_3: song.song_3,
            };
          }
        }),
      };
      const formSubmitResponse = await axios.post(`${process.env.api_endpoint}/participants`, { data: formData });
      setLoading(false)
      router.push('/podziekowania')
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
          <div>*Vorname und Nachname</div>
          <input type="text" {...register('data.name')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.name && <p className="mt-2 text-red-500">{errors.data.name.message}</p>}
        </label>
        <label className="block">
          <div>*Geburtsdatum</div>
          <input type="date" {...register('data.birthdate')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.birthdate && <p className="mt-2 text-red-500">{errors.data.birthdate.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <div>*Staatsangehörigkeit</div>
          <input type="text" {...register('data.nationality')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.nationality && <p className="mt-2 text-red-500">{errors.data.nationality.message}</p>}
        </label>
        <label className="block">
          <div>*Adresse</div>
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
          <div>*Telefonnummer</div>
          <input type="text" {...register('data.phone')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.phone && <p className="mt-2 text-red-500">{errors.data.phone.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <div>Pädagoge</div>
          <input type="text" {...register('data.leading_teacher')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.leading_teacher && <p className="mt-2 text-red-500">{errors.data.leading_teacher.message}</p>}
        </label>

        <label className="block">
          <div>Schule</div>
          <input type="text" {...register('data.university_school')} className="w-full p-4 mt-2 bg-transparent border border-white" />
          {errors && errors.data?.university_school && <p className="mt-2 text-red-500">{errors.data.university_school.message}</p>}
        </label>
      </div>
      <div>
        <p className="my-4"><strong>Erzählen Sie uns von Ihrem Karriereweg.</strong></p>
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <div>*Künstlerischer Lebenslauf</div>
            <textarea {...register('data.artistic_cv')} className="w-full outline-none" />
            {errors && errors.data?.artistic_cv && <p className="mt-2 text-red-500">{errors.data.artistic_cv.message}</p>}
          </label>
        </div>
      </div>
      {/* Repertoire */}
      <label className="flex flex-col gap-8">
        *Repertuar:
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-full p-4 mt-2 bg-transparent border border-white">
            <strong>*{getEliminacjeLabel(index)}</strong>
            {index === 1 || index === 2 ? (
              <>
                <label className="block mt-2">
                  *Track 2 - Composer, track name and duration:
                  <input type="text" {...register(`data.repertoire_2[${index}].song_1`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
                  {errors && errors.data?.repertoire_2 && errors.data.repertoire_2[index]?.song_1 && (
                    <p className="mt-2 text-red-500">{errors.data.repertoire_2[index].song_1.message}</p>
                  )}
                </label>

                <label className="hidden mt-2">
                  *Track 2 - Composer, track name and duration:
                  <input defaultValue="-" type="text" {...register(`data.repertoire_2[${index}].song_2`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
                  {errors && errors.data?.repertoire_2 && errors.data.repertoire_2[index]?.song_2 && (
                    <p className="mt-2 text-red-500">{errors.data.repertoire_2[index].song_2.message}</p>
                  )}
                </label>

                <label className="hidden mt-2">
                  *Track 3 - Composer, track name and duration:
                  <input defaultValue="-" type="text" {...register(`data.repertoire_2[${index}].song_3`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
                  {errors && errors.data?.repertoire_2 && errors.data.repertoire_2[index]?.song_3 && (
                    <p className="mt-2 text-red-500">{errors.data.repertoire_2[index].song_3.message}</p>
                  )}
                </label>
              </>
            ) : (
              <>
                <label className="block mt-2">
                  *Track 2 - Composer, track name and duration:
                  <input type="text" {...register(`data.repertoire_2[${index}].song_1`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
                  {errors && errors.data?.repertoire_2 && errors.data.repertoire_2[index]?.song_1 && (
                    <p className="mt-2 text-red-500">{errors.data.repertoire_2[index].song_1.message}</p>
                  )}
                </label>

                <label className="block mt-2">
                  *Track 2 - Composer, track name and duration:
                  <input type="text" {...register(`data.repertoire_2[${index}].song_2`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
                  {errors && errors.data?.repertoire_2 && errors.data.repertoire_2[index]?.song_2 && (
                    <p className="mt-2 text-red-500">{errors.data.repertoire_2[index].song_2.message}</p>
                  )}
                </label>

                <label className="block mt-2">
                  *Track 3 - Composer, track name and duration:
                  <input type="text" {...register(`data.repertoire_2[${index}].song_3`)} className="w-full p-4 mt-2 bg-transparent border border-gray-500" />
                  {errors && errors.data?.repertoire_2 && errors.data.repertoire_2[index]?.song_3 && (
                    <p className="mt-2 text-red-500">{errors.data.repertoire_2[index].song_3.message}</p>
                  )}
                </label>
              </>
            )}
          </div>
        ))}
        {errors && errors.data?.repertoire && <p className="mt-2 text-red-500">{errors.data.repertoire.message}</p>}
      </label>
      <div>
        <p className="my-4"><strong>Anhänge erforderlich</strong></p>
        <div className="grid grid-cols-2 gap-6">
          <label className="block">
            <div>*Überweisungsbestätigung <br/><small>(in Höhe von 550 PLN / 125 EUR)</small></div>
            <input type="file" {...register('data.confirmation_of_payment')} onChange={(e) => onFileChange('confirmation_of_payment', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
            {errors && errors.data?.confirmation_of_payment && <p className="mt-2 text-red-500">{errors.data.confirmation_of_payment.message}</p>}
          </label>
          <label className="block">
            <div>Ihre Aufnahme <br/> <small>(Im mp4-Format, maximum file size is 500MB)</small></div>
            <input type="file" accept="audio/*,video/*" {...register('data.recording')} onChange={(e) => onFileChange('recording', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
            {errors && errors.data?.recording && <p className="mt-2 text-red-500">{errors.data.recording.message}</p>}
          </label>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-6">
          <label className="block">
            <div>*Empfehlungen <br/><small>(Empfehlungen eines auftretenden Pianisten oder Lehrers.)</small></div>
            <input type="file" {...register('data.recommendation')} onChange={(e) => onFileChange('recommendation', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
            {errors && errors.data?.recommendation && <p className="mt-2 text-red-500">{errors.data.recommendation.message}</p>}
          </label>
          <label className="block">
            <div>*Foto <br/><small>(Zur Verwendung in den Informationsmaterialien zum Wettbewerb.)</small></div>
            <input type="file" {...register('data.photo')} onChange={(e) => onFileChange('photo', e)} className="w-full p-4 mt-2 bg-transparent border border-white" />
            {errors && errors.data?.photo && <p className="mt-2 text-red-500">{errors.data.photo.message}</p>}
          </label>
        </div>
      </div>
      {/* Checkboxes */}
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <input type="checkbox" {...register('data.accommodation')} className="mr-2" />
          Ich werde*/ich werde* nicht* die vom Veranstalter zur Verfügung gestellten Unterkünfte nutzen
          {errors && errors.data?.accommodation && <p className="mt-2 text-red-500">{errors.data.accommodation.message}</p>}
        </label>

        <label className="block">
          <input type="checkbox" {...register('data.accept_rules_and_consent')} className="mr-2" />
          Mit dem Absenden der Bewerbung akzeptiere ich die Teilnahmebedingungen vollumfänglich und erkläre mich mit der Verarbeitung meiner personenbezogenen Daten und der Nutzung meines Bildes zum Zweck der Organisation und Bewerbung des Gewinnspiels einverstanden
          {errors && errors.data?.accept_rules_and_consent && <p className="mt-2 text-red-500">{errors.data.accept_rules_and_consent.message}</p>}
        </label>
      </div>
      <p>Wenn Sie Probleme haben, das Formular über die Website einzureichen, senden Sie bitte alle Informationen aus dem Formular zusammen mit den Aufnahmen an die folgende E-Mail-Adresse <a href="mailto:konkursgwim@gmail.com">konkursgwim@gmail.com</a></p>
      <button type="submit" className="flex flex-row items-center justify-center gap-4 px-6 py-4 mt-6 text-black bg-white border border-white border-solid">
        {!loading && <div>Einen Bericht einreichen</div>}
        {loading &&<><div>Bitte warten Sie, während das Formular gesendet wird</div><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#BF0C10]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></>}
      </button>
    </form>
  );
};

export default ApplicationForm;