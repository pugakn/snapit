import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function CameraPage() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.preview}>
          <Text style={styles.previewText}>Photo taken!</Text>
        </View>
      ) : (
        <Camera style={styles.camera} type={'back' as CameraType} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={takePicture}>
              Take photo
            </Button>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
