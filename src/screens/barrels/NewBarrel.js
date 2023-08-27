import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownComponent from './Dropdown';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native"


const NewBarrel = ({ route }) => {
    const navigation=useNavigation();
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


    const handleAddNewBarrel = async() => {
      try {
        const payload = {
          id: id,
          capacity: capacity
        }
        const {data} = await axios.post("https://barreltrackerback.onrender.com/api/barrel/addBarrel", payload)
        navigation.navigate('BarrelStatus', {data: data.newBarrel})
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <View>
      <Text>Add New Barrel with code {id}</Text>
       <DropdownComponent
          value={capacity}
          setValue={setCapacity}
          data={data}
       />
       <TouchableOpacity
                style={{ backgroundColor: 'blue', width: 130, height: 50, marginTop: 30 }}
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
  )
}

export default NewBarrel

const styles = StyleSheet.create({

});