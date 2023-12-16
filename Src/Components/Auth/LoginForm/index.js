'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { LogIn } from '@/Api/AuthApi';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  identifier: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
      setLoading(true)
      const response = await LogIn({
        identifier: data.identifier,
        password: data.password,
      });
      if (response.error) {
        setErrorMessage(response.error.message);
        setLoading(false)
      } else {
        setLoading(false)
        router.push('/panel');
      }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid w-full grid-cols-1 gap-6">
      <div className="grid grid-cols-1 gap-6">
        <label>
          <div>*Email:</div>
          <input type="text" {...register('identifier')} className="w-full p-4 mt-2 bg-transparent border border-white"  />
          {errors.identifier && <p style={{ color: 'red' }}>{errors.identifier.message}</p>}
        </label>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <label>
          <div>*Hasło:</div>
          <input type="password" {...register('password')} className="w-full p-4 mt-2 bg-transparent border border-white"  />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </label>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* <button type="submit">Zaloguj się</button> */}

      <button type="submit" className="flex flex-row items-center justify-center w-full gap-4 px-6 py-4 mt-6 ml-auto text-black bg-white border border-white border-solid">
        {!loading && <div>Zaloguj się</div>}
        {loading &&<><div>Proszę czekać</div><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#BF0C10]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></>}
      </button>
    </form>
  );
};

export default LoginForm;
