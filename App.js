// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/Main/Add";
import SaveScreen from "./components/Main/Save";
import CategoryScreen from "./components/Main/Category";

const firebaseConfig = {
  apiKey: "AIzaSyA4xCOvEZwVxXr5KEqJPI7OAGmvqB-rtBI",
  authDomain: "vehiclerentals-e4dbf.firebaseapp.com",
  projectId: "vehiclerentals-e4dbf",
  storageBucket: "vehiclerentals-e4dbf.appspot.com",
  messagingSenderId: "424405675451",
  appId: "1:424405675451:web:b6eeec85c6cc811482a89e",
  measurementId: "G-WZ534K6ZRW",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Stack = createStackNavigator();
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            navigation={Stack}
            options={{ headerBackTitle: false }}
          />
          <Stack.Screen
            name="Save"
            component={SaveScreen}
            options={{
              headerBackTitle: false,
            }}
          />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{
              headerBackTitle: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
