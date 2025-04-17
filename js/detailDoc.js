window.onload = loadGlobal();

// Fonction global pour recuperer et reafficher les données
function loadGlobal() {
    loadAppointement();
    loadConsulationDoctor();
    loadPatients();
}

// Function complete pour recupere et reaficher les rdv
function loadAppointement() {
    let appointements = recreateClassApp();
    if (appointements.length == 0) {
        return
    } else {
    for (let i=0; i<appointements.length; i++) {
      addAppToTable(appointements[i])  
    }
    }
    
}

// Function pour recreer class rdv
function recreateClassApp() {
    let appTab = JSON.parse(localStorage.getItem('appointements')) ||[];
    let appointements = [];
    for (let i =0; i<appTab.length; i++){
        let appointement = new Appointement(new Date(appTab[i].date), appTab[i].doctor, appTab[i].patient, appTab[i].reason);
        appointements.push(appointement)
    }
    return appointements
    }
    


// Recuperation du rpps et creation de l'html lors de l'ouverture de la consultation.

function loadConsulationDoctor () {
    let doctor = recreateClassDoctor();
    createDetailDoctorHtml(doctor);
}
// Function pour recreer class doc

function recreateClassDoctor() {
    let rpps = recupRpps();
    let doctorTab = JSON.parse(localStorage.getItem('doctors'));
    doctorTab = doctorTab.find((index) => index.rpps === rpps);
    let doctor = new Doctors(doctorTab.firstName, doctorTab.lastName, doctorTab.rpps, new Date(doctorTab.birthDate), doctorTab.speciality);
    return doctor
}
// Function pour recuperer rpps dans html

function recupRpps() {
    let recupRpps = new URLSearchParams(window.location.search);
    let rpps = recupRpps.get("rpps");
    return rpps
}

// Function pour recreer l'html doc
function createDetailDoctorHtml(doctor) {
    let main = document.getElementById('doctorDetails');
    let newdiv = document.createElement('div');
    let h1Name = document.createElement('h1');
    let h2Speciality = document.createElement('h2');
    let pDate = document.createElement('p');
    let pRpps = document.createElement('p');
    let linkDoctorModif = document.createElement('a');
    //Ajout du contenue dans h1
    h1Name.appendChild(document.createTextNode(`Docteur  ${doctor.firstName} ${doctor.lastName}`));
    // Ajout du contenue dans h2
    h2Speciality.appendChild(document.createTextNode(`Specialité(s) : ${doctor.speciality}`));
    // Ajout du contenue dans pdate
    pDate.appendChild(document.createTextNode(`Date de naissance : ${doctor.birthDate.toLocaleDateString("fr-FR")}`));
    // Ajout du contenue dans prpps
    pRpps.appendChild(document.createTextNode(`RPPS : ${doctor.rpps}`))
    linkDoctorModif.appendChild(document.createTextNode('Modifier'));
    linkDoctorModif.setAttribute("href", `/pages/doctor/modif.html?rpps=${doctor.rpps}`);
    newdiv.appendChild(h1Name);
    newdiv.appendChild(h2Speciality);
    newdiv.appendChild(pDate);
    newdiv.appendChild(pRpps);
    newdiv.appendChild((linkDoctorModif))
    main.appendChild(newdiv);
}

// Function complete pour recuperer les patients et les ajouter a la liste de choix
function loadPatients() {
    let patients = recreateClassPatients();
    console.log(patients);
    for (let i=0; i<patients.length; i++) {
        console.log(patients[i])
      addPatientOption(patients[i]);  
    }
    
    
}

// Function pour recreer class rdv
function recreateClassPatients() {
    let appPatients = JSON.parse(localStorage.getItem('patients')) || [];
    console.log(appPatients);
    let patients = [];
    for (let i =0; i<appPatients.length; i++){
        let patient = new Patient(appPatients[i].firstName, appPatients[i].lastName, new Date(appPatients[i].birthDate), appPatients[i].secuNumber,appPatients[i].mail, appPatients[i].phone)
        patients.push(patient)
    }
    return patients
}

//ajouter nom et prenom du patients dans liste
function addPatientOption(patient) {
    let select = document.getElementById('patientList');
    let option = document.createElement('option');
    option.setAttribute('value', `${patient.secuNumber}`);
    option.appendChild(document.createTextNode(`${patient.lastName} ${patient.firstName}`));
    select.appendChild(option);
  }

// Validation du formulaire de rdv
function validateFormAppoitement() {
    let date = document.forms["formApp"]["date"].value;
    let time = document.forms["formApp"]["time"].value;
    const finalDate = new Date(`${date}T${time}`);
    let patientList = document.forms["formApp"]["patientList"];
    let raeson = document.forms["formApp"]["raeson"].value;
    let errorMessage = "";
    let today = new Date();
            
    if (isNaN(finalDate.getTime())) {
        errorMessage += "Aucune date selectionée\n"; 
    } else if (finalDate < today) {
        errorMessage += "Bonjour DoBROWN\n";
    }

    if ( patientList.options[patientList.selectedIndex].text == "--Choissisez le patient--") {
        errorMessage += "Veuillez choisir un patient \n"
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

//Verification de la date Avant le push
function checkDate(tab, patient) {
    
    for (let i= 0; i < tab.length; i++) {
        if (tab[i].rpps == patient.rpps) {
            return false
        }
    }
    return true
}

//Message si meme date
function sameAppoitement() {
    let sameApp = document.getElementById('sameApp');
    sameApp.style.color = 'red';
    sameApp.textContent = `L'heure du rendez vous existe deja présente`;
}

// Creation pour inserer le rdv en html
function addAppToTable(app) {
    let table = document.getElementById('appTable');
    let row = document.createElement('tr');
    // Format date + heure FR
    let dateStr = app.date.toLocaleDateString('fr-FR');
    let timeStr = `${String(app.date.getHours()).padStart(2, '0')}h${String(app.date.getMinutes()).padStart(2, '0')}`;
    row.innerHTML = 
      `<td>${dateStr} ${timeStr}</td>
      <td>${app.patient}</td>
      <td>${app.reason}</td>`
    ;
    table.appendChild(row);
  }

// Ajout du rdv dans l'objet doc et l'objet patients


  // Evenements du submit
document.getElementById("formApp").addEventListener('submit', function(event) {
    event.preventDefault();

    let appointement = JSON.parse(localStorage.getItem('appointements'));
    if (appointement == null) {
        appointement = []
    }

    if(validateFormAppoitement()) {
        let rpps = recupRpps();
        let newApp = new Appointement(new Date(`${this.date.value}T${this.time.value}`), rpps,this.patientList.value, this.raeson.value);
        this.reset();
        if (!checkDate(appointement, newApp)) {
            sameAppoitement();
            return
        } else {
            addLocalStorage(appointement,newApp, "appointements");
        }
        addAppToTable(newApp);
    }
})
