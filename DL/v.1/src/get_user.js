// import * as SQLite from "expo-sqlite";

// /////// Get info from database

// const getPersonById = async (id) => {
//     const db = await connectDatabase();
//     if (db) {
//         const sql = `SELECT * FROM person WHERE id = ?`;
//         const person = await execAsync(db, sql, [id]);
//         return person;
//     } else {
//         console.log('No se pudo conectar a la base de datos.');
//         return null;
//       }
//   };

// const connectDatabase = async () => {
// try {
//     const db = SQLite.openDatabase("personal-data-app");
//     return db;
// } catch (error) {
//     console.error(error);
//     return null;
// }
// };

// const execAsync = async (db, sql, params = []) =>
//   new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         sql,
//         params,
//         (_, { rows }) => resolve(rows._array),
//         (_, error) => reject(error)
//       );
//     });
//   });


// const person = getPersonById(1).then(person => console.log(person));
// console.log(person)

// ///////////////////// Offer







//Model 

const tf = require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');


// Load universal-sentence-encoder.
async function load_model() {
  try {
    const model = await use.load();
    console.log('Modelo cargado exitosamente');
    return model;
  } catch (error) {
    console.error('Error al cargar el modelo:', error);
  }
}

async function encodeText(input, model) {
  // Encode the text into a tensor
  const embeddings = await model.embed(input);
  // Use the embeddings for something (e.g., print them to the console)
  // embeddings.print(true); // 'true' enables verbose output
  return embeddings;
}

async function calculateSimilarity(embeddings) {
  const normalizedEmbeddings = embeddings.div(tf.norm(embeddings, 'euclidean', 1, true));
  const similarity = tf.matMul(normalizedEmbeddings, normalizedEmbeddings.transpose()); // Transponer el segundo tensor
  const similarityScore = await similarity.array().then(arr => arr[0][1]);
  return similarityScore;
}

async function main() {
  // Cargar el modelo
  let model;
  try {
    model = await load_model();
    console.log('Modelo cargado exitosamente');
  } catch (error) {
    console.error('Error al cargar el modelo:', error);
  }

  // Ejemplo de texto para codificar
  const cv = "tengo conocimiento en python y web";
  const offer = "buscamos gente que tenga conocimiento en python y desarrollo web";

  const embeddings = await encodeText([cv,offer], model);
  
  const similarityScore = await calculateSimilarity(embeddings).catch(console.error);

  // Imprimir las incrustaciones (embeddings) en la consola
  console.log(`Similarity Score between the two texts: ${similarityScore.toFixed(3)}`);
  console.log(`Èxiste una similitud de: ${convertirEscala(similarityScore)} %`)
}

async function matchCVOffer(cv,offer) {
  // Cargar el modelo
  let model;
  model = await load_model();

  const embeddings = await encodeText([cv,offer], model);
  
  const similarityScore = await calculateSimilarity(embeddings).catch(console.error);

  // Imprimir las incrustaciones (embeddings) en la consola
  console.log(`Similarity Score between the two texts: ${similarityScore.toFixed(3)}`);
  console.log(`Èxiste una similitud de: ${convertirEscala(similarityScore)} %`)
  return convertirEscala(similarityScore)
}

function convertirEscala(valorOriginal) {
  var valorNormalizado = (valorOriginal + 1) / 2;
  var valorFinal = valorNormalizado * 100;
  valorFinal = valorFinal.toFixed(2);
  return valorFinal;
}

// main().catch(error => {
//   console.error('Error:', error);
// });
