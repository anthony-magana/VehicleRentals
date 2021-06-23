import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase";
require("firebase/firestore");

export default function UserSearch(props) {
  const [users, setUsers] = useState([]);
  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", "==", search)
      .get()
      .then((snapshot) => {
        let Users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(Users);
      });
  };
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fffff8",
      }}
    >
      <View style={{ marginTop: "15%", marginLeft: 5, marginRight: 5 }}>
        <View
          style={{
            padding: 10,
            borderWidth: 0.4,
            borderColor: "grey",
            borderRadius: 20,
            flexDirection: "row",
          }}
        >
          <Ionicons
            style={{ opacity: 0.5, color: "grey" }}
            name="search"
            size={22}
          />
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="never"
          >
            <TextInput
              placeholder="Search for User"
              style={{ padding: 5 }}
              onChangeText={(search) => fetchUsers(search)}
            />
          </ScrollView>
        </View>
        <FlatList
          style={{ padding: 10 }}
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Profile", { uid: item.id })
              }
            >
              <Text>{item.name} </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
