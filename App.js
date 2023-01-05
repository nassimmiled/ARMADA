import React, { useState } from "react";
import { View, StyleSheet, Button, Image } from "react-native";

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";

import { AppCamera } from "./components/AppCamera";
import { checkLocationPermission } from "./utils";

const MAP_REGION_DELTA = 0.04;

export default function App() {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);

  const onPressOpenCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      setOpenCamera(true);
    }
  };

  const handleTakePic = async (photo) => {
    setOpenCamera(false);

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setPhoto(photo);
  };

  const _onPressCloseCamera = () => {
    setOpenCamera(false);
  };

  const resetPhotoDetails = () => {
    setPhoto();
    setLocation();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const isGrantedLocation = await checkLocationPermission();

    if (!result.canceled && isGrantedLocation) {
      setPhoto(result.assets[0]);
    }
  };

  const { latitude, longitude } = location?.coords || {};

  if (openCamera) {
    return (
      <AppCamera
        onPressTakePic={handleTakePic}
        onPressCloseCamera={_onPressCloseCamera}
        resetPhotoDetails={resetPhotoDetails}
      />
    );
  }

  return (
    <View style={styles.container}>
      {photo && (
        <Image source={photo} style={styles.photo} resizeMode="contain" />
      )}

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: MAP_REGION_DELTA,
            longitudeDelta: MAP_REGION_DELTA,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} pinColor={"purple"} />
        </MapView>
      )}
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            onPress={onPressOpenCamera}
            title="Take pic"
            style={styles.button}
          />
        </View>
        <Button title="Gallery" onPress={pickImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 35,
    justifyContent: "space-between",
  },
  buttons: {
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
  },
  button: {
    color: "red",
    marginHorizontal: 15,
  },
  photo: {
    flex: 1,
    width: "100%",
  },
  map: { flex: 1, marginVertical: 25 },
});
