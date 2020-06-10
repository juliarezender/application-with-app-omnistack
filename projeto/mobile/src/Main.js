import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TextInputComponent, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'

import api from './api';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }

        }

        loadInitialPosition();
    }, []);

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: 'ReactJs'
            }
        });
    }
    
    function handleRegionChanged(region) {
        console.log(region);
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return (
    <>
        <MapView 
            onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegion} 
            style={styles.map}
        >
            <Marker coordinate={{ latitude: -19.8630228, longitude: -43.9593225 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4' }}></Image>
                
                <Callout onPress={() => {
                    navigation.navigate('Profile', {github_username: 'diego3g'});
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Diego Fernandes</Text>
                        <Text style={styles.devBio}>CTO na @Rocketseat. Apaixonado pelas melhores tecnologias de desenvolvimento web e mobile.</Text>
                        <Text style={styles.devTechs}>ReactJS</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        <View style={styles.searchForm}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
            />

            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name ="my-location" size={20} color='#FFF' />
            </TouchableOpacity>
            
        </View>
    </>
    )

}

const styles = StyleSheet.create({
    map: {
        flex : 1 
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        backgroundColor: '#FFF',
        color: '#333',
        borderColor: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})

export default Main;