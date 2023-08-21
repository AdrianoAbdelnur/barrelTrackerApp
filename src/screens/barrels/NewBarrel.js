import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DropdownComponent from './Dropdown';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native"


const NewBarrel = ({ route }) => {
    const navigation=useNavigation();
    const id = route.params.code
    const [capacity, setCapacity] = useState(null)
    
    const handleAddNewBarrel = async() => {
      try {
        const payload = {
          id: id,
          capacity: capacity
        }
        await axios.post("https://barreltrackerback.onrender.com/api/barrel/addBarrel", payload)
        navigation.navigate('BarrelStatus')
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