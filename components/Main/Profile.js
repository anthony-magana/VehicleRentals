import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  Image,
  FlatList,
  View,
} from "react-native";

import firebase from "firebase/app";
import { connect } from "react-redux";
require("firebase/firestore");

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { currentUser, posts } = props;
    //console.log(currentUser, posts);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            //console.log(snapshot.data());
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "desc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          //console.log(posts);
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  if (user === null) {
    return <View />;
  }

  const onLogout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
      {props.route.params.uid === firebase.auth().currentUser.uid ? (
        <View style={styles.logout}>
          <Button onPress={() => onLogout()} title="Logout" color="black" />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: "#fffff8",
    marginBottom: "-25%",
  },
  infoContainer: {
    margin: 20,
  },
  galleryContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    flex: 1 / 3,
  },
  logout: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: "black",
    width: "40%",
    maxHeight: "8%",
    marginBottom: "35%",
    alignSelf: "center",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
