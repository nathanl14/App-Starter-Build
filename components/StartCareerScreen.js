import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Profile images
const profileImages = {
  skin1: require('../assets/skin1.png'),
  skin2: require('../assets/skin2.png'),
  skin3: require('../assets/skin3.png'),
  skin4: require('../assets/skin4.png'),
  skin5: require('../assets/skin5.png'),
};

function StartCareerScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState(68); // Default height is 5'8"
  const [uidKeeper, setUidKeeper] = useState('');
   const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track profile image
  const profileImageKeys = Object.keys(profileImages); // Get keys for navigation

  const navigation = useNavigation();
               
  useEffect(() => {
    const checkUserSession = async () => { 
      const storedUid = await AsyncStorage.getItem('userUID'); 
   
      if (storedUid) {
        setUidKeeper(storedUid);
        console.log('User UID from storage:', storedUid);   
        navigation.navigate('Production');        
      } else {       
        const user = firebase.auth().currentUser;        
        if (user) {              
          const uid = user.uid;   
          setUidKeeper(uid);     
          await AsyncStorage.setItem('userUID', uid); // Persist UID  
          console.log('User UID:', uid);      
          navigation.navigate('BottomNavigator');   
        } else {     
          console.log('No user is signed in');         
        }          
      }       
    };            
     
    checkUserSession();     
  }, []);      
  

    const handleImageNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImageKeys.length);
    } else if (direction === 'prev') {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? profileImageKeys.length - 1 : prevIndex - 1
      );
    }
  };


  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };

  const handleLastNameChange = (lastName) => {
    setLastName(lastName); 
  };
  
  const handleHeightIncrease = () => {
    if (height < 79) {
      setHeight(height + 1);
    }
  };

  const handleHeightDecrease = () => {
    if (height > 68) {
      setHeight(height - 1);
    }
  };

  const handleStartCareerPress = async () => {
    try {
      const userCredential = await firebase.auth().signInAnonymously();
      const { uid } = userCredential.user;
      // Use .update() instead of .set() to merge data without overwriting
     const selectedProfileImage = profileImageKeys[currentImageIndex];

      // Store data in Firebase
      await firebase.database().ref(`/users/${uid}/user`).update({
        firstName,
        lastName,
        profileImage: selectedProfileImage,
      });
      await AsyncStorage.setItem('userUID', uid); // Persist UID
      console.log('Anonymous sign-in UID:', uid); 
    } catch (error) { 
      alert(error.message);
    } 
  };

  const handleAnonymousLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInAnonymously();
      const { uid } = userCredential.user;  

      // Store user-specific data under /users/${uid}/user and additional data separately
      const selectedProfileImage = profileImageKeys[currentImageIndex];

      // Store data in Firebase
      await firebase.database().ref(`/users/${uid}/user`).update({
        firstName,
        lastName,
        profileImage: selectedProfileImage,
      }); 
  
firebase.database().ref(`users/${uid}/year`).set(2023) 
firebase.database().ref(`users/${uid}/week`).set(1)
firebase.database().ref(`users/${uid}/user/rating`).set(0) 
firebase.database().ref(`users/${uid}/user/improvization`).set(0)
firebase.database().ref(`users/${uid}/user/spendimprovization`).set(1)
firebase.database().ref(`users/${uid}/user/memorization`).set(0)  
firebase.database().ref(`users/${uid}/user/spendmemorization`).set(1)  
firebase.database().ref(`users/${uid}/user/voiceandspeech`).set(0)
firebase.database().ref(`users/${uid}/user/spendvoiceandspeech`).set(1)
firebase.database().ref(`users/${uid}/user/money`).set(500)
firebase.database().ref(`users/${uid}/user/experience`).set(0)
firebase.database().ref(`users/${uid}/user/age`).set(15)
firebase.database().ref(`users/${uid}/energy`).set(100)
 
firebase.database().ref(`users/${uid}/agency`).set({
  currentAgency: "",
  currentAgent:"" 
});

 

  




      await firebase.database().ref(`/users/${uid}`).update({
        email: 'anonymous',
        createdAt: new Date().toISOString(),
      }); 

      await AsyncStorage.setItem('userUID', uid); // Persist UID
      console.log('Anonymous login UID:', uid);
      navigation.navigate('BottomNavigator');
    } catch (error) {
      alert(error.message);
    }
  };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Career</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#D4AF37" // Gold placeholder color
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#D4AF37" // Gold placeholder color
          value={lastName}
          onChangeText={setLastName}
        />
        <View style={styles.heightContainer}>
          <Text style={styles.heightLabel}>Height:</Text>
          <TouchableOpacity style={styles.heightButton} onPress={() => setHeight((h) => Math.max(h - 1, 68))}>
            <Text style={styles.heightButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.heightText}>{Math.floor(height / 12)}'{height % 12}"</Text>
          <TouchableOpacity style={styles.heightButton} onPress={() => setHeight((h) => Math.min(h + 1, 79))}>
            <Text style={styles.heightButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => handleImageNavigation('prev')} style={styles.imageNavButton}>
          <Text style={styles.imageNavText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          source={profileImages[profileImageKeys[currentImageIndex]]}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => handleImageNavigation('next')} style={styles.imageNavButton}>
          <Text style={styles.imageNavText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAnonymousLogin}>
        <Text style={styles.buttonText}>Start Career</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#CCCCCC", marginTop: 10 }]}
        onPress={handleAnonymousLogin}
      >
        <Text style={[styles.buttonText, { color: "#000000" }]}>Sign in Anonymously</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Black background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37', // Gold text
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
   input: {
    height: 40,
    borderColor: '#D4AF37', // Gold border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,  
    marginBottom: 10,
    color: '#FFF', // White text
  },
  heightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heightLabel: {
    color: '#D4AF37', // Gold text
    marginRight: 10,
  },
  heightButton: {
    backgroundColor: '#D4AF37', // Gold background
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heightButtonText: {
    fontSize: 20,
    color: '#000', // Black text
  },
  heightText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF', // White text
    marginHorizontal: 10,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100, 
    borderRadius: 50,
    borderColor: '#D4AF37', // Gold border
    borderWidth: 2,
  },
  imageNavButton: {
    padding: 10,
  },
  imageNavText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37', // Gold text
  },
  button: {
    backgroundColor: '#D4AF37', // Gold background
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#000', // Black text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartCareerScreen;
