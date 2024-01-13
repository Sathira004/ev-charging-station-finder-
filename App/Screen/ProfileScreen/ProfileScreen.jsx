import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { useUser, useClerk } from "@clerk/clerk-expo";
import Colors from "../../utils/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ToastAndroid } from "react-native";

export default function ProfileScreen() {
  const profileMenu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
    },
    {
      id: 2,
      name: "Favorite places",
      icon: "bookmark",
    },
  ];

  const { user } = useUser();
  const { signOut } = useClerk();

  const showToast = () => {
    ToastAndroid.show("Logout successful!", ToastAndroid.BOTTOM);
  };
  

  return (
    <View>
      <View
        style={{ padding: 20, paddingTop: 20, backgroundColor: Colors.PRIMARY }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
          }}
        >
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          />
          <Text
            style={{
              fontSize: 26,
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
              marginTop: 8,
            }}
          >
            {user.fullName}
          </Text>

          <TouchableOpacity
            onPress={() => {
              signOut();
              showToast();
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "outfit-medium",
                color: Colors.WHITE,
                marginTop: 8,
              }}
            >
              SignOut
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 20,
        }}
      >
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 20,
                paddingHorizontal: 100,
              }}
            >
              <MaterialIcons
                name={item.icon}
                size={40}
                color={Colors.PRIMARY}
              />
              <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
