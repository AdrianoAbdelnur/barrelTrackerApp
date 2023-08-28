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
                <ImageBackground source={require('./../../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
                    <ScrollView>
                        {
                            customersData.map(customer => {
                                return(
                                    <View key={customer.barName} style={styles.infoBlock}>
                                            <Text style={styles.title}>{customer.barName}</Text>
                                            <Text style={styles.info}>location: {customer.location}</Text>
                                            <Text style={styles.info}>Manager: {customer.barManager}</Text>
                                            <Text style={styles.info}>email: {customer.email}</Text>
                                    </View>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    info: {
        fontSize: 16,
        marginLeft: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoBlock: {
        marginTop: 22,
        marginHorizontal: 18,
        backgroundColor: 'rgba(128, 128, 128, 0.35)',
        borderRadius: 15
    }
});

export default CustomersInfo