import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import CarSearch from "./CarSearch";

import firebase from "firebase";
require("firebase/firestore");

export default function Feed(props) {
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;
  const [screenHeight, setScreenHeight] = useState(0);
  const [users, setUsers] = useState();
  const [loaded, setLoaded] = useState(false);

  const scrollEnable = screenHeight > HEIGHT - 95;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        let Users = snapshot.docs.map((doc) => {
          const id = doc.id;
          return { id };
        });
        setUsers(Users);
        setLoaded(true);
      });
  };
  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: -80,
        backgroundColor: "#fffff8",
        overflow: "scroll",
      }}
    >
      <StatusBar />
      <ScrollView
        scrollEnabled={scrollEnable}
        onContentSizeChange={(w, h) => {
          setScreenHeight(h);
        }}
        style={{ marginBottom: 150 }}
      >
        <View
          style={{
            marginTop: HEIGHT - 0.92 * HEIGHT,
            marginLeft: WIDTH - 0.96 * WIDTH,
            flexDirection: "row",
          }}
        >
          <Ionicons name="location" size={24} color="#588DDE" />
          <Text style={{ alignSelf: "center" }}>Your Location, Earth</Text>
        </View>
        <View
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 26,
              marginTop: 15,
              paddingLeft: 10,
              paddingTop: 10,
              paddingRight: WIDTH - 0.8 * WIDTH,
              flexWrap: "wrap",
            }}
          >
            Find a Car Rental Near You!
          </Text>
          <CarSearch users={users} />
          <View style={{ paddingTop: 30, paddingLeft: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>Categories</Text>
          </View>

          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={WIDTH}
            snapToAlignment={"center"}
            showsHorizontalScrollIndicator={false}
            style={{
              paddingTop: 15,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                padding: 15,
                backgroundColor: "#f5f5f2",
                borderRadius: 15,
              }}
              onPress={() =>
                props.navigation.navigate("Category", {
                  users,
                  category: "sedan",
                })
              }
            >
              <Ionicons name="car" size={25}></Ionicons>
              <Text style={{ alignSelf: "center", paddingLeft: 5 }}>
                Sedans
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            ></View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                padding: 15,
                backgroundColor: "#f5f5f2",
                borderRadius: 15,
              }}
              onPress={() =>
                props.navigation.navigate("Category", {
                  users,
                  category: "coupe",
                })
              }
            >
              <Ionicons name="car" size={25}></Ionicons>
              <Text style={{ alignSelf: "center", paddingLeft: 5 }}>
                Coupes
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            ></View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                padding: 15,
                backgroundColor: "#f5f5f2",
                borderRadius: 15,
              }}
              onPress={() =>
                props.navigation.navigate("Category", {
                  users,
                  category: "truck",
                })
              }
            >
              <FontAwesome5 name="truck-pickup" size={24} />
              <Text style={{ alignSelf: "center", paddingLeft: 5 }}>
                Trucks
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            ></View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                padding: 15,
                backgroundColor: "#f5f5f2",
                borderRadius: 15,
              }}
              onPress={() =>
                props.navigation.navigate("Category", {
                  users,
                  category: "suv",
                })
              }
            >
              <FontAwesome5 name="truck" size={22} />
              <Text style={{ alignSelf: "center", paddingLeft: 5 }}>SUV's</Text>
            </TouchableOpacity>
          </ScrollView>

          <View
            style={{
              paddingLeft: 10,
              paddingTop: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              Nearby Car Rentals
            </Text>
            <Button title="see more" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
