import { View, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: 45,
          height: 45,
          borderRadius: 99,
        }}
      />
      <Image
        source={require("./../../../assets/images/ev-logo.png")}
        style={{
          width: 200,
          height: 50,
          objectFit: "contain",
        }}
      />
      <FontAwesome name="filter" size={26} color="black" />
    </View>
  );
}
