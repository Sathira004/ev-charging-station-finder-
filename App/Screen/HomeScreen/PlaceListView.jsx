import { View, Text, FlatList, Dimensions, Animated } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlaceItem from "./PlaceItem";
import { SelectMarkerContext } from "../../context/SelectMarkerContext";
import { getFirestore } from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PlaceListView({ placeList }) {
  const flatListRef = useRef(null);
  const { user } = useUser();
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (placeList && placeList.length > 0 && selectedMarker !== undefined) {
      scrollToIndex(selectedMarker);
    }
  }, [placeList, selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  useEffect(() => {
    user && getFavorite();
  }, [user]);

  //Get data from the firestore
  const db = getFirestore(app);

  const getFavorite = async () => {
    setFavList([]);
    const q = query(
      collection(db, "ev-favorite-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFavList((favList) => [...favList, doc.data()]);
    });
  };

  const isFav = (place) => {
    const result = favList.find((item) => item.place.id == place.id);
    console.log(result);
    return result ? true : false;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        data={placeList}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: Dimensions.get("window").width,
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            <PlaceItem
              place={item}
              isFav={isFav(item)}
              markFav={() => getFavorite()}
            />
          </View>
        )}
      />
    </View>
  );
}
