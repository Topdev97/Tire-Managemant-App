import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const ImageButton = ({ onPress, imageSource, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Image source={imageSource} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
  },
});

export default ImageButton;