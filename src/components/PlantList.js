import { View, FlatList, Alert} from 'react-native';
import { Text, List, IconButton, Divider, Avatar } from 'react-native-paper';
import { ListItem } from '@rneui/themed';

import EditForm from '../components/EditForm';
import AvatarPicker from '../components/AvatarPicker';
import { dayCounter } from '../utils/DateUtils';
import { styles } from '../utils/Styles';

// returns the flatlist that showcases all plants
export default function PlantList(props) {
    return (
        <FlatList
            style={styles.plantList}
            data={props.plants}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => 
            <List.Section style={styles.listSection}>
                <View style={styles.center}>
                    <Avatar.Image size={100} source={item.avatar ? { uri: item.avatar } : require('../../assets/default.png')} />
                    <AvatarPicker item={item} updateAvatar={props.updateAvatar}></AvatarPicker>
                    <Text variant='titleLarge'>{item.plantName}</Text>
                    {item.species && <Text variant='labelLarge'>'{item.species}'</Text>}
                    <View style={styles.row}>
                        <IconButton icon='delete' mode='contained' onPress={() => props.deletePlant(item)}/>
                        <EditForm item={item} plant={props.plant} setPlant={props.setPlant} save={props.save} clearPlant={props.clearPlant}/>
                    </View>
                </View>
                <Divider style={styles.listDivider}/>
                <View style={styles.listActions}>
                    {!isNaN(item.watering) && 
                        <ListItem.Swipeable
                            rightContent={(action) => (
                            <View style={styles.swipeable}>
                                <Text variant='labelMedium'>interval: {item.watering} days</Text>
                                <Text variant='labelMedium'>last: {item.dayZeroW.substring(0, 10)}</Text>
                            </View>
                        )}>
                            <ListItem>
                                <Text style={dayCounter(item.dayZeroW, item.watering) <= 0 ? {color: 'red'} : {color: 'black'}} variant='labelLarge'>{dayCounter(item.dayZeroW, item.watering)} days until watering     </Text>
                                <IconButton icon='watering-can' mode='contained' size={20} onPress={() => props.waterPlant(item)}/>
                            </ListItem>
                        </ListItem.Swipeable> 
                    }
                    {!isNaN(item.fertilization) && 
                        <ListItem.Swipeable
                                rightContent={(action) => (
                                <View style={styles.swipeable}>
                                    <Text variant='labelMedium'>interval: {item.fertilization} days</Text>
                                    <Text variant='labelMedium'>last: {item.dayZeroF.substring(0, 10)}</Text>
                                </View>
                            )}>
                                <ListItem>
                                    <Text style={dayCounter(item.dayZeroF, item.fertilization) <= 0 ? {color: 'red'} : {color: 'black'}} variant='labelLarge'>{dayCounter(item.dayZeroF, item.fertilization)} days until fertilizing   </Text>
                                    <IconButton icon='flower-pollen' mode='contained' size={20} onPress={() => props.fertilizePlant(item)}/>
                                </ListItem>
                        </ListItem.Swipeable>
                    }
                </View>
            </List.Section>
            }
        />
    );
};