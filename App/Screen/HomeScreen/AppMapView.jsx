import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useContext } from "react";
import MapViewStyle from "../../utils/MapViewStyle.json";
import { UserLocationContext } from "../../context/UserLocationContext";
import Markers from "./Markers";

export default function AppMapView({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    location?.latitude && (
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0722,
            longitudeDelta: 0.0721,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
          >
            <Image
              source={require("./../../../assets/images/car-marker.png")}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </Marker>

          {Array.isArray(placeList) &&
            placeList.map((item, index) => (
              <Markers key={index} place={item} index={index} />
            ))}
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
