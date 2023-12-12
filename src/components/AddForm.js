import { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Button, TextInput, HelperText } from 'react-native-paper';
import { styles } from '../utils/Styles';

export default function AddForm(props) {
    
    const [visible, setVisible] = useState(false);

    const showForm = () => setVisible(true);
    const hideForm = () => setVisible(false);

    const hasErrors = () => {
        return props.plant.plantName == '';
    };

    return (
        <View style={styles.center}>
            <Button style={styles.button} mode='contained' onPress={showForm}>New Plant</Button>
            <Portal>
                <Dialog style={styles.form} visible={visible} onDismiss={hideForm}>
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
                        value={props.plant.watering}
                    />
                    <TextInput 
                        placeholder='Fertilization Interval in Days'
                        keyboardType='numeric'
                        onChangeText={value => props.setPlant({...props.plant, fertilization: value})}
                        value={props.plant.fertilization} 
                    />
                    <View style={styles.center}>
                        <Button style={styles.button} mode='contained' disabled={hasErrors()} onPress={() => {props.save(); hideForm()}}>Save</Button>
                    </View>
                </Dialog>
            </Portal>
        </View>
            
    )
}