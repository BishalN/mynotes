import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button, OauthButton } from "../components/Button";
import { useLogin } from "../hooks/mutation/useLogin";

const Home: NextPage = () => {
  const { mutateAsync, isLoading } = useLogin();

  return (
    <div>
      <Head>
        <title>MyNotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        {/* nav section */}
        <section>
          <h1 className="text-5xl m-5">MyNotes</h1>
        </section>

        <main>
          <section>
            <div
              className="bg-gray-200 my-10
             rounded-md  flex flex-col mx-3 p-6
              space-y-4 justify-center items-center md:mx-28 lg:mx-56 xl:mx-96"
            >
              <div className="self-start">
                <h3 className="text-5xl">Welcome</h3>
                <h3 className="ml-2">
                  By logging in you accept our{" "}
                  <span className="text-blue-700 cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  and
                  <span className="text-blue-700 cursor-pointer">
                    {" "}
                    Terms of Service
                  </span>
                </h3>
              </div>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string()
                    .min(6, "Must be atleast 6 characters long")
                    .required("Required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log("submitted");
                  await mutateAsync(values, {
                    onSettled: (data) => {
                      console.log(data);
                      setSubmitting(false);
                    },
                  });
                }}
              >
                <Form className="flex flex-col w-full space-y-2 text-center">
                  <label htmlFor="email" className="self-start">
                    Email Address
                  </label>
                  <Field name="email" type="text" />
                  <ErrorMsg name="email" />

                  <label className="self-start" htmlFor="password">
                    Password
                  </label>
                  <Field name="password" type="password" />
                  <ErrorMsg name="password" />

                  <Button loading={isLoading} type="submit">
                    Login
                  </Button>
                  <span>
                    Don't have an account?{" "}
                    <span className="text-blue-500">
                      <Link href="/register">Register</Link>
                    </span>
                  </span>
                  <div className="border-b-2 w-64 self-center border-black"></div>
                </Form>
              </Formik>

              <OauthButton provider="facebook">
                Continue with facebook
              </OauthButton>
              <OauthButton provider="google">Continue with google</OauthButton>
              <OauthButton provider="github">Continue with github</OauthButton>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export const ErrorMsg = ({ name }: { name: string }) => {
  return (
    <div className="self-start text-red-500 text-xs">
      <ErrorMessage name={name} />
    </div>
  );
};

export default Home;
