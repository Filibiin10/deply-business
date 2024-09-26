import { View, Text, StyleSheet, FlatList ,TouchableOpacity, Image} from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Colors } from '../../constants/Colors';
import { db } from "../../config/FirebaseConfig.js";
import { collection, getDocs, query } from 'firebase/firestore';
import CategoryList from './CategoryList.jsx';

export default function Categories() {
    const [Categorylist , setCategoryList] = useState([]);

    useEffect(()=>{
        getCategory();
    },[])

    const getCategory = async() => {
        try {
        setCategoryList([]);
        const q=query(collection(db,'category'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id:doc.id,
           ...doc.data(),
        }));
        setCategoryList(data);
    }catch(error){
        console.log('Error fetching data',error);
    }
    }

  return (
    <View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        }}>
      <Text style={{
         fontSize: 20,
         fontFamily:'outfit-bold',
         padding:20
      }}>Category Lists</Text>
        <Text style={{
            color:Colors.PRIMARY,
            fontSize:16,
            fontFamily:'outfit',
            marginRight:7
        }}>View All</Text>
      </View>
      <FlatList
        data={Categorylist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft:20,
          marginTop:-10
        }}
        renderItem={({ item }) => (
            <CategoryList Category={item}/>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
})