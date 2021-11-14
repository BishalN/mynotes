import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { Button, OauthButton } from "../components/Button";
import { Input } from "../components/Input";

export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Home: NextPage = () => {
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

              <form
                action=""
                className="flex flex-col w-full space-y-2 text-center"
              >
                <Input placeholder="Enter your email address" />

                <Input isPassword placeholder="Enter your password" />

                <Button onClick={() => console.log("Login clicked")}>
                  Login
                </Button>
                <span>
                  Don't have an account?{" "}
                  <span className="text-blue-500">
                    <Link href="/register">Register</Link>
                  </span>
                </span>
                <div className="border-b-2 w-64 self-center border-black"></div>
              </form>
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

export default Home;
