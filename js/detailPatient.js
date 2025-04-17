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
