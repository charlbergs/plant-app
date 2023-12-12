import { FlatList, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { Text, Searchbar, IconButton, Card, } from 'react-native-paper';
import { ListItem } from '@rneui/themed';
import { APIURL, APIKEY } from '@env'
import { styles } from '../utils/Styles';

// shows plant care instructions from Perenual API
// (https://perenual.com/docs/api) that the user can 
// search with a keyword
export default function InstructionsScreen() {
    
    const [keyword, setKeyword] = useState('');
    const [plantData, setPlantData] = useState([]);

    // fetch plant data from api
    const getPlantData = () => {
        fetch(`${APIURL}?key=${APIKEY}&q=${keyword}`)
        .then(response => response.json())
        .then(data => {
            setPlantData(data.data.slice(0, 5)); // only get first 5 results
            setKeyword('');
        })
        .catch(error => {
            Alert.alert('Fetch error', error.message);
        });
    };

    return (
        <View style={styles.instructionsScreen}>
            <ListItem>
                <Searchbar
                    style={{flex:6}}
                    placeholder="english or scientific name"
                    onChangeText={value => setKeyword(value)}
                    value={keyword}
                />
                <IconButton style={{flex:1}} icon='arrow-right' mode='contained' size={35} onPress={getPlantData}/>
            </ListItem>
            {plantData.length > 0 ? (
                <FlatList 
                    keyExtractor={(item, index) => index.toString()}
                    data={plantData}
                    renderItem={({item}) => 
                        <View>
                            <Card mode='contained'>
                                <Card.Cover style={styles.coverImage} source={!item.default_image.small_url.includes('upgrade') ? {uri: item.default_image.small_url} : require('../../assets/default2.png')} />
                                <Card.Content>
                                    <Text variant='titleLarge'>{item.common_name}</Text>
                                    <Text variant='titleMedium'>'{item.scientific_name[0]}'</Text>
                                    <Text variant='labelLarge'>Watering: {!item.watering.includes('Upgrade') ? item.watering : 'Not available'}</Text>
                                    <Text variant='labelLarge'>Sunlight: {!item.sunlight[0] == 'U' ? item.sunlight : 'Not available'}</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    }
                />
            ) : (
                <View style={styles.center}>
                    <Text variant='titleMedium'>0 results</Text>
                </View>
            )}
            
            <View style={plantData.length > 1 ? {padding:400} : {padding:10}}><Text> </Text></View>
        </View>
    );
}