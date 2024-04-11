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
  return embeddings;
}

async function Similarity(embeddings) {
  const norms = tf.norm(embeddings, 'euclidean', 1,true); // Keep dimensions to broadcast
  const normalizedEmbeddings = embeddings.div(norms);
  const similarity = tf.matMul(normalizedEmbeddings, normalizedEmbeddings.transpose());
  const similarityArray = await similarity.array();
  const similarityScore = similarityArray[0][1];
  const int_similarity = parseFloat(similarityScore)
  return int_similarity;
}

function convertirEscala(valorOriginal) {
  var valorNormalizado = (valorOriginal + 1) / 2;
  var valorFinal = valorNormalizado * 100;
  valorFinal = valorFinal.toFixed(2);
  return valorFinal;
}

async function calculateSimilarity(sentences,model) {
  const embeddings = await encodeText(sentences, model)
  const similarityScore = await Similarity(embeddings);
  return convertirEscala(similarityScore)
}

async function calculateSimilarityTotal(cv, offer, weights, model) {
  console.log('cv', cv);
  console.log('offer', offer);

  let similarityTotal = 0;

  // Calcular similitud de habilidades

  let skillsCv = new Set(cv.skills.map(skill => skill.value.toLowerCase()));
  let requiredSkillsOffer = new Set(offer.requiredSkills.map(skill => skill.toLowerCase()));
  let intersectionSkills = new Set([...skillsCv].filter(x => requiredSkillsOffer.has(x)));
  let similaritySkills = (intersectionSkills.size / requiredSkillsOffer.size) * 100;

  // Calcular similitud de ubicación
  let similarityUbicacion = await calculateSimilarity([cv.geoLocation, offer.location],model);

  let similarityExperiences = []; 
  let similarityTitles = [];
  let similarityLocations = [];
  for (let i = 0; i < cv.experiences.length; i++) {
    let similarity = await calculateSimilarity([cv.experiences[i].description, offer.summary],model);
    let title = await calculateSimilarity([cv.experiences[i].title, offer.title],model);
    let location = await calculateSimilarity([cv.experiences[i].location, offer.location],model)
    similarityExperiences.push(parseFloat(similarity));
    similarityTitles.push(parseFloat(title));
    similarityLocations.push(parseFloat(location));
  }
  let maxSimilarityExperiences= Math.max(...similarityExperiences)
  const average = array => array.reduce((a, b) => a + b) / array.length;
  let averageSimilarityTitles = average(similarityTitles)
  let averageSimilarityLocations = average(similarityLocations)

  // Calcular similitud de título de trabajo y resumen
  let similarityHeadlineTitle = await calculateSimilarity([cv.headline, offer.title],model);
  let similarityHeadlineSummery = await calculateSimilarity([cv.headline, offer.summary],model);
  let similarityHeadline = (parseFloat(similarityHeadlineTitle) + parseFloat(similarityHeadlineSummery)) / 2

  // Ponderar y sumar similitudes
  similarityTotal += similaritySkills * weights.skills;
  similarityTotal += parseFloat(similarityUbicacion) * weights.ubicacion;
  similarityTotal += maxSimilarityExperiences * weights.experience;
  similarityTotal += averageSimilarityTitles * weights.title;
  similarityTotal += averageSimilarityLocations * weights.location;
  similarityTotal += similarityHeadline * weights.headline;

  console.log(similaritySkills,weights.skills,similaritySkills*weights.skills)
  console.log((similarityUbicacion * 100),weights.ubicacion,(similarityUbicacion * 100)*weights.ubicacion)
  console.log((maxSimilarityExperiences * 100),weights.experience,(maxSimilarityExperiences * 100)*weights.experience)
  console.log((averageSimilarityTitles * 100),weights.title,(averageSimilarityTitles * 100)*weights.title)
  console.log((averageSimilarityLocations * 100),weights.location,(averageSimilarityLocations * 100)*weights.location)
  console.log((similarityHeadline * 100),weights.headline,(similarityHeadline * 100)*weights.headline)

  // Ajustar basado en el peso total
  let sum = 0;
  Object.values(weights).forEach(valor => {
      sum += valor;
  })
  similarityTotal /= sum;
  return similarityTotal;
}

export async function matchCVOffer(cv,offer,model) {

  try {
    let weights = {
        skills: 0.5,
        ubicacion: 0.15,
        experience:0.2,
        title:0.05,
        location:0.05,
        headline: 0.05
    };
    let percentageSimilitud = await calculateSimilarityTotal(cv, offer, weights, model);

    console.log(`Similarity: ${percentageSimilitud.toFixed(2)}`);
    return percentageSimilitud.toFixed(2);
  } catch (error) {
    console.error(error);
    return 0
  }

  //old
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
