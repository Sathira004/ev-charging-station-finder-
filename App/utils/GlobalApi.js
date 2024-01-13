import axios from 'axios';

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "AIzaSyBVRpOKjfxYq3ZQ7rCdNDKJpFXe1IF76Es";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.shortFormattedAddress",
      "places.location",
      "places.evChargeOptions.connectorAggregation",
      "places.photos",
      "places.id"
    ],
  },
};

const newNearbyPlace = (data) => axios.post(BASE_URL, data, config);

export default { newNearbyPlace, API_KEY };
