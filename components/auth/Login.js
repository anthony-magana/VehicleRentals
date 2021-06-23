import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    try {
      let response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        console.log(response);
        //alert("Success ✅", "Account Signed in successfully");
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <View>
      <View
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          paddingLeft: 10,
        }}
      >
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          paddingLeft: 10,
        }}
      >
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          borderWidth: 2,
          backgroundColor: "black",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Button onPress={() => onSignIn()} title="Sign In" color="white" />
      </View>
    </View>
  );
}
