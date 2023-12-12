
// used sql queries as constants

export const sqlCreate = 'CREATE TABLE IF NOT EXISTS plant (id integer primary key not null, plantName int not null, species text, avatar text, watering int, fertilization int, dayZeroW text, dayZeroF text);';

export const sqlInsert = 'INSERT INTO plant (plantName, species, avatar, watering, fertilization, dayZeroW, dayZeroF) values (?, ?, ?, ?, ?, ?, ?);';

export const sqlSelect = 'SELECT * FROM plant;'

export const sqlDelete = 'DELETE FROM plant where id = ?;';

export const sqlUpdate = 'UPDATE plant SET plantName = ?, species = ?, watering = ?, fertilization = ? WHERE id = ?'

export const sqlWater = 'UPDATE plant SET dayZeroW = ? WHERE id = ?'

export const sqlFertilize = 'UPDATE plant SET dayZeroF = ? WHERE id = ?'

export const sqlAvatar = 'UPDATE plant SET avatar = ? where id = ?';

export const sqlDrop = 'DROP TABLE IF EXISTS plant;';