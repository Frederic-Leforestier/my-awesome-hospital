document.getElementById("formPatient").addEventListener('submit', function(event){
    event.preventDefault();
    if (validatePatientForm()) {
        alert("Les données ont été enregistrées avec succès");
    }
});

function validatePatientForm() {
    // Récupération des valeurs des champs du formulaire
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
    
    let regexLastName = /^[A-Z]+([- ][A-Z]+)*$/;      // ^[A-Z]+ Commence par une ou plusieurs lettres majuscules.  ([- ][A-Z]+)*  zéro ou plusieurs fois (*)  un espace ou un tiret suivi d’au moins une majuscule.
    
    if (lastName === "" || !regexLastName.test(lastName)) {
        errorMessage += "Le nom est obligatoire.\n";
    }
    
    let regexSecuNumber = /^[12]\d{12}$/; // Ici le "regex" impose un 1 ou un 2 en premier lieu ( homme ou femme ) et ensuite il doit contenir 12 chiffres //
    if (secuNumber === "" || !regexSecuNumber.test(secuNumber)) {
        errorMessage += "Le numéro de sécurité sociale est obligatoire et doit être composé de 13 chiffres.\n";
    }
    
    // /^[a-zA-Z0-9_\-\.]+@(([a-zA-Z0-9_]-+)\.)+[a-zA-Z0-9_-]{2,}$/         code identique, en dessous le \w remplace a-zA-Z0-9_ ( oui _ inclus !)
    let regexMail =  /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;     
    console.log(regexMail.test(mail));
    if (mail === "" || !regexMail.test(mail)) {
        errorMessage += "L'email est obligatoire et doit contenir un @ et un .  .\n"
    }
    let regexPhone = /^0\d{9}$/;
    if (phone === "" || !regexPhone.test(phone)) {
        errorMessage += "Le numéro de tél est obligatoire et doit contenir 10 chiffres.\n"
    }
    
    if (birthDate) { // la condition (birhDate) === rempi //
        let birthdate = new Date(birthDate); // on transforme en objet //
        if (birthdate > new Date()) {
            errorMessage += "La date de naissance ne peut pas être dans le futur.\n";
        }
    } else {
        errorMessage += "Veuillez saisir une date de naissance.\n";
    }
    
    if (errorMessage !== "") {
        document.getElementById('error-message').innerText = errorMessage;
        return false; 
    }
    
    return true; 
}

