import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({searchLocation}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        paddingHorizontal: 5,
        backgroundColor: Colors.WHITE,
        borderRadius: 6,
      }}
    >
      <Ionicons
        name="location-outline"
        size={24}
        color={Colors.GRAY}
        style={{ paddingTop: 10 }}
      />
      <GooglePlacesAutocomplete
        placeholder="Search EV Charging Station"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          searchLocation(details?.geometry?.location);
        }}
        query={{
          key: "AIzaSyBVRpOKjfxYq3ZQ7rCdNDKJpFXe1IF76Es",
          language: "en",
        }}
      />
    </View>
  );
}
