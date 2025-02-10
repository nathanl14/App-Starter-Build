import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import database from '../firebase';


export default function Asset() {
  const [rating, setRating] = useState(null); // State for storing the rating fetched from database


  useEffect(() => {
    // Fetch rating data from the database
    const dbRef = database.ref('user/rating');
    dbRef.once('value', (snapshot) => {
      const ratingData = snapshot.val();
      const { yo } = ratingData;
      
      setRating(snapshot.val());
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asset Title</Text>
      {rating !== null && 
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
  },
  ratingLabel: {
    fontSize: 16,
  },
});
