import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Asset() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(4.5); // example rating

  const goToRealEstate = () => {
    navigation.navigate('Realestate');
  };

  const gotoallshoppingstuff = () => {
    navigation.navigate('Allshoppingstuff');
  };
  const gotToBank = () => {
    navigation.navigate('Bank');
  };
  const gotodriverslicense = () => {
    navigation.navigate('Driverslicense');
  };
   const gotoownedhouse = () => {
    navigation.navigate('Ownedhomes');
  };

   const goToCars = () => {
    navigation.navigate('Cars');
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity >
          <Text style={styles.header}>Assets</Text>
    </TouchableOpacity>
  
      <View style={styles.ratingContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={gotoownedhouse}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Owned Real Estate</Text>
      </TouchableOpacity>

 <TouchableOpacity
        style={styles.button}
        onPress={goToCars}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Owned Vehicles</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={gotoallshoppingstuff}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Shopping</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={gotToBank}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Bank Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={gotodriverslicense}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Me</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
        backgroundColor: 'gold',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    width: '100%', // Set width to 100% to make buttons wider
    marginBottom: 16, // Add margin bottom for spacing between buttons
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
 
  
});
