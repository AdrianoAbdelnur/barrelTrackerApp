import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DropdownComponent from './Dropdown';



const NewBarrel = (id) => {


  
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
      <Text>Add New Barrel</Text>
       <DropdownComponent/>

    </View>
  )
}

export default NewBarrel

const styles = StyleSheet.create({

});