function supprimerDepartement(id, elementDiv) {

  let departements = JSON.parse(localStorage.getItem("departements")) || [];
  departements = departements.filter(dep => dep.id !== id);
  localStorage.setItem("departements", JSON.stringify(departements));
  elementDiv.remove();
}