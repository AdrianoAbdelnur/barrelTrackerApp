import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CustomersInfo = () => {
    const [customersData, setCustomersData] = useState("")

    useEffect(() => {
        handleGetClient()
    }, [])
    

    const handleGetClient = async() =>{
        try {
            const {data} = await axios("https://barreltrackerback.onrender.com/api/client/getClients")
            setCustomersData(data.clientsList)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    if (!customersData) {
        return (
            <View style={styles.container}>
                    <ActivityIndicator size={'large'} />   
            </View>
        )
    }
    if(customersData) {

        return (
            <View>
                <ScrollView>
                    {
                        customersData.map(customer => {
                            return(
                                <View>
                                    <Text style={styles.title}>{customer.barName}</Text>
                                    <Text style={styles.info}>location: {customer.location}</Text>
                                    <Text style={styles.info}>Manager: {customer.barManager}</Text>
                                    <Text style={styles.info}>email: {customer.email}</Text>
                                </View>
                            )
                        })

                    }
                </ScrollView>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    info: {
        fontSize: 16,
        marginLeft: 20,
    }
});

export default CustomersInfo