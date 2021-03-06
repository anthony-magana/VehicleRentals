import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  Picker,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props) {
  //console.log(props);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(null);
  const [price, setPrice] = useState(null);
  const [type, setType] = useState("");
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("Waiting...");
  const [state, setState] = useState("Waiting...");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let locationn = await Location.getCurrentPositionAsync({});
      setLocation(locationn);
    })();

    if (location) {
      Location.setGoogleApiKey("AIzaSyAeLG6-xQI0TWjPBR4LTTMUbcKxlIg18tY");
      let loc = Location.reverseGeocodeAsync(location.coords)
        .then((promise) => {
          return promise;
        })
        .then((res) => {
          return res[0];
        })
        .catch((error) => console.log(error));
      loc.then((res) => {
        setCity(res.city);
        setState(res.region);
      });
    }
  }, [type, price]);

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(8)}`;
    const res = await fetch(uri);
    const blob = await res.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        //console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        description,
        price,
        year,
        model,
        brand,
        city,
        state,
        type,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fffff8" }}>
      <Image source={{ uri: props.route.params.image }} />
      <View style={{ padding: 5 }}>
        <TextInput
          placeholder="Description"
          style={{ padding: 10 }}
          onChangeText={(desc) => setDescription(desc)}
        />
      </View>
      <View style={{ padding: 5 }}>
        <TextInput
          placeholder="Brand of Vehicle"
          style={{ padding: 10 }}
          onChangeText={(Brand) => setBrand(Brand.toLowerCase())}
        />
      </View>
      <View style={{ padding: 5 }}>
        <TextInput
          placeholder="Model of Vehicle"
          style={{ padding: 10 }}
          onChangeText={(Model) => setModel(Model.toLowerCase())}
        />
      </View>
      <View style={{ padding: 5 }}>
        <TextInput
          placeholder="Year of Vehicle"
          keyboardType="numeric"
          style={{ padding: 10 }}
          onChangeText={(Year) => setYear(Year)}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 5 }}>
        <TextInput
          placeholder="Price per day in USD"
          keyboardType="numeric"
          style={{ padding: 10 }}
          onChangeText={(Price) => setPrice(Price)}
        />
      </ScrollView>
      <View style={{ flex: 1, top: "-31%" }}>
        <Picker
          selectedValue={type}
          style={{ height: 5, width: "50%" }}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Sedan" value="sedan" />
          <Picker.Item label="Coupe" value="coupe" />
          <Picker.Item label="SUV" value="suv" />
          <Picker.Item label="Truck" value="truck" />
        </Picker>
      </View>
      <View
        style={{
          position: "absolute",
          top: "45%",
          right: 50,
          borderWidth: 1,
          borderColor: "black",
          paddingTop: 5,
          paddingBottom: 5,
          paddingRight: 15,
          paddingLeft: 15,
          borderRadius: 20,
        }}
      >
        <Button title="Save" onPress={() => uploadImage()} />
      </View>
    </View>
  );
}
