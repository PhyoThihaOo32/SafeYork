import * as Location from "expo-location";
import { demoLocations } from "../data/demoData";
import { LocationInfo } from "../models/types";

export const LocationService = {
  async getLocation(): Promise<LocationInfo> {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        return demoLocations[0];
      }

      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      return {
        source: "gps",
        name: "Current GPS Location",
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        mapLink: `https://maps.google.com/?q=${current.coords.latitude},${current.coords.longitude}`,
      };
    } catch {
      return demoLocations[0];
    }
  },

  simulated(index = 0): LocationInfo {
    return demoLocations[index % demoLocations.length];
  },
};
