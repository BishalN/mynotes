import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { User } from '../../utils/types';

export const useIsAuth = async () => {
  const { data, isLoading, error } = useMeQuery();
  const navigation = useNavigation();
  useEffect(() => {
    if (!isLoading && !data?.id) {
      //@ts-ignore
      navigation.navigate('Login');
    } else if (data?.id) {
      //@ts-ignore
      navigation.navigate('Dash');
    }
  }, [isLoading, data, error]);
};

export const useMeQuery = () => {
  return useQuery('me', async () => {
    const cookie = await AsyncStorage.getItem('cookie');
    const parsedCookie = JSON.parse(cookie as string);

    const { data } = await axios.get(`${BASE_URL}success`, {
      headers: {
        Cookie: `qid=${parsedCookie['qid']}; qid.sig=${parsedCookie['qid.sig']}`,
      },
    });
    return data as User;
  });
};
