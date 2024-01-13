import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { UserLocationContext } from "../../context/UserLocationContext";
import GlobalApi from "./../../utils/GlobalApi";
import axios from "axios";
import PlaceListView from "./PlaceListView";
import { SelectMarkerContext } from "../../context/SelectMarkerContext";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);

  useEffect(() => {
    location && getNearByPlace();
  }, [location]);

  const getNearByPlace = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude,
          },
          "radius": 50000.0,
        },
      },
    };
    GlobalApi.newNearbyPlace(data)
      .then((resp) => {
        console.log(resp.data);
        setPlaceList(resp.data?.places);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.message);
          console.error("Status Code:", error.response?.status);
        } else {
          console.error("Non-Axios Error:", error.message);
        }
      });
  };
  return (
    <SelectMarkerContext.Provider value={{selectedMarker, setSelectedMarker}}>
      <KeyboardAvoidingView behavior="padding">
      <View>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar searchLocation={(location) => setLocation ({
            latitude:location.lat,
            longitude:location.lng
          }) }/>
        </View>
        {placeList && <AppMapView placeList={placeList} />}
        <View style={styles.placeListContainer}>
          {placeList && <PlaceListView placeList={placeList} />}
        </View>
      </View>
      </KeyboardAvoidingView>
    </SelectMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  placeListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
  },
});
