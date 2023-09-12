import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { globalStyles } from '../../../styles/global';

export default function CameraPage() {
  const cameraRef = useRef<Camera>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View style={globalStyles.mainContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
    }
  };

  return (
    <View style={globalStyles.fullContainer}>
      {photo ? (
        <View style={globalStyles.mainContainer}>
          <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
            You snapped it! come back latter for the next photo.
          </Text>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <Camera style={styles.camera} type={'back' as CameraType} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button onPress={takePicture}>Take photo</Button>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
});
