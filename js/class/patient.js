class Patient {
    constructor(first, last, birth, secu, mail, phone,) {
        this.firstName = first;
        this.lastName = last;
        this.birthDay = birth;
        this.secuNumber = secu;
        this.mail = mail;
        this.phone = phone;
        this.appointement =[];
    }
};

document.getElementById("formPatient").addEventListener('submit', function(event){
    event.preventDefault();
    if (validatePatientForm()) {
        alert("Les données ont été enregistrées avec succès");
    }
});

function validatePatientForm() {
    // Récupération des valeurs des champs du formulaire
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let secuNumber = document.getElementById("numSecu").value.trim();
    let mail = document.getElementById("mail").value.trim();
    let phone = document.getElementById("tel").value.trim();
    let birthDate = document.getElementById("birthdate").value;
    
    let errorMessage = ""; // Variable pour stocker les erreurs
    
    if (firstName === "") {
        errorMessage += "Le prénom est obligatoire.\n";
    }
    
    if (lastName === "") {
        errorMessage += "Le nom est obligatoire.\n";
    }
    
    let pattern = /^\d{13}$/; // Ici le "regex" impose 13 chiffres //
    if (secuNumber === "" || !pattern.test(secuNumber)) {
        errorMessage += "Le numéro de sécurité sociale est obligatoire et doit être composé de 13 chiffres.\n";
    }
    
    if (mail === "") {
        errorMessage += "L'email est obligatoire.\n"
    }
    
    if (phone === "") {
        errorMessage += "Le numéro de tél est obligatoire.\n"
    }
    
    if (birthDate) { // la condition (birhDate) === rempi //
        let birthdate = new Date(birthDate); // on transforme en objet //
        let today = new Date();  // on créer la date du jour pour le comparer ensuite //
        if (birthdate > today) {
            errorMessage += "La date de naissance ne peut pas être dans le futur.\n";
        }
    } else {
        errorMessage += "Veuillez saisir une date de naissance.\n";
    }
    
    if (errorMessage !== "") {
        document.getElementById('error-message').innerText = errorMessage;
        return false; // Prevent form submission
    }
    
    return true; // Allow form submission
}