import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const NewOrder = () => {
  const navigation = useNavigation();
  const [customersData, setCustomersData] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [beerStyles, setBeerStyles] = useState([])
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    handleGetClient()
    handleGetStyles()
  }, [])

  useEffect(() => {
    customersFilter();
  }, [search])

  useEffect(() => {
    if (beerStyles) {
      setData(beerStyles?.map(style => (
        {
          label: style.name,
          value: style._id
        }
      )))
    }
  }, [beerStyles])
  


  const handleGetClient = async () => {
    try {
      const { data } = await axios("https://barreltrackerback.onrender.com/api/client/getClients")
      setCustomersData(data.clientsList)
      setFilteredCustomers(data.clientsList)
    } catch (error) {
      Alert.alert(
        'Error',
        `Something went wrong: ${error.message} - Contact the administrator`,
        [
          {
            text: 'ok',
            onPress: () => {
              navigation.navigate('Home')
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  const handleGetStyles = async () => {
    try {
      const { data } = await axios("https://barreltrackerback.onrender.com/api/styles/getStyles")
      setBeerStyles(data.stylesFound)
    } catch (error) {
      console.log(error)
    }
  }

  const customersFilter = () => {
    const filteredCustomers = customersData.filter((customer)=> customer.barName.toLowerCase().includes(search.toLowerCase()))
    setFilteredCustomers(filteredCustomers)
  }
  
  const handleNewOrder = (customer) => {
    navigation.navigate('order', { customer: customer, styles: data })
    setSearch("")
  }

  if (!customersData) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./../../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
          <ActivityIndicator size={'large'} />
        </ImageBackground>
      </View>
    )
  }

  if (customersData) {

    return (
      <View>
        <ImageBackground source={require('./../../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
          <Text style={styles.title}>Select a Customer:</Text>
          <TextInput
            style={styles.searchInput}
            inputAccessoryViewID='search'
            onChangeText={setSearch}
            value={search}
            placeholder={'Search for a Customer'}
        />
          <ScrollView>
            {
              filteredCustomers.map(customer => {
                return (
                  <TouchableOpacity 
                    key={customer._id}
                    style={styles.optionsButton}
                    onPress={()=>handleNewOrder(customer)}
                  >
                    <Text style={styles.option}>{customer.barName}</Text>
                  </TouchableOpacity>
                )
              })

            }
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100vw',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsButton: {
    height: 50,
    marginTop: 22,
    marginHorizontal: 18,
    backgroundColor: 'rgba(128, 128, 128, 0.35)',
    borderRadius: 15,
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    textDecorationLine: 'underline'
  },
  option: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  searchInput: {
      padding: 12,
      margin: 20,
      backgroundColor: 'gray',
      borderRadius: 10
  }
});

export default NewOrder