document.getElementById("formPatient").addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire pour éviter le rechargement de la page

    
    if (validatePatientForm()) {
        // Création d'un nouveau patient avec les données du formulaire
        const newPatient = new Patient(
            this.elements["firstName"].value,
            this.elements["lastName"].value,
            this.elements["birthdate"].value,
            this.elements["numSecu"].value,
            this.elements["mail"].value,
            this.elements["tel"].value
        );
        
        addPatientToList(newPatient);  // Ajouter à la liste des patients
        alert("Le patient a été ajouté avec succès !");
        document.getElementById("formPatient").reset(); // Réinitialise le formulaire
    }
});

function addPatientToList(patient) {
    const listSection = document.createElement("div");

    // Création de chaque paragraphe et ajout du texte
    const nameP = document.createElement("p");
    nameP.appendChild(document.createTextNode("Nom : " + patient.lastName));

    const firstNameP = document.createElement("p");
    firstNameP.appendChild(document.createTextNode("Prénom : " + patient.firstName));

    const birthDayP = document.createElement("p");
    birthDayP.appendChild(document.createTextNode("Date de naissance : " + patient.birthDay));

    const secuNumberP = document.createElement("p");
    secuNumberP.appendChild(document.createTextNode("Numéro de sécu : " + patient.secuNumber));

    const mailP = document.createElement("p");
    mailP.appendChild(document.createTextNode("Email : " + patient.mail));

    const phoneP = document.createElement("p");
    phoneP.appendChild(document.createTextNode("Téléphone : " + patient.phone));

    // Ajout des paragraphes au div principal
    listSection.appendChild(nameP);
    listSection.appendChild(firstNameP);
    listSection.appendChild(birthDayP);
    listSection.appendChild(secuNumberP);
    listSection.appendChild(mailP);
    listSection.appendChild(phoneP);

    // Ajouter la nouvelle section à la liste des patients
    document.getElementById("patientList").appendChild(listSection);
}

function validatePatientForm() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let secuNumber = document.getElementById("numSecu").value;
    let mail = document.getElementById("mail").value;
    let phone = document.getElementById("tel").value;
    let birthDate = document.getElementById("birthdate").value;
    
    let errorMessage = ""; // Variable pour stocker les erreurs

    if (firstName === "") {
        errorMessage += "Le prénom est obligatoire.\n";
    }

    let regexLastName = /^[A-Z]+([- ][A-Z]+)*$/;
    if (lastName === "" || !regexLastName.test(lastName)) {
        errorMessage += "Le nom est obligatoire et doit être en MAJUSCULE.\n";
    }

    let regexSecuNumber = /^[12]\d{12}$/;
    if (secuNumber === "" || !regexSecuNumber.test(secuNumber)) {
        errorMessage += "Le numéro de sécurité sociale est obligatoire et doit être composé de 13 chiffres.\n";
    }

    let regexMail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (mail === "" || !regexMail.test(mail)) {
        errorMessage += "L'email est obligatoire et doit être valide.\n";
    }

    let regexPhone = /^0\d{9}$/;
    if (phone === "" || !regexPhone.test(phone)) {
        errorMessage += "Le numéro de téléphone est obligatoire et doit contenir 10 chiffres.\n";
    }

    if (birthDate) {
        let birthdate = new Date(birthDate);
        if (birthdate > new Date()) {
            errorMessage += "La date de naissance ne peut pas être dans le futur.\n";
        }
    } else {
        errorMessage += "Veuillez saisir une date de naissance.\n";
    }

    if (errorMessage !== "") {
        document.getElementById("error-message").textContent = errorMessage;
        document.getElementById("error-message").style.display = "block";
        return false;
    } else {
        document.getElementById("error-message").style.display = "none";
    }

    return true;
}