cv = {"birthDate": "Nov 11", "experiences": [{"companyName": "In2AI", "description": "", "finishedOn": "", "location": "Madrid, España", "startedOn": "Nov 2023", "title": "Senior Data Scientist"}, {"companyName": "HI Iberia Ingeniería y Proyectos", "description": "Implementation of a geospatial intelligence web platform for defence, applied to military problem solving. Using neural networks for the analysis of satellite imagery. – Analyzed and processed of satellite imagery, including geospatial raster data, RPG images, and panchromatic. – Developed computer vision models for classification, identification, heatmap and tracking in satellite images using AI tools like TensorFlow, PyTorch, and Keras. – Designed and oversaw the satellite data collection service (APIs), ensuring data relevance and timeliness, and managed requests without loss. – Implemented and maintained Test and CI/CD processes for consistent and reliable deployments. – Established a message queuing system, ensuring data integrity and preventing losses from overloads. – Crafted deployment (Docker, Kubernetes) solutions for image management, including NAS implementation, ensuring continuous integration and faster deployments. and use of dynamic database (MongoDB, SQL), ensuring data integrity and improving query speed and efficiency.  Optimization of Emerging Renewable Energy Resources for Stability of the Electrical Grid System. – Developed a Reinforcement Learning (RL) based solutions for the optimization and control of electric power generation plants, drawing inspiration from Kaggle-style challenges to devise robust solutions. – Used state-of-the-art RL libraries such as OpenAI and Pytorch to facilitate the development and imple- mentation of the project’s adaptive solutions. – Collaborated in a joint effort between multiple companies: our team was responsible for the RL agent’s implementation, while another company managed the environment.  Drone Integrated Traffic Signal Analysis for Road Infrastructure. – Developed traffic signal detection model and integrating drone geolocation to pinpoint the precise placement of traffic signs – Used models with Pytorch, showcasing proficiency in leveraging cutting-edge technologies for practical real-world applications", "finishedOn": "Oct 2022", "location": "Madrid, Comunidad de Madrid, España", "startedOn": "Feb 2020", "title": "Artificial Intelligence Engineer"}, {"companyName": "EY", "description": "• Validation of risk models for Banco Santander in accordance with the regulatory framework (IRRBB) in American and European countries. • Implementation of data processing pipelines for data analysis (Python, Pandas, Numpy, R, SAS, SQL and Excel). • Management of the Git infrastructure of the projects (Git).", "finishedOn": "Feb 2020", "location": "Madrid y alrededores, España", "startedOn": "Sep 2019", "title": "FSO - Advisory"}, {"companyName": "Autentia Real Business Solutions, S.L.", "description": "- Creation of functionality on the company's intranet. Adding a way to recover the password, taking into account security protocols. Functionality implemented in Java and Spring. - Training course in Kotlin, Java and Spring.", "finishedOn": "Nov 2018", "location": "Madrid y alrededores, España", "startedOn": "Sep 2018", "title": "Intership"}, {"companyName": "everis", "description": "• Monitoring and prediction of signals in real time by an analytical models for a car construction company, to predict the status of the assembly machines. • Ingesting, processing and storing dataset in NoSQL database for the analysis of topics in Twitter. • Training courses (Hive, Spark, Impala, Kafka).", "finishedOn": "Mar 2018", "location": "Madrid y alrededores, España", "startedOn": "Sep 2017", "title": "Intership"}], "firstName": "Luis", "geoLocation": "Viena, Viena, Austria", "headline": "Artificial Vision | Data Science | Data | MSc Data Science @ Universität Wien", "industry": "Software Development", "instantMessengers": "", "lastName": "Caumel Morales", "skills": [{"value": "Google Cloud"}, {"value": "C / C++"}, {"value": "Microsoft Azure"}, {"value": "Amazon Web Services (AWS)"}, {"value": "PySpark"}, {"value": "Administración de bases de datos"}, {"value": "Bases de datos"}, {"value": "MongoDB"}, {"value": "Git"}, {"value": "Mantenimiento del sistema"}, {"value": "Microsoft Excel"}, {"value": "Pandas"}, {"value": "Trabajo en equipo"}, {"value": "Inteligencia artificial"}, {"value": "Diseño de proyectos"}, {"value": "Procesamiento de datos"}, {"value": "Visión por computador"}, {"value": "Gestión de proyectos"}, {"value": "PyTorch"}, {"value": "Autodidacta"}, {"value": "Java"}, {"value": "JavaScript"}, {"value": "HTML"}, {"value": "SQL"}, {"value": "Python"}, {"value": "Linux"}, {"value": "Matemáticas"}, {"value": "C"}, {"value": "Microsoft Word"}, {"value": "Microsoft Office"}, {"value": "Hive"}, {"value": "Impala"}, {"value": "Análisis de Big Data"}, {"value": "Ingesta"}, {"value": "Apache Spark"}, {"value": "Spark"}, {"value": "HDFS"}, {"value": "Apache Kafka"}, {"value": "Sqoop"}, {"value": "Nifi"}, {"value": "Desarrollo web"}, {"value": "Scrum"}, {"value": "TensorFlow"}, {"value": "Keras"}, {"value": "Métodos numéricos"}], "summary": "Data Scientist and Software Engineer with 3 year of experience in Machine learning, Artificial intelligence, developing robust data processing pipelines, models and computer vision, with a Master in Data science and a dual background in Mathematics and Software Engineering. Proficient in a broad array of technical tools ranging from deep learning frameworks to cloud solutions A quick learner with a penchant for innovative problem-solving, seeking challenges that bridge data science and real-world applications.", "twitterHandles": "", "websites": "[PERSONAL:https://github.com/Caumel]", "zipCode": "1080"}
offer = {"title":"Desarrollador Fullstack","summary":"Oferta para aplicaciones móviles y web","requiredSkills":["React","Node.js","MongoDB"],"location":"Madrid","price":50000,"currency":"EUR","period":"year"}

// console.log("cv",cv)
// console.log(cv["summary"])
// console.log(cv["headline"])
// console.log(cv["experiences"][0]["description"])
// console.log(cv["experiences"][0]["location"])
// console.log("Skills",cv["skills"].map(objeto => objeto.value))
// console.log(cv.geoLocation)

// console.log("offer",offer)
// console.log(offer["title"])
// console.log(offer["summary"])
// console.log(offer["requiredSkills"])

function calcularSimilitud(a,b){
    return 0.5
}

function calcularSimilitudTotal(cv, offer, pesos) {
    let similitudTotal = 0;

    // Calcular similitud de habilidades
    let skillsCv = new Set(cv.skills.map(skill => skill.value.toLowerCase()));
    let requiredSkillsOffer = new Set(offer.requiredSkills.map(skill => skill.toLowerCase()));
    let interseccionSkills = new Set([...skillsCv].filter(x => requiredSkillsOffer.has(x)));
    let similitudSkills = (interseccionSkills.size / requiredSkillsOffer.size) * 100;

    // Calcular similitud de ubicación
    let similitudUbicacion = calcularSimilitud(cv.geoLocation, offer.location);

    let similitudExperiences = [];
    let similitudTitles = [];
    let similitudLocations = [];
    for (let i = 0; i < cv.experiences.length; i++) {
        let similitud = calcularSimilitud(cv.experiences[i].description, offer.summery);
        let title = calcularSimilitud(cv.experiences[i].title, offer.title);
        let location = calcularSimilitud(cv.experiences[i].location, offer.title)
        similitudExperiences.push(similitud);
        similitudTitles.push(title);
        similitudLocations.push(location);
    }
    let maxSimilitudExperiences=Math.max(...similitudExperiences)
    const average = array => array.reduce((a, b) => a + b) / array.length;
    let averagesimilitudTitles = average(similitudTitles)
    let averagesimilitudLocations = average(similitudLocations)

    // Calcular similitud de título de trabajo y resumen
    let similitudHeadlineTitle = calcularSimilitud(cv.headline, offer.title);
    let similitudHeadlineSummery = calcularSimilitud(cv.headline, offer.summary);
    let similitudHeadline = (similitudHeadlineTitle + similitudHeadlineSummery) / 2

    // Ponderar y sumar similitudes
    similitudTotal += similitudSkills * pesos.skills;
    similitudTotal += (similitudUbicacion * 100) * pesos.ubicacion;
    similitudTotal += (maxSimilitudExperiences * 100) * pesos.experience;
    similitudTotal += (averagesimilitudTitles * 100) * pesos.title;
    similitudTotal += (averagesimilitudLocations * 100) * pesos.location;
    similitudTotal += (similitudHeadline * 100) * pesos.headline;

    // console.log(similitudSkills,pesos.skills,similitudSkills*pesos.skills)
    // console.log((similitudUbicacion * 100),pesos.ubicacion,(similitudUbicacion * 100)*pesos.ubicacion)
    // console.log((maxSimilitudExperiences * 100),pesos.experience,(maxSimilitudExperiences * 100)*pesos.experience)
    // console.log((averagesimilitudTitles * 100),pesos.title,(averagesimilitudTitles * 100)*pesos.title)
    // console.log((averagesimilitudLocations * 100),pesos.location,(averagesimilitudLocations * 100)*pesos.location)
    // console.log((similitudHeadline * 100),pesos.headline,(similitudHeadline * 100)*pesos.headline)

    // Ajustar basado en el peso total
    let suma = 0;
    Object.values(pesos).forEach(valor => {
        suma += valor;
    })
    similitudTotal /= suma;
    return similitudTotal;
}

let pesos = {
    skills: 0.5,
    ubicacion: 0.15,
    experience:0.2,
    title:0.05,
    location:0.05,
    headline: 0.05
};

let porcentajeSimilitud = calcularSimilitudTotal(cv, offer, pesos);
console.log(porcentajeSimilitud.toFixed(2))