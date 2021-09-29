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
          <option id="option1" class="optionpopularité" value="">Popularité</option>
          <option class="optiondate" value="1">Date</option>
          <option class="optiontitre" value="2">Titre</option>
        </select>
      </div>
  </div>`;

//
// PARTIE GALERIE PHOTOS
//
//lightbox
const openLightbox = (id, index) => {
  console.log(id);

  //passer la lightbox en display block
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";
  //choper la ref à l'img ds lightbox
  const image = document.querySelector(".lightbox img");
  console.log(image);
  //définir la src de l'img via attribut src
  const mediaClick = mediasFiltered.find((media) => media.id === id);
  image.src = `image/${mediaClick.image}`;

  // POUR VIDEO, si je met video dans innerHtml les img indefined et video ne s'affiche pas
  const video = document.querySelector(".lightbox video");
  console.log(video);
  const videoClick = mediasFiltered.find((media) => media.id === id);
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

//const likeContainer (likes) => {
//pour likes TAF
//let likesNumber = likes.findLikesNumber((el) => el === "number");
//console.log(likesNumber);

//}
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
  index
) => {
  let htmlString = `<div class="articlegalery">
  <template>${id}</template>
  <template>${photographerId}</template>
  <template>${tags}</template>

  <div class"photocard">
  #bloctoreplace
  </div>

  <div class="cardonlytitlelikes">
    <p>${title}</p>
    <div class="heartbtn"> 
      <span class="onelike">${likes}</span>
    </div>
  </div>
  
  <template>${date}</template>
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

  //____________ name in modal
  /*const modalInputName = (name) => {
    //trouver name dans photograph
    photograph.name;
    return `${name}`;
  };*/
  //ok return the name

  // photograph.name.innerHTML = document.querySelector("p.namephotograph");
  console.log(photograph.name);
  //elementModalInputName.innerHTML = photograph.name;
  document.querySelector(".namephotograph").innerHTML = photograph.name;

  // likes

  //forEach likes // faire une map avec likes // find? // reduce()
  // affichage popularité, date ... https://www.zendevs.xyz/comment-trier-un-tableau-en-javascript-avec-la-methode-sort/
  // comment appeler les données de json, tableau
  //comment trouver les likes
  /* const lesLikes =
    parseInt(mediasFiltered[0].likes) +
    parseInt(mediasFiltered[1].likes) +
    parseInt(mediasFiltered[2].likes) +
    parseInt(mediasFiltered[3].likes) +
    parseInt(mediasFiltered[4].likes) +
    parseInt(mediasFiltered[5].likes) +
    parseInt(mediasFiltered[6].likes) +
    parseInt(mediasFiltered[7].likes) +
    parseInt(mediasFiltered[8].likes) +
    parseInt(mediasFiltered[9].likes);*/
  let lesLikes = 0;
  mediasFiltered.forEach((media) => {
    // console.log(lesLikes, medias);
    return (lesLikes += parseInt(media.likes));
  });
  console.log(lesLikes);

  document.querySelector(".totallikes").innerHTML = lesLikes;
  // il faut le for
  const array = [1, 2, 3, 4];
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  console.log(sum);

  //mediasFiltered.likes.forEach((lesLike) => {
  //  lesLikes += lesLike;
  //});
  //console.log(lesLikes);
  //const arr = [1, 2, 3, 4];
  //const reducer = (accumulator, curr) => accumulator + curr;
  //console.log(arr.reduce(reducer));
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

// video

// likes
const totalLikes = (likes) => {
  innerHtml;
};

// name fonction, je veux que la fonction me retourne un nom
/*const modalInputName = (name) => {
  return `${name}`;
};
mediasFiltered = data.media.filter(
  (media) => media.photographerId === idSearch
);
console.log(mediasFiltered);*/
/*const queryString_url_id = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString_url_id);
  const idSearch = parseInt(urlSearchParams.get("photographId"));
  //pour photograph
  const photograph = data.photographers.find(
    (element) => element.id === idSearch
  );

  //pour media
  mediasFiltered = data.media.filter(
    (media) => media.photographerId === idSearch
  );
*/
//photograph.nane.innerHTML = document.querySelector(".namephotograph");

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
}
setupLightbox(); // appeler la fonction

// fermeture gallery avec le bouton x     //ok
const btnCloseLightbox = document.querySelector(".lightbox__close");
const modallb = document.querySelector(".lightbox");
btnCloseLightbox.addEventListener("click", function (event) {
  modallb.style.display = "none";
});

////////___________slide
/*
let carrousel = {
nbSlide : 0, //nbre de slide du carrousel
nbCurrent : 1, // element courant
elemCurrent : null, //element affiché
elem : null, //quelle image réinitialiser


init : function(elem){
this.nbSlide=

}

};
*/

/*
var slideshows = document.querySelectorAll('[data-component="slideshow"]');
slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {

	var slides = document.querySelectorAll(`#${slideshow.id} [role="list"] .slide`);

	var index = 0, time = 5000;
	slides[index].classList.add('active');

	setInterval( () => {
		slides[index].classList.remove('active');
		
		index++;
		if (index === slides.length) index = 0;

		slides[index].classList.add('active');

	}, time);
}

	<div id="slideshow-example" data-component="slideshow">
		<div role="list">
			<div class="slide">
				<img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=752&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="">
			</div>
			<div class="slide">
				<img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=750&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="">
			</div>
			<div class="slide">
				<img src="https://images.unsplash.com/photo-1498753427761-548428edfa67?w=889&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="">
			</div>
		</div>
	</div>
*/
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
//
//trier relier
//
/*
let populariteBtn = document.querySelector(".optionpopularite");
populariteBtn.addEventListener("click", function () {
  const popularite = document.querySelector(".onelike");
  //affichage par ordre de préférence
  const populariteSorted = popularite.sort();
  console.log(populariteSorted);
  // oui mais selon le nombre de like,
  //.article galery(photo+like+titre) doit moove
});
*/
///////////////////////////////////////////////////////////////////////////////
//
//relier tag aux photograph
// on click tag exemple portrait, que les photographes
//avec tag portrait apparaissent
// les autres en display none

//...addEventListener on click
//if tag portrait afficher photographe === portrait
//else display.none

// likes

//var myButton = document.getElementsByClassName("onelike");
//Getting the button with "my-button" as id.
//var myOutput = document.querySelector(".heartBtn::after");
//Getting the id for the tag where you want to output your number
//var startNumber = 0;

/*Creating a function where it adds 1 to the startNumber variable
for every time you click on myButton.*
function addToNumber() {
  //Using template literal here.
  myOutput.innerHTML = `The current number is: ${1 + startNumber++}`;
  /*Sets the startNumber to 1+ startNumber++.
 	This makes it look like it starts to count from 1 and not 0
    the first time you click the the button.*
}
myButton.onclick = addToNumber;*/
// reappuyer enleve 1 like
//let likesNumber = likes.findLikesNumber((el) => el === "number");
//console.log(likesNumber);

//const totalLikes = () => {
//const elt = document.querySelector(".onelikes");
//elt.setAttribute("id", "likes");
//let allLikes = 0;
//ph//otograph.foreach((likes) => (allLikes += likes));
//};

// compteur de like ils se remettent à 0 !!
//
/*
console.log("likes", likes);
let clicks = 0;
function heart() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}
function heartMinus() {
  clicks -= 1;
  document.getElementById("clicks").innerHTML = clicks;
}*/
//
//
// NOMBRE DE LIKES TOTAL
//

//const likes = mediasFiltered; //tous les likes de tous les photographes du site
//console.log(likes.length);

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
/////////////////////////////////////////////////////////////////////////////////
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
