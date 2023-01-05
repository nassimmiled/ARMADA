import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export const CameraButton = memo(({ onPress, isDisabled }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.button} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
