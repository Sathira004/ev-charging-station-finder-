import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import GlobalApi from "../../utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceItem({ place, isFav, markFav }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  const { user } = useUser();

  const db = getFirestore(app);

  const onSetFav = async (place) => {
    try {
      await setDoc(doc(db, "ev-favorite-place", place.id.toString()), {
        place: place,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      markFav();
      ToastAndroid.show("Place added to favorites", ToastAndroid.TOP);
    } catch (error) {
      console.error("Error adding place to favorites:", error);
    }
  };

  const onRemoveFav = async (placeId) => {
    await deleteDoc(doc(db, "ev-favorite-place", placeId.toString()));
    ToastAndroid.show("Place remove from the favorites", ToastAndroid.TOP);
    markFav();
  };

  const onDirectionClick = () => {
    const url = Platform.select({
      ios: "maps:"+place.location.latitude+","+place?.location?.longitude+"q="+place?.formattedAddress,
      android: "geo:"+place.location.latitude+","+place?.location?.longitude+"q="+place?.formattedAddress,
    })
    Linking.openURL(url);
  }

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get("screen").width * 0.9,
      }}
    >
      <LinearGradient colors={["transparent", "#ffffff", "#ffffff"]}>
        {!isFav ? (
          <Pressable
            style={{ position: "absolute", right: 0, margin: 5 }}
            onPress={() => onSetFav(place)}
          >
            <Ionicons name="heart-outline" size={30} color="white" />
          </Pressable>
        ) : (
          <Pressable
            style={{ position: "absolute", right: 0, margin: 5 }}
            onPress={() => onRemoveFav(place.id)}
          >
            <Ionicons name="heart-sharp" size={30} color="red" />
          </Pressable>
        )}

        <Image
          source={
            place?.photos
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "/media?key=" +
                    GlobalApi?.API_KEY +
                    "&maxHeightPx=800&maxWidthPx=1200",
                }
              : require("./../../../assets/images/ev-charging.png")
          }
          style={{
            width: "100%",
            borderRadius: 10,
            height: 130,
            zIndex: -1,
          }}
        />
        <View
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 23,
              fontFamily: "outfit-medium",
            }}
          >
            {place.displayName.text}
          </Text>
          <Text
            style={{
              color: Colors.GRAY,
              fontFamily: "outfit",
            }}
          >
            {place?.shortFormattedAddress}
          </Text>
          <View
            style={{
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY,
              }}
            >
              Connectors
            </Text>
            {/* <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 16,
              }}
            >
              {place?.evChargeOptions?.connectorCount}
            </Text> */}
            <Pressable
              onPress={() => onDirectionClick()}
              style={{
                padding: 10,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 6,
                paddingHorizontal: 14,
                width: 50,
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              <FontAwesome name="location-arrow" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
