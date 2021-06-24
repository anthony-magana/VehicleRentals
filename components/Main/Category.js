import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import firebase from "firebase";
require("firebase/firestore");

export default function Category(props) {
  const [models, setModels] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;
  const category = props.route.params.category;

  useEffect(() => {
    props.route.params.users.map(() =>
      fetchModels(props.route.params.users[0].id)
    );
    setLoaded(true);
  }, []);

  const fetchModels = (userId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .get()
      .then((snapshot) => {
        let newModels = snapshot.docs.map((doc) => {
          if (doc.data().type === category) {
            const newData = doc.data();
            const id = doc.id;
            setIsEmpty(false);
            return { id, ...newData };
          }
        });
        setModels(newModels);
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
        bottom: 0,
        backgroundColor: "#fffff8",
      }}
    >
      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            CATEGORY:
          </Text>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              fontWeight: "400",
              color: "#588DDE",
            }}
          >
            {category.toUpperCase()}
          </Text>
        </View>
        {!isEmpty ? (
          <FlatList
            style={{ marginBottom: 35 }}
            horizontal={false}
            snapToAlignment="center"
            decelerationRate={0}
            snapToInterval={WIDTH - 60}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            data={models}
            keyExtractor={() => Math.random().toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
              // onPress={() =>
              //   props.navigation.navigate("Posts", { uid: item.id })
              // }
              >
                <View
                  style={{
                    position: "absolute",
                    right: 80,
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
                    left: 34,
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
                <View>
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
        ) : (
          <Text
            style={{
              padding: 10,
              fontSize: 14,
              fontWeight: "400",
              alignSelf: "center",
            }}
          >
            Sorry, No vehicles under this category at this time.
          </Text>
        )}
      </View>
    </View>
  );
}
