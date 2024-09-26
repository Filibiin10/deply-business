import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from "../../config/FirebaseConfig.js";
import { collection, getDocs, query } from 'firebase/firestore';

const Slider = () => {
  const [SliderData, setSliderData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    try {
      const q = query(collection(db, 'Slider'));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSliderData(data);
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching images:</Text>
        <Text>{error.message || 'An unexpected error occurred.'}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>#Special for you</Text>
      <FlatList
        data={SliderData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft:20,
          marginTop:-10
        }}
        renderItem={({ item }) => (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 15,
    alignItems: 'center',
    marginRight:15,
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 15,
    marginRight:15
  },
  title:{
    fontSize: 20,
    fontFamily:'outfit-bold',
    padding:20,
    marginTop:-10
  }
});

export default Slider;
