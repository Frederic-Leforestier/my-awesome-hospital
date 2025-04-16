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

document.getElementById("formApp").addEventListener('submit', function(event) {
    event.preventDefault();
let time = document.getElementById('time');
console.log(time.value);
})
