// Creation
function addLocalStorage(tab,objet,nameKey) {
    tab.push(objet);
    localStorage.setItem(nameKey, JSON.stringify(tab));
    }
    

/* document.getElementById('resetStorage').addEventListener('click', function(){
    localStorage.clear()
}); */

function readJson(nameKey) {
    const contenue= localStorage.getItem(nameKey);
        if (contenue) {
            let contenueNoJson = JSON.parse(contenue);
            for (let i=0; i < contenueNoJson.length; i++) {
                createDoctorHtml(contenueNoJson[i]);
            }
        }
}

//Suppresion Doc 
function suppLocalStorageDoc(key, id) {
    let contenue = JSON.parse(localStorage.getItem(key));
    console.log(contenue);
    
    contenue = contenue.filter((key) => key.rpps != id)
    console.log(contenue)
    localStorage.setItem(key, JSON.stringify(contenue));
}

//Suppresion PAtien
function suppLocalStorageDoc(key, id) {
    let contenue = JSON.parse(localStorage.getItem(key));
    contenue = contenue.filter((key) => key.rpps != id);
    localStorage.setItem(key, JSON.stringify(contenue));
}

// Recuperation du rpps et creation de l'html lors de l'ouverture de la consultation.

function loadConsulationDoctor () {
    let recupRpps = new URLSearchParams(window.location.search);
    let rpps = recupRpps.get("rpps");
    console.log(rpps);
    let doctorTab = JSON.parse(localStorage.getItem('doctors'));
    doctorTab = doctorTab.find((index) => index.rpps === rpps);
    console.log(doctorTab)
    let doctor = new Doctors(doctorTab.firstName, doctorTab.lastName, doctorTab.rpps, new Date(doctorTab.birthDate), doctorTab.speciality);
    console.log(doctor.birthDate);
    createDetailDoctorHtml(doctor);
}