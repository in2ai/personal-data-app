import * as SQLite from "expo-sqlite";

// Función para obtener los datos de una persona por ID
const getPersonById = async (id) => {
    const db = await connectDatabase();
    if (db) {
        const sql = `SELECT * FROM person WHERE id = ?`;
        const person = await execAsync(db, sql, [id]);
        return person;
    } else {
        console.log('No se pudo conectar a la base de datos.');
        return null;
      }
  };

const connectDatabase = async () => {
try {
    const db = SQLite.openDatabase("personal-data-app");
    return db;
} catch (error) {
    console.error(error);
    return null;
}
};

const execAsync = async (db, sql, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });

getPersonById(1).then(person => console.log(person));
