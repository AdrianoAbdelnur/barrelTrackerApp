import { View, Text } from 'react-native'
import React from 'react'
import SelectList from 'react-native-select-dropdown'

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
      
    </View>
  )
}

export default NewBarrel