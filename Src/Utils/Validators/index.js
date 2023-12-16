import * as yup from 'yup';

export const applicationFormSchema = yup.object().shape({
    data: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().required('Email is required'),
      phone: yup.string().required('Phone is required'),
      birthdate: yup.date().required('Birthdate is required').typeError('Invalid date'),
      nationality: yup.string().required('Nationality is required'),
      address: yup.string().required('Address is required'),
      leading_teacher: yup.string().required('Leading Teacher is required'),
      university_school: yup.string().required('University/School is required'),
      artistic_cv: yup.string(),
      recommendation: yup.mixed(),
      photo: yup.mixed(),
      confirmation_of_payment: yup.mixed().test('fileRequired', 'Confirmation of payment is required', (value) => value && value.length > 0),
      recording: yup.mixed().test('fileRequired', 'Recording is required', (value) => value && value.length > 0),
      participant_declaration: yup.mixed(),
      repertoire: yup.array().of(
        yup.object().shape({
          song_1: yup.string().required('Song 1 is required'),
          song_2: yup.string().required('Song 2 is required'),
          song_3: yup.string().required('Song 3 is required'),
        })
      ),
    }),
  });