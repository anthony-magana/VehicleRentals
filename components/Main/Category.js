import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";

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
        <Text style={{ textAlign: "left" }}>
          CATEGORY: {category.toUpperCase()}
        </Text>
        {!isEmpty ? (
          <FlatList
            horizontal={false}
            snapToAlignment="center"
            decelerationRate={0}
            snapToInterval={WIDTH - 60}
            pagingEnabled
            data={models}
            keyExtractor={() => Math.random().toString()}
            renderItem={({ item }) => (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Price: $ {item.price}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text>Sorry, No vehicles under this category at this time.</Text>
        )}
      </View>
    </View>
  );
}
