// Creation
function addLocalStorage(tab,objet,nameKey) {
    tab.push(objet);
    localStorage.setItem(nameKey, JSON.stringify(tab));
    }


//Suppresion Doc 
function suppLocalStorageDoc(key, id) {
    let contenue = JSON.parse(localStorage.getItem(key));
    console.log(contenue);
    
    contenue = contenue.filter((key) => key.rpps != id)
    console.log(contenue)
    localStorage.setItem(key, JSON.stringify(contenue));
}

//Suppresion PAtient
function suppLocalStorageDoc(key, id) {
    let contenue = JSON.parse(localStorage.getItem(key));
    contenue = contenue.filter((key) => key.rpps != id);
    localStorage.setItem(key, JSON.stringify(contenue));
}
