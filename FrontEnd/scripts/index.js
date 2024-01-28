let works =[];
let categories =[{id: 0, name: 'Tous'}];
function loadData(){
    fetch("http://localhost:5678/api/works")
.then(response =>{
    if(response.ok){
        return response.json();
    }
}).then(data =>{
    if(data){
        console.log(data);
        works=data;
        displayData(data);
    }
}).catch(error =>{console.log(error);
alert("Une erreur est survenue. Veuillez contacter l'administrateur");})

fetch('http://localhost:5678/api/categories')
.then(response =>{
    if(response.ok){
        return response.json();
    }
}).then(data =>{
    if(data){
        console.log(data);
        data.forEach(element => {
            categories.push(element)
        });
        
        displayCategorysButtons(categories)
    }
}).catch(error =>{console.log(error);
alert("Une erreur est survenue; Veuillez contacter l'administrateur");})
}
function displayData(works) {
    const gallery = document.querySelector(".gallery");
    works.forEach(element => {
        // creation d'une figure avec element et utiliser appendChild pour ajouter l'element au dos
        const figure = document.createElement("figure");
        figure.id="work-item-"+element.id;
        figure.dataset.categoryId=element.categoryId;
        figure.setAttribute("class", "work")
        const img = document.createElement("img");
        img.alt = element.title;
        img.src = element.imageUrl;
        figure.appendChild(img);

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = element.title;
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

    });
}

function displayCategorysButtons(categories) { 
    const filters = document.querySelector(".filters");
categories.forEach((category) => {
    const btn = document.createElement("div");
    btn.classList.add("filter-button");
    btn.id = category.id;
    btn.textContent= category.name;
    btn.addEventListener("click", function (e){
        filterWorks(btn.id)
    })
    filters.appendChild(btn);
   }); 
}

function filterWorks(id){ 
    const allWorks = document.querySelectorAll(".work");
    allWorks.forEach((element) => {
   if(id==0 || id==element.dataset.categoryId){
    element.style.display ="block";
   }
   else{
    element.style.display ="none";
   }
   }); 
} 

function initPage(){

    //User authentifie
    if(localStorage.getItem('token') != null) {
        //bouton login cache
        const btnlogin = document.getElementById('btnlogin');
        btnlogin.style.display = "none";
        //ffichage logout 
        const logout = document.getElementById('logout');
        logout.style.display = "block";
        logout.addEventListener('click',function(e){       
        e.preventDefault()
        localStorage.clear()
        initPage()
        //window.location.href="./index.html";
             });
        
        // affichage barre noir
        const topBar = document.getElementById('top-bar');
       topBar.style.display = "flex"; 
        
        // affichage bouton modifier
        const btnModif = document.getElementById('update-works');
        btnModif.style.display = "flex";
        // cacher bloc filtre 
        const filters = document.getElementById('all-filters');
        filters.style.display = "none";

       
    }
    else{
     //bouton login cache
     const btnlogin = document.getElementById('btnlogin');
     btnlogin.style.display = "block";
     //affichage logout 
     const logout = document.getElementById('logout');
     logout.style.display = "none";
     
     // affichage barre noir
     const topBar = document.getElementById('top-bar');
     topBar.style.display = "none";
     
     // affichage bouton ,modifier
     const btnModif = document.getElementById('update-works');
     btnModif.style.display = "none";
     // cacher bloc filtre 
     const filters = document.getElementById('all-filters');
     filters.style.display = "flex";
    
}
}

const buttonModifier = document.querySelector('.modification_icon');
const modaleContainer = document.querySelector('.modale_container');

loadData();
initPage();

/*Bouton modifier, modal, galerry*/

// Modal Gallery

	