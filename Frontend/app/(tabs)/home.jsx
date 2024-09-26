import { View, Text } from 'react-native'
import React from 'react'
import Slider from "../../components/Home/Slider"
import Header from '../../components/Home/Header'
import Categories from '../../components/Home/Categories'
export default function home() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#F9F9F9'
    }} >
      <Header/>
      <Slider />
      <Categories/>
    </View>
  )
}