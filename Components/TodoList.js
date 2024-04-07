import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import CameraImage from './CameraImage';
import ImageViewer from './ImageViewer';
import EditInput from './EditInput';
  
export default function TodoList({ item, deleteItem, photoAttach }) {
  // check *this* component has access to test version of photoAttach that logs function calls  
  // photoAttach("from export default function TodoList" + JSON.stringify(item));
  const [modalVisibleCameraImage, setModalVisibleCameraImage] = useState(false);
  const [modalVisibleImageViewer, setModalVisibleImageViewer] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  
  return (
    <ComponentContainer>
      <ListContainer>
        <CirlceContainer>
          <Entypo name="circle" size={20} color="midnightblue" />
        </CirlceContainer>
        <View>
          <Modal 
            transparent={false}
            visible={modalVisibleCameraImage}
            onRequestClose={() => {
              console.log('Modal has been closed.');
              setModalVisibleCameraImage(!modalVisibleCameraImage);
            }}>
            <CameraImage photoAttach={photoAttach} item={item} setModalvisible={setModalVisibleCameraImage}/> 
          </Modal> 
          <Modal
            transparent={false}
            visible={modalVisibleImageViewer}
            onRequestClose={() => {
              console.log('Modal has been closed.');
              setModalVisibleImageViewer(!modalVisibleImageViewer);
            }}>
            <ImageViewer item={item} setModalvisible={setModalVisibleImageViewer}/> 
          </Modal> 
          <Modal
            transparent={false}
            visible={modalVisibleEdit}
            onRequestClose={() => {
              console.log('Modal has been closed.');
              setModalVisibleEdit(!modalVisibleEdit);
            }}>
            <EditInput item={item} setModalvisible={setModalVisibleEdit}/> 
          </Modal>            
          <TextItem>
            {item.value}
            {item.location ? (
              <Text>
                {'\n'}
                {item.location.coords.latitude.toFixed(3)},&nbsp;
                {item.location.coords.longitude.toFixed(3)}
              </Text>
            ) : (
              <Text>{'\n'}Not located</Text>
            )}
          </TextItem>
          <TextDate> Task</TextDate>
        </View>
        <IconContainer>
          <MaterialIcons
            name="edit"
            size={24}
            color="midnightblue"
            onPress={() => {console.log('edit clicked', item.key)
            setModalVisibleEdit(!modalVisibleEdit); } }
          />
          <MaterialIcons
            name="photo"
            size={24}
            color="midnightblue"
            onPress={() => {
              setModalVisibleImageViewer(!modalVisibleImageViewer);
              console.log(item.key);
            }}
          />
          <MaterialIcons
            name="photo-camera"
            size={24}
            color="midnightblue"
            onPress={() => {
              setModalVisibleCameraImage(!modalVisibleCameraImage);
              console.log(item.key);
            }}
          />
          <MaterialIcons
            name="delete"
            size={24}
            color="red"
            onPress={() => deleteItem(item.key)}
          />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  );
}

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
  font-family: poppins-regular;
`;

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;

  font-family: poppins-regular;
  border-radius: 10px;
  width: 40px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;

  height: 40px;

  border-radius: 10px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;
