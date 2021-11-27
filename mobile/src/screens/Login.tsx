import { useNavigation } from "@react-navigation/core";
import { Box, Button, Input, Text, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import useLogin from "../hooks/mutation/useLogin";
import { OauthButton } from "../components/OauthButton";

export const Login: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { mutateAsync, isLoading } = useLogin();

  return (
    <Box safeArea>
      <Text fontSize="4xl" mx="2">
        MyNotes
      </Text>
      <Box
        bg="gray.200"
        display="flex"
        alignItems="center"
        mx="1"
        my="20"
        py="5"
        rounded="md"
        justifyContent="center"
      >
        <Box>
          <Text fontSize="5xl">Welcome</Text>
          <Text>
            By logging in you accept our Privacy Policy and Terms of Service.
          </Text>
        </Box>

        <Box w="full">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required(),
              password: Yup.string()
                .min(6, "Must be atleast 6 characters long")
                .required(),
            })}
            onSubmit={async (values, { setErrors }) => {
              console.log("submitted");
              await mutateAsync(values, {
                onError: (err) => {
                  setErrors({
                    email: err.response.data.message,
                    password: err.response.data.message,
                  });
                },
                onSuccess: (data) => {
                  console.log(data);
                  // localStorage.setItem("token", JSON.stringify(data.token));
                  // router.push("/dash");
                },
              });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <VStack space="2" my="2">
                <Input
                  bg="gray.300"
                  type="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  rounded="md"
                  placeholder="Enter your email"
                />
                {touched.email && errors.email && (
                  <Text color="red.500" fontSize="xs">
                    {errors.email}
                  </Text>
                )}

                <Input
                  bg="gray.300"
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  rounded="md"
                  type="password"
                  placeholder="Enter your password"
                />
                {touched.password && errors.password && (
                  <Text color="red.500" fontSize="xs">
                    {errors.password}
                  </Text>
                )}

                <Button
                  colorScheme="gray"
                  w="1/2"
                  isLoading={isLoading}
                  alignSelf="center"
                  onPress={() => handleSubmit()}
                >
                  Login
                </Button>
                <Text mx="4" mt="2" alignSelf="flex-end">
                  Don't have an account?{" "}
                  <Text
                    color="blue.500"
                    //@ts-ignore
                    onPress={() => navigation.navigate("Register")}
                  >
                    Register
                  </Text>
                </Text>
              </VStack>
            )}
          </Formik>

          <OauthButton provider="google" />
          <OauthButton provider="facebook" />
          <OauthButton provider="github" />
        </Box>
      </Box>
    </Box>
  );
};
