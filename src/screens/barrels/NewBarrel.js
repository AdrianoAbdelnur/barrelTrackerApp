import { View, Text, StyleSheet, TouchableOpacity, BackHandler, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownComponent from './Dropdown';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native"


const NewBarrel = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params.code
  const [capacity, setCapacity] = useState(null)
  const data = [
    { label: '50 liters', value: '50' },
    { label: '30 liters', value: '30' },
    { label: '20 liters', value: '20' },
    { label: '10 liters', value: '10' },
    { label: '4 liters', value: '5' }
  ];

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Home');
    return true;
  };


  const handleAddNewBarrel = async () => {
    try {
      const payload = {
        id: id,
        capacity: capacity
      }
      const { data } = await axios.post("https://barreltrackerback.onrender.com/api/barrel/addBarrel", payload)
      navigation.navigate('BarrelStatus', { data: data.newBarrel })
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <ImageBackground source={require('./../../../assets/images/inox1.jpg')} resizeMode="cover" style={styles.image}>
        <Text style={styles.message}>Add New Barrel with code {id}</Text>
        <DropdownComponent
          value={capacity}
          setValue={setCapacity}
          data={data}
          />
          <View style={styles.touchable_container}>
            <TouchableOpacity
              style={{ backgroundColor: capacity? "#34495e" : 'grey', width: 350, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15, }}
              disabled={capacity? false : true}
              onPress={() => handleAddNewBarrel()}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  margin: 8
                }}
                >Add Barrel</Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>
  )
}

export default NewBarrel

const styles = StyleSheet.create({
  message: {
    marginTop:20,
    marginLeft: 10,
    fontSize: 18,
  },  
  touchable_container: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
}
});