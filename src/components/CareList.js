import { useState } from 'react';
import { View, FlatList, Alert} from 'react-native';
import { Text, Dialog, Portal, Button, List, IconButton, Divider, Avatar } from 'react-native-paper';
import { ListItem } from '@rneui/themed';
import { styles } from '../utils/Styles';
import { dayCounter } from '../utils/DateUtils';

// shows a smaller list of plants that need either
// watering or fertilizing on current date
export default function CareList(props) {
    
    const [visible, setVisible] = useState(false);
    const [carePlants, setCarePlants] = useState([]);
    
    const showDialog = () => {
        setup();
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };

    // filter only plants that need care 
    const setup = () => {
        const plantsNeedingCare = props.plants.filter((item) => {
            return dayCounter(item.dayZeroW, item.watering) <= 0 || dayCounter(item.dayZeroF, item.fertilization) <= 0;
        });
    
        setCarePlants(plantsNeedingCare);
    };

    return (
        <View style={styles.center}>
            <Button style={styles.button} mode='contained' onPress={showDialog}>Care List</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <View style={styles.center}>
                        <Text variant='titleMedium'>Plants that need care today</Text>
                    </View>
                    <FlatList
                        data={carePlants}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => 
                        <List.Section style={styles.listSection}>
                            <View style={styles.listActions}>
                                <ListItem>
                                <Avatar.Image size={50} source={item.avatar ? { uri: item.avatar } : require('../../assets/default.png')} />
                                    <Text variant='labelMedium'>{item.plantName}</Text>
                                    {dayCounter(item.dayZeroW, item.watering) <= 0 && <IconButton icon='watering-can' mode='contained' size={20} onPress={() => {props.water(item); setup()}}/>}
                                    {dayCounter(item.dayZeroF, item.fertilization) <= 0 && <IconButton icon='flower-pollen' mode='contained' size={20} onPress={() => props.fertilize(item)} />}
                                </ListItem>
                            </View>
                            <Divider style={styles.listDivider}/>
                        </List.Section>
                        }
                    />
                    <Button mode='contained' onPress={hideDialog}>Close</Button>
                </Dialog>
            </Portal>
        </View>
            
    )
}