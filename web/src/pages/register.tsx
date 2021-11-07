import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Link from 'next/link';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import useLogin, { LoginError } from '../hooks/mutation/useLogin';
import { useRouter } from 'next/dist/client/router';
import { InputErrors, OnChangeEvent } from '.';
import useRegister from '../hooks/mutation/useRegister';

const Home: NextPage = () => {
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = useRegister();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<InputErrors>([]);

  const registerHandler = () => {
    setErrors([]);
    if (!email || !email.includes('@')) {
      setErrors((prevError) => [
        ...prevError,
        { field: 'email', message: 'Email is required and must be valid' },
      ]);
      return;
    }
    if (!password || password.length < 6) {
      setErrors((prevError) => [
        ...prevError,
        {
          field: 'password',
          message: 'Password is required and must be atleas 6 character long',
        },
      ]);
      return;
    }
    mutate(
      { email, password },
      {
        onError: (errors) => {
          //Check if the data is array or an object
          if (errors.response?.data?.hasOwnProperty('length')) {
            const errs: LoginError[] = errors?.response?.data;
            errs.map((err) => {
              setErrors((prevError) => [
                ...prevError,
                { field: err.field, message: err.message },
              ]);
            });
          } else {
            const err: LoginError = errors.response.data;
            console.log(err);
            setErrors((prevError) => [
              ...prevError,
              { field: err.field, message: err.message },
            ]);
          }
        },
        onSuccess: (data) => {
          //Display a toast or the redirect to the login page
          toast.success('Register successfull', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          toast.info('Please verify your email address before logging in', {
            position: 'bottom-left',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          // router.push('/');
        },
      }
    );
  };
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container mx-auto'>
        {/* nav section */}
        <section>
          <h1 className='text-5xl m-5'>MyNotes</h1>
        </section>

        {/* by default the index page would be the login page */}
        <main>
          <section>
            <div
              className='bg-gray-200 my-10
             rounded-md  flex flex-col mx-3 p-6
              space-y-4 justify-center items-center md:mx-28 lg:mx-56 xl:mx-96'
            >
              <div className='self-start'>
                <h3 className='text-5xl'>Welcome</h3>
                <h3 className='ml-2'>
                  By registering you accept our{' '}
                  <span className='text-blue-700 cursor-pointer'>
                    Privacy Policy
                  </span>{' '}
                  and
                  <span className='text-blue-700 cursor-pointer'>
                    {' '}
                    Terms of Service
                  </span>
                  .
                </h3>
              </div>

              <form
                action=''
                className='flex flex-col w-full space-y-4 text-center'
              >
                <Input
                  placeholder='Enter your email address'
                  onChange={(e: OnChangeEvent) => setEmail(e.target.value)}
                  value={email}
                />
                {errors.map(
                  (err) =>
                    err.field == 'email' && (
                      <span className='text-red-600 text-xs '>
                        {err.message}
                      </span>
                    )
                )}
                <Input
                  isPassword
                  placeholder='Enter your password'
                  onChange={(e: OnChangeEvent) => setPassword(e.target.value)}
                  value={password}
                />
                {errors.map(
                  (err) =>
                    err.field == 'password' && (
                      <span className='text-red-600 text-xs '>
                        {err.message}
                      </span>
                    )
                )}
                <button
                  type='button'
                  disabled={isLoading || isSuccess}
                  onClick={registerHandler}
                  className={`${
                    isLoading || isSuccess
                      ? 'bg-gray-200'
                      : 'bg-gray-300 w-52 hover:bg-gray-400'
                  } 
                 focus:ring-2 focus:ring-gray-800 self-center rounded-md p-2 `}
                >
                  {isLoading ? 'Registering' : 'Register'}
                </button>
                <span>
                  Already have an account?{' '}
                  <span className='text-blue-500'>
                    <Link href='/'>Login</Link>
                  </span>
                </span>
                <div className='border-b-2 w-64 self-center border-black'></div>
              </form>
              <Button>Continue with facebook</Button>
              <Button>Continue with google</Button>
              <Button>Continue with github</Button>
            </div>
          </section>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

export default Home;
