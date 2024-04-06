import React from "react";
import styled from "styled-components/native";

export default function Empty() {
  return (
    <ComponentContainer>
      <EmptyImage
        source={require("../assets/images/bg.png")}
      />
      <EmptyText>Charles</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 650px;
`;

const EmptyImage = styled.Image`
  width: 350px;
  height: 500px;
`;

const EmptyText = styled.Text`
  color: white;
  font-family: poppins-bold;
  margin-top: 30px;
  font-size: 30px;
`;
