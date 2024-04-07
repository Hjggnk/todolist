import React, { useState } from "react";
import styled from "styled-components/native";
import { View, StatusBar, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Empty from "../Components/Empty";
import Header from "../Components/Header";

export default function EditInput({ item, setModalvisible }) {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <ComponentContainer>
       <View>
          <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
        </View>
         
        <View> 
          <FlatList
          
            ListHeaderComponent={() => <Header />}
            ListEmptyComponent={() => <Empty />}
           
          />
          <View>
      <EditContainer>   
      <InputContainer>
        <Input placeholder="Edit Task..." onChangeText={onChangeText} />
      </InputContainer>
      <SubmitButton
        onPress={() => {
          item.value= value;
          setModalvisible(false);
        }}
      >
        <AntDesign name="edit" size={24} color="midnightblue" />
      </SubmitButton>
      </EditContainer>
       </View>
       </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: #8a2be2;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const EditContainer = styled.View`
  flex-direction: row;
`;
const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-family: poppins-regular;
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 20px;
  border-radius: 50px;
`;
