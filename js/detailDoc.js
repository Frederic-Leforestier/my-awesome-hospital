window.onload = loadConsulationDoctor();

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
function checkRpps(tab, doctor) {
    
    for (let i= 0; i < tab.length; i++) {
        if (tab[i].rpps == doctor.rpps) {
            return false
        }
    }
    return true
}




document.getElementById("formApp").addEventListener('submit', function(event) {
    event.preventDefault();

    let appointement = JSON.parse(localStorage.getItem('appointement'));
    if (appointement == null) {
        appointement = []
    }
    

    console.log(appointement)
console.log(new Date(`${this.date.value}T${this.time.value}`))
console.log(this.patientList.options[this.patientList.selectedIndex].text)
    if(validateFormAppoitement()) {
        let doctor = recreateClassDoctor();
        console.log(doctor);
        let newApp = new Appointement(new Date(`${this.date.value}T${this.time.value}`), doctor.rpps,this.patientList.value, this.raeson.value)
        console.log(newApp);
    }
})
