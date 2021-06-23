import React from "react";
import {
  Text,
  View,
  Button,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";

export default function Landing({ navigation }) {
  const HEIGHT = Dimensions.get("window").height;
  const WIDTH = Dimensions.get("window").width;
  return (
    <ImageBackground
      source={require("../../assets/ferrari.jpg")}
      style={{
        width: "100%",
        height: "92%",
        resizeMode: "cover",
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          fontSize: 30,
          fontWeight: "600",
        }}
      >
        Vehicle Rentals
      </Text>
      <View
        style={{
          position: "absolute",
          bottom: -100,
        }}
      >
        <Image
          style={{ width: WIDTH }}
          source={require("../../assets/wave.png")}
        />
      </View>
      <View style={{ position: "absolute", left: 0, right: 0 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: HEIGHT - 0.13 * HEIGHT,
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              paddingRight: 20,
              paddingLeft: 20,
              paddingTop: 7,
              paddingBottom: 7,
              borderRadius: 18,
              left: 30,
            }}
          >
            <Button
              title="Register"
              color="white"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
          <View
            style={{
              backgroundColor: "black",
              paddingRight: 26,
              paddingLeft: 26,
              paddingTop: 7,
              paddingBottom: 7,
              borderRadius: 18,
              right: -110,
            }}
          >
            <Button
              title="Login"
              color="white"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
