import * as yup from 'yup';

const maxFileSize = (maxSizeInBytes) => ({
  test: 'fileSize',
  message: `File size must be less than ${maxSizeInBytes / (1024 * 1024)} MB`,
  test: function(value) {
    if (!value || !value.length) return true; // No file selected, so no validation needed
    const file = value[0]; // Assuming only one file is selected
    return file.size <= maxSizeInBytes; // Validation check
  }
});

export const applicationFormSchema = yup.object().shape({
    data: yup.object().shape({
      name: yup.string().required('To pole jest wymagane'),
      birthdate: yup.date().required('To pole jest wymagane').typeError('Nieprawidłowy format daty'),
      email: yup.string().required('To pole jest wymagane'),
      phone: yup.string().required('To pole jest wymagane'),
      nationality: yup.string().required('To pole jest wymagane'),
      address: yup.string().required('To pole jest wymagane'),
      leading_teacher: yup.string(),
      university_school: yup.string(),
      artistic_cv: yup.string().required('To pole jest wymagane'),
      recommendation: yup.mixed().test('fileRequired', 'To pole jest wymagane', (value) => value && value.length > 0),
      photo: yup.mixed().test('fileRequired', 'To pole jest wymagane', (value) => value && value.length > 0),
      confirmation_of_payment: yup.mixed().test('fileRequired', 'To pole jest wymagane', (value) => value && value.length > 0),
      recording: yup.mixed()
        .test('fileRequired', 'To pole jest wymagane', (value) => value && value.length > 0)
        .test('fileSize', 'Rozmiar pliku musi być mniejszy niż 500 MB', (value) => maxFileSize(500 * 1024 * 1024).test(value)),
      accommodation: yup.boolean().required('To pole jest wymagane'),
      accept_rules_and_consent: yup.boolean().oneOf([true], 'To pole jest wymagane'),
      repertoire_2: yup.array().of(
        yup.object().shape({
          song_1: yup.string().required('To pole jest wymagane'),
          song_2: yup.string().required('To pole jest wymagane'),
          song_3: yup.string().required('To pole jest wymagane'),
        })
      ),
    }),
  });

export const applicationFormSchemaEN = yup.object().shape({
    data: yup.object().shape({
      name: yup.string().required('This field is required'),
      birthdate: yup.date().required('This field is required').typeError('Nieprawidłowy format daty'),
      email: yup.string().required('This field is required'),
      phone: yup.string().required('This field is required'),
      nationality: yup.string().required('This field is required'),
      address: yup.string().required('This field is required'),
      leading_teacher: yup.string(),
      university_school: yup.string(),
      artistic_cv: yup.string().required('This field is required'),
      recommendation: yup.mixed().test('fileRequired', 'This field is required', (value) => value && value.length > 0),
      photo: yup.mixed().test('fileRequired', 'This field is required', (value) => value && value.length > 0),
      confirmation_of_payment: yup.mixed().test('fileRequired', 'This field is required', (value) => value && value.length > 0),
      recording: yup.mixed()
        .test('fileRequired', 'This field is required', (value) => value && value.length > 0)
        .test('fileSize', 'The file size must be less than 500 MB', (value) => maxFileSize(500 * 1024 * 1024).test(value)),
      accommodation: yup.boolean().required('This field is required'),
      accept_rules_and_consent: yup.boolean().oneOf([true], 'This field is required'),
      repertoire_2: yup.array().of(
        yup.object().shape({
          song_1: yup.string().required('This field is required'),
          song_2: yup.string().required('This field is required'),
          song_3: yup.string().required('This field is required'),
        })
      ),
    }),
  });

export const applicationFormSchemaDE = yup.object().shape({
    data: yup.object().shape({
      name: yup.string().required('Dieses Feld ist erforderlich'),
      birthdate: yup.date().required('Dieses Feld ist erforderlich').typeError('Nieprawidłowy format daty'),
      email: yup.string().required('Dieses Feld ist erforderlich'),
      phone: yup.string().required('Dieses Feld ist erforderlich'),
      nationality: yup.string().required('Dieses Feld ist erforderlich'),
      address: yup.string().required('Dieses Feld ist erforderlich'),
      leading_teacher: yup.string(),
      university_school: yup.string(),
      artistic_cv: yup.string().required('Dieses Feld ist erforderlich'),
      recommendation: yup.mixed().test('fileRequired', 'Dieses Feld ist erforderlich', (value) => value && value.length > 0),
      photo: yup.mixed().test('fileRequired', 'Dieses Feld ist erforderlich', (value) => value && value.length > 0),
      confirmation_of_payment: yup.mixed().test('fileRequired', 'Dieses Feld ist erforderlich', (value) => value && value.length > 0),
      recording: yup.mixed()
        .test('fileRequired', 'Dieses Feld ist erforderlich', (value) => value && value.length > 0)
        .test('fileSize', 'Die Dateigröße muss weniger als 500 MB betragen', (value) => maxFileSize(500 * 1024 * 1024).test(value)),
      accommodation: yup.boolean().required('Dieses Feld ist erforderlich'),
      accept_rules_and_consent: yup.boolean().oneOf([true], 'Dieses Feld ist erforderlich'),
      repertoire_2: yup.array().of(
        yup.object().shape({
          song_1: yup.string().required('Dieses Feld ist erforderlich'),
          song_2: yup.string().required('Dieses Feld ist erforderlich'),
          song_3: yup.string().required('Dieses Feld ist erforderlich'),
        })
      ),
    }),
  });