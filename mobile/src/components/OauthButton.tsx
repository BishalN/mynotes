import React from 'react';
import { Button, Text, useToast } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/config';
import { useNavigation } from '@react-navigation/core';

type OauthButtonProps = {
  provider: 'google' | 'facebook' | 'github';
};

export const OauthButton: React.FC<OauthButtonProps> = ({ provider }) => {
  const toast = useToast();
  const navigation = useNavigation();
  const handleAuthentication = async () => {
    try {
      const res = await WebBrowser.openAuthSessionAsync(
        `${BASE_URL}auth/${provider}?redirect=${Linking.createURL('/?')}`,
        ''
      );

      if (res.type === 'success') {
        let cookies = decodeURIComponent(res.url).split('?')[1];
        await AsyncStorage.setItem(
          'cookie',
          cookies.replace('cookies=', '').split('#')[0]
        );
        //@ts-ignore
        navigation.navigate('Dash');
      } else {
        toast.show({ description: 'Authentication failed', duration: 5000 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button colorScheme='gray' my='1' onPress={handleAuthentication}>
      <Text color='white'>Continue with {provider}</Text>
    </Button>
  );
};
