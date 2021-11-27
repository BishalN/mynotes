import { Box, Button, NativeBaseProvider, Spinner } from "native-base";
import React from "react";
import { useFonts, CarterOne_400Regular } from "@expo-google-fonts/carter-one";
import { theme } from "./src/utils/theme";
import { Register } from "./src/screens/Register";
import { Text } from "react-native";
import { QueryClientProvider, QueryClient } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./src/screens/Login";
import { Dash } from "./src/screens/Dash";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({ CarterOne_400Regular });

  if (!fontLoaded) {
    return <Text>Loading font</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Dash"
              component={Dash}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
