window.onload = loadConsulationPatient();

function createDetailPatientHtml(patient) {
    // let dateFr = new Date(doctor.date).toLocaleDateString("fr-FR");

    let main = document.getElementById('patientDetails');
    let newdiv = document.createElement('div');
    let h1Name = document.createElement('h1');
    let pDate = document.createElement('p');
    let pNumSecu = document.createElement('p');
    let pMail = document.createElement('p');
    let pPhone = document.createElement('p');

    //Ajout du contenue dans h1
    h1Name.appendChild(document.createTextNode(`Patient  ${patient.firstName} ${patient.lastName}`));
    // Ajout du contenue dans pdate
    pDate.appendChild(document.createTextNode(`Date de naissance : ${patient.birthDate.toLocaleDateString("fr-FR")}`));
    // Ajout du contenue dans pNumSecu
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
        return null; // Retourne null si le secuNumber est absent
    }

    // Récupère les patients du localStorage
    let patientTab = JSON.parse(localStorage.getItem('patients'));
    if (!patientTab) {
        console.error("Aucun patient trouvé dans le localStorage.");
        return null; // Retourne null si le localStorage est vide
    }

    // Trouve le patient correspondant au secuNumber
    patientTab = patientTab.find((index) => index.secuNumber === secuNumber);
    if (!patientTab) {
        console.error(`Aucun patient trouvé avec le numéro de sécurité sociale: ${secuNumber}`);
        return null; // Retourne null si aucun patient n'est trouvé
    }

    // Si tout est ok, crée un objet Patient
    let patient = new Patient(patientTab.firstName, patientTab.lastName, new Date(patientTab.birthDay), patientTab.secuNumber, patientTab.mail, patientTab.phone);
    return patient;
}


function checkSecuNumber(tab, patient) {
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].secuNumber == patient.secuNumber) {
            return false;
        }
    }
    return true;
}

function loadConsulationPatient () {
    let recupNumSecu = new URLSearchParams(window.location.search);
    let NumSecurite = recupNumSecu.get("numSecu");
    console.log(NumSecurite);
    let patientTab = JSON.parse(localStorage.getItem('patients'));
    patientTab = patientTab.find((index) => index.secuNumber === NumSecurite);
    console.log(patientTab)
    let patien = new Patient(patientTab.firstName, patientTab.lastName, new Date(patientTab.birthDate), patientTab.secuNumber,
    patientTab.mail, patientTab.phone);
    createDetailPatientHtml(patien);

    // Chargement des rendez-vous
    loadAppointments(patien);  // Appel de la fonction pour charger les rendez-vous
}

document.getElementById("formApp").addEventListener('submit', function(event) {
    event.preventDefault();

    let appointement = JSON.parse(localStorage.getItem('appointement'));
    if (appointement == null) {
        appointement = [];
    }

    if (validateFormAppoitementPatient()) {
        let patient = recreateClassPatient();  // récupération du patient depuis l'URL + localStorage
        
        // Vérification de la date et de la raison avant de créer le rendez-vous
        console.log("Date: ", this.date.value);
        console.log("Time: ", this.time.value);
        console.log("Raison: ", this.raeson.value);  // Assure-toi que le champ "raeson" existe

        let newApp = new Appointement(
            new Date(`${this.date.value}T${this.time.value}`),  // Vérifie la bonne date ici
            doctorList.options[doctorList.selectedIndex].text, 
            `${patient.firstName} ${patient.lastName}`,  // patient
            this.raeson.value  // raison
        );
        
        appointement.push(newApp);
        localStorage.setItem("appointement", JSON.stringify(appointement));
        alert("Rendez-vous ajouté avec succès !");

        // Ajout du rendez-vous et des détails dans la liste
        patient.appointmentDate = newApp.date;  // Ajoute la date du rendez-vous
        patient.appointmentReason = newApp.reason;  // Ajoute la raison du rendez-vous
        addAppointmentPatient(patient);
    }
});

function validateFormAppoitementPatient() {
    let date = document.forms["formApp"]["date"].value;
    let time = document.forms["formApp"]["time"].value;
    const finalDate = new Date(`${date}T${time}`);
    let doctorList = document.forms["formApp"]["doctorList"];
    let raeson = document.forms["formApp"]["raeson"].value;
    let errorMessage = "";
    let today = new Date();
            
    if (isNaN(finalDate.getTime())) {
        errorMessage += "Aucune date selectionée\n"; 
    } else if (finalDate < today) {
        errorMessage += "Bonjour turfu guys\n";
    }

    if ( doctorList.options[doctorList.selectedIndex].text == "--Choissisez le patient--") {
        errorMessage += "Veuillez choisir un Docteur \n"
    }

    if ( raeson == "") {
        errorMessage += "Veuillez renseigner une raison pour le rendez vous\n"; 
    }

    // Affichage message erreur
    if (errorMessage !== "") {
        document.getElementById('error-message').style.color = "red";
        document.getElementById('error-message').innerText = errorMessage;
        return false; // Sert pour stopper le submit du formulaire a cause de l'erreur
    }
    return true
}

function addAppointmentPatient(patient) {
    const listSection = document.createElement("div");
    
    // Création de chaque paragraphe et ajout du texte
    const nameP = document.createElement("p");
    nameP.appendChild(document.createTextNode(`Nom : ${patient.lastName} ${patient.firstName}`));

    const doctorP = document.createElement("p");
    doctorP.appendChild(document.createTextNode(`Médecin : Dr. X`));  // Tu peux récupérer le médecin sélectionné si besoin

    const dateP = document.createElement("p");
    dateP.appendChild(document.createTextNode(`Date du rendez-vous : ${new Date(patient.appointmentDate).toLocaleString("fr-FR")}`));  // Utilisation de la date du rendez-vous

    const reasonP = document.createElement("p");
    reasonP.appendChild(document.createTextNode(`Raison : ${patient.appointmentReason}`));  // Raison du rendez-vous

    // Ajout des paragraphes au div principal
    listSection.appendChild(nameP);
    listSection.appendChild(doctorP);
    listSection.appendChild(dateP);
    listSection.appendChild(reasonP);

    // Ajouter la nouvelle section à la liste des rendez-vous
    document.getElementById("listRdv").appendChild(listSection);
}

// Nouvelle fonction pour charger les rendez-vous
function loadAppointments(patient) {
    const appointements = JSON.parse(localStorage.getItem('appointement')) || [];
    const listRdv = document.getElementById("listRdv");

    // Filtrer les rendez-vous qui concernent ce patient
    const patientAppointments = appointements.filter(app => app.patient === `${patient.firstName} ${patient.lastName}`);

    // Affichage des rendez-vous avec une boucle for
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
