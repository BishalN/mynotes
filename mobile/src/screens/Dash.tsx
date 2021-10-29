import { Box, Text } from 'native-base';
import React from 'react';
import { useIsAuth, useMeQuery } from '../hooks/query/useIsAuth';

export const Dash = () => {
  // useIsAuth();
  const { data, isLoading } = useMeQuery();
  return (
    <Box safeArea>
      {isLoading && <Text>Loading info about you</Text>}
      {!isLoading && <Text>{JSON.stringify(data)}</Text>}
    </Box>
  );
};
