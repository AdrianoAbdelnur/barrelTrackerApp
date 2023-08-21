import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownComponent from './Dropdown';
import axios from 'axios';

  const BarrelStatus = ({ route }) => {
    const [barrelData, setBarrelData] = useState({})
    const [beerStyles, setBeerStyles] = useState("")
    const [beerStyle, setBeerStyle] = useState("")
    const [nextStatus, setNextStatus] = useState("")
    const [data, setData] = useState([])
    
    useEffect(() => {
      setBarrelData(route.params.data)
    }, [])

    useEffect(() => {
      nextstat();
      if (barrelData.statusBarrel === "empty in factory" || barrelData.statusBarrel === "delivered to customer") {
          handleGetStyles()
      }else if(barrelData.statusBarrel === "full in factory") {
          handleGetCustomers()
          setPrice(barrelData.style.price)
      }else if(barrelData.statusBarrel === "delivered to customer"){
          setPrice(barrelData.style.price)
      }
      // eslint-disable-next-line
  }, [barrelData])

  useEffect(() => {
    if(beerStyles){
      setData(beerStyles?.map(s => (
        {
          label: s.name,
          value: s.name
        }
      )))
    }
  }, [beerStyles])
  

  const nextstat = () => {
    if(barrelData.statusBarrel === "empty in factory") setNextStatus("full in factory") 
    if(barrelData.statusBarrel === "full in factory") setNextStatus("delivered to customer")  
    if(barrelData.statusBarrel === "delivered to customer") setNextStatus("empty in factory") 
}

    const handleGetStyles = async() => {
      try {
          const {data} = await axios("https://barreltrackerback.onrender.com/api/styles/getStyles")
          setBeerStyles(data.stylesFound)
      } catch (error) {
          console.log(error)
      }
    }  
      const handleGetCustomers = () =>{
        
      }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Barrel Status </Text>
      <Text style={styles.text}>Barrel id: <Text style={styles.data}>{barrelData.id}</Text></Text>
      <Text style={styles.text}>Capacity: <Text style={styles.data}>{barrelData.capacity}</Text></Text>
      <Text style={styles.text}>Status: <Text style={styles.data}>{barrelData.statusBarrel}</Text></Text>
      {barrelData.statusBarrel !== "empty in factory" && <Text style={styles.text}>Style: <Text style={styles.data}>{barrelData?.style}</Text></Text> }
      {barrelData.statusBarrel === "delivered to customer" && <Text style={styles.text}>Customer: <Text style={styles.data}>{barrelData?.customer?.barName}</Text></Text>  }
      <DropdownComponent
        value={beerStyle}
        setValue={setBeerStyle}
        data={data}
      />
      <View style={styles.botton_container}>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', width: 350, height: 50, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => setAuth("hola fonola")}>
          <Text
              style={{
                color: 'white',
                fontSize: 22,
              }}
              >Change status to {nextStatus}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create ({
  container:{
    marginTop: "6%",
    marginLeft: "6%",
  },
  text: {
    fontSize: 20
  },
  data: {
    fontWeight: 'bold'
  },
  botton_container: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 30,
    with: '100%'
  }
})

export default BarrelStatus