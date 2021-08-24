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

/*
const modalBtn = document.querySelectorAll(".modal-btn");
const listBoxHidden = document.getElementByClassName("trierscrollecache");
//lauch modal
// launch modal (bouton je m'inscris) évenement du formulaire au click
listBoxHidden.forEach((btn) => btn.addEventListener("click", boutontrier));
// apparition de la launchModal formulaire d'inscription
function boutontrier() {
  trierflechebas.style.display = "block";
}
*/

// puis dès le choix fait que se passe t'il ?

/////////////////////////////////////////////////////

const getPageProfil = (
  name,
  id,
  city,
  country,
  tagline,
  tags,

  portrait
) =>
  `
<div id="list_photographcontainer">
<h2 class="h2photograph">${name}</h2>

    <template class="id">${id}</template>
    <div class="city_country">${city}, ${country}</div>
    <div class="taglinephotograph">${tagline}</div>
    
    <ul class="container_photographtags">
      ${tags
        .map(
          (
            tag
          ) => ` <li><a href="index.html" class="tagsphotograph">#${tag}</a></li>
               
      `
        )
        .join("")}
                    </ul>                               
    </div>
<div class="taillephotographiphone">
    <a href="index2.html?photographId=${id}" id="portraitphotograph" class="portraitphotograph"><img src="images/${portrait}" id="portraitphotograph"/></a>        
</div>
     `;
/*
const elementPhotograph = document.getElementById("list_photographcontainer");
console.log(element);
elementPhotograph.innerHTML = photographArray.map((photographData) => {
  return getPageProfil(
    photographData.name,
    photographData.id,
    photographData.city,
    photographData.country,
    photographData.tagline,
    photographData.tags,
    photographData.contact,
    photographData.portrait
  );
});

/*
const photograph = photographArray.find(
  (photograph) => photograph.id === photographId
);
*/

const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
//console.log(urlSearchParams);
//parseInt pour mettre en number et non en string car id en number
// get et non getall
const idSearch = parseInt(urlSearchParams.get("photographId"));
console.log({ idSearch, photographArray });
const photograph = photographArray.find((element) => element.id === idSearch);

// . find permet de récupérer le 1er element du tableau qui valide
// la condition
console.log({ photograph });

const elementPhotograph = document.getElementById("list_photographcontainer");
elementPhotograph.innerHTML = getPageProfil(
  photograph.name,
  photograph.id,
  photograph.city,
  photograph.country,
  photograph.tagline,
  photograph.tags,

  photograph.portrait
);

//selection de la classe injection code html
//const positionPagePhotograph = document.querySelector("index2.html");
//console.log(positionPagePhotograph);

//je refais recherche id et faire le lien

console.log(photographArray);

//////////////////////////////////////////////////////////////
/*
// BOUTON TRIER LISTBOX 9

const listBox = (data) => {
  let listBoxOuverture = document.getElementByClassName("trierflechebas");
  let listBoxFermeture = document.getElementByName("iconfermeture");
  let listBoxHidden = document.getElementByClassName("trierscrollecache");

  if (listBoxOuverture) {
    listBoxOuverture.addEventListener("click", () => {
      listBoxHidden.style.display = "block";
    });
  }
  if (listBoxFermeture) {
    listBoxFermeture.addEventListener("click", () => {
      listBoxHidden.style.display = "none";
    });
  }
};
*/
// FORMULAIRE    FORMULAIRE     FORMULAIRE
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
      "text-align : left; font-size : 15px; color : red; font-weight : bold"
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
      "font-size : 15px; color : red; font-weight : bold"
    );
    return true;
  } else {
    changeStyleFirstName = document.getElementById("texterrorfirstname");
    changeStyleFirstName.setAttribute(
      "style",
      "text-align : left; font-size : 15px; color : red; font-weight : bold"
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
      "text-align : left; font-size : 15px; color : red; font-weight : bold"
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
      "font-size : 15px; color : red; font-weight : bold"
    );
    return true;
  } else {
    changeStyleFirstName = document.getElementById("texterrorfirstname");
    changeStyleFirstName.setAttribute(
      "style",
      "text-align : left; font-size : 15px; color : red; font-weight : bold"
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
      "text-align : left; font-size : 15px; color : red; font-weight : bold"
    );
    return false;
  } else if (!emailFormat.test(valueNameInputEmail)) {
    document.getElementById("texterroremail").textContent =
      "Adresse email incorrect. ";
    changeStyleEmail = document.getElementById("texterroremail");
    changeStyleEmail.setAttribute(
      "style",
      "text-align : left; font-size : 15px; color : red; font-weight : bold"
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
      "text-align : left; font-size : 15px; color : red; font-weight : bold"
    );
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
btnValidation.addEventListener("click", function (event) {
  modalbg.style.display = "none";
});

/// FIN FORMULAIRE

// bouton trier par
window.onload = () => {
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
      for (let option of selectElt.options) {
        // if les options de mon select d'origine est égal a l'élément que
        // je viens de cliquer
        if (option.innerHTML === this.innerHTML) {
          // on active la bonne option dans le select !!!! moi ca ne fonctionne pas  au niveau console!!!
          selectElt.selectedIndex = option.index;
          //on change le texte pour le mettre en haut

          // une fois que j'ai trouvé la bonne pas la peine d'aller plus loin
          // on met sur le menu sur ce que l'on clique
          newSelect.innerHTML = this.innerHTML;
          break;
        }
      }
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

// compteur de like

let clicks = 0;
function heart() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}

// mettre nom et like sous chque photo
const likesphotos = document.getElementById("galeriephotos");

galeriephotos;
