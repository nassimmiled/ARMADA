import * as Location from "expo-location";

export const checkLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  return status === "granted";
};
