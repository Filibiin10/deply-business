import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryList({ Category }) {

    const handlePress = (category) => {
        console.log(category);
    }

  return (
    <TouchableOpacity 
    onPress={()=> handlePress(Category)}
    >
      <View style={{
        padding:10,
        marginRight:15,
        backgroundColor:'#FFCCCB',
        borderRadius:99
      }}>
        <Image source={{ uri: Category.imageUrl }} style={styles.image} />
      </View>
      <Text style={styles.title}>{Category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: "outfit-medium",
    textAlign:'center'
  },
});
