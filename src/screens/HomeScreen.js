import { View, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { sqlCreate, sqlInsert, sqlSelect, sqlDelete, sqlUpdate, sqlWater, sqlFertilize, sqlAvatar } from '../utils/Sql';
import AddForm from '../components/AddForm';
import CareList from '../components/CareList';
import { dateNow } from '../utils/DateUtils';
import { styles } from '../utils/Styles';
import PlantList from '../components/PlantList';

// shows the list of plants that the user has added.
// also has buttons to add new plant and show list of 
// plants currently needing care
export default function HomeScreen() { 

    // db connection
    const db = SQLite.openDatabase('plantdb.db');
    
    const [plant, setPlant] = useState({
        plantName: '',          // name
        species: '',            // scientific name
        watering: '',           // watering interval in days
        avatar: null,           // picture of the plant
        fertilization: '',      // fertilization interval in days
        dayZeroW: dateNow(),    // 'day zero' for counting when watering is needed
        dayZeroF: dateNow()     // 'day zero' for counting when fertilization is needed 
    });

    const [plants, setPlants] = useState([]);

    useEffect(() => {
        setupDatabase();
    }, []); 

    // set up database, create table if not already created
    const setupDatabase = () => {
        db.transaction(tx => {
            tx.executeSql(sqlCreate);
            console.log('database ok');
            },
            (error) => console.error('db error (location: setupDatabase)', error),
            () => fetchPlants()
        )
    };

    // get plants from db and set in plants state
    const fetchPlants = () => {
        db.transaction(tx => {
            tx.executeSql(sqlSelect, [], (_, {rows}) => {
                setPlants(rows._array);
            });
            },
            (error) => console.error('db error: select all (location: fetchPlants)', error),
            console.log('fetch success')
        );
    };

    // add plant to db
    const insertPlant = () => {
        db.transaction(tx => {
            tx.executeSql(sqlInsert, [
              plant.plantName,
              plant.species,
              plant.avatar,
              parseInt(plant.watering),
              parseInt(plant.fertilization),
              plant.dayZeroW,
              plant.dayZeroF
            ]);
            console.log('db: row added');
        },
            (error) => console.error('db error: insert new row (location: insertPlant)', error),
            fetchPlants
        );
    };

    // delete plant from db
    const deletePlant = (item) => {
        db.transaction(
          (tx) => {
            tx.executeSql(sqlDelete, [item.id]);
          },
          (error) => console.error('db error: delete row (location: deletePlant)', error),
          () => {
            Alert.alert(`Plant Deleted: ${item.plantName}`);
            fetchPlants();
          }
        );
    };

    // update plant changes to db
    const updatePlant = (item, id) => {
        db.transaction(
          (tx) => {
            tx.executeSql(sqlUpdate, [
                item.plantName,
                item.species,
                parseInt(item.watering),
                parseInt(item.fertilization),
                id
            ]);
          },
          (error) => console.error('db error: update row (location: updatePlant)', error),
          () => {
            Alert.alert('Plant Updated!');
            fetchPlants()
          }
        );
    };

    // set dayZeroW to current date and save to db
    const waterPlant = (item) => {
        db.transaction(
            (tx) => {
                tx.executeSql(sqlWater, [
                    dateNow(),
                    item.id
                ]);
            },
            (error) => console.error('db error: update row (location: waterPlant)', error),
            () => {
                Alert.alert(`Plant Watered: ${item.plantName}`);
                fetchPlants();
            }
        );
    };

    // set dayZeroF to current date and save to db
    const fertilizePlant = (item) => {
        db.transaction(
            (tx) => {
              tx.executeSql(sqlFertilize, [
                  dateNow(),
                  item.id
              ]);
            },
            (error) => console.error('db error: update row (location: fertilizePlant)', error),
            () => {
              Alert.alert(`Plant Fertilized: ${item.plantName}`);
              fetchPlants()
            }
        );
    };

    // save plant avatar to database
    const updateAvatar = (uri, id) => {
        db.transaction(tx => {
            tx.executeSql(sqlAvatar, [
                uri,
                id
            ]);
            },
            (error) => console.error('db error: update row (location: addAvatar)', error),
            () => {
            console.log('db: avatar updated');
            fetchPlants();
            }
        );
    };

    // add button press
    const add = () => {
        insertPlant();
        clearPlant();
        Alert.alert('Plant Added!');
    };

    // update button press
    const update = (item, id) => {
        updatePlant(item, id)
        clearPlant();
    };

    // clear form
    const clearPlant = () => setPlant({
        plantName: '',
        species: '',
        avatar: null,
        watering: '',
        fertilization: '',
        dayZeroW: dateNow(),
        dayZeroF: dateNow()
    }); 

    return (
        <View style={styles.homeScreen}>
            <View style={styles.row}>
                <CareList plants={plants} water={waterPlant} fertilize={fertilizePlant}/>
                <AddForm plant={plant} setPlant={setPlant} save={add}/>
            </View>
            <PlantList 
                plants={plants} 
                plant={plant} 
                setPlant={setPlant} 
                updateAvatar={updateAvatar} 
                save={update} 
                clearPlant={clearPlant} 
                deletePlant={deletePlant}
                waterPlant={waterPlant}
                fertilizePlant={fertilizePlant}
            />
        </View>
    );
}