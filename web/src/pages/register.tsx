import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

const Home: NextPage = () => {
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
                <Input placeholder='Enter your email address' />
                <Input isPassword placeholder='Enter your password' />
                <button
                  type='button'
                  className='bg-gray-300 w-52 hover:bg-gray-400
                 focus:ring-2 focus:ring-gray-800 self-center rounded-md p-2 '
                >
                  Register
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
        </main>
      </div>
    </div>
  );
};

export default Home;
