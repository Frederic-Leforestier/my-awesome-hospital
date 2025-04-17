window.onload = loadConsulationDoctor();

// Recuperation du rpps et creation de l'html lors de l'ouverture de la consultation.

function loadConsulationDoctor () {
    let doctor = recreateClassDoctor();
    createDetailDoctorHtml(doctor);
    readJson('appointements')
}

function recreateClassDoctor() {
    let rpps = recupRpps();
    let doctorTab = JSON.parse(localStorage.getItem('doctors'));
    doctorTab = doctorTab.find((index) => index.rpps === rpps);
    let doctor = new Doctors(doctorTab.firstName, doctorTab.lastName, doctorTab.rpps, new Date(doctorTab.birthDate), doctorTab.speciality);
    return doctor
}
function recupRpps() {
    let recupRpps = new URLSearchParams(window.location.search);
    let rpps = recupRpps.get("rpps");
    return rpps
}

function readJson(nameKey) {
    const contenue= localStorage.getItem(nameKey);
    console.log(contenue);
        if (contenue) {
            let contenueNoJson = JSON.parse(contenue);
            for (let i=0; i < contenueNoJson.length; i++) {
                addAppToTable(contenueNoJson[i]);
            }
        }
}

function createDetailDoctorHtml(doctor) {/* 
    let dateFr = new Date(doctor.date).toLocaleDateString("fr-FR");
    console.log(dateFr) */
    let main = document.getElementById('doctorDetails');
    let newdiv = document.createElement('div');
    let h1Name = document.createElement('h1');
    let h2Speciality = document.createElement('h2');
    let pDate = document.createElement('p');
    let pRpps = document.createElement('p');
    //Ajout du contenue dans h1
    h1Name.appendChild(document.createTextNode(`Docteur  ${doctor.firstName} ${doctor.lastName}`));
    // Ajout du contenue dans h2
    h2Speciality.appendChild(document.createTextNode(`Specialité(s) : ${doctor.speciality}`));
    // Ajout du contenue dans pdate
    pDate.appendChild(document.createTextNode(`Date de naissance : ${doctor.birthDate.toLocaleDateString("fr-FR")}`));
    // Ajout du contenue dans prpps
    pRpps.appendChild(document.createTextNode(`RPPS : ${doctor.rpps}`))
    newdiv.appendChild(h1Name);
    newdiv.appendChild(h2Speciality);
    newdiv.appendChild(pDate);
    newdiv.appendChild(pRpps);
    main.appendChild(newdiv);
}

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

// Ajout de la verification du numero Rpps Avant le push
function checkDate(tab, patient) {
    
    for (let i= 0; i < tab.length; i++) {
        if (tab[i].rpps == patient.rpps) {
            return false
        }
    }
    return true
}

function sameAppoitement() {
    let sameApp = document.getElementById('sameApp');
    sameApp.style.color = 'red';
    sameApp.textContent = `L'heure du rendez vous existe deja présente`;
}

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
