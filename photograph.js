// PAGE D'ACCUEIL
// SECTION PHOTOGRAPH ARRAY
//

const photographArray = [
  {
    portrait: "MimiKeel.jpg.jpg",
    name: "Mimi Keel",
    id: 243,
    city: "London",
    country: "UK",
    tagline: "Voir le beau dans le quotidien",
    price: 400,
    tags: ["portrait", "events", "travel", "animals"],
    contact: "Mimi Keel",
  },

  {
    portrait: "EllieRoseWilkens.jpg.jpg",
    name: "Ellie-Rose Wilkens",
    id: 930,
    city: "Paris",
    country: "France",
    tagline: "Capturer des compositions complexes",
    price: 250,
    tags: ["sports", "architecture"],
    contact: "Ellie-Rose Wilkens",
  },
  {
    portrait: "TracyGalindo.jpg.jpg",
    name: "Tracy Galindo",
    id: 82,
    city: "Montreal",
    country: "Canada",
    tagline: "Photographe freelance",
    price: 500,
    tags: ["art", "fashion", "events"],
    contact: "Tracy Galindo",
  },
  {
    portrait: "NabeelBradford.jpg.jpg",
    name: "Nabeel Bradford",
    id: 527,
    city: "Mexico City",
    country: "Mexico",
    tagline: "Toujours aller de l'avant",
    price: 350,
    tags: ["travel", "portrait"],
    contact: "Nabeel Bradford",
  },
  {
    portrait: "RhodeDubois.jpg.jpg",
    name: "Rhode Dubois",
    id: 925,
    city: "Barcelona",
    country: "Spain",
    tagline: "Je crée des souvenirs",
    price: 275,
    tags: ["sport", "fashion", "events", "animals"],
    contact: "Rhode Dubois",
  },
  {
    portrait: "MarcelNikolic.jpg.jpg",
    name: "Marcel Nikolic",
    id: 195,
    city: "Berlin",
    country: "Germany",
    tagline: "Toujours à la recherche de LA photo",
    price: 300,
    tags: ["travel", "architecture"],
    contact: "Marcel Nikolic",
  },
];

// 1ere Array photograph
const getBlock = (portrait, name, id, city, country, tagline, price, tags) => `
<div id="list_container1">
<a href="/photograph?photographId=${id}" id="list_container" class="portrait"><img src="images/${portrait}"/></a>        
<h2 class="name">${name}</h2>
    <template class="id">${id}</template>
    <div class="city_country">${city}, ${country}</div>
    <div class="tagline">${tagline}</div>
    <div class="price">${price}€/jour</div>
   <ul class="container_tags">
                    <li><a href="index.html" class="tags">#${tags}</a></li>
                </ul>                               
    </div>
    `;

const element = document.getElementById("list_container");
element.innerHTML = photographArray.map((photograph) => {
  return getBlock(
    photograph.portrait,
    photograph.name,
    photograph.id,
    photograph.city,
    photograph.country,
    photograph.tagline,
    photograph.price,
    photograph.tags
  );
});
/*
// 2eme Array tags
const getTags = (
  portrait,
  art,
  fashion,
  architecture,
  travel,
  sport,
  animals,
  events
) => `
<div id="list_container2"> 
<!-- taf-->
<div id="list_tagscontainer">
                <ul>
                le mettre à chaque ligne ? à ahref
                    <li> <a href="">${portrait}</a></li>
                    <li> <a href="">${art}</a></li>
                    <li> <a href="">${fashion}</a></li>
                    <li> <a href="">${architecture}</a></li>
                    <li> <a href="">${travel}</a></li>
                    <li> <a href="">${sport}</a></li>
                    <li> <a href="">${animals}</a></li>
                    <li> <a href="">${events}</a></li>

                </ul>

            </div>
        






    `;

const elementTags = document.getElementById("list_tagscontainer");
elementTags.innerHTML = photographArray.map((tags) => {
  return getTags(
    tags.portrait,
    tags.art,
    tags.fashion,
    tags.architecture,
    tags.travel,
    tags.sport,
    tags.animals,
    tags.events
  );
});

*/
///
/*
// RECHERCHE ID
// url chaine de requête et je veux mon id
const queryString_url_id = window.location.search;
//console.log(queryString_url_id);
//methode 1 facile
//const leId = queryString_url_id.slice(1);
//console.log(leId);
//methode 2 pour inscrire URL sur l'adresse :)
const urlSearchParams = new URLSearchParams(queryString_url_id);
//console.log(urlSearchParams);

const idSearch = urlSearchParams.getAll("id");
console.log(idSearch);

// affichage portrait suite recherche de l'id
//méthode 1 : avec fetch et en mettant la valeur de l'id à la fin de l'url
//methode 2 : utilisation methode find
console.log(photographArray);

const idFromPhotograph = photographArray.find(
  (element) => element.id === idSearch
);
console.log(idFromPhotograph);
//selection de la classe injection code html
const positionPagePhotograph = document.querySelector("photograph.html");
console.log(positionPagePhotograph);
*/

//je refais recherche id et faire le lien

console.log(photographArray);
//const tagsArray = [{portait},{art}, {fashion}, {architechture}, {travel}, {sport}];

/////
//OKOK OKOK OK OK OK OK OK
// DOM Elements
// bouton je m'inscris modalbtn !!! c'est le button de chaque page
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
    changeStyleFirstName = document.getElementById("texterrorfirstname");
    changeStyleFirstName.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    return false;
  } else if (
    nameRegex.test(nameInput.value) === true && ///erreur si valueNameInput!!!!!!!
    valueNameInput.length >= 2
  ) {
    errorText.innerHTML = "";
    changeStyleFirstName = document.getElementById("texterrorfirstname");
    changeStyleFirstName.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    return true;
  } else {
    changeStyleFirstName = document.getElementById("texterrorfirstname");
    changeStyleFirstName.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    errorText.innerHTML = "Merci d'indiquer un prénom";
    return false;
  }
};

//2EME CHAMP NOM
const validateLast = (event) => {
  //  event.preventDefault();
  const lastNameInput = document.getElementById("lastname");
  const valueLastNameInput = lastNameInput.value;
  const lastNameRegex = /^[A-ZÇÉÈÊËÀÂÎÏÔÙÛa-zçéèêëàâîïôùû_\-\.\ ]+$/;
  let errorText = document.getElementById("texterrorlastname");

  if (valueLastNameInput.length < 2) {
    errorText.innerHTML =
      "Merci d'entrer au minimum 2 caractères <br>pour le champ du nom.";
    changeStyleLastName = document.getElementById("texterrorlastname");
    changeStyleLastName.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    return false;
  } else if (
    lastNameRegex.test(lastNameInput.value) == true && ///erreur si valueNameInput!!!!!!!
    valueLastNameInput.length >= 2
  ) {
    errorText.innerHTML = "";
    changeStyleLastName = document.getElementById("texterrorlastname");
    changeStyleLastName.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    return true;
  } else {
    changeStyleFirstName = document.getElementById("texterrorfirstname");
    changeStyleFirstName.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    errorText.innerHTML = "Merci d'indiquer un nom";
    return false;
  }
};

//3EME CHAMP EMAIL
const validateEmail = (event) => {
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
    changeStyleEmail = document.getElementById("texterroremail");
    changeStyleEmail.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    return false;
  } else if (!emailFormat.test(valueNameInputEmail)) {
    document.getElementById("texterroremail").textContent =
      "Adresse email incorrect. ";
    changeStyleEmail = document.getElementById("texterroremail");
    changeStyleEmail.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    return false;
  } else {
    document.getElementById("texterroremail").textContent = "";
    return true;
  }
};

//4EME CHAMP TEXTAREA

const validateMessage = (event) => {
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
    changeStyleLastName = document.getElementById("texterrormessage");
    changeStyleLastName.setAttribute(
      "style",
      "font-size : 16px; color : red; font-weight : bold"
    );
    return false;
  } else if (valueMessageInput.length > 2) {
    errorText.innerHTML = "";
    // changeStyleLastName = document.getElementById("texterrorlastname");
    //  changeStyleLastName.setAttribute(
    //   "style",
    //   "font-size : 16px; color : red; font-weight : bold"
    //  );
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
  .addEventListener("dblclick", function (event) {
    //event.preventDefault();
    validate(event);
  });

//
// BOUTON FERMETURE APRES INSCRIPTION
const btnValidation = document.getElementById("btn-validation");
btnValidation.addEventListener("click", function (event) {
  modalbg.style.display = "none";
});

/// FIN FORMULAIRE

//PAGE DES PHOTOGRAPHES

const getBlockPhotograph = (
  name,
  id,
  city,
  country,
  tagline,
  tags,
  contact,
  portrait
) => `
<div id="list_personnalphotographcontainer">

<div><h2 class="name">${name}</h2>
    <template class="id">${id}</template>
    <div class="city_country">${city}, ${country}</div>
    <div class="tagline">${tagline}</div>
   <ul class="container_tags">
                    <li><a href="index.html" class="tags">#${tags}</a></li>
                </ul>  </div>
                 <div> <button class="contact">${contact}</button> </div>
<div><a href="/photograph" class="portrait"><img src="images/${portrait}"/></a>        
     </div>                                       
    </div>
    `;

const elementPhotograph = document.getElementById(
  "list_personnalphotographcontainer"
);
elementPhotograph.innerHTML = photographArray.map((dataPhotograph) => {
  return getBlockPhotograph(
    dataPhotograph.name,
    dataPhotograph.id,
    dataPhotograph.city,
    dataPhotograph.country,
    dataPhotograph.tagline,

    dataPhotograph.tags,
    dataPhotograph.contact,
    dataPhotograph.portrait
  );
});
