import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownComponent from './Dropdown';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

  const BarrelStatus = ({ route }) => {
    const [barrelData, setBarrelData] = useState({})
    const [beerStyles, setBeerStyles] = useState("")
    const [info, setInfo] = useState("")
    const [nextStatus, setNextStatus] = useState("")
    const [data, setData] = useState([])
    const [newStatus, setNewStatus] = useState("")
    const [customersData, setCustomersData] = useState([])
    const navigation = useNavigation();
    const [saleId, setSaleId] = useState()

    
    useEffect(() => {
      setBarrelData(route.params.data)
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  
      return () => {
        backHandler.remove();
      };
    }, []);

    const handleBackPress = () => {
      navigation.navigate('Home');
      return true;
    };
 
    useEffect(() => {
      nextstat();
      if (barrelData.statusBarrel === "empty in factory") {
          handleGetStyles()
      }else if(barrelData.statusBarrel === "full in factory") {
          handleGetCustomers()
      }else if(barrelData.statusBarrel === "delivered to customer"){
        handleNewSale()
      }
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
    if (customersData) {
        setData(
          customersData?.map(customer => (
            {
              label: customer.barName,
              value: customer._id
            }
          )
          )
        )
    }
  }, [customersData])
  

  useEffect(() => {
    if (newStatus) {
        handleBarrelStatus(newStatus)
    }
  }, [newStatus])
  
  useEffect(() => {
    if(saleId) {
      handleGetPaysNotAssigned()
    }
  }, [saleId])
  

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
      const handleGetCustomers = async() =>{
        try {
          const {data} = await axios("https://barreltrackerback.onrender.com/api/client/getClients")
          setCustomersData(data.clientsList)
      } catch (error) {
          console.log(error)
      }
      }

    const changeStatus = () => {
      if (barrelData.statusBarrel === "empty in factory") {
        setNewStatus({
          statusBarrel: "full in factory",
          style: info
        })
      }
      if (barrelData.statusBarrel === "full in factory") {
        setNewStatus({
          statusBarrel: "delivered to customer",
          customer: info
        })
      }
      if(barrelData.statusBarrel === "delivered to customer") {
        setNewStatus({
          statusBarrel: "empty in factory"
        })
      }
    }

    const handleBarrelStatus = async(newStatus) =>{
      try {
          const {data} = await axios.put("https://barreltrackerback.onrender.com/api/barrel/status/"+ barrelData.id, newStatus )
          setBarrelData(data.upDatedBarrel)
      } catch (error) {
          console.log(error)
      }
    }

    const handleNewSale = async() => {
      try {
          const paylodad = {
              style: barrelData.style._id,
              volume: barrelData.capacity,
              price: barrelData.style.price * barrelData.capacity,
              customer: barrelData.customer._id
          }
          const {data} = await axios.post("https://barreltrackerback.onrender.com/api/sale/newSale", paylodad)
          setSaleId(data.newSale._id)
        } catch (error) {
          console.log(error)
      }
  }

  const handleGetPaysNotAssigned = async() => {
    try {
        const {data} = await axios("https://barreltrackerback.onrender.com/api/pay/getPaysNotAssigned/" + barrelData.customer._id)  
        if(data.paysList.length) {
          paysOperation(data.paysList);
        }
        } catch (error) {
        console.log(error)
    }
  }

  const paysOperation = (pays)=> {
    let salePaid = 0
    for (const pay of pays) {
        let paid = 0
        if (pay.noAssignedPay > 0) {
                paid = pay.noAssignedPay;
            } else  {
                paid = pay.pay;
            }    
            if (paid > (barrelData.style.price * barrelData.capacity)) {
                const payload = {
                    paid: price * barrelData.capacity,
                    paidComplete: true
                }
                updateSale(saleId, payload)
                paid = paid - barrelData.style.price * barrelData.capacity
                updatePay(pay._id, {noAssignedPay: paid})
            } else if (paid < barrelData.style.price * barrelData.capacity) {    
                const payload= {
                    paid: paid + salePaid
                }
                salePaid = salePaid + paid
                updateSale(saleId, payload)
                updatePay(pay._id, {assigned: true})
            } else if (paid === (barrelData.style.price * barrelData.capacity)) {
                const payload= {
                    paid: barrelData.style.price * barrelData.capacity,
                    paidComplete: true
                }
                paid= 0
            }
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
      {
        barrelData.statusBarrel !== "delivered to customer" &&
          <DropdownComponent
          value={info}
          setValue={setInfo}
          data={data}
          placeholder={barrelData.statusBarrel==='empty in factory'? "Select a style": "Select a customer"}
          />
      }
      <View style={styles.botton_container}>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', width: 350, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 15,}}
          disabled={info? false:true}
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