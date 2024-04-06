import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';


export default function CameraImage( {photoAttach, item} ) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoFileUri, setPhotoFileUri] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  // check *this* component has access to test version of photoAttach that logs function calls  
  //photoAttach("from default function CameraImage " + item.key);
  if (hasPermission === null) {
    return <View />;
  } 
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {!photoFileUri && !item.photoUri ? 
      <Camera style={styles.camera} type={type} ref={ref => { this.camera = ref; }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("flip pressed");
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={
              async () => {
              console.log("photo pressed"); 
              if (this.camera) {
                let photo = await this.camera.takePictureAsync();
                setPhotoFileUri(photo.uri);
                // on web photo URI is data URI but on Android is file URI (path to file)
                console.log("photo taken", photo.uri.substring(0,50)+"...");
                // check *this* component has access to test version of photoAttach that logs function calls  
                // photoAttach("after photo taken "+item.key+photo.uri.substring(0,50)+"...");
                photoAttach(item.key,photo.uri);
              }
            }}> 
            <Text style={styles.text}>Photo</Text>
          </TouchableOpacity>
          </View>
      </Camera>
      :
      <View style={styles.container}>
        <Image source={{ uri:photoFileUri }} style={styles.container}/>
      </View>
      }
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
  text: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'black'
  },
});
