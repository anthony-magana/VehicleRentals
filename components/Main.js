import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FeedScreen from "./Main/Feed";
//import CartScreen from "./Main/cart";
import ProfileScreen from "./Main/Profile";
import UserSearchScreen from "./Main/UserSearch";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts, clearData } from "../redux/actions/index";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export class Main extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserPosts();
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        activeColor="#FFFFFF"
        barStyle={{
          borderRadius: 30,
          borderColor: "rgba(255, 255, 255, 0.1)",
          paddingBottom: 15,
          paddingTop: 17,
          paddingRight: 12,
          paddingLeft: 12,
          position: "relative",
          bottom: 35,
          height: 75,
          marginRight: 15,
          marginLeft: 15,
          marginTop: 5,
          marginBottom: 0,
          backgroundColor: "#303030",
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                style={{
                  position: "absolute",
                  top: -18,
                }}
                name="home-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MainAdd"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                style={{ position: "absolute", top: -18 }}
                name="add-circle"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="UserSearch"
          component={UserSearchScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                style={{ position: "absolute", top: -18 }}
                name="search"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Profile", {
                uid: firebase.auth().currentUser.uid,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                style={{ position: "absolute", top: -17 }}
                name="person-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchUserPosts, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
