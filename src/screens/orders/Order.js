import { View, Text, ScrollView, TouchableOpacity, Alert, Button, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import DropdownComponent from '../barrels/Dropdown'
import axios from 'axios'

const Order = ({ route }) => {
    const [list, setList] = useState([])
    const [styleId, setStyleId] = useState("")
    const [volume, setVolume] = useState("")
    const [quantity, setQuantity] = useState(1)

    const volumeInfo = [
        { label: '50 liters', value: '50' },
        { label: '30 liters', value: '30' },
        { label: '20 liters', value: '20' },
        { label: '10 liters', value: '10' },
        { label: '5 liters', value: '5' }
    ];

    const addItem = () => {
        if (styleId !== "" && volume !== "") {
            let isStyle = list.find((item) => item.styleId === styleId && item.volume === volume)
            if (isStyle) {
                const newList = list.map((item) => {
                    if (item.styleId === styleId && item.volume === volume) {
                        return {
                            styleId: item.styleId, volume: item.volume, quantity: item.quantity + quantity, styleName: item.styleName
                        }
                    } else return item
                })
                setList(newList)
            } else {
                const { label } = route.params.styles.find((item) => item.value === styleId)
                setList([...list, { styleId: styleId, volume: volume, quantity: quantity, styleName: label }]);
            }
            setStyleId("");
            setVolume("");
            setQuantity(1)
        } else Alert.alert(
            'Error',
            `Debes seleccionar una opcion en cada campo`,
            [
                {
                    text: 'ok',
                    onPress: () => {
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const deleteItem = (item) => {
        const filteredList = list.filter(e => !(e.styleId === item.styleId && e.volume === item.volume)) 
        setList(filteredList)
    }

    const HandleAddOrder = async () => {
        try {
            const payload = {
                customer: route.params.customer._id,
                orderList: list
            }
            axios.post("https://barreltrackerback.onrender.com/api/order/addNewOrder", payload);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <ImageBackground source={require('./../../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
                
                <Text style={styles.title}>Customer: {route.params.customer.barName}</Text>
                <ScrollView>
                    {
                        list?.map((item) => {
                            return (
                                <View key={item.styleId + item.volume} style={styles.itemContainer}>
                                    <Text style={styles.items} >- {item?.quantity} {item?.styleName} de {item?.volume} litros</Text>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={()=>deleteItem(item)}
                                    >
                                        <Text style={styles.signal}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })

                    }
                    <DropdownComponent
                        value={styleId}
                        setValue={setStyleId}
                        data={route.params.styles}
                        placeholder='Select a style'
                    />
                    <DropdownComponent
                        value={volume}
                        setValue={setVolume}
                        data={volumeInfo}
                        placeholder='Select a volume'
                    />
                    <Text style={styles.items}>Quantity</Text>
                    <View style={styles.quantity}>
                        <TouchableOpacity
                            onPress={() => setQuantity(quantity - 1)}
                            style={styles.upDownButtons}
                        >
                            <Text style={styles.signal}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            onPress={() => setQuantity(quantity + 1)}
                            style={styles.upDownButtons}
                        >
                            <Text style={styles.signal}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={addItem}
                        style={styles.addItem}
                    >
                        <Text>Add Item</Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    onPress={HandleAddOrder}
                >
                    <Text>Enviar Orden</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    quantity: {
        margin: 20,
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    addItem: {
        height: 50,
        marginTop: 22,
        marginHorizontal: 18,
        backgroundColor: 'rgba(128, 128, 128, 0.35)',
        borderRadius: 15,
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    upDownButtons: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signal: {
        color: 'white',
        margin: 0,
        padding: 0,
        fontSize: 25,
        fontWeight: 'bold'
    },
    title: {
        fontSize:25,
        fontWeight: 'bold'
    },
    itemContainer: {
        flexDirection: 'row'
    },
    items: {
        fontSize: 20,
        marginLeft:10,
    },
    deleteButton: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        
        marginHorizontal: 20

    },
    quantityText: {
        fontSize: 20
    }
});

export default Order
