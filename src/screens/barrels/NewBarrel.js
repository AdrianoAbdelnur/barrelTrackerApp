import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DropdownComponent from './Dropdown';



const NewBarrel = ({ route }) => {
  
    const id = route.params.code
    const handleAddNewBarrel = async(capacity) => {
      try {
        const payload = {
          id: id,
          capacity: capacity
        }
        await axios.post("/barrel/addBarrel", payload)
        navigate("/main")
      } catch (error) {
        console.log(error)
      }
    }
  
    const handleClose = () => {
      navigate("/main")
      setShow(false)
    }

  return (
    <View>
      <Text>Add New Barrel with code {id}</Text>

       <DropdownComponent/>

    </View>
  )
}

export default NewBarrel

const styles = StyleSheet.create({

});