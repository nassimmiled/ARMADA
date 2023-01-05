import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { Camera } from "expo-camera";

import { CameraButton } from "./buttons/CameraButton";
import { checkLocationPermission } from "../utils";

export const AppCamera = ({
  onPressTakePic,
  onPressCloseCamera,
  resetPhotoDetails,
}) => {
  const cameraRef = useRef(null);
  const [isPressedPic, setIsPressedPic] = useState(false);

  const onPressCameraButton = async () => {
    setIsPressedPic(true);

    const isGrantedLocation = await checkLocationPermission();

    if (isGrantedLocation) {
      resetPhotoDetails();
      const photo = await cameraRef.current.takePictureAsync();
      onPressTakePic(photo);
    }
    setIsPressedPic(false);
  };

  return (
    <Camera
      style={styles.camera}
      type={Camera.Constants.Type.back}
      ref={cameraRef}
    >
      <TouchableOpacity style={styles.closeCamera} onPress={onPressCloseCamera}>
        <Text>X</Text>
      </TouchableOpacity>
      <View style={styles.cameraActions}>
        <CameraButton onPress={onPressCameraButton} isDisabled={isPressedPic} />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraActions: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  closeCamera: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 50,
    marginTop: 50,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Camera;
