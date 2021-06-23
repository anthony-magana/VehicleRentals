import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSignUp = async () => {
    try {
      let response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response && response.user) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(response);
        alert("Success ✅", "Account created successfully");
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
        <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />
      </View>
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
        <Button onPress={() => onSignUp()} color="white" title="Sign Up" />
      </View>
    </View>
  );
}
