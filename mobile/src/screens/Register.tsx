import { useNavigation } from '@react-navigation/core';
import { Box, Button, Input, Text, useToast, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import useRegister, { LoginError } from '../hooks/mutation/useRegister';
import { OauthButton } from '../components/OauthButton';
import { InputErrors } from '../utils/types';

export const Register: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { mutate, isLoading } = useRegister();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<InputErrors>([]);

  useEffect(() => {
    if (errors.length >= 1) {
      errors.map((err) =>
        toast.show({
          description: err.message,
          duration: 1500,
        })
      );
    }
  }, [errors]);

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
      }
    );
  };
  return (
    <Box safeArea>
      <Text fontSize='4xl' mx='2'>
        MyNotes
      </Text>
      <Box
        bg='gray.200'
        display='flex'
        alignItems='center'
        mx='1'
        my='20'
        py='5'
        rounded='md'
        justifyContent='center'
      >
        <Box>
          <Text fontSize='5xl'>Welcome</Text>
          <Text>
            By registering you accept our Privacy Policy and Terms of Service.
          </Text>
        </Box>

        <Box w='full'>
          <VStack space='2' my='2'>
            <Input
              bg='gray.300'
              type='email'
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType='email-address'
              rounded='md'
              placeholder='Enter your email'
            />

            <Input
              bg='gray.300'
              onChangeText={(text) => setPassword(text)}
              value={password}
              rounded='md'
              type='password'
              placeholder='Enter your password'
            />

            <Button
              colorScheme='gray'
              w='1/2'
              isLoading={isLoading}
              alignSelf='center'
              onPress={registerHandler}
            >
              Register
            </Button>

            <Text mx='4' mt='2' alignSelf='flex-end'>
              Already have an account?{' '}
              <Text
                color='blue.500'
                //@ts-ignore
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </Text>
          </VStack>

          <OauthButton provider='google' />
          <OauthButton provider='facebook' />
          <OauthButton provider='github' />
        </Box>
      </Box>
    </Box>
  );
};
