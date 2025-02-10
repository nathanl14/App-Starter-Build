import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  Button,
  View,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import database from './firebase';
import firebase from 'firebase';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeagueData from './components/LeagueData';
import Dashboard from './components/Dashboard';
import Phone from './components/Phone';  
import Chrome from './components/Chrome';
import { atom, useAtom } from 'jotai';
import { skinatom } from './components/Character';
import { energyAtom } from './components/Training';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const genderAtom = atom('M');
export const yearAtom = atom(2023);
        
  const profileImages = {
  skin1: require('./assets/skin1.png'),
  skin2: require('./assets/skin2.png'),
  skin3: require('./assets/skin3.png'), 
  skin4: require('./assets/skin4.png'),
  skin5: require('./assets/skin5.png'),
};      
function Home() {    
  const [level, setLevel] = useState('F');
  const [week, setWeek] = useState(1);
  const [year, setYear] = useAtom(yearAtom);
  const [rating, setRating] = useState(0);     
  const [money, setMoney] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  const [playercreated, setPlayercreated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for controlling the modal
  const [movies, setMovies] = useState([]); 
  const [finishedMovies, setFinishedMovies] = useState([]);     
    const [childModalVisible, setChildModalVisible] = useState(false);
  const [newChild, setNewChild] = useState(null);
  const [jobEnergy, setJobEnergy] = useState(0);
      
  const [firstName, setFirstName] = useState('');   
  const [lastName, setLastName] = useState('');  

  

  const [uidKeeper, setUidKeeper] = useState('');

     
const user = firebase.auth().currentUser;
     




useEffect(() => {
  const checkUserSession = async () => {
    try {
      const storedUid = await AsyncStorage.getItem('userUID');
      if (storedUid) {
        setUidKeeper(storedUid);
        console.log('User UID from storage on Home Screen:', storedUid);
      } else {
        console.log('Error: No UID found');
      }
    } catch (error) {
      console.error('Error retrieving UID: ', error);
    }
  };

  checkUserSession();
}, []);

useEffect(() => {
  if (!uidKeeper) return; // Wait until uidKeeper is set

  const dbNameRef = database.ref(`users/${uidKeeper}/user/firstName`);
  dbNameRef.once('value').then((snapshot) => {
    const firstNameSnap = snapshot.val();
    setFirstName(firstNameSnap);
  }).catch((error) => {
    console.error('Error fetching first name: ', error);
  });

  const dbNameRefLast = database.ref(`users/${uidKeeper}/user/lastName`);
  dbNameRefLast.once('value').then((snapshot) => {
    const lastNameSnap = snapshot.val();
    setLastName(lastNameSnap);
  }).catch((error) => {
    console.error('Error fetching last name: ', error);
  });
  
}, [uidKeeper]);    
 
 
  


const [isChallengeModalVisible, setChallengeModalVisible] = useState(false);
  const [selectedActor, setSelectedActor] = useState(null);
 
  const openChallengeModal = (actor) => {
    setSelectedActor(actor);
    setChallengeModalVisible(true);
  };

  const closeChallengeModal = () => {
    setChallengeModalVisible(false);
    setSelectedActor(null);
  };

  // Challenge constants for Will Smith
  const willSmithChallenges = [
    { id: 1, text: "Make headlines by slapping someone during the Oscars ceremony.", completed: true },
    { id: 2, text: "Collaborate on-screen with one of your children in a major film project.", completed: false },
    { id: 3, text: "Receive a nomination for an Academy Award (Oscar).", completed: false },
    { id: 4, text: "Achieve global superstar status with widespread recognition and influence.", completed: true },
    { id: 5, text: "Enter into a high-profile marriage with a fellow celebrity.", completed: false },
    { id: 6, text: "Publicly declare and discuss an open relationship, making it a topic of public conversation.", completed: false },
    { id: 7, text: "Amass a following of over 50 million on Instagram, showcasing your widespread social media influence.", completed: true },
  ];

  // Challenge constants for Zendaya
  const zendayaChallenges = [  
    { id: 1, text: "Star in a popular Disney Channel television show, establishing yourself as a household name for younger audiences.", completed: true },
        { id: 3, text: "Engage in a romantic relationship with a co-star, making headlines and public appearances as a couple.", completed: false },
      
    { id: 2, text: "Secure a prominent role in a Marvel Cinematic Universe film, adding to your list of high-profile acting credits.", completed: true },
    { id: 4, text: "Lead a critically acclaimed drama series, showcasing your versatility and depth as an actress.", completed: false },
    { id: 5, text: "Grow your Instagram following to over 150 million, reflecting your extensive reach and influence on social media.", completed: false },
    { id: 6, text: "Star in a sports-themed film, taking on a role that challenges your acting range and introduces you to new audiences.", completed: true },
  ];

  const challenges = selectedActor === 'Will Smith' ? willSmithChallenges : zendayaChallenges;

  useEffect(() => {
    // Fetch the children data from the database and find the child with age < 0
    database.ref(`users/${uidKeeper}/children`).once('value', (snapshot) => {
      const childrenData = snapshot.val();
      let selectedChild = null;

      if (childrenData) {
        Object.keys(childrenData).forEach(key => {
          if (childrenData[key].age == 0) {
            selectedChild = childrenData[key];
          }
        });
      }
  
      if (selectedChild) {
        setNewChild(selectedChild);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    const finishedMoviesRef = database.ref(`users/${uidKeeper}/finishedmovies`);
    
    finishedMoviesRef.once('value', (snapshot) => {
      const moviesData = snapshot.val();

      if (moviesData) {
        const moviesArray = Object.values(moviesData);
        setFinishedMovies(moviesArray);
      }
    });
  }, [uidKeeper]);

  useEffect(() => {
    // Fetch movie data from the database

    const dbRef = database.ref(`users/${uidKeeper}/movies`);
    dbRef.once('value', (snapshot) => {
      const movieData = snapshot.val();
      if (movieData) {
        const movieArray = Object.values(movieData);
        setMovies(movieArray);
      }
    });
  }, []);
  const [skin, setSkin] = useAtom(skinatom);
  const [skinIndex, setSkinIndex] = useState(0);
  const [age, setAge] = useState(0); 
  const [experience, setExperience] = useState(0);  

  const [gender, setGender] = useAtom(genderAtom);

  const [yearlyEnergy, setYearlyEnergy] = useState(100);
    const [weeklyPay, setWeeklyPay] = useState(0);

 
  const [energy, setEnergy] = useAtom(energyAtom);

  const [textName, setTextname] = useState('');

  const [items, setItems] = useState([]);
 
  const handleTextInputChange = (text) => { 
    setTextname(text); 
  };

  const saveTextInputToDatabase = () => {};

  const navigation = useNavigation();                                              

  const weeknavigate = () => {};

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const CELEB_LEVELS = {
    F: 'F List',
    D: 'D List',
    'D+': 'D+ List',
    C: 'C List',
    'C+': 'C+ List',  
    B: 'B List',
    'B+': 'B+ List',
    A: 'A List',
    'A+': 'A+ List',    
  };

  const navtojobscreen = () => {
    navigation.navigate('Jobs');
  };

  useEffect(() => {
    const ratingRef = database.ref(`users/${uidKeeper}/user/rating`);
    ratingRef.once('value', (snapshot) => {
      const ratingsnapshot = snapshot.val();
      setRating(ratingsnapshot);
    });

    
  }, [uidKeeper]);

 useEffect(() => {
    const energyRef = database.ref(`users/${uidKeeper}/energy`);
    energyRef.once('value', (snapshot) => {
      const energySnapshot = snapshot.val();
      setEnergy(energySnapshot);
    });

    
  }, [uidKeeper]);


    useEffect(() => {
    let ref;
    if (uidKeeper) {
      ref = database.ref(`users/${uidKeeper}/appliedJob`);
      
      // Set up a real-time listener
      const listener = ref.on('value', (snapshot) => {
        const appliedJob = snapshot.val();
        if (appliedJob && appliedJob.weeklyPay) {
          setWeeklyPay(appliedJob.weeklyPay);
        } else {
          console.warn('No applied job or weeklyPay found.');
          setWeeklyPay(null); // Reset weeklyPay if no data found
        }
      });   

      // Clean up the listener when the component unmounts or uidKeeper changes
      return () => {
        ref.off('value', listener);
      };
    }
  }, [uidKeeper]);

 

  const [profileImageKey, setProfileImageKey] = useState(null);  

useEffect(() => {
  // Fetch the profile image key (e.g., "skin1") from the database
  const profileImageRef = database.ref(`users/${uidKeeper}/user/profileImage`);
  profileImageRef
    .once('value')
    .then((snapshot) => {
      const imageKey = snapshot.val(); // Example: "skin1"
      if (imageKey) {
        setProfileImageKey(imageKey);
      }
    })
    .catch((error) => {
      console.error('Error fetching profile image: ', error);
    });

  return () => {
    profileImageRef.off('value');
  };
}, [uidKeeper]);

  
  useEffect(() => {
database.ref(`users/${uidKeeper}/colleges`).once('value', (snapshot) => {
      const colleges = snapshot.val();
      if (colleges) {
        Object.values(colleges).forEach((program) => {
         program.credits+1 
  
         database.ref(`users/${uidKeeper}/colleges`).child(program.id).update({
                credit:program.credits     
              });
        }); 
      }
    });  }, []);





  useEffect(() => {
    if (week === 51) {
      navigation.navigate('Stuff');
      database.ref(`users/${uidKeeper}/finishedmovies`).once('value', (snapshot) => {
        const movies = snapshot.val();
        if (movies) {
          Object.values(movies).forEach((movie) => {
            if (movie.movierating >= 90) {
              movie.award += 'Best Actor';
            }

            database.ref(`users/${uidKeeper}/finishedmovies`).child(movie.id).update({
              award: movie.award,
            });
          }); 
        }
      });
    }

    const playercreatedref = database.ref(`users/${uidKeeper}/playercreated`);
    playercreatedref.once('value', (snapshot1) => {
      setPlayercreated(snapshot1.val());
    });

    

    const weekRef = database.ref(`users/${uidKeeper}/week`);
    weekRef.on('value', (snapshot) => {
      setWeek(snapshot.val());
      setIsLoading(false); // Set isLoading to false when data is loaded
    });

    const nameref3 = database.ref(`users/${uidKeeper}/user/name`);
    nameref3.on('value', (snapshot) => {
      setTextname(snapshot.val());
    });
    // Rest of the code...
  }, [uidKeeper]);

  useEffect(() => {
    const moneyRef = database.ref(`users/${uidKeeper}/user/money`);
    moneyRef.on('value', (snapshot) => {
      setMoney(snapshot.val());
    });

    const ageRef = database.ref(`users/${uidKeeper}/user/age`);
    ageRef.on('value', (snapshot) => {  
      setAge(snapshot.val()); 
    });

    const playercreatedRef = database.ref('playercreated');
    playercreatedRef.on('value', (snapshot) => {
      const isPlayerCreated = snapshot.val(); 
      setPlayercreated(isPlayerCreated);

     
    });

    // ...

    return () => {  
      playercreatedRef.off('value');
    };
  }, [uidKeeper]); 

  if (week > 52) {
    setYear(year + 1);
    setWeek(week - 52);
    setAge(age + 1);
    setExperience(experience + 1);
    database
      .ref(`users/${uidKeeper}/user/age`)
      .set(age)
      .then(() => {
        console.log('Money updated successfully');
      });

       database
      .ref(`users/${uidKeeper}/user/experience`)
      .set(experience)
      .then(() => {
        console.log('Experience updated successfully');
      });
  }

const nextweek = async () => { 
  try {
    // Step 1: Update the week in state
    setWeek((prevWeek) => prevWeek + 1);

    // Step 2: Update the week in the database
    await database.ref(`users/${uidKeeper}/week`).set(week + 1);

    // Step 3: Advance week-related logic (if any additional logic needs to run)
    handleAdvanceWeek();

    // Step 4: Reset energy to yearlyEnergy in state and database
    setEnergy(yearlyEnergy);  
    await database.ref(`users/${uidKeeper}/energy`).set(yearlyEnergy);
  
    // Step 5: Fetch spend energy and deduct from yearly energy
    const spendEnergySnapshot = await database
      .ref(`users/${uidKeeper}/appliedJob/spendenergy`)
      .once('value'); 
    const spendEnergy = spendEnergySnapshot.val(); 

    if (spendEnergy !== null) {     
      // Step 5.1: Calculate the new energy value
      const updatedEnergy = yearlyEnergy - spendEnergy;
      await database.ref(`users/${uidKeeper}/energy`).set(updatedEnergy);
      setEnergy(updatedEnergy); // Update local state with new energy
    } else {
      console.error('Spend energy not found for the applied job.');
    }

    // Step 6: Fetch weeklyPay from the applied job in the database
    if (uidKeeper) {
      const appliedJobSnapshot = await database
        .ref(`users/${uidKeeper}/appliedJob`)
        .once('value');
      const appliedJob = appliedJobSnapshot.val();
      if (appliedJob && appliedJob.weeklyPay) {
        setWeeklyPay(appliedJob.weeklyPay);
      } else {
        console.warn('No applied job or weeklyPay found.');
      }
    }

    // Step 7: Update money and save to the database
    const updatedMoney = money + weeklyPay;    
    setMoney(updatedMoney);   
    await database.ref(`users/${uidKeeper}/user/money`).set(updatedMoney);

    // Step 8: Navigate to the "Week" screen
    navigation.navigate('Week');

  } catch (error) {
    console.error('Error during next week transition:', error);
    alert('Something went wrong. Please try again.');
  }
};



 


  const handleAdvanceWeek = () => {
  const moviesReffinished = database.ref(`users/${uidKeeper}/finishedmovies`);
  moviesReffinished.once('value', (snapshot) => {
    const movies = snapshot.val();

    if (movies) {
      Object.values(movies).forEach((movie) => {

        const maxsyndication = (((movie.season1avgviewers) / 1000000 + movie.imbdrating) * 4.6) * 1000000;
        const minsyndication = maxsyndication * 0.5;

        const rand1 = minsyndication + Math.random() * (maxsyndication - minsyndication);
        const rand2 = minsyndication + Math.random() * (maxsyndication - minsyndication);
        const rand3 = minsyndication + Math.random() * (maxsyndication - minsyndication);
        const rand4 = minsyndication + Math.random() * (maxsyndication - minsyndication);
        const rand5 = minsyndication + Math.random() * (maxsyndication - minsyndication);

        const randomValue = Math.floor(Math.random() * 5) + 1;

        if (randomValue === 1) {
          movie.syndication += "Netflix";
          database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}`).update({
            annualSyndication: rand1
          });
        }

        database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1`).update({
          annualSyndication: rand1
        });

        if (movie.season1) {
          movie.season1.forEach((episode) => {
            movie.season1avgviewers = (episode.episode1Views + episode.episode2Views + episode.episode3Views + episode.episode4Views + episode.episode5Views + episode.episode6Views + episode.episode7Views + episode.episode8Views + episode.episode9Views + episode.episode10Views + episode.episode11Views + episode.episode12Views + episode.episode13Views + episode.episode14Views + episode.episode15Views + episode.episode16Views + episode.episode17Views + episode.episode18Views + episode.episode19Views + episode.episode20Views + episode.episode21Views + episode.episode22Views + episode.episode23Views + episode.episode24Views) / 24;
          });

          database.ref(`users/${uidKeeper}/finishedmovies`).child(movie.id).update({
            season1avgviewers: movie.season1avgviewers,
          });

          movie.maxsyndication = (((movie.season1avgviewers) / 1000000 + movie.imbdrating) * 4.6) * 1000000;

          database.ref(`users/${uidKeeper}/finishedmovies`).child(movie.id).update({
            annualsyndication: movie.annualsyndication,
          });
        }

        if (movie.episodeWeekTracker < 24) {
          movie.episodeWeekTracker += 1;
          database.ref(`users/${uidKeeper}/finishedmovies`).child(movie.id).update({
            episodeWeekTracker: movie.episodeWeekTracker,
          });
          if (movie.season1) {
            // Update episode1Views for each episode in season1
            movie.season1.forEach((episode) => {
              if (movie.popularity > 60) {
                if (movie.episodeWeekTracker === 1) {
                  episode.episode1Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode1Views`).set(episode.episode1Views)
                    .then(() => {
                      console.log('Episode1Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 2) {
                  episode.episode2Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode2Views`).set(episode.episode2Views)
                    .then(() => {
                      console.log('Episode2Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 3) {
                  episode.episode3Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode3Views`).set(episode.episode3Views)
                    .then(() => {
                      console.log('Episode3Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 4) {
                  episode.episode4Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode4Views`).set(episode.episode4Views)
                    .then(() => {
                      console.log('Episode4Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 5) {
                  episode.episode5Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode5Views`).set(episode.episode5Views)
                    .then(() => {
                      console.log('Episode5Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 6) {
                  episode.episode6Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode6Views`).set(episode.episode6Views)
                    .then(() => {
                      console.log('Episode6Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 7) {
                  episode.episode7Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode7Views`).set(episode.episode7Views)
                    .then(() => {
                      console.log('Episode7Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 8) {
                  episode.episode8Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode8Views`).set(episode.episode8Views)
                    .then(() => {
                      console.log('Episode8Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 9) {
                  episode.episode9Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode9Views`).set(episode.episode9Views)
                    .then(() => {
                      console.log('Episode9Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 10) {
                  episode.episode10Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode10Views`).set(episode.episode10Views)
                    .then(() => {
                      console.log('Episode10Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 11) {
                  episode.episode11Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode11Views`).set(episode.episode11Views)
                    .then(() => {
                      console.log('Episode11Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 12) {
                  episode.episode12Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode12Views`).set(episode.episode12Views)
                    .then(() => {
                      console.log('Episode12Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 13) {
                  episode.episode13Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode13Views`).set(episode.episode13Views)
                    .then(() => {
                      console.log('Episode13Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 14) {
                  episode.episode14Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode14Views`).set(episode.episode14Views)
                    .then(() => {
                      console.log('Episode14Views updated successfully');
                    });
                }
                 if (movie.episodeWeekTracker === 15) {
                  episode.episode15Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode15Views`).set(episode.episode15Views)
                    .then(() => {
                      console.log('Episode15Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 16) {
                  episode.episode16Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode16Views`).set(episode.episode16Views)
                    .then(() => {
                      console.log('Episode16Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 17) {
                  episode.episode17Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode17Views`).set(episode.episode17Views)
                    .then(() => {
                      console.log('Episode17Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 18) {
                  episode.episode18Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode18Views`).set(episode.episode18Views)
                    .then(() => {
                      console.log('Episode18Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 19) {
                  episode.episode19Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode19Views`).set(episode.episode19Views)
                    .then(() => {
                      console.log('Episode19Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 20) {
                  episode.episode20Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode20Views`).set(episode.episode20Views)
                    .then(() => {
                      console.log('Episode20Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 21) {
                  episode.episode21Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode21Views`).set(episode.episode21Views)
                    .then(() => {
                      console.log('Episode21Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 22) {
                  episode.episode22Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode22Views`).set(episode.episode22Views)
                    .then(() => {
                      console.log('Episode22Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 23) {
                  episode.episode23Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode23Views`).set(episode.episode23Views)
                    .then(() => {
                      console.log('Episode23Views updated successfully');
                    });
                }
                if (movie.episodeWeekTracker === 24) {
                  episode.episode24Views += Math.floor(Math.random() * 6000000) + 10000000;
                  database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}/season1/0/episode24Views`).set(episode.episode24Views)
                    .then(() => {
                      console.log('Episode24Views updated successfully');
                    });
                }
              
          

              }
            });
          }

        }
        });
      }
    });
    const handleAdvanceWeek = () => {
  database.ref(`users/${uidKeeper}/movies`).once('value', (snapshot) => {
    const movies = snapshot.val();

    if (movies) {
      Object.values(movies).forEach((movie) => {
        if (movie.weeksUntilRelease > 0) {
          movie.weeksUntilRelease--;
        }

        if (movie.weeksUntilaudition > 0) {
          movie.weeksUntilaudition--;

          database.ref(`users/${uidKeeper}/movies/${movie.id}`).update({
            weeksUntilaudition: movie.weeksUntilaudition,
          });
        }

        if (movie.auditionchance > 0) {
          if (movie.weeksUntilaudition === 0) {
            // Remove auditionchance for the movie
            database.ref(`users/${uidKeeper}/movies/${movie.id}`).update({
              auditionchance: 0,
            });

            const weeks = Math.floor(Math.random() * 10) + 8;
            movie.weeksUntilRelease = weeks;

            // Update the database with the new weeksUntilRelease value
            database.ref(`users/${uidKeeper}/movies/${movie.id}`).update({
              weeksUntilRelease: weeks,
            });
          }
        }

        if (movie.auditionchance === 0) {
          database.ref(`users/${uidKeeper}/movies/${movie.id}`).update({
            weeksUntilRelease: movie.weeksUntilRelease,
          });

          if (movie.weeksUntilRelease === 0) {
            const moviesRef1 = database.ref(`users/${uidKeeper}/movies`);

            // Calculate new money value based on movie salary
            const newMoney = money + movie.salary;

            // Update the 'users/${uidKeeper}/money' node in the database
            database
              .ref(`users/${uidKeeper}/money`)
              .set(newMoney)
              .then(() => {
                console.log('Money updated successfully');
              })
              .catch((error) => {
                console.error('Error updating money:', error);
              });

            database
              .ref(`users/${uidKeeper}/movies/${movie.id}`)
              .once('value', (snapshot) => {
                const movieData = snapshot.val();
                database.ref(`users/${uidKeeper}/movies/${movie.id}`).remove();
              });

            const ratingRef = database.ref(`users/${uidKeeper}/rating`);
            ratingRef.once('value', (snapshot) => {
              const rating = snapshot.val();

              const imbdratingmin =
                (movie.movierating + rating + movie.popularity) / 20 - 6.5;  
              const imbdratingmax =
                (movie.movierating + rating + movie.popularity) / 20 - 4.85;
              movie.imbdrating =
                Math.random() * (imbdratingmax - imbdratingmin) +
                imbdratingmin;

              database.ref(`users/${uidKeeper}/finishedmovies/${movie.id}`).update({
                movierating: movie.movierating,
                imbdrating: movie.imbdrating,  
                id: movie.id,   
                title: movie.title,
                genre: movie.genre,
                bio: movie.bio,
                section: movie.section,  
                directing: movie.directing,
                inprogress: movie.inprogress,
                salary: movie.salary,
                popularity: movie.popularity,
                metascore: movie.metascore,
                marvelblockbuster: movie.marvelblockbuster,
                imbdstars1: movie.imbdstars1,
                typeoffilm: movie.typeoffilm,
                budget: movie.budget,
                weeksUntilaudition: movie.weeksUntilaudition,
                year: movie.year,
                award: movie.award,
                episodeWeekTracker: movie.episodeWeekTracker,
                season1: movie.season1,
                season1athing: movie.season1athing,
                syndication: movie.syndication,
                season1avgviewers: movie.season1avgviewers,
              });

              Alert.alert('Success', `${movie.title} has been released.`, [
                { text: 'OK' },
              ]);
            });

            const moviesRef = database.ref(`users/${uidKeeper}/movies`);
            moviesRef.once('value', (snapshot) => {
              if (!snapshot.exists()) {
                // If no movies exist, add a placeholder value to ensure the "movies" section remains
                moviesRef.set(true);
              }
            });
          }
        } else {
          database.ref(`users/${uidKeeper}/movies/${movie.id}`).update({
            weeksUntilRelease: movie.weeksUntilRelease,
          });
        }
      });
    }
  });
};

  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  function playermodal() {
    setModalVisible(true);
  }

  const skinImages = [
    require('./assets/skin1.png'),
    require('./assets/skin2.png'),
    require('./assets/skin3.png'),
    require('./assets/skin4.png'),
    require('./assets/skin5.png'),
  ];

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.nameheader} onPress={() => openChallengeModal('Will Smith')}>
          <Text style={styles.nameheadertext}>{firstName} {lastName}</Text>   
        </TouchableOpacity>
      </View>
      <View>     
        <View style={styles.firstbigcontainer}>
          <View style={styles.circle}>
              {profileImageKey && profileImages[profileImageKey] ? (
      <Image source={profileImages[profileImageKey]} style={styles.image3} />
    ) : (
      <Text>Loading...</Text> // Fallback text
    )}
          </View>
 
          <View style={styles.row}> 
            <View style={styles.boxes}>
              {<Text style={styles.actualage}>{age}</Text>}
              <Text style={styles.bottomtext}>Years Old</Text> 
            </View>

            <View style={styles.boxes}>
              {<Text style={styles.actualage}>{experience} Years</Text>}
              <Text style={styles.bottomtext}>Experience</Text>
            </View>

            <View style={styles.boxes}>
              {<Text style={styles.actualage}>${money}</Text>}

              <Text style={styles.bottomtext}>Dollars</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.boxes2}>{/* Content of your first box */}</View>

            <View style={styles.boxes2}>
              {rating <= 50 ? (
                <TouchableOpacity style={styles.styletextnumberred} onPress={()=>setChildModalVisible(true)}>
                  <Text style={styles.ratingtext}>{rating}</Text>
                </TouchableOpacity>   
              ) : rating <= 79 ? (
                <TouchableOpacity style={styles.styletextnumberyellow} onPress={()=>setChildModalVisible(true)}>
                  <Text style={styles.ratingtext}>{rating.toFixed(0)}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity  style={styles.styletextnumbergreen}  onPress={()=>setChildModalVisible(true)}>
                  <Text style={styles.ratingtext}>{rating.toFixed(0)}</Text>
                </TouchableOpacity>    
              )} 
              <Text style={styles.playerratingbottomtext}>Player Rating</Text>
            </View>

            <View style={styles.boxes2}>
              {/* Content of your second box */}
            </View>
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.boxes3} >
            {<Text style={styles.weektext}>Week {week}</Text>}
          </View>

          <View style={styles.boxes3}>
            {<Text style={styles.weektext}>Year, {year}</Text>}
          </View>

          <View style={styles.boxes3}>{/* Content of your second box */}</View>
        </View>

        <TouchableOpacity style={styles.nextweekbutton} onPress={nextweek}>
          <Text style={styles.nextweekbuttontext}> Next Week </Text>
        </TouchableOpacity>

        <View style={styles.rowundernextweek}>
          <TouchableOpacity style={styles.nothing} onPress={navtojobscreen}>
            <View style={styles.undernexteekbox}>
              {<Text>Part Time Job</Text>}
            </View>
          </TouchableOpacity>


<TouchableOpacity onPress={() => openChallengeModal('Zendaya')}>
          <View style={styles.undernexteekbox}>{/* */}</View>

          </TouchableOpacity>        
        </View>

        {finishedMovies.map((movie, index) => (
          <TouchableOpacity onPress={() => handleAccept(movie)}>
            <View style={styles.movieRow} key={index}>
              <View style={styles.movieBox}>
                <Text style={styles.movieName}>{movie.title}</Text>
                <View
                  style={{
                    height: 10,
                    width: `${movie.movierating}%`,
                    backgroundColor: 'black',
                    color: 'black',
                    borderRadius: 5,
                    marginTop: 10,

                  }}
                />
              </View>

              {movie && movie.weeksUntilaudition > 0 && (
                <Text style={styles.weeksUntilRelease}>
                  {movie.weeksUntilaudition}
                </Text>
              )}

              {movie && movie.auditionchance === 0 && (
                <Text style={styles.weeksUntilRelease}>
                  {movie.weeksUntilRelease}
                </Text>
              )}

              <View>
                {movie && movie.weeksUntilaudition > 0 && (
                  <TouchableOpacity atyle={styles.shootingbutton}>
                    <Text style={styles.shootingtext}> Audition </Text>
                  </TouchableOpacity>
                )}

                {movie && movie.auditionchance === 0 && (
                  <TouchableOpacity atyle={styles.shootingbutton}>
                    <Text style={styles.shootingtext}> Shooting </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <Text style={styles.weekstext}>weeks</Text>
              </View>
            </View>
            {movie && movie.weeksUntilRelease === 16 && (
              <Text>{movie.title} was released!</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

       
<Modal
        animationType="fade"
        transparent={true}
        visible={childModalVisible}
        onRequestClose={() => setChildModalVisible(false)}
      >
        {newChild && (
          <View style={styles.childModalOverlay}>
            <View style={styles.childModalContainer}>
              <Image
                source={require('./assets/mediumSkinToneBaby.png')}
                style={styles.childModalImage}
              />
              <Text style={styles.childModalText}>A child has been born!</Text>
              <Text style={styles.childAttribute}>Name: {newChild.name}</Text>
              <Text style={styles.childAttribute}>Age: {newChild.age}</Text>
              
              <Text style={styles.childAttribute}>Looks:</Text>
              <View style={styles.graybar}>
                <View
                  style={{
                    height: 10,
                    width: `${newChild.looks}%`,
                    backgroundColor: 'green',
                    borderRadius: 5,
                  }}
                />
              </View>

              <Text style={styles.childAttribute}>Charisma:</Text>
              <View style={styles.graybar}>
                <View
                  style={{
                    height: 10,
                    width: `${newChild.charisma}%`,
                    backgroundColor: 'blue',
                    borderRadius: 5,
                  }}
                />
              </View>

              <Text style={styles.childAttribute}>Natural Talent:</Text>
              <View style={styles.graybar}>
                <View
                  style={{
                    height: 10,
                    width: `${newChild.naturalTalent}%`,
                    backgroundColor: 'purple',
                    borderRadius: 5,
                  }}
                />
              </View>

               <Text style={styles.childAttribute}>Relationship:</Text>
              <View style={styles.graybar}>
                <View
                  style={{
                    height: 10,
                    width: `${newChild.relationshipStat}%`,
                    backgroundColor: 'green', 
                    borderRadius: 5,
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => setChildModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}  
      </Modal>


<Modal visible={isChallengeModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.challengeModalContainer}>
         
            <Text style={styles.challengeModalTitle}>{selectedActor} Challenge</Text>
            <Image
                source={require('./assets/zendaya.png')} 
                style={styles.childModalImage}
              />  
            <ScrollView style={styles.scrollViewChallengesContainer}>
              {challenges.map((challenge) => (
                <View key={challenge.id} style={styles.challengeListItem}>
                  <View style={[styles.challengeBox, challenge.completed && styles.completedChallengeBox]} />
                  <Text style={[styles.challengeText, challenge.completed && styles.completedChallengeText]}>
                    {challenge.text}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeModalButton} onPress={closeChallengeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BEBEBE',
    height: '100%',
  },

  playerratingbottomtext: {
    marginBottom: '-2%',
    flexDirection: 'column',
    alignSelf: 'center',
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
  },
  nameheader: { 
    backgroundColor: 'white',
    marginTop: '20%',
    height: '20%',
    width: '98%',
    justifyContent: 'center',
    borderWidth: 5,
    borderTopWidth: 7,
    alignSelf: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  nameheadertext: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  circle: {
    borderWidth: 3,
    borderRadius: 40,
    height: 80,
    width: 80,
    marginLeft: '0.5%',
  },
  image3: {
    height: 65,
    width: 70,
    alignSelf: 'center',
    marginTop: 5,
  },
  boxes: {
    borderWidth: 1,
    width: 95,
    height: 50, 
    justifyContent: 'flex-end',
    borderRadius: 10,
    borderColor: 'gray',
    marginLeft: 10,
    marginTop: -80,
  },
  boxes2: {
    borderWidth: 1,
    width: 95,
    height: 50,
    justifyContent: 'flex-end',
    borderRadius: 10,
    borderColor: 'gray',
    marginLeft: 10,
    marginTop: -20,
  },
  boxes3: {
    borderWidth: 1,
    width: '40%',
    height: 50,
    justifyContent: 'flex-end',
    borderRadius: 10,
    borderColor: 'gray',
    marginTop: 8,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },
  undernexteekbox: {
    width: 195,
    height: 90,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  upcomingmoviecontainer: {
    width: '90%',
    height: 90,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '1%',
  },
  rowundernextweek: {
    flexDirection: 'row',
    marginRight: '2.5%',
    justifyContent: 'center',
  },
  row2: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginRight: '2%',
  },
  firstbigcontainer: {
    height: '35%',
    width: '97.5%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
    marginTop: '-30%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  nextweekbutton: {
    backgroundColor: 'yellow',
    width: '98%',
    height: 40,
    borderRadius: 0,
    borderWidth: 5,
    alignSelf: 'center',
    marginTop: '3%',
  },
  nextweekbuttontext: {
    textAlign: 'center',
    fontSize: 22,
  },
  weektext: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actualage: {
    flexDirection: 'column',
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingtext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  styletextnumbergreen: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginBottom: -14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
  },
  styletextnumberred: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginBottom: -14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
  },
  styletextnumberyellow: {
    backgroundColor: 'yellow',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginBottom: -14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'yellow',
  },
  bottomtext: {
    flexDirection: 'column',
    alignSelf: 'center',
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  moneytext: {
    marginLeft: 10,
    fontSize: 17,
    marginTop: -170,
    color: 'white',
  },
  celebleveltext: {
    marginTop: -100,
    marginLeft: 200,
  },

  openingmodalContent: {},
  openingmodalbackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: '-65%',
  },
  openingmodalinstructiontext: {
    marginBottom: '-50%',
    fontSize: 33,
    fontWeight: 'bold',
    color: 'yellow',
    textAlign: 'center',
  },
  skincolorpickercontainer: {
    marginTop: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'yellow',
    backgroundColor: 'yellow',
    borderRadius: 8,
    width: 205,
    height: 55,
    marginLeft: '50%',
  },
  arrowleft: {
    color: 'yellow',
    flex: 1,
    marginLeft: -5,
  },
  arrowright: {
    marginRight: 0,
  },
  textContainer: {
    color: 'yellow',
  },
  arrowtext: {
    color: 'black',
    fontSize: 30,
  },
  categorytext: {
    marginLeft: -85,
    marginTop: 30,
  },
  boximage: {
    height: 72,
    width: 50,
    transform: [{ rotate: '180deg' }],
    borderRadius: 30,
    marginTop: -47,
  },
  boximage2: {
    height: 72,
    width: 50,
    borderRadius: 30,
    marginLeft: 5,
  },

  charactercontainer: {
    marginLeft: '-70%',
  },

  textInput: {
    marginTop: -110,
    fontSize: 25,
    borderRadius: 2,
    marginRight: -105,
    width: 305,
    backgroundColor: 'yellow',
    textAlign: 'center',
  },
  acceptbutton: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: -150,
  },
  acceptbuttontext: {
    color: 'yellow',
    fontSize: 30,
  },

  goldarrow: {
    transform: [{ rotate: '90deg' }],
    height: 52,
    width: 52,
    alignSelf: 'flex-end',
    marginTop: '-30%',
    marginRight: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: -75,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
    alignSelf: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: -25,
  },
  brandText: {
    marginTop: 5,
    alignSelf: 'center',
  },
  priceText: {
    marginTop: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  movieRow: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: 200,          

  },
  movieBox: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    width: 400,
    padding: 25,
 
  },
  movieName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'end',

  },



 graybar: {
    height: 10,
    width: 150,
    backgroundColor: 'lightgray',
    borderRadius: 0,
    marginTop: 0,
    marginLeft: '-0%',
  },
    closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  childModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  childModalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  childModalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  childAttribute: {
    fontSize: 18,
    marginBottom: 10,
  },
  childModalImage: { 
    width: 100,
    height: 100,  
marginLeft:"35%"   

  },



    mainContainer: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actorButton: {
    backgroundColor: '#d4a017',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    shadowColor: '#ffecb3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 15,
  },
  actorButtonText: {
    color: '#f7f7f7',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    height:"100%"
  },
  challengeModalContainer: {
    backgroundColor: '#3d3d3d',
    borderRadius: 25,
    padding: 25,
    width: '85%',
    shadowColor: '#ffecb3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
    height: '60%',
    justifyContent: 'space-between',
  },
  scrollViewChallengesContainer: {
    flex: 1,
    marginVertical: 15,
  },
  challengeModalTitle: {
    fontSize: 26,
    color: '#ffecb3',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  willSmithImage: {

  },
  challengeListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  challengeBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffecb3',
    marginRight: 15,
  },
  completedChallengeBox: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  challengeText: {
    color: '#ffecb3',
    fontSize: 16,
    backgroundColor: '#4e4e4e',
    padding: 10,
    borderRadius: 12,
    flex: 1,
  },
  completedChallengeText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  closeModalButton: {
    backgroundColor: '#d4a017',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: '#f7f7f7',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
