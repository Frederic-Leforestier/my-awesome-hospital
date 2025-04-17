window.onload = loadConsulationPatient;

function createDetailPatientHtml(patient) {
    let main = document.getElementById('patientDetails');
    let newdiv = document.createElement('div');
    let h1Name = document.createElement('h1');
    let pDate = document.createElement('p');
    let pNumSecu = document.createElement('p');
    let pMail = document.createElement('p');
    let pPhone = document.createElement('p');
    
    //Ajout du contenu dans h1
    h1Name.appendChild(document.createTextNode(`Patient  ${patient.firstName} ${patient.lastName}`));
    // Ajout du contenu dans pdate
    pDate.appendChild(document.createTextNode(`Date de naissance : ${patient.birthDate.toLocaleDateString("fr-FR")}`));
    // Ajout du contenu dans pNumSecu
    pNumSecu.appendChild(document.createTextNode(`Numéro de sécurité sociale : ${patient.secuNumber}`));
    
    pMail.appendChild(document.createTextNode(`Son adresse mail : ${patient.mail}`));
    pPhone.appendChild(document.createTextNode(`Son numéro de téléphone : ${patient.phone}`));
    
    newdiv.appendChild(h1Name);
    newdiv.appendChild(pDate);
    newdiv.appendChild(pNumSecu);
    newdiv.appendChild(pMail);
    newdiv.appendChild(pPhone);
    main.appendChild(newdiv);
}

function recreateClassPatient() {
    let recupsecunumber = new URLSearchParams(window.location.search);
    let secuNumber = recupsecunumber.get("numSecu");
    
    // Vérifie si le paramètre secuNumber est présent dans l'URL
    if (!secuNumber) {
        console.error("Numéro de sécurité sociale manquant dans l'URL.");
        return null;
    }
    
    // Récupère les patients du localStorage
    let patientTab = JSON.parse(localStorage.getItem('patients'));
    if (!patientTab) {
        console.error("Aucun patient trouvé dans le localStorage.");
        return null;
    }
    
    // Trouve le patient correspondant au secuNumber
    patientTab = patientTab.find((index) => index.secuNumber === secuNumber);
    if (!patientTab) {
        console.error(`Aucun patient trouvé avec le numéro de sécurité sociale: ${secuNumber}`);
        return null;
    }
    
    // Si tout est ok, crée un objet Patient
    let patient = new Patient(patientTab.firstName, patientTab.lastName, new Date(patientTab.birthDay), patientTab.secuNumber, patientTab.mail, patientTab.phone);
    return patient;
}

function loadAppointments(patient) {
    const appointements = JSON.parse(localStorage.getItem('appointement')) || [];
    const listRdv = document.getElementById("listRdv");

    // Filtrer les rendez-vous qui concernent ce patient
    const patientAppointments = appointements.filter(app => app.patientSecuNumber === patient.secuNumber);

    // Affichage des rendez-vous
    for (let i = 0; i < patientAppointments.length; i++) {
        const app = patientAppointments[i];
        const listSection = document.createElement("div");

        const nameP = document.createElement("p");
        nameP.appendChild(document.createTextNode(`Nom : ${patient.lastName} ${patient.firstName}`));

        const doctorP = document.createElement("p");
        doctorP.appendChild(document.createTextNode(`Médecin : ${app.doctor}`));

        const dateP = document.createElement("p");
        dateP.appendChild(document.createTextNode(`Date du rendez-vous : ${new Date(app.date).toLocaleString("fr-FR")}`));

        const reasonP = document.createElement("p");
        reasonP.appendChild(document.createTextNode(`Raison : ${app.reason}`));

        // Ajouter chaque élément au div principal
        listSection.appendChild(nameP);
        listSection.appendChild(doctorP);
        listSection.appendChild(dateP);
        listSection.appendChild(reasonP);

        // Ajouter la nouvelle section à la liste des rendez-vous
        listRdv.appendChild(listSection);
    }
}

function loadConsulationPatient() {
    let recupNumSecu = new URLSearchParams(window.location.search);
    let NumSecurite = recupNumSecu.get("numSecu");
    console.log(NumSecurite);
    let patientTab = JSON.parse(localStorage.getItem('patients'));
    patientTab = patientTab.find((index) => index.secuNumber === NumSecurite);
    console.log(patientTab)
    let patient = new Patient(patientTab.firstName, patientTab.lastName, new Date(patientTab.birthDate), patientTab.secuNumber,
    patientTab.mail, patientTab.phone);
    createDetailPatientHtml(patient);
    
    // Chargement des rendez-vous
    loadAppointments(patient);  // Appel de la fonction pour charger les rendez-vous
}
