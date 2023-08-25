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
    const [status, setStatus] = useState("")
    const [newStatus, setNewStatus] = useState("")
    const [price, setPrice] = useState(0)

    useEffect(() => {
      setBarrelData(route.params.data)
      setStatus(route.params.data.statusBarrel)
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
      setData(beerStyles?.map(style => (
        {
          label: style.name,
          value: style._id
        }
      )))
    }
  }, [beerStyles])

  useEffect(() => {
    if (newStatus) {
        handleBarrelStatus(newStatus)
    }
}, [newStatus])
  

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

    const changeStatus = () => {
      if (status === "empty in factory") {
        setNewStatus({
          statusBarrel: "full in factory",
          style: beerStyle
        })
      }
    }

    const handleBarrelStatus = async(newStatus) =>{
      try {
        console.log(newStatus, barrelData.id)
          const {data} = await axios.put("https://barreltrackerback.onrender.com/api/barrel/status/"+ barrelData.id, newStatus )
          setBarrelData(data.upDatedBarrel)
      } catch (error) {
          console.log(error)
      }
}
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Barrel Status </Text>
      <Text style={styles.text}>Barrel id: <Text style={styles.data}>{barrelData.id}</Text></Text>
      <Text style={styles.text}>Capacity: <Text style={styles.data}>{barrelData.capacity}</Text></Text>
      <Text style={styles.text}>Status: <Text style={styles.data}>{barrelData.statusBarrel}</Text></Text>
      {barrelData.statusBarrel !== "empty in factory" && <Text style={styles.text}>Style: <Text style={styles.data}>{barrelData?.style?.name}</Text></Text> }
      {barrelData.statusBarrel === "delivered to customer" && <Text style={styles.text}>Customer: <Text style={styles.data}>{barrelData?.customer?.barName}</Text></Text>  }
      <DropdownComponent
        value={beerStyle}
        setValue={setBeerStyle}
        data={data}
      />
      <View style={styles.botton_container}>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', width: 350, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15,}}
          disabled={beerStyle.name? false:true}
          onPress={() => changeStatus()}>
          <Text
              style={{
                color: 'white',
                fontSize: 22,
                textAlign: 'center'
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