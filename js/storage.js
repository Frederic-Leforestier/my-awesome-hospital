// Creation
function addLocalStorage(tab,objet,nameKey) {
    tab.push(objet);
    localStorage.setItem(nameKey, JSON.stringify(tab));
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


