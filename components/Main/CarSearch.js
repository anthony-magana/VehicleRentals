import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase";
require("firebase/firestore");

export default function CarSearch({ users }) {
  const [models, setModels] = useState([]);
  const WIDTH = Dimensions.get("window").width;

  const fetchModels = (userId, search) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .where("make", "==", search)
      .get()
      .then((snapshot) => {
        let Models = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setModels(Models);
      });
  };
  return (
    <View
      style={{
        marginTop: "10%",
        marginLeft: 5,
        marginRight: 5,
      }}
    >
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
            placeholder="Search for Models"
            style={{ paddingTop: 5, paddingLeft: 5 }}
            onChangeText={(search) => {
              users.map(() => fetchModels(users[0].id, search.toLowerCase()));
            }}
          />
        </ScrollView>
      </View>
      <FlatList
        horizontal={true}
        snapToAlignment="center"
        decelerationRate={0}
        snapToInterval={WIDTH - 60}
        pagingEnabled
        data={models}
        renderItem={({ item }) => (
          <TouchableOpacity
          // onPress={() =>
          //   props.navigation.navigate("Posts", { uid: item.id })
          // }
          >
            <View
              style={{
                position: "absolute",
                right: 40,
                top: 25,
                backgroundColor: "white",
                padding: 5,
                borderRadius: 6,
                opacity: 0.9,
                zIndex: 2,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                ${item.price}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                left: 9,
                bottom: 10,
                backgroundColor: "white",
                padding: 5,
                width: 279,
                alignSelf: "center",
                borderBottomRightRadius: 100,
                borderBottomLeftRadius: 100,
                opacity: 0.8,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: 5,
                }}
              >
                {item.brand.toUpperCase()} {item.make.toUpperCase()}
              </Text>
            </View>
            <View style={{}}>
              <Image
                style={{
                  aspectRatio: 1 / 1,
                  width: "100%",
                  height: 250,
                  alignSelf: "center",
                  margin: 10,
                  borderRadius: 30,
                }}
                source={{ uri: item.downloadURL }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
