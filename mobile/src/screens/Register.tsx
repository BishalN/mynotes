import { useNavigation } from "@react-navigation/core";
import { Box, Button, Input, Text, useToast, VStack } from "native-base";
import React from "react";
import useRegister from "../hooks/mutation/useRegister";
import { OauthButton } from "../components/OauthButton";
import * as Yup from "yup";
import { Formik } from "formik";

export const Register: React.FC = () => {
  const navigation = useNavigation();
  const { mutateAsync, isLoading } = useRegister();
  const toast = useToast();

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
            By registering you accept our Privacy Policy and Terms of Service.
          </Text>
        </Box>

        <Box w="full">
          <Formik
            initialValues={{ email: "", password: "", name: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required(),
              password: Yup.string()
                .min(6, "Must be atleast 6 characters long")
                .required(),
              name: Yup.string().min(3).required(),
            })}
            onSubmit={async (values, { setFieldError }) => {
              await mutateAsync(values, {
                onError: (err) => {
                  const msg: string = err.response.data.message;
                  if (msg.includes("email")) return setFieldError("email", msg);
                  if (msg.includes("name")) return setFieldError("name", msg);
                  if (msg.includes("password"))
                    return setFieldError("password", msg);
                },
                onSuccess: (data) => {
                  console.log(data);
                  toast.show({
                    status: "success",
                    title: "Please verify your email address to login",
                    duration: 5000,
                  });
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
                  type="text"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  rounded="md"
                  placeholder="Enter your full name"
                />
                {touched.name && errors.name && (
                  <Text color="red.500" fontSize="xs">
                    {errors.name}
                  </Text>
                )}

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
