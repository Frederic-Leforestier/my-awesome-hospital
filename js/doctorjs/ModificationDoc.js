window.onload = loadConsulationDoctor();

// Recuperation du rpps et creation de l'html lors de l'ouverture de la consultation.

function loadConsulationDoctor () {
    let doctor = recreateClassDoctor();
    console.log(doctor);
    valueModif(doctor);
}

// Recréation de l'objet doc
function recreateClassDoctor() {
    let rpps = recupRpps();
    let doctorTab = JSON.parse(localStorage.getItem('doctors'));
    doctorTab = doctorTab.find((index) => index.rpps === rpps);
    let doctor = new Doctors(doctorTab.firstName, doctorTab.lastName, doctorTab.rpps, new Date(doctorTab.birthDate), doctorTab.speciality);
    return doctor
}

// Récupération du rpps dans l'Html
function recupRpps() {
    let recupRpps = new URLSearchParams(window.location.search);
    let rpps = recupRpps.get("rpps");
    return rpps
}
// Changement du format de la date en format input
function formatDateToInput(date) {
    let newDate = new Date(date)
    return newDate.toISOString().split('T')[0];
}

// Remplir les input de modification avec l'objet Doc
function valueModif(doctor) {
    let lastName = document.forms["formDoctor"]["lastName"];
    let firstName = document.forms["formDoctor"]["firstName"];
    let birthDate = document.forms["formDoctor"]["birthDate"];
    let rpps = document.forms["formDoctor"]["RPPS"];
    let speciality = document.forms["formDoctor"]["speciality"];

    lastName.value = `${doctor.lastName}`;
    firstName.value = `${doctor.firstName}`;
    birthDate.value = formatDateToInput(`${doctor.birthDate}`);
    rpps.value = `${doctor.rpps}`;
    speciality.value = `${doctor.speciality}`;
}

// Validation du formulaire
function validateFormDoc() {
    let lastName = document.forms["formDoctor"]["lastName"].value.trim();
    let firstName = document.forms["formDoctor"]["firstName"].value;
    let birthDate = document.forms["formDoctor"]["birthDate"].value;
    let RPPS = document.forms["formDoctor"]["RPPS"].value;
    let speciality = document.forms["formDoctor"]["speciality"].value;
    let errorMessage = "";
    let regexLetters = /^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸa-zàâäçéèêëîïôöùûüÿ\s'-]+$/;
    let regexRPPS = /^\d{11}$/;

    // Test des input

        // Verif input lastName

            //Verifi si lastName n'est pas vide
            if (lastName === "") {
                errorMessage += "Le nom de famille doit etre renseigné.\n";
            }
            
            // Verif des lettres
            else if (!regexLetters.test(lastName)) {
                errorMessage += "Le nom de famille doit etre composé uniquement de lettres\n";
            }

        // Verif input firstName

            //Verifi si firstName n'est pas vide
            if (firstName === "") {
                errorMessage += "Le prénom doit etre renseigné.\n";
            }

            // Verif des lettres
            else if (!regexLetters.test(firstName)) {
                errorMessage += "Le prénom doit etre composé uniquement de lettres.\n";
            }


        
        // Verif Date

            // Verif si date superieur a la date du jour

                // Convertir la chaîne en objet Date sans l'heure
                let inputDate = new Date(birthDate);
                inputDate.setHours(0, 0, 0, 0);
                
                // Obtenir la date du jour sans l'heure
                let today = new Date();
                today.setHours(0, 0, 0, 0);
            
            
            if (isNaN(inputDate.getTime())) {
                errorMessage += "Aucune date selectionée\n"; 
            } else if (inputDate > today) {
                errorMessage += "Seriez-vous un T-800 ? Car au cas où, je ne connais pas de Sarah Connor.\n";
            }
        

        // Verif RPPS
        if (RPPS === "") {
            errorMessage += "Le RPPS doit etre renseigné.\n";
        } else if (regexLetters.test(RPPS)) {
            errorMessage += "Le RPPS doit etre composé uniquement de chiffres.\n";
        } else if (!regexRPPS.test(RPPS)) {
            errorMessage += "Le RPPS saisi n'est pas conforme\n";
        }

        // verif specialité
        if (speciality === "") {
            errorMessage += "La spécialité doit etre renseignée.\n";
        } else if (!regexLetters.test(speciality)) {
            errorMessage += "La spécialité doit etre composée uniquement de lettres.\n";
        }

    // Affichage message erreur
    if (errorMessage !== "") {
        document.getElementById('error-message').style.color = "red";
        document.getElementById('error-message').innerText = errorMessage;
        return false; // Sert pour stopper le submit du formulaire a cause de l'erreur
    }
    return true
}

document.getElementById("formDoctor").addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    if(validateFormDoc()) {
        
        // Effacement des erreurs
        document.getElementById('error-message').innerHTML = "";
        // creation ephemere de l'objet
        let doctor = new Doctors(this.firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1).toLowerCase(), this.lastName.value.toUpperCase(), this.RPPS.value, new Date(this.birthDate.value), this.speciality.value);
        // Recuperation du fichier des doctors
        let doctors = JSON.parse(localStorage.getItem('doctors'));
        if (doctors == null) {
            doctors = []
        }
        let updatedDoctors = doctors.filter(doc => doc.rpps !== doctor.rpps);
        addLocalStorage(updatedDoctors,doctor, "doctors");
        document.getElementById('validation').style.color = "green";
        document.getElementById('validation').innerText = 'La modification a etait enregistrer';
    }            

});