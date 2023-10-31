import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import bar from './../../../assets/images/bar.png'
import factory from './../../../assets/images/fabrica.png'
import beertruck from './../../../assets/images/camioneta.png'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAP_KEY } from '@env'
import * as Location from 'expo-location'

const DeliveryMap = ({ route }) => {
    const mapRef = useRef()
    const yourRef = useRef()
    const factoryRef = useRef()
    const [barsCoordinates, setBarsCoordinates] = useState([])
    const [currentLocation, setCurrentLocation] = useState(null)
    
    useEffect(() => {
        getLocationPermission()
        let coordinates = []
        for (const order of route.params.data) {
            coordinates.push({ latitude: order.customer.coordinates.lat , longitude: order.customer.coordinates.lng})
        }
        setBarsCoordinates(coordinates)
    }, [])

    useEffect(() => {
        fitMapToCoordinates()
    }, [barsCoordinates])
    

    const fitMapToCoordinates = () => {
        mapRef.current?.fitToCoordinates(barsCoordinates, {
            edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
            animated: true,
        })
        showReferences()
    }

    const showReferences = () => {
        yourRef.current?.showCallout()
        factoryRef.current?.showCallout()
        console.log("1")
    }

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('permiso denegado')
            return
        }
        let location = await Location.getCurrentPositionAsync();
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setCurrentLocation(current)
    }
    
    return (
        <View>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: -26.831684,
                    longitude: -65.219256,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09
                }
                }>
                    {
                        currentLocation &&
                        <Marker
                            ref={yourRef}
                            coordinate={currentLocation}
                            image={beertruck}
                            >
                            <Callout>
                                <View>
                                    <Text>Tu ubicación</Text>
                                </View>
                            </Callout>
                        </Marker>
                    }
                    <Marker
                        ref={factoryRef}
                        coordinate={{latitude: -26.83985309796364, longitude: -65.2193300301224}}
                    >
                        <Image
                            source={factory}
                            style={{ width: 50, height: 50 }} 
                        />
                    <Callout>
                            <View>
                                <Text>Factory</Text>
                            </View>
                        </Callout>
                    </Marker>
                {
                    route.params.data.map((order) => {
                        return (
                            <Marker
                                key={order.customer._id}
                                coordinate={{latitude: order.customer.coordinates.lat , longitude: order.customer.coordinates.lng}}
                                image={bar}
                                title={order.customer.barName}
                                description={order.customer.location}
                            >
                            </Marker>
                        )
                    })
                }
                <MapViewDirections
                            origin={{latitude: -26.83985309796364, longitude: -65.2193300301224}}
                            destination={{latitude: -26.83985309796364, longitude: -65.2193300301224}}
                            waypoints={barsCoordinates}
                            optimizeWaypoints
                            apikey={GOOGLE_MAP_KEY}
                            strokeWidth={4}
                />
            </MapView>
        </View >
    )
}

const styles = StyleSheet.create({
    map: {
        with: '100%',
        height: '100%'
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "90%",
        backgroundColor: "#bbb",
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    textButton: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default DeliveryMap