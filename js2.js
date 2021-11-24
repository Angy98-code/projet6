//variables scope global
let data; //media et photographers / objet ayant pour propriétés media et photographers
let mediasFiltered; //données de chaque photographe
//
// ----------partie PROFIL construction du Dom
// getPageProfil() création html des profils
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
      <div><h1 class="h2photograph" aria-label="presentation, ${name}">${name}</h1></div>
        <template class="id">${id}</template>
          <div aria-label="paragraph presentation">
            <div class="city_country">${city}, ${country}</div>
            <div class="taglinephotograph">${tagline}</div>
          </div>
          <ul class="container_photographtags">
            ${tags
              .map(
                (tag) =>
                  `<span><a href="index.html" class="tagsphotograph" tabindex="2" aria-label="${tag}">#${tag}</a></span>`
              )
              .join("")}
          </ul>                               
          
             <div class="formulaire" alt="formulaire de contact" aria-label="contact me"></div>      
          <div class="taillephotographiphone">
       
            <img src="image/${portrait}"  id="portraitphotograph" alt="photo de ${name}"/>       
          </div>
  
          <div class="priceEachOne" aria-label="text nombre total de like">
            <div class="totallikes" alt="nombre total de like"></div>
            <div class="totalprice">${price}€ / jour</div>
          </div>
   </div>        

  
    <div class="trierpar">
      <label class="triertext" id="sortingSelect">Trier par</label>
        <div class="custom_select">
          <select name="" id="sortingSelect" aria-label="sortingSelect">
            <option class="optionpopularite" value="popularity" aria-label="popularité" tabindex="12" >Popularité</option>
            <option class="optiondate" value="date" aria-label="date">Date</option>
            <option class="optiontitre" value="title" aria-label="titre">Titre</option>
          </select>
        </div>
    </div aria-hidden="true">
    <article id="articlephotograph" aria-hidden="false"></article>`;

// ----------PARTIE GALERIE PHOTOS LIGHTBOX
//
//setupLightbox() création, installation html de la lightbox, (display none au départ)
// 1°) lighbox ouverte
function setupLightbox() {
  const lightboxHtml = `<div class="lightbox">
                          <div class="lightbox__container" aria-label="image closeup view">
                            
                            <div class="slide"><img class="imageducarousel" aria-label="Lilac breasted roller"/><video class="videoducarousel" style="margin: 0px" controls aria-label="Lilac breasted roller"></video><div class="titrePhotoDansCarousel" aria-label="Title from media" id="carouselTitle"></div>
                            </div>
                            <button class="lightbox__prev" aria-label="Previous image"><i class="fas fa-chevron-left" name="prev"></i></button>
                            <button class="lightbox__next" aria-label="Next image"><i class="fas fa-chevron-right" name="next"></i></button>
                            <button class="lightbox__close" aria-label="Close dialog"><i class="fas fa-times"></i></button> 
                          
                          </div>
                        </div>`;
  //  ---------------SLIDE

  // injecter au bon endroit html de la lightbox
  const element = document.getElementById("lightbox");
  element.innerHTML = lightboxHtml;

  // focuslightbox FERMETURE LIGHTBOX par le bouton close ou echape ainsi que focus sur les 3 buttons

  function focusLightbox() {
    const lightboxContainer = document.querySelector(".lightbox__container");
    let focusables = [];
    let previouslyFocusedElement = null; // permet de revenir à l'endroit avant focus
    focusables = Array.from(lightboxContainer.querySelectorAll("button"));
    previouslyFocusedElement = document.querySelector(":focus"); // permet de revenir à l'endroit avant focus
    const focusInModallb = function (e) {
      e.preventDefault();
      let indexFocusedButton = focusables.findIndex(
        (button) => button === lightboxContainer.querySelector(":focus")
      );
      indexFocusedButton++;
      if (indexFocusedButton >= focusables.length) {
        indexFocusedButton = 0;
      }
      focusables[indexFocusedButton].focus();
    };
    function fermetureDeLaLightbox() {
      const btnCloseLightbox = document.querySelector(".lightbox__close");
      const modallb = document.querySelector(".lightbox");

      btnCloseLightbox.addEventListener("click", function (event) {
        modallb.style.display = "none";
        if (previouslyFocusedElement !== null) previouslyFocusedElement.focus(); // permet de revenir à l'endroit avant focus
        lightboxOpened = false;
        // debugger;
        // window.removeEventListener("keydown");
      });
      window.addEventListener("keydown", function (e) {
        if (!lightboxOpened) {
          return;
        }
        if (e.key === "Escape" || e.key === "Esc") {
          modallb.style.display = "none";
          //lightboxOpened = false;
        }
        if (e.key === "Tab" && modallb !== null) {
          focusInModallb(e);
        }
      });
    }
    fermetureDeLaLightbox();
  }
  focusLightbox();
  // fermeture lightbox si on clique sue echape
} // -----------------------fermeture setuptLightbox

let lightboxOpened = false; // lightbox is open ?

// ----------OUVERTURE DE LA LIGHTBOX
const openLightbox = (mediaId, index) => {
  lightboxOpened = true;
  setupLightbox(); // appel de la fonction setupLightbox qui représente le html

  //passer la lightbox en display block
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";

  //récupérer la balise de image dans la lightbox
  const image = document.querySelector(".lightbox img");

  //récupérer la balise de la video dans la lightbox
  const video = document.querySelector(".lightbox video");

  // mediaClick définit si on doit afficher 1 image ou 1 video
  const mediaClick = mediasFiltered.find((media) => media.id === mediaId);

  if (mediaClick.image) {
    image.src = `image/${mediaClick.image}`;
    image.style.display = "block";
    video.style.display = "none";
  } else {
    video.src = `image/${mediaClick.video}`;
    video.style.display = "block";
    image.style.display = "none";
  }

  //  lieu d'affichage du titre des médias
  const carouselTitleElement = document.querySelector("#carouselTitle");
  carouselTitleElement.textContent = mediaClick.title;

  //SLIDER
  //-----tableau avec les images et les videos permet d'utiliser les fleches du carousel
  const mediaArray = mediasFiltered.map((mediaObject) => {
    return {
      srcTitle: mediaObject.image || mediaObject.video,
      type: mediaObject.video ? "video" : "image",
      title: mediaObject.title,
    };
  });

  // NEXT ET PREV
  const buttonNext = document.querySelector("button.lightbox__next");
  const buttonPrev = document.querySelector("button.lightbox__prev");
  let indexCurrentMedia = index; //current image or video

  //----- BUTTON NEXT
  buttonNext.addEventListener("click", function (event) {
    indexCurrentMedia++; // ajoute 1 à current index
    if (indexCurrentMedia > mediaArray.length - 1) {
      //si on arrive à la dernière image
      indexCurrentMedia = 0; // remettre index à zéro c'est à dire que l'on se retrouve à la 1ère image
    }
    const mediaShown = mediaArray[indexCurrentMedia];
    carouselTitleElement.textContent = mediaShown.title; // injection du titre du bon media

    if (mediaShown.type === "image") {
      image.src = `image/${mediaShown.srcTitle}`;
      image.style.display = "block";
      video.style.display = "none";
    } else {
      video.src = `image/${mediaShown.srcTitle}`;
      video.style.display = "block";
      image.style.display = "none";
    }
  });

  //----- BOUTON PREV
  buttonPrev.addEventListener("click", function (event) {
    indexCurrentMedia--; //en arrière
    if (indexCurrentMedia < 0) {
      indexCurrentMedia = mediaArray.length - 1;
    }
    mediaShown = mediaArray[indexCurrentMedia];
    carouselTitleElement.textContent = mediaShown.title;

    if (mediaShown.type === "image") {
      image.src = `image/${mediaShown.srcTitle}`;
      image.style.display = "block";
      video.style.display = "none";
    } else {
      video.src = `image/${mediaShown.srcTitle}`;
      video.style.display = "block";
      image.style.display = "none";
    }
  });
}; // ---------------fermeture openLightbox

// AFFICHAGE DE LA GALERY
// injection html
//2°) affichage de la galery d'images et video
const getPageGalery = (
  id,
  photographerId,
  title,
  image,
  video,
  tags,
  likes,
  date,
  index
) => {
  let htmlString = `<div class="articlegalery">
                      <template>${id}</template>
                      <template>${photographerId}</template>
                      <template>${tags}</template>
                        <div class="photocard">
                          #bloctoreplace
                        </div>  
                        <div class="cardonlytitlelikes" >
                          <p aria-label="text">${title}</p>
                          <div class="heartbtn" data-id="${id}"> 
                          <button class="onelike" aria-label="likes">${likes}</button>
                          </div>
                        </div>
                        <template class="date">${date}</template>
                    </div>`;
  const htmlImage = `<button role="button" onclick="return openLightbox(${id}, ${index})"><img src="image/${image}" class="imagesgalery" alt="${title}" role="image"/><template>${image}</template>
    </button>`; //appel fonction openLightBox()

  const htmlVideo = `<button role="button" onclick="return openLightbox(${id}, ${index})"><video controls src="image/${video}" class="videosgalery" alt="${title}" role="video" aria-label="video, ${video}"/><template>${video}</template>
    </button>`; //appel fonction openLightBox()
  if (video) {
    htmlString = htmlString.replace("#bloctoreplace", htmlVideo);
  } else {
    htmlString = htmlString.replace("#bloctoreplace", htmlImage);
  }
  return htmlString;
};
//
// ----------fonction principale
//
function renderHTML() {
  // on récupère l' id du photographe
  const queryString_url_id = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString_url_id);
  const idSearch = parseInt(urlSearchParams.get("photographId"));

  //trouve le photographe qui a pour id === idSearch
  // find() permet de récupérer le 1er element du tableau qui valide la condition
  const photograph = data.photographers.find(
    (element) => element.id === idSearch
  );

  //trouve les medias qui a pour id === idSearch
  // filter () La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine
  //qui remplissent une condition déterminée par la fonction callback.
  mediasFiltered = data.media.filter(
    (media) => media.photographerId === idSearch
  );

  // par defaut affichage par popularité dans renderHTLML et non dans la dropdown fonction
  mediasFiltered.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1;
    } else {
      return -1;
    }
  });
  // // fin par defaut

  //console.log("photograph", { photograph });
  //console.log("media", { mediasFiltered });
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
  elementContainerGallery.innerHTML = mediasFilteredHtml;

  document.querySelector(".namephotograph").innerHTML = photograph.name;

  // ----------likes
  let lesLikes = 0;
  mediasFiltered.forEach((media) => {
    // console.log(lesLikes, medias);
    return (lesLikes += parseInt(media.likes)); //récupération d'un entier
  });
  // console.log(lesLikes);
  document.querySelector(".totallikes").innerHTML = lesLikes;
}

//
//----------------------------------- FETCH
//
fetch("./FishEyeData.json") // recuperation des ressources
  // 1ere promise en format json
  .then((res) => res.json())

  // 2eme promise ulr des img
  .then((dataFetch) => {
    // console.log(dataFetch);
    data = dataFetch;
    renderHTML();
    setupLightbox();
    dropdownTrierPar(); // const btn trier
    clickOnLikes();
  });

//
// ---------- BOUTON TRIER PAR
//
const dropdownTrierPar = () => {
  // on récupère le select
  const selectElt = document.querySelector("select");
  // on récupère la toute 1ere div cad custom_select
  const selectDiv = document.querySelector(".custom_select");
  const newSelect = document.createElement("button");
  newSelect.classList.add("newselecttrier"); //on lui ajoute la class newselect
  newSelect.setAttribute("tabIndex", "11"); // accessibilité
  newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML; //on lui met le contenu /////////////////////selectElt.options
  selectDiv.appendChild(newSelect); //on peut cree maintenant l'élément dans le DOM

  //Maintenant on cree le menu deroulant c'est une div
  // on recree une div
  const newMenu = document.createElement("div");
  newMenu.classList.add("select-items", "select-hide");

  // on intégre les options dans le select et copier dans div
  // ----- boucle for
  for (let option of selectElt.options) {
    const newOption = document.createElement("button");
    newOption.classList.add("btntrierouvert");
    newOption.setAttribute("tabIndex", "12"); // accessibilité
    newOption.innerHTML = option.innerHTML;
    // on ajoute après avoir fait la deuxième fleche
    //un ecouteur d'évenement click pour les options

    newOption.addEventListener("click", function (event) {
      event.stopPropagation();
      const sortValue = event.target.textContent;
      // const mediasBeforeSort = [...mediasFiltered];

      if (sortValue === "Popularité") {
        //trier par popularité les médias et les réafficher

        mediasFiltered.sort((a, b) => {
          // console.log(a, b);
          if (a.likes < b.likes) {
            return 1;
          } else {
            return -1;
          }
        });
      } else if (sortValue === "Date") {
        //trier par date
        mediasFiltered.sort((a, b) => {
          // console.log(a, b);
          if (a.date < b.date) {
            return 1;
          } else {
            return -1;
          }
        });
      } else if (sortValue === "Titre") {
        //trier par titre
        mediasFiltered.sort((a, b) => {
          // console.log(a, b);
          if (a.title > b.title) {
            return 1;
          } else {
            return -1;
          }
        });
      }

      // on remet le même code qu'au dessus pour le trie, faire une fonction serait mieux
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
      const elementContainerGallery =
        document.getElementById("articlephotograph");
      elementContainerGallery.innerHTML = mediasFilteredHtml; // elementContainerGallery est la référence vers l'élément dans lequel tu veux afficher tes photos.
      //fin du code repris
      //modifier le textcontent du bouton du filtre
      //date si click, likes  etc.
      //
      //
      //-----------------changer le textcontent
      // on fait une boucle sur chacune des options du select original
      for (let option of selectElt.options) {
        // console.log("selectElt.options", selectElt.options);
        //if les options de mon select d'origine est égal a l'élément que
        // je viens de cliquer
        if (option.innerHTML === this.innerHTML) {
          // on active la bonne option dans le select
          selectElt.selectedIndex = option.index;
          //on change le texte pour le mettre en haut

          // une fois que j'ai trouvé le bon textcontent pas la peine d'aller plus loin
          // on met sur le menu sur ce que l'on clique
          newSelect.innerHTML = this.innerHTML;
          // console.log(newSelect);
          break;
        }
        //apparait comme avant lors d'un nouveau click
        else {
          selectElt.selectedIndex = selectElt.options.index;
          newSelect.innerHTML = this.innerHTML;
        }
      }

      // apres la boucle for on simule un click sur newSelect
      newSelect.click();
      clickOnLikes(); // après le bloc "trier par", pour que cela fonctionne ajoute, enlève likes +
    });

    // on ajoute l'option dans le newMenu
    newMenu.appendChild(newOption);
  }

  // on affiche le menu comme précedemment
  selectDiv.appendChild(newMenu);

  //on ajoute event click sur newSelect
  const selectItems = document.querySelector(".select-items");
  newSelect.addEventListener("click", function (e) {
    selectItems.firstChild.classList.add("fleche_haut");
    selectItems.firstChild.style.borderRadius = "5px 5px 0 0";
    selectItems.lastChild.style.borderRadius = "0 0 5px 5px";
    selectItems.firstChild.style.backgroundColor = "orange !important";

    // empêche la propagation du click
    //e.stopPropagation();
    // on retire le select hide de notre menu
    // on cherche la balise suivante
    newSelect.nextSibling.classList.toggle("select-hide");

    // on ajoute la classe active à newSelect pour changer la flèche
    newSelect.classList.toggle("active");

    // Si on click n'importe ou sur la page la dropdown se ferme////
    var ignoreClickOnMeElement = document.querySelector(".newselecttrier");
    window.addEventListener("click", function unClickSurPageWindow(event) {
      var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
      if (!isClickInsideElement) {
        newSelect.nextSibling.classList.toggle("select-hide");
        newSelect.classList.toggle("active");
        //e.stopPropagation();
        window.removeEventListener("click", unClickSurPageWindow);
      }
    });
  });
}; // fin de la fonction renderSelect pour la dropdown

//  fin trier par

//
// ----------FORMULAIRE
//
// DOM Elements bouton je m'inscris modalbtn !!! c'est le button de chaque page

const modalButton = document.querySelectorAll(".modal-btn");
//lauch modal
// launch modal (bouton je m'inscris) évenement du formulaire au click
modalButton.forEach((btn) => btn.addEventListener("click", launchModal));
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
    nameRegex.test(nameInput.value) === true &&
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
    lastNameRegex.test(lastNameInput.value) == true &&
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

  if (valueNameInputEmail == "") {
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
  const messageInput = document.getElementById("message");
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

//----- FONCTION DE VALIDATION

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
///------------------------------------------------------------------------------------ FIN FORMULAIRE

// -----------------------DEBUT CLICK LIKES

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
          element.querySelector("button").innerHTML = media.likes;
        }
        return media;
      });

      //  console.log("likesElements", mediaId);
      recalculTotalLikes();
    });
  });
};
// fin click likes
