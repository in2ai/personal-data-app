import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as use from '@tensorflow-models/universal-sentence-encoder';

export async function initTfjs() {
  await tf.ready();
  console.log('TensorFlow.js está listo');
  console.log(tf.getBackend());
}

async function testModel() {
  try {
    const model = await load_model();
    const testEmbedding = await model.embed(['Hello world']);
    console.log('Codificación de prueba exitosa:', testEmbedding);
  } catch (error) {
    console.error('Falló la prueba del modelo:', error);
  }
}

// initTfjs();
// testModel();

export async function load_model() {
  let model;
  try {
    model = await use.load(); // Load the model
    console.log('Modelo cargado exitosamente');
  } catch (error) {
    console.error('Error al cargar el modelo:', error);
  }
  return model;
}

async function encodeText(input, model) {
  const embeddings = await model.embed(input);
  console.log(embeddings);
  return embeddings;
}

async function calculateSimilarity(embeddings) {
  const norms = tf.norm(embeddings, 'euclidean', 1, true); // Keep dimensions to broadcast
  const normalizedEmbeddings = embeddings.div(norms);
  const similarity = tf.matMul(normalizedEmbeddings, normalizedEmbeddings.transpose());
  const similarityArray = await similarity.array();
  const similarityScore = similarityArray[0][1];
  return similarityScore;
}

export async function matchCVOffer(cv, offer, model) {
  try {
    const sentences = [cv, offer];
    console.log('//CV:', cv);
    console.log('//Offer:', offer);
    const embeddings = await encodeText(sentences, model);
    const similarityScore = await calculateSimilarity(embeddings);

    console.log(`Similarity Score between the two texts: ${similarityScore.toFixed(3)}`);
    const similarityPercentage = convertirEscala(similarityScore);
    console.log(`Existe una similitud de: ${similarityPercentage} %`);
    return similarityPercentage;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

function convertirEscala(valorOriginal) {
  var valorNormalizado = (valorOriginal + 1) / 2;
  var valorFinal = valorNormalizado * 100;
  valorFinal = valorFinal.toFixed(2);
  return valorFinal;
}

export function jsonToSpaceDelimitedText(obj) {
  let result = '';

  function recurse(obj) {
    if (obj !== null && typeof obj === 'object') {
      Object.entries(obj).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            recurse(item);
          });
        } else if (typeof value === 'object') {
          recurse(value);
        } else {
          result += `${value} `;
        }
      });
    } else {
      result += `${obj} `;
    }
  }

  recurse(obj);
  return result.trim();
}
