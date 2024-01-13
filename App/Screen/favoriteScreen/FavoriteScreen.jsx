import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../utils/Colors";
import { getFirestore } from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import PlaceItem from "../HomeScreen/PlaceItem";


export default function FavoriteScreen() {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && getFavorite();
  }, [user]);

  // Get data from the firestore
  const db = getFirestore();

  const getFavorite = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'ev-favorite-place'),
        where('email', '==', user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapshot = await getDocs(q);
      const newFavList = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        newFavList.push(doc.data());
      });
      setFavList(newFavList);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = useCallback(() => {
    getFavorite();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ padding: 10, fontFamily: 'outfit-bold', fontSize: 30 }}>
        My Favorite <Text style={{ color: Colors.PRIMARY }}>Places</Text>
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
        <FlatList
          data={favList}
          renderItem={({ item, index }) => (
            <PlaceItem place={item.place} isFav={true} markFav={getFavorite} />
          )}
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
}