// Ouverture de la fenetre modale avec le bouton modifier en mode administrateur pour voir les travauxx
document.getElementById('update-works').addEventListener('click', function(event) {
  event.preventDefault();
 
    // supprimer les anciens works
    document.querySelector('#modal-works.modal-gallery .modal-content').innerText = '';
    // Looping on each work
    works.forEach((work, index) => {
      // Creation <figure>
      let myFigure = document.createElement('figure');
      myFigure.setAttribute('class', `work-item category-id-0 category-id-${work.categoryId}`);
      myFigure.setAttribute('id', `work-item-popup-${work.id}`);
      // Creation <img>
      let myImg = document.createElement('img');
      myImg.setAttribute('src', work.imageUrl);
      myImg.setAttribute('alt', work.title);
      myFigure.appendChild(myImg);
      // Creation <figcaption>
      let myFigCaption = document.createElement('figcaption');
      myFigCaption.textContent = 'éditer';
      myFigure.appendChild(myFigCaption);
      // Creation cross icon
      let crossDragDrop = document.createElement('i');
      crossDragDrop.classList.add('fa-solid','fa-arrows-up-down-left-right', 'cross');
      myFigure.appendChild(crossDragDrop);
      // Creation trash icon
      let trashIcon = document.createElement('i');
      trashIcon.classList.add('fa-solid', 'fa-trash-can', 'trash');
      myFigure.appendChild(trashIcon);
      // gestion de la supression
      trashIcon.addEventListener('click', function(event) {
        event.preventDefault();
        if(confirm("Voulez-vous supprimer cet élément ?")) {
          // Fetch pour supp un work dans la fenetre modal et dans le portfolio gallery sur la page
          fetch(`http://localhost:5678/api/works/${work.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(function(response) {
            switch(response.status) {
              case 500:
                alert("Comportement inattendu cot serveur !");
              break;
              case 401:
                alert("Suppresion impossible Veuillew vous quthentifi!");
              break;
              case 204:
                console.log("Projet supprimé.");
                // supprimer les works de la page
                document.getElementById(`work-item-${work.id}`).remove();
                console.log(`work-item-${work.id}`);
                // supprimer le work a partir de la fenetre popup
                document.getElementById(`work-item-popup-${work.id}`).remove();
                console.log(`work-item-popup-${work.id}`);

                // Supprimer le projet de la variable "works"
                works.splice(index, 1);
              break;
              default:
                alert("Erreur inconnue!");
              break;
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        }
      });

      // ajout de  <figure> dans la civ avec la classe modal-content
      document.querySelector("div.modal-content").appendChild(myFigure);

      // ouverture du work modal 
      let modal = document.getElementById('modal');
      modal.style.display = "flex";
      let modalWorks = document.getElementById('modal-works');
      modalWorks.style.display = "block";
    });
  
});

// la fermeture de la moale avec un click a l'exterieur 
// la fenetre modale ne se ferme pas si on click a l'inteieur de son contenu 
document.querySelectorAll('#modal-works').forEach(modalWorks => {
  modalWorks.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  // la modale ne se ferme pas si on click a l'interiuer 
  document.querySelectorAll('#modal-edit').forEach(modalEdit => {
    modalEdit.addEventListener('click', function(event) {
      event.stopPropagation();
    });
    // fermetute modale si on click en dehors
    document.getElementById('modal').addEventListener('click', function(event) {
      event.preventDefault();
      let modal = document.getElementById('modal');
      modal.style.display = "none";
      let modalWorks = document.getElementById('modal-works');
      modalWorks.style.display = "none";
      let modalEdit = document.getElementById('modal-edit');
      modalEdit.style.display = "none";
      // Reset du formulaire modal modifié
      // supprimer l"'image si celle ci est affichée 
      if(document.getElementById('form-image-preview') != null) {
        document.getElementById('form-image-preview').remove();
      }
      // retour au disign de base 
      document.getElementById('modal-edit-work-form').reset();	
      let iconNewPhoto = document.getElementById('photo-add-icon');
      iconNewPhoto.style.display= "block";
      let buttonNewPhoto = document.getElementById('new-image');
      buttonNewPhoto.style.display= "block";
      let photoMaxSize = document.getElementById('photo-size');
      photoMaxSize.style.display= "block";	
      let modalEditPhoto = document.getElementById('modal-edit-new-photo');
      modalEditPhoto.style.padding = "30px 0 19px 0";
      document.getElementById('submit-new-work').style.backgroundColor= "#A7A7A7";
    });
  });
});

// fermeture de la premiere modale en cliquant le bouton x 
document.getElementById('button-to-close-first-window').addEventListener('click', function(event) {
  event.preventDefault();
  let modal = document.getElementById('modal');
  modal.style.display = "none";
  let modalWorks = document.getElementById('modal-works');
  modalWorks.style.display = "none";
});

// fermeture de la seconde fenetre du modal avec le bouton x 
document.getElementById('button-to-close-second-window').addEventListener('click', function(event) {
  event.preventDefault();
  let modal = document.getElementById('modal');
  modal.style.display = "none";
  let modalEdit = document.getElementById('modal-edit');
  modalEdit.style.display = "none";
  // renitioalisation des formulaires dans la fenetre modale de modification
  //supp imlage si celle ci existe 
  if(document.getElementById('form-image-preview') != null) {
    document.getElementById('form-image-preview').remove();
  }
  // Retourner au design du forlmulaire de base 
  document.getElementById('modal-edit-work-form').reset();
  let iconNewPhoto = document.getElementById('photo-add-icon');
  iconNewPhoto.style.display= "block";
  let buttonNewPhoto = document.getElementById('new-image');
  buttonNewPhoto.style.display= "block";
  let photoMaxSize = document.getElementById('photo-size');
  photoMaxSize.style.display= "block";	
  let modalEditPhoto = document.getElementById('modal-edit-new-photo');
  modalEditPhoto.style.padding = "30px 0 19px 0";
  document.getElementById('submit-new-work').style.backgroundColor= "#A7A7A7";
});

// ouvrir la seconde fenetre du modale grace au bouton  "Ajouter photo"
document.getElementById('modal-edit-add').addEventListener('click', function(event) {
  event.preventDefault();
  let modalWorks = document.getElementById('modal-works');
  modalWorks.style.display = "none";
  let modalEdit = document.getElementById('modal-edit');
  modalEdit.style.display = "block";
});

// retour a la premiere fenetre du modal avec la fleche 
document.getElementById('arrow-return').addEventListener('click', function(event) {
  event.preventDefault();
  let modalWorks = document.getElementById('modal-works');
  modalWorks.style.display = "block";
  let modalEdit = document.getElementById('modal-edit');
  modalEdit.style.display = "none";
  // Reset all form in the modal edit 
  // Delete image si elle exoiste 
  if(document.getElementById('form-image-preview') != null) {
    document.getElementById('form-image-preview').remove();
  }
  // Revenir en arriere au design initial  
  document.getElementById('modal-edit-work-form').reset();
  let iconNewPhoto = document.getElementById('photo-add-icon');
  iconNewPhoto.style.display= "block";
  let buttonNewPhoto = document.getElementById('new-image');
  buttonNewPhoto.style.display= "block";
  let photoMaxSize = document.getElementById('photo-size');
  photoMaxSize.style.display= "block";	
  let modalEditPhoto = document.getElementById('modal-edit-new-photo');
  modalEditPhoto.style.padding = "30px 0 19px 0";
  document.getElementById('submit-new-work').style.backgroundColor= "#A7A7A7";
});

// Fetch pour ajout des options dans la modale modification
fetch("http://localhost:5678/api/categories")
  .then(function(response) {
    if(response.ok) {
      return response.json();
    }
  })
  .then(function(data) {
    let categories = data;
    // Looping, boucle sur chaque categorie 
    categories.forEach((category, index) => {
    // Creation <options> dans la fenetre modification du modal 
    let myOption = document.createElement('option');
    myOption.setAttribute('value', category.id);
    myOption.textContent = category.name;
    // ajout  d'une nouvelle <option> dans la balise existante avce la class choice-category
    document.querySelector("select.choice-category").appendChild(myOption);
    });
  })
  .catch(function(err) {
    console.log(err);
  });

// gerer le formulaire
document.getElementById('modal-edit-work-form').addEventListener('submit', function(event) {
  event.preventDefault();
  let formData = new FormData();
  formData.append('title', document.getElementById('form-title').value);
  formData.append('category', document.getElementById('form-category').value);
  formData.append('image', document.getElementById('form-image').files[0]);
  // nouveau fetch pour poster un nouvel work
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body: formData
  })
  .then(function(response) {
    switch(response.status) {
      case 500:
      case 503:
        alert("Erreur inattendue!");
      break;
      case 400:
      case 404:
        alert("Impossible d'ajouter le nouveau projet!");
      break;
      case 200:
      case 201:
        console.log("Projet ajouté avec succés!");
        return response.json();
      break;
      default:
        alert("Erreur inconnue!");
      break;
    }
  })
  .then(function(json) {
    console.log(json);
    // Creating HTML element
    // Creation <figure>
    let myFigure = document.createElement('figure');
    myFigure.setAttribute('class', `work-item category-id-0 category-id-${json.categoryId}`);
    myFigure.setAttribute('id', `work-item-${json.id}`);
    // Creation <img>
    let myImg = document.createElement('img');
    myImg.setAttribute('src', json.imageUrl);
    myImg.setAttribute('alt', json.title);
    myFigure.appendChild(myImg);
    // Creation <figcaption>
    let myFigCaption = document.createElement('figcaption');
    myFigCaption.textContent = json.title;
    myFigure.appendChild(myFigCaption);
    // ajouter nouvelle <figure>  dans une div existante div.gallery
    document.querySelector("div.gallery").appendChild(myFigure);
    // Close edit modal
    let modal = document.getElementById('modal');
    modal.style.display = "none";
    let modalEdit = document.getElementById('modal-edit');
    modalEdit.style.display = "none";
    // renitialiser tous les formulaires dazns la fenetre modification 
    // suppression image deja là 
    if(document.getElementById('form-image-preview') != null) {
      document.getElementById('form-image-preview').remove();
    }
    // Return to original form design
    document.getElementById('modal-edit-work-form').reset();
    let iconNewPhoto = document.getElementById('photo-add-icon');
    iconNewPhoto.style.display= "block";
    let buttonNewPhoto = document.getElementById('new-image');
    buttonNewPhoto.style.display= "block";
    let photoMaxSize = document.getElementById('photo-size');
    photoMaxSize.style.display= "block";	
    let modalEditPhoto = document.getElementById('modal-edit-new-photo');
    modalEditPhoto.style.padding = "30px 0 19px 0";
    document.getElementById('submit-new-work').style.backgroundColor= "#A7A7A7";

    // Ajouter l'image dans la variable "works" (pour que le modal se rafraichisse automatiquement)
    works.push(json);
  })
  .catch(function(err) {
    console.log(err);
  });
});

// verification dela taille du fichier contenant les images 
document.getElementById('form-image').addEventListener('change', () => {
  let fileInput = document.getElementById('form-image');
  const maxFileSize = 4 * 1024 * 1024; // 4MB
  if(fileInput.files[0].size > maxFileSize) {
    alert("Le fichier sélectionné est trop volumineux. La taille maximale est de 4 Mo.");
    document.getElementById('form-image').value = '';
  }
  else {
    if(fileInput.files.length > 0) {
            // Creation de l'aperçu image
      let myPreviewImage = document.createElement('img');
      myPreviewImage.setAttribute('id','form-image-preview');
      myPreviewImage.src = URL.createObjectURL(fileInput.files[0]);
      document.querySelector('#modal-edit-new-photo').appendChild(myPreviewImage);
      myPreviewImage.style.display = "block";	
      myPreviewImage.style.height ="169px";
      let iconNewPhoto = document.getElementById('photo-add-icon');
      iconNewPhoto.style.display= "none";
      let buttonNewPhoto = document.getElementById('new-image');
      buttonNewPhoto.style.display= "none";
      let photoMaxSize = document.getElementById('photo-size');
      photoMaxSize.style.display= "none";	
      let modalEditPhoto = document.getElementById('modal-edit-new-photo');
      modalEditPhoto.style.padding = "0";
    }
  }
});

// lier la fonction checkNewProjectFields() avec l'enevenelmnt  "input" 
document.getElementById('form-title').addEventListener('input', checkNewProjectFields);
document.getElementById('form-category').addEventListener('input', checkNewProjectFields);
document.getElementById('form-image').addEventListener('input', checkNewProjectFields);

// Creation de checkNewProjectFields() qui verifie  image + title + category fields
function checkNewProjectFields() {
  let title = document.getElementById('form-title');
  let category = document.getElementById('form-category');
  let image = document.getElementById('form-image');
  let submitWork = document.getElementById('submit-new-work');
  if(title.value.trim() === "" || category.value.trim() === "" || image.files.length === 0) {
    submitWork.style.backgroundColor= "#A7A7A7";
  } else {
    submitWork.style.backgroundColor= "#1D6154";
  }
};