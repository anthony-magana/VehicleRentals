import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import firebase from "firebase";
require("firebase/firestore");

export default function Category(props) {
  const [models, setModels] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //const WIDTH = Dimensions.get("window").width;
  //const HEIGHT = Dimensions.get("window").height;
  const category = props.route.params.category;
  let temp = [];

  useEffect(() => {
    call();
    setLoaded(true);
  }, []);
  const call = () => {
    let count = 0;
    props.route.params.users.map(() => {
      fetchModels(props.route.params.users[count].id);
      count = count + 1;
    });
    if (count === props.route.params.users.length) {
      setLoaded(true);
    } else console.log("not loaded");
  };
  const fetchModels = (userId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .where("type", "==", category)
      .get()
      .then((snapshot) => {
        let Models = snapshot.docs.map((doc) => {
          if (doc.data().type === category) {
            const newData = doc.data();
            const id = doc.id;
            return { id, ...newData };
          } else return null;
        });
        if (Models === null) {
          console.log("no sedan");
        }
        temp = [...temp, Models];
        setModels(temp);
        //console.log(temp);
      })
      .catch(() => {
        console.log("error");
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
      <View style={{ marginTop: 20 }}>
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

        {typeof models[0] === "undefined" ? (
          <Text
            style={{
              paddingTop: 10,
              fontSize: 14,
              fontWeight: "400",
              alignSelf: "center",
            }}
          >
            Sorry, No vehicles under this category at this time.
          </Text>
        ) : (
          <View>
            {models.map((obj) =>
              obj.map((post) => (
                <View key={post.id} style={{ padding: 10 }}>
                  <Text>
                    Vehicle: {post.brand.toUpperCase()}{" "}
                    {post.model.toUpperCase()}
                  </Text>
                  <Text>Type: {post.type.toUpperCase()}</Text>
                  <Text>Year: {post.year}</Text>
                  <Text>Price: ${post.price}</Text>
                  <Text>City: {post.city.toUpperCase()}</Text>
                  <Text>Description: {post.description}</Text>
                  <Text>Posted: {Date(post.creation.seconds)}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </View>
  );
}
