import React from "react";
import { View, Text } from "react-native";

export default function Posts(props) {
  const post = props.route.params.e;
  return (
    <View>
      <Text
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          fontWeight: "600",
          fontSize: 22,
          alignSelf: "center",
        }}
      >
        Post Information
      </Text>
      <Text style={{ paddingLeft: 10 }}>
        Vehicle: {post.brand.toUpperCase()} {post.model.toUpperCase()}
      </Text>
      <Text style={{ paddingLeft: 10 }}>Type: {post.type.toUpperCase()}</Text>
      <Text style={{ paddingLeft: 10 }}>Year: {post.year}</Text>
      <Text style={{ paddingLeft: 10 }}>Price: ${post.price}</Text>
      <Text style={{ paddingLeft: 10 }}>City: {post.city.toUpperCase()}</Text>
      <Text style={{ paddingLeft: 10 }}>Description: {post.description}</Text>
      <Text style={{ paddingLeft: 10 }}>
        Posted: {Date(post.creation.seconds)}
      </Text>
    </View>
  );
}
