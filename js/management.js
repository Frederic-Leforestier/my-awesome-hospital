let id = document.getElementById("id_departement");
let nom = document.getElementById("nom_departement");
let form = document.getElementById("formulaire");
let idnom = document.getElementById("id-nom");

form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  if (validForm()) {
    // Récupération des départements enregistrés
    let departements = JSON.parse(localStorage.getItem("departements")) || [];
    
    // Vérifie si l'ID existe déjà
    let idExistant = false;
    for (let i = 0; i < departements.length; i++) {
      if (departements[i].id === id.value.toUpperCase()) {
        idExistant = true;
        break;
      }
    }
    
    if (idExistant) {
      alert("❌ Cet ID existe déjà !");
      return;
    }
    
    // Crée le nouveau département
    let newDep = {
      id: id.value.toUpperCase(),
      nom: nom.value.charAt(0).toUpperCase() + nom.value.slice(1).toLowerCase()
    };
    
    // Sauvegarde dans le localStorage
    departements.push(newDep);
    localStorage.setItem("departements", JSON.stringify(departements));
    
    // Affiche dans le HTML
    createDepartementHtml(newDep);
    
    alert(`✅ Département enregistré : ID = ${newDep.id}, Nom = ${newDep.nom}`);
    
    form.reset(); // Réinitialise le formulaire
  } else {
    alert("❌ Formulaire invalide !");
  }
});

// Validation du formulaire
function validForm() {
  let error = "";
  const idregex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3}$/;
  const nomregex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/;
  
  if (id.value === "") {
    error += "L'id n'est pas là.\n";
  } else if (!idregex.test(id.value)) {
    error += "L'id doit contenir 3 lettres uniquement.\n";
  }
  
  if (nom.value === "") {
    error += "Le nom n'est pas là.\n";
  } else if (!nomregex.test(nom.value)) {
    error += "Le nom ne doit pas contenir de chiffres ni de caractères spéciaux.\n";
  }
  
  let nomerr = document.getElementById("error");
  if (error !== "") {
    nomerr.innerText = error;
    return false;
  } else {
    nomerr.innerText = "";
    return true;
  }
}

function createDepartementHtml(departement) {
  let newDiv = document.createElement("div");
  let pId = document.createElement("p");
  let pNom = document.createElement("p");
  let dom = document.getElementById("section_dom");
  
  pId.textContent = `ID: ${departement.id}`;
  pNom.textContent = `Nom: ${departement.nom}`;
  
  newDiv.appendChild(pId);
  newDiv.appendChild(pNom);
  dom.appendChild(newDiv);
}  