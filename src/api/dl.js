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
  return model
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

async function calculateSimilarityTotal(cv, offer, pesos, model) {
  console.log('cv', cv);
  console.log('offer', offer);

  let similitudTotal = 0;

  // Calcular similitud de habilidades

  let skillsCv = new Set(cv.skills.map(skill => skill.value.toLowerCase()));
  let requiredSkillsOffer = new Set(offer.requiredSkills.map(skill => skill.toLowerCase()));
  let interseccionSkills = new Set([...skillsCv].filter(x => requiredSkillsOffer.has(x)));
  let similitudSkills = (interseccionSkills.size / requiredSkillsOffer.size) * 100;

  // Calcular similitud de ubicación
  let similitudUbicacion = await calculateSimilarity([cv.geoLocation, offer.location],model);

  let similitudExperiences = []; 
  let similitudTitles = [];
  let similitudLocations = [];
  for (let i = 0; i < cv.experiences.length; i++) {
    let similitud = await calculateSimilarity([cv.experiences[i].description, offer.summary],model);
    let title = await calculateSimilarity([cv.experiences[i].title, offer.title],model);
    let location = await calculateSimilarity([cv.experiences[i].location, offer.location],model)
    similitudExperiences.push(parseFloat(similitud));
    similitudTitles.push(parseFloat(title));
    similitudLocations.push(parseFloat(location));
  }
  let maxSimilitudExperiences= Math.max(...similitudExperiences)
  const average = array => array.reduce((a, b) => a + b) / array.length;
  let averagesimilitudTitles = average(similitudTitles)
  let averagesimilitudLocations = average(similitudLocations)

  // Calcular similitud de título de trabajo y resumen
  let similitudHeadlineTitle = await calculateSimilarity([cv.headline, offer.title],model);
  let similitudHeadlineSummery = await calculateSimilarity([cv.headline, offer.summary],model);
  let similitudHeadline = (parseFloat(similitudHeadlineTitle) + parseFloat(similitudHeadlineSummery)) / 2

  // Ponderar y sumar similitudes
  similitudTotal += similitudSkills * pesos.skills;
  similitudTotal += parseFloat(similitudUbicacion) * pesos.ubicacion;
  similitudTotal += maxSimilitudExperiences * pesos.experience;
  similitudTotal += averagesimilitudTitles * pesos.title;
  similitudTotal += averagesimilitudLocations * pesos.location;
  similitudTotal += similitudHeadline * pesos.headline;

  console.log(similitudSkills,pesos.skills,similitudSkills*pesos.skills)
  console.log((similitudUbicacion * 100),pesos.ubicacion,(similitudUbicacion * 100)*pesos.ubicacion)
  console.log((maxSimilitudExperiences * 100),pesos.experience,(maxSimilitudExperiences * 100)*pesos.experience)
  console.log((averagesimilitudTitles * 100),pesos.title,(averagesimilitudTitles * 100)*pesos.title)
  console.log((averagesimilitudLocations * 100),pesos.location,(averagesimilitudLocations * 100)*pesos.location)
  console.log((similitudHeadline * 100),pesos.headline,(similitudHeadline * 100)*pesos.headline)

  // Ajustar basado en el peso total
  let suma = 0;
  Object.values(pesos).forEach(valor => {
      suma += valor;
  })
  similitudTotal /= suma;
  return similitudTotal;
}

export async function matchCVOffer(cv,offer,model) {

  try {
    let pesos = {
        skills: 0.5,
        ubicacion: 0.15,
        experience:0.2,
        title:0.05,
        location:0.05,
        headline: 0.05
    };
    let porcentajeSimilitud = await calculateSimilarityTotal(cv, offer, pesos, model);

    console.log(`Similarity: ${porcentajeSimilitud.toFixed(2)}`);
    return porcentajeSimilitud;
  } catch (error) {
    console.error(error);
    return 0
  }

  //old
  try {

    const sentences = [cv, offer];
    const embeddings = await encodeText(sentences, model)
    const similarityScore = await calculateSimilarity(embeddings);

    console.log(`Similarity Score between the two texts: ${similarityScore.toFixed(3)}`);
    const similarityPercentage = convertirEscala(similarityScore);
    console.log(`Existe una similitud de: ${similarityPercentage} %`);
    return similarityPercentage;
  } catch (error) {
    console.error(error);
    return 0
  }

}

export function jsonToSpaceDelimitedText(obj) {
  let result = '';

  function recurse(obj) {
      if (obj !== null && typeof obj === 'object') {
          Object.entries(obj).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                  value.forEach(item => {
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