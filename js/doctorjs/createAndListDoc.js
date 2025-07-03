window.onload = readJson("doctors");

document.getElementById("formDoctor").addEventListener('submit', function(event) {
    event.preventDefault();

    let doctors = JSON.parse(localStorage.getItem('doctors'));
    if (doctors == null) {
        doctors = []
    }
    if (validateFormDoc()) {
        // Effacement des erreurs
        document.getElementById('error-message').innerHTML = "";
        // creation ephemere de l'objet
        let doctor = new Doctors(this.firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1).toLowerCase(), this.lastName.value.toUpperCase(), this.RPPS.value, new Date(this.birthDate.value), this.speciality.value);
        this.reset();
        // Envoi du tout en LocalStorage
        if (!checkRpps(doctors, doctor)) {
            sameMedecin(doctor);
            return
        } else {
            addLocalStorage(doctors,doctor, "doctors");
        }
        // Utilisation de l'objet pour creer l'HTML
        createDoctorHtml(doctor);
        
    }
});

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
        
        
        // Verif Specialité

           /*  //Verifi si Specialité n'est pas vide
            if (speciality === "") {
                errorMessage += "La spécialité doit etre renseignée.\n";
            }

            // verif des lettres
            if (!regexLetters.test(speciality)) {
                errorMessage += "La spécialitédoit etre composée uniquement de lettres.\n";
            } */

            
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

// Ajout de la verification du numero Rpps Avant le push
function checkRpps(tab, doctor) {
    
    for (let i= 0; i < tab.length; i++) {
        if (tab[i].rpps == doctor.rpps) {
            return false
        }
    }
    return true
}

function sameMedecin(doctor) {
    let sameDoc = document.getElementById('sameDoc');
    sameDoc.style.color = 'red';
    sameDoc.textContent = `Docteur ${doctor.firstName} ${doctor.lastName}  est deja enregistré \n dans la base de donnée.`
}

function createDoctorHtml(doctor) {
    let sectionDoc = document.getElementById("listDoctor");
    let newDiv = document.createElement("div");
    let pLastName = document.createElement("p");
    let pFirstName = document.createElement("p");
    let pSpeciality = document.createElement("p");
    let linkDoctorConsult = document.createElement('a');
    let linkDoctorModif = document.createElement('a');
    let suppDoc = document.createElement('p');
    pLastName.appendChild(document.createTextNode(doctor.lastName));
    pFirstName.appendChild(document.createTextNode(doctor.firstName));
    pSpeciality.appendChild(document.createTextNode(doctor.speciality));
    linkDoctorConsult.appendChild(document.createTextNode('Consulter'));
    linkDoctorConsult.setAttribute("href", `/pages/doctor/consultation.html?rpps=${doctor.rpps}`);
    linkDoctorModif.appendChild(document.createTextNode('Modifier'));
    linkDoctorModif.setAttribute("href", `/pages/doctor/modif.html?rpps=${doctor.rpps}`);
    suppDoc.appendChild(document.createTextNode('Supprimer'));
    suppDoc.setAttribute("id", `supp${doctor.rpps}`);
    suppDoc.setAttribute("class", `suppData`);
    newDiv.setAttribute("id", `${doctor.rpps}`)
    newDiv.appendChild(pLastName);
    newDiv.appendChild(pFirstName);
    newDiv.appendChild(pSpeciality);
    newDiv.appendChild(linkDoctorConsult);
    newDiv.appendChild(linkDoctorModif);
    newDiv.appendChild(suppDoc);
    sectionDoc.appendChild(newDiv);
}


//Bouton suppression 
let supp = document.getElementsByClassName('suppData');

for (let i=0; i<supp.length; i++){
    supp[i].addEventListener('click', function(event){
        let idSupp = event.target.id.replace(/\D/g, '');
        let divDoc = document.getElementById(idSupp);
        let listDoctor =document.getElementById('listDoctor');
        suppLocalStorageDoc('doctors', idSupp);  
        listDoctor.removeChild(divDoc);
    })
}

function readJson(nameKey) {
    const contenue= localStorage.getItem(nameKey);
        if (contenue) {
            let contenueNoJson = JSON.parse(contenue);
            for (let i=0; i < contenueNoJson.length; i++) {
                createDoctorHtml(contenueNoJson[i]);
            }
        }
}

