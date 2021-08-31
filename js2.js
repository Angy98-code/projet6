let data;
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
</div>
<div class="priceEachOne">${price}€ / jour
  </div>
<article id="articlephotograph"></article>
 <div class="trierpar">
                <p class="triertext">Trier par</p>

                <div class="custom_select">

                    <select name="" id="">
                        <option id="option1" class="option1" value="">Popularité</option>
                        <option value="1">Date</option>
                        <option value="2">Titre</option>
                    </select>
                </div>
           

</div>





  `;

//
// PARTIE GALERIE PHOTOS
//

const getPageGalery = (id, photographerId, title, image, tags, likes, date) =>
  `<div class="articlegalery">
  <template>${id}</template>
  <template>${photographerId}</template>
  
  <template>${tags}</template>
<div class"photocard">
<a href=""><img src="image/${image}" class="imagesgalery" alt=""/><template>${image}</template>
</a>
<div class="cardonlytitlelikes"> <p>${title}</p>
<div class="heartbtn"> 
  <span class="likes">${likes}</span></div>
  </div>
  </div>
  <template>${date}</template>
  </div>`;

// demo c'était caousel2 avant!
// render profil et galerie photo
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
  const mediasFiltered = data.media.filter(
    ({ photographerId }) => photographerId === idSearch
  );
  // . find permet de récupérer le 1er element du tableau qui valide
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
    .map((media) =>
      getPageGalery(
        media.id,
        media.photographerId,
        media.title,
        media.image,
        media.tags,
        media.likes,
        media.date,
        media.price
      )
    )
    .join("");
  const elementContainerGallery = document.getElementById("articlephotograph");
  elementContainerGallery.innerHTML = mediasFilteredHtml; // elementContainerGallery est la référence vers l'élément dans lequel tu veux afficher tes photos.
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
  });

//
//
/*let elementContainerGallery = document.getElementById("articlephotograph");

let newsArr = elementContainerGallery;
let i = 0;
let x = document.getElementById("demo");
let timeoutId;
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
}*/

/////////////////////////////////:
//
// CAROUSEL //////////////////////////////////////////////
//
class LightBox {
  //méthode static pour initialiser la lightbox
  static init() {
    const links = Array.from(
      document
        //comment appeler ${image}??? car ici on doit pouvoir
        .querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]')
    );
    const gallery = links.map((link) => link.getAttribute("href"));
    // debugger
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new LightBox(e.currentTarget.getAttribute("href"), gallery);
      })
    );
  }
  //gallery img chemin de la lightbox
  //url de l'image et construire la structure html, images chaine de tableau de caractère
  constructor(url, images) {
    this.element = this.buildDOM(url);
    this.loadImage(url);
    //toujours keyup voir plus bas
    this.images = images;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);

    //loader sans ; erreur
    loadImage(url);
    {
      this.url = null;
      const image = new Image();
      const container = this.element.querySelector(".lightbox__container");
      const loader = document.createElement("div");
      loader.classList.add("lightbox__loader");
      container.innerHTML = "";
      container.appendChild(loader);
      image.onload = () => {
        //console.log("chargé")
        container.removeChild(loader);
        container.appendChild(image);
        this.url = url;
      };
      image.src = url;
    }

    //keyup voir plus bas
    // document.addEventListener("keyup", this.onKeyUp.bind(this));
    // comme changement au dessus plus besoin de le redéfinir donc :
    document.addEventListener("keyup", this.onKeyUp);
  }
  //btn close mouse event en @param permet  de fermer la lightbox
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    //au bout de 500 ms la lightbox disparait
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element); // ou this.element.remove
    }, 500);
    //puis supprimer pour pas qu'il reste en mémoire
    document.removeEventListener("keyup", this.onKeyUp);
  }

  next(e) {
    e.preventDefault();
    //debugger
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) i = -1;
    this.loadImage(this.images[i + 1]);
  }
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) i = this.images.length;
    this.loadImage(this.images[i - 1]);
  }

  //fermer avec "echap"
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    }
    //fonctionne au clavier
    else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<div class="lightbox">
                <button class="lightbox__close"><i class="fas fa-times"></i></button>
                <button class="lightbox__prev"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox__next"><i class="fas fa-chevron-right"></i></button>
                <div class="lightbox__container">
               <img src="https://picsum.photos/200/300?grayscale"
                        alt="">
                </div>`;
    //fermeture lightbox
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));

    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

//dès chargement page initialiser lightbox
LightBox.init();

// FIN CAROUSEL ///////////////////

/////////////////////////////////
////
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

//
// compteur de like ils se remettent à 0 !!
//
let clicks = 0;
function heart() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}
//
//
// NOMBRE DE LIKES TOTAL
//

//const likes = mediasFiltered; //tous les likes de tous les photographes du site
//console.log(likes.length);
//OKOK OKOK OK OK OK OK OK FORMULAIRE
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
      "Merci d'entrer au minimum 2 caractères <br>pour le champ du prénom.";
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
      "Merci d'entrer au minimum 2 caractères <br>pour le champ du nom.";
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
    errorText.innerHTML = "Merci de renseigner une adresse email <br> valide.";
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
