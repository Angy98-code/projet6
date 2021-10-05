let data;
let mediasFiltered;
//let heartFilter;
//
// PARTIE PROFIL
//

const getPageProfil = (
  name,
  id,
  city,
  country,
  tagline,
  tags,
  price,
  portrait
) =>
  `<div class="partie1profilphotograph">
    <div><h2 class="h2photograph">${name}</h2></div>
    <template class="id">${id}</template>
    <div class="city_country">${city}, ${country}</div>
    <div class="taglinephotograph">${tagline}</div>
    
    <ul class="container_photographtags">
      ${tags
        .map(
          (tag) =>
            `<li><a href="index.html" class="tagsphotograph">#${tag}</a></li>`
        )
        .join("")}
    </ul>                               
        
  <div class="taillephotographiphone">
    <img src="image/${portrait}" id="portraitphotograph"/>       
  </div>

    <div class="priceEachOne">
    <div class="totallikes"></div>
      <div class="totalprice">${price}€ / jour</div>
    </div>
  
  </div>        

<article id="articlephotograph"></article>
  <div class="trierpar">
    <p class="triertext">Trier par</p>
      <div class="custom_select">
        <select name="" id="">
          <option id="option1" class="optionpopularite" value="">Popularité</option>
          <option class="optiondate" value="1">Date</option>
          <option class="optiontitre" value="2">Titre</option>
        </select>
      </div>
  </div>`;

//
// PARTIE GALERIE PHOTOS
//
//lightbox

/////////////////////:galery plus des données plus haut
function setupLightbox() {
  // creer html de la lightbox , elle doit etre au depart en display none
  const lightboxHtml = `<div class="lightbox">
    <div class="lightbox__container">
      <div class="lightbox__slide"><img /><video controls></video></div>
      <div class="lightbox__prev"><i class="fas fa-chevron-left"></i></div>
      <div class="lightbox__next"><i class="fas fa-chevron-right"></i></div>
    </div>
    <div class="lightbox__close"><i class="fas fa-times"></i></div>
  </div>`;
  // injecter au bon endroit html
  const element = document.getElementById("lightbox");
  element.innerHTML = lightboxHtml;
  // fermeture gallery avec le bouton x     //ok
  const btnCloseLightbox = document.querySelector(".lightbox__close");
  const modallb = document.querySelector(".lightbox");
  btnCloseLightbox.addEventListener("click", function (event) {
    modallb.style.display = "none";
  });
}
// setupLightbox(); // appeler la fonction

const openLightbox = (mediaId, index) => {
  setupLightbox();
  console.log("openLightbox", mediaId, index);

  //passer la lightbox en display block
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";
  //choper la ref à l'img ds lightbox
  const image = document.querySelector(".lightbox img");
  console.log("image", image);

  const mediaClick = mediasFiltered.find((media) => media.id === mediaId);
  //définir la src de l'img via attribut src
  image.src = `image/${mediaClick.image}`;

  // POUR VIDEO, si je met video dans innerHtml les img indefined et video ne s'affiche pas
  const video = document.querySelector(".lightbox video");
  console.log(video);
  const videoClick = mediasFiltered.find((media) => media.id === mediaId);
  video.src = `image/${videoClick.video}`;

  const affichageLightbox = () => {
    if (img === img) {
      return img;
    } else if (video === video) {
      return video;
    }
  };
  // image.src.mp4 = `image/${mediaClick.video}`;
  //!!!!! manque pour video
};

// array galery
const getPageGalery = (
  id,
  photographerId,
  title,
  image,
  video,
  tags,
  likes,
  date,
  price,
  index
) => {
  console.log("getPageGalery", index);
  let htmlString = `<div class="articlegalery">
  <template>${id}</template>
  <template>${photographerId}</template>
  <template>${tags}</template>

  <div class"photocard">
  #bloctoreplace
  </div>

  <div class="cardonlytitlelikes">
    <p>${title}</p>
    <div class="heartbtn" data-id="${id}"> 
      <span class="onelike">${likes}</span>
    </div>
  </div>
  
  <template class="date">${date}</template>
  </div>`;
  const htmlImage = `  <div onclick="return openLightbox(${id}, ${index})"><img src="image/${image}" class="imagesgalery" alt=""/><template>${image}</template>
    </div>
  `;

  const htmlVideo = `  <div onclick="return openLightbox(${id}, ${index})"><video controls src="image/${video}" class="videosgalery" alt=""/><template>${video}</template>
    </div>
  `;
  if (video) {
    htmlString = htmlString.replace("#bloctoreplace", htmlVideo);
  } else {
    htmlString = htmlString.replace("#bloctoreplace", htmlImage);
  }
  return htmlString;
};

//
const renderHTML = () => {
  const queryString_url_id = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString_url_id);
  //console.log(urlSearchParams);
  //parseInt pour mettre en number et non en string car id en number
  // get et non getall
  const idSearch = parseInt(urlSearchParams.get("photographId"));
  //pour photograph
  const photograph = data.photographers.find(
    (element) => element.id === idSearch
  );

  //pour media
  mediasFiltered = data.media.filter(
    (media) => media.photographerId === idSearch
  );

  // . find permet de récupérer le 1er element du tableau qui valide*/
  // la condition
  console.log("photograph", { photograph });
  console.log("media", { mediasFiltered });

  const elementPhotograph = document.getElementById("list_photographcontainer");

  elementPhotograph.innerHTML = getPageProfil(
    photograph.name,
    photograph.id,
    photograph.city,
    photograph.country,
    photograph.tagline,
    photograph.tags,
    photograph.price,
    photograph.portrait
  );

  const mediasFilteredHtml = mediasFiltered
    .map((media, index) =>
      getPageGalery(
        media.id,
        media.photographerId,
        media.title,
        media.image,
        media.video,
        media.tags,
        media.likes,
        media.date,
        media.price,
        index
      )
    )
    .join("");
  const elementContainerGallery = document.getElementById("articlephotograph");
  elementContainerGallery.innerHTML = mediasFilteredHtml; // elementContainerGallery est la référence vers l'élément dans lequel tu veux afficher tes photos.

  // photograph.name.innerHTML = document.querySelector("p.namephotograph");
  console.log(photograph.name);
  //elementModalInputName.innerHTML = photograph.name;
  document.querySelector(".namephotograph").innerHTML = photograph.name;

  // likes
  let lesLikes = 0;
  mediasFiltered.forEach((media) => {
    // console.log(lesLikes, medias);
    return (lesLikes += parseInt(media.likes));
  });
  console.log(lesLikes);

  document.querySelector(".totallikes").innerHTML = lesLikes;
};

//
// FETCH
//
fetch("./FishEyeData.json")
  // 1ere promise en format json
  .then((res) => res.json())

  // 2eme promise ulr des img
  .then((dataFetch) => {
    console.log(dataFetch);
    data = dataFetch;
    renderHTML();
    renderSelect(); // const btn trier
    //img.src = data[0].url;
    clickOnLikes();
  });

// video

// likes
const totalLikes = (likes) => {
  innerHtml;
};

//////////////////////////////////////////////////////////////////////////////
///
// BOUTON TRIER PAR
//
const renderSelect = () => {
  // on récupère le select
  const selectElt = document.querySelector("select");
  // on récupère la toute 1ere div cad custom_select

  const selectDiv = document.querySelector(".custom_select");
  //on cree le nouveau select une nouvelle div
  const newSelect = document.createElement("div");
  //on lui ajoute la class newselect
  newSelect.classList.add("newselecttrier");
  //on lui met le contenu
  newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;

  //on peut cree maintenant l'élément dans le DOM
  selectDiv.appendChild(newSelect);

  //Maintenant on cree le menu deroulant c'est une div
  // on recree une div
  const newMenu = document.createElement("div");
  newMenu.classList.add("select-items", "select-hide");

  // on intégre les options dans le select et copier dans div

  //
  //
  //
  for (let option of selectElt.options) {
    // on cree une div pour les options
    const newOption = document.createElement("div");
    // on copie le contenu de l'option
    newOption.innerHTML = option.innerHTML;
    // on ajoute après avoir fait la deuxième fleche
    //un ecouteur d'évenement click pour les options
    newOption.addEventListener("click", function () {
      // on fait une boucle sur chacune des options du select original
      // cad relier ce qui est cliqué  option n'est pas la mm qu'au dessus
      // on refait une boucle
      //for (let option of selectElt.options) {
      // if les options de mon select d'origine est égal a l'élément que
      // je viens de cliquer
      //if (option.innerHTML === this.innerHTML) {
      // on active la bonne option dans le select !!!! moi ca ne fonctionne pas  au niveau console!!!
      //selectElt.selectedIndex = option.index;
      //on change le texte pour le mettre en haut

      // une fois que j'ai trouvé la bonne pas la peine d'aller plus loin
      // on met sur le menu sur ce que l'on clique
      //newSelect.innerHTML = this.innerHTML;
      //break;
      //    }
      //  }
      // apres la boucle for on simule un click sur newSelect
      // ca va fermer le menu
      newSelect.click();
    });

    // on ajoute l'option dans le newMenu
    newMenu.appendChild(newOption);
  }

  // on affiche le menu comme précedemment

  selectDiv.appendChild(newMenu);
  //on ajoute event click sur newSelect

  newSelect.addEventListener("click", function (e) {
    //this.style.display="none";
    //on empêche la propagation du click
    e.stopPropagation();
    // on retire le select hide de notre menu
    // on cherche la balise suivante
    this.nextSibling.classList.toggle("select-hide");
    // on ajoute la classe active à newSelect pour changer la flèche
    this.classList.toggle("active");
  });
};
/////////////////////////////////////////////////////////////////////////////////
//
// FORMULAIRE
//
// DOM Elements bouton je m'inscris modalbtn !!! c'est le button de chaque page

const modalBtn = document.querySelectorAll(".modal-btn");
//lauch modal
// launch modal (bouton je m'inscris) évenement du formulaire au click
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// apparition de la launchModal formulaire d'inscription
function launchModal() {
  modalbg.style.display = "block";
}
// bouton fermeture croix x
const btnClose = document.querySelector("#closebtn");
const modalbg = document.querySelector(".bground");
btnClose.addEventListener("click", function (event) {
  modalbg.style.display = "none";
});

//1ER CHAMP PRENOM
const validateFirst = (event) => {
  // event.preventDefault();
  const nameInput = document.getElementById("firstname"); // name field
  const valueNameInput = nameInput.value; //value field
  const nameRegex = /^[A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû_\-\.\ ]+$/;
  let errorText = document.getElementById("texterrorfirstname");

  if (valueNameInput.length < 2) {
    errorText.innerHTML =
      "Merci d'entrer au minimum 2 caractères pour le champ du prénom.";
    return false;
  } else if (
    nameRegex.test(nameInput.value) === true && ///erreur si valueNameInput!!!!!!!
    valueNameInput.length >= 2
  ) {
    errorText.innerHTML = "";
    return true;
  } else {
    errorText.innerHTML = "Merci d'indiquer un prénom";
    return false;
  }
};

//2EME CHAMP NOM
const validateLast = (_event) => {
  //  event.preventDefault();
  const lastNameInput = document.getElementById("lastname");
  const valueLastNameInput = lastNameInput.value;
  const lastNameRegex = /^[A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû_\-\.\ ]+$/;
  let errorText = document.getElementById("texterrorlastname");

  if (valueLastNameInput.length < 2) {
    errorText.innerHTML =
      "Merci d'entrer au minimum 2 caractères pour le champ du nom.";
    return false;
  } else if (
    lastNameRegex.test(lastNameInput.value) == true && ///erreur si valueNameInput!!!!!!!
    valueLastNameInput.length >= 2
  ) {
    errorText.innerHTML = "";
    return true;
  } else {
    errorText.innerHTML = "Merci d'indiquer un nom";
    return false;
  }
};

//3EME CHAMP EMAIL
const validateEmail = (_event) => {
  // event.preventDefault();
  let errorText = document.getElementById("texterroremail");
  const nameInputEmail = document.getElementById("email");
  const valueNameInputEmail = nameInputEmail.value;
  const emailFormat = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
  // /^\A(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])\z$/;

  if (valueNameInputEmail == "") {
    //textEmail = document.getElementById("texterroremail").textContent;
    //document.getElementById("texterroremail").textContent =
    errorText.innerHTML = "Merci de renseigner une adresse email valide.";
    return false;
  } else if (!emailFormat.test(valueNameInputEmail)) {
    document.getElementById("texterroremail").textContent =
      "Adresse email incorrect. ";
    return false;
  } else {
    document.getElementById("texterroremail").textContent = "";
    return true;
  }
};

//4EME CHAMP TEXTAREA

const validateMessage = (_event) => {
  //let eltTextarea = document.querySelector("message");
  //eltTextarea.spellcheck = false;
  //eltTextarea.addEventListener("keyup", function () {
  //eltTextarea.value = eltTextarea.value.substring(0, 203);
  //});

  const messageInput = document.getElementById("message");
  // messageInput.value = messageInput.value.substring(0, 203);
  const valueMessageInput = messageInput.value;
  let errorText = document.getElementById("texterrormessage");

  if (valueMessageInput.length < 2) {
    errorText.innerHTML = "Merci d'entrer votre message.";
    return false;
  } else if (valueMessageInput.length > 2) {
    errorText.innerHTML = "";

    return true;
  }
};

//
// FONCTION DE VALIDATION

const validate = () => {
  const isFirstNameValid = validateFirst();
  const isLastNameValid = validateLast();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  return isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid;
};

//
// FONCTIONS ENVOI DU FORMULAIRE ET MESSAGE DE REMERCIEMENT
//
document
  .getElementById("inscription")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // on le met si erreur afin de ne pas envoyé le formulaire

    if (validate(event)) {
      //const messageValidation = document.getElementById("submitMessage");
      // messageValidation.style.display = "none";
      // block
      const messageValidation = document.getElementById("submitMessage");
      messageValidation.style.display = "block";
      const form = document.getElementById("inscription");
      form.style.display = "none";
      console.log({
        prénom: "isFirstNameValid",
        nom: "isLastNameValid",
        email: "isEmailValid",
        message: "isMessageValid",
      });
    }
  });
//
document
  .getElementById("inscription")
  .addEventListener("input", function (event) {
    //event.preventDefault();
    validate(event);
  });

//
// BOUTON FERMETURE APRES INSCRIPTION
const btnValidation = document.getElementById("btn-validation");
btnValidation.addEventListener("click", function (_event) {
  modalbg.style.display = "none";
});
/// FIN FORMULAIRE

// Début click likes

const recalculTotalLikes = () => {
  // likes
  let lesLikes = 0;
  mediasFiltered.forEach((media) => {
    return (lesLikes += parseInt(media.likes));
  });
  document.querySelector(".totallikes").innerHTML = lesLikes;
};

const clickOnLikes = () => {
  const likesElements = document.querySelectorAll(".heartbtn");
  likesElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      // get media id from data-id attribute
      const mediaId = parseInt(element.getAttribute("data-id"));

      mediasFiltered = mediasFiltered.map((media) => {
        if (media.id === mediaId) {
          if (element.classList.contains("liked")) {
            element.classList.remove("liked");
            media.likes--;
          } else {
            element.classList.add("liked");
            media.likes++;
          }
          // incrémente nombre de likes du média dans le dom
          element.querySelector("span").innerHTML = media.likes;
        }
        return media;
      });

      console.log("likesElements", mediaId);
      recalculTotalLikes();
    });
  });
};
// fin click likes

/////////////////////////////////////////////////////////////////////////////////
// ne fonctionne pas
var newsArr = [];
var i = 0;
var x = document.querySelector(".lightbox__slide");
var timeoutId;
function next() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  i++;
  if (i < newsArr.length) {
    x.innerHTML = newsArr[i];
  } else {
    i = 0;
    x.innerHTML = newsArr[i];
  }
  timeoutId = setTimeout(next, 2000);
}

function prev() {
  i--;
  if (i >= 0) {
    x.innerHTML = newsArr[i];
  } else {
    i = newsArr.length - 1;
    x.innerHTML = newsArr[i];
  }
}

///// ______________lien tags

///// ______________lien tags
//var slide = new Array("foret-peuplier.jpg", "paysage-montagne.jpg", "chemin-automne.jpg", "prairie-alpes.jpg");
// slide container!

// var numero = 0;

// function ChangeSlide(sens) {
//     numero = numero + sens;
//     if (numero < 0)
//         numero = slide.length - 1;
//     if (numero > slide.length - 1)
//         numero = 0;
//     document.getElementById("slide").src = slide[numero];
// }
