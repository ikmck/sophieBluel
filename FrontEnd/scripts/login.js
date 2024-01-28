const form = document.querySelector(".loginForm");
const loginPassword = document.getElementById('password');
const loginEmail = document.getElementById('email');
const errorPassword = document.getElementById('errorPassword');
const errorEmail = document.getElementById('errorEmail');



form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email=loginEmail.value;
  const pwd =loginPassword.value;
  if(email!="" && pwd!="") {
  
 // Création de l’objet du nouvel avis.
 const user = {
  email: email,
  password: pwd,
};
// 

// Appel de la fonction fetch avec toutes les informations nécessaires
fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  //Création de la charge utile au format JSON
  body: JSON.stringify(user)
})
.then(response =>{
  if(response.status == 200){
      return response.json();
  }
  if(response.status == 401){
    alert("Mauvais couple email/mot de passe.");
}
if(response.status == 404){
  alert("veuillez verifier le mot de passe ")
}
}).then(data =>{
  if(data){
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location.href="./index.html";
  }
}).catch(error =>{
  console.log(error);
alert("Une erreur est survenue; Veuillez contacter l'administrateur");})
}
  else{
    alert("Veuillez saisir un login et un mot de passe")}
});


