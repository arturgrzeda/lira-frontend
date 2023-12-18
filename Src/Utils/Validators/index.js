import * as yup from 'yup';

export const applicationFormSchema = yup.object().shape({
    data: yup.object().shape({
      name: yup.string().required('Imie i nazwisko jest wymagane'),
      birthdate: yup.date().required('Data urodzenia jest wymagana').typeError('Nieprawidłowy format daty'),
      email: yup.string().required('Email jest wymagany'),
      phone: yup.string().required('Telefon jest wymagany'),
      nationality: yup.string().required('Narodowość jest wymagana'),
      address: yup.string().required('Adres jest wymagany'),
      leading_teacher: yup.string(),
      university_school: yup.string(),
      artistic_cv: yup.string().required('Artystyczne CV jest wymagane'),
      recommendation: yup.mixed().test('fileRequired', 'Recommendation jest wymagane', (value) => value && value.length > 0),
      photo: yup.mixed().test('fileRequired', 'Recommendation jest wymagane', (value) => value && value.length > 0),
      confirmation_of_payment: yup.mixed().test('fileRequired', 'Confirmation of payment jest wymagane', (value) => value && value.length > 0),
      recording: yup.mixed().test('fileRequired', 'Recording jest wymagane', (value) => value && value.length > 0),
      accommodation: yup.boolean().required('To pole jest wymagane'),
      accept_rules_and_consent: yup.boolean().oneOf([true], 'To pole jest wymagane'),
      repertoire_2: yup.array().of(
        yup.object().shape({
          song_1: yup.string().required('Song 1 jest wymagane'),
          song_2: yup.string().required('Song 2 jest wymagane'),
          song_3: yup.string().required('Song 3 jest wymagane'),
        })
      ),
    }),
  });