import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// https://react-native-async-storage.github.io/async-storage/docs/usage#importing
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ImageViewer({ item, setModalvisible }) {
  const [retrievedPhotoUri, setRetrievedPhotoUri] = useState('');
  console.log('item.photoUri immediate value', item.photoUri);

  const getImage = async (key) => {
    console.log('getImage called for ', key);
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        console.log(
          'getImage key ',
          key,
          'retrieved string length ',
          value.length
        );
        setRetrievedPhotoUri(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log('getImage failure');
      console.log(e);
      return e;
    }
  };
  //{image = async () => {return await getImage(item.photoUri) }}
  //setPhotoUri(async () => {return await getImage(item.photoUri) });
  const retrievedImage = async (key) => {
    console.log('about to call getImage called for ', key);
    return await getImage(key);
  };
  console.log(retrievedImage(item.photoUri));
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {retrievedPhotoUri ? (
          <Image source={{ uri: retrievedPhotoUri }} style={styles.container} />
        ) : (
          <Text>Still loading from {item.photoUri}</Text>
        )}
      </View>
      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            setModalvisible(false);
          }}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
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
  backContainer: {
    //flex: 1,
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
    backgroundColor: 'black',
  },
});
