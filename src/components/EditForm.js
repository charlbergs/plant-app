import { View } from 'react-native';
import { useState } from 'react';
import { Dialog, Portal, Button, IconButton, TextInput, HelperText } from 'react-native-paper';
import { dateNow } from '../utils/DateUtils';
import { styles } from '../utils/Styles';

export default function EditForm(props) {
    
    const [visible, setVisible] = useState(false);

    const showForm = () => {
        setup();
        setVisible(true);
    }

    const hideForm = () => {
        setVisible(false)
    };

    const hasErrors = () => {
        return props.plant.plantName == '';
    };

    const setup = () => {
        props.setPlant({
            plantName: props.item.plantName,
            species: props.item.species,
            watering: props.item.watering,
            fertilization: props.item.fertilization,
            dayZeroW: dateNow(),
            dayZeroF: dateNow()
        });
    }

    return (
        <View>
            <IconButton icon='pen' mode='contained' onPress={showForm}></IconButton>
            <Portal>
                <Dialog style={styles.form} visible={visible} onDismiss={() => {hideForm(), props.clearPlant()}}>
                    <HelperText type="error" visible={hasErrors()}>
                        Name can't be empty.
                    </HelperText>
                    <TextInput 
                        placeholder='Name' 
                        onChangeText={value => props.setPlant({...props.plant, plantName: value})}
                        value={props.plant.plantName}
                    />
                    <TextInput 
                        placeholder='Species'
                        onChangeText={value => props.setPlant({...props.plant, species: value})}
                        value={props.plant.species}
                    />
                    <TextInput 
                        placeholder='Watering Interval in Days' 
                        keyboardType='numeric'
                        onChangeText={value => props.setPlant({...props.plant, watering: value})}
                        value={String(props.plant.watering)}
                    />
                    <TextInput 
                        placeholder='Fertilization Interval in Days'
                        keyboardType='numeric'
                        onChangeText={value => props.setPlant({...props.plant, fertilization: value})}
                        value={String(props.plant.fertilization)} 
                    />
                    <View style={styles.center}>
                        <Button style={styles.button} mode='contained' disabled={hasErrors()} onPress={() => {props.save(props.plant, props.item.id); hideForm()}}>Save</Button>
                    </View>
                </Dialog>
            </Portal>
        </View>    
    );
};