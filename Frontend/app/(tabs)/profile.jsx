import { View, Text , StyleSheet, Image } from 'react-native'
import React from 'react'
import LogoutButton from '../../components/Authentication/LogoutButton';
import { useUser} from '@clerk/clerk-expo';
export default function profile() {
  const {user} = useUser();
  console.log(user.imageUrl)
  return (
    <View style={styles.container}>
      <Image 
        source={{uri:user?.imageUrl}}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: '#fff',
          overflow: 'hidden',

          aspectRatio: 1,
          resizeMode: 'cover',
          padding: 10,

          // Center the image horizontally and vertically
          justifyContent: 'center',
          alignItems: 'center',

          // Add a shadow effect to the image
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3,

          // Add a border radius to the image
          borderRadius: 99,

          // Add a border to the image
          borderWidth: 2,
        }}
      />
      <Text style={styles.title}>{user?.fullName}!
      </Text>
      <LogoutButton /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily:'outfit-medium',
  },
});

