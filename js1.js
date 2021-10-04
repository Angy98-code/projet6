const photographArray = [
  {
    portrait: "MimiKeel.jpg",
    name: "Mimi Keel",
    id: 243,
    city: "London",
    country: "UK",
    tagline: "Voir le beau dans le quotidien",
    price: 400,
    tags: ["portrait", "events", "travel", "animals"],
  },
  {
    portrait: "EllieRoseWilkens.jpg",
    name: "Ellie-Rose Wilkens",
    id: 930,
    city: "Paris",
    country: "France",
    tagline: "Capturer des compositions complexes",
    price: 250,
    tags: ["sports", "architecture"],
  },
  {
    portrait: "TracyGalindo.jpg",
    name: "Tracy Galindo",
    id: 82,
    city: "Montreal",
    country: "Canada",
    tagline: "Photographe freelance",
    price: 500,
    tags: ["art", "fashion", "events"],
  },
  {
    portrait: "NabeelBradford.jpg",
    name: "Nabeel Bradford",
    id: 527,
    city: "Mexico City",
    country: "Mexico",
    tagline: "Toujours aller de l'avant",
    price: 350,
    tags: ["travel", "portrait"],
  },
  {
    portrait: "RhodeDubois.jpg",
    name: "Rhode Dubois",
    id: 925,
    city: "Barcelona",
    country: "Spain",
    tagline: "Je crée des souvenirs",
    price: 275,
    tags: ["sport", "fashion", "events", "animals"],
  },
  {
    portrait: "MarcelNikolic.jpg",
    name: "Marcel Nikolic",
    id: 195,
    city: "Berlin",
    country: "Germany",
    tagline: "Toujours à la recherche de LA photo",
    price: 300,
    tags: ["travel", "architecture"],
  },
];
//debugger;
let selectedTags = [];

// 1ere Array photograph
const getListItemHtml = (
  portrait,
  name,
  id,
  city,
  country,
  tagline,
  price,
  tags
) => {
  console.log("INFO", tags);

  return `
<div id="${id}" data-tags="${tags}" class="listitem">
<a href="index2.html?photographId=${id}" id="link${id}" class="portrait"><img src="image/${portrait}"/></a>        
<h2 class="name">${name}</h2>
    <template class="id">${id}</template>
    <div class="city_country">${city}, ${country}</div>
    <div class="tagline">${tagline}</div>
    <div class="price">${price}€/jour</div>
    <ul class="container_tags">
      ${tags
        .map(
          (tag) =>
            //` <li><a href="index.html" class="tags">#${tag}</a></li>`
            `<li><button data-tag="${tag}" id="navportrait" class="navbutton">#${tag}</button></li>`
        )
        .join("")}
    </ul>                              
  </div>
    `;
};

console.log;
/* switch (tags) {
  case "portrait":
    console.log(
      "afficher la fiche du photograph qui fait des portraits"
    )`<a href="index2.html?photographId=${id}"></a>`;
;

if(tags===photograph.tags){ afficher photograph index 2}

*/

//    onclick si tag === tag afficher sinon display None

const element = document.getElementById("list_container");
const listItemHtmlArray = photographArray.map((photograph) => {
  return getListItemHtml(
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
//debugger;
element.innerHTML = listItemHtmlArray.join("");
console.log(photographArray);

// tags

//console.log({ tags });
// fonction récupére chaque button addeventlistener sur chacun
const addListenerButtonNav = () => {
  const navButtons = document.querySelectorAll(".navbutton");
  navButtons.forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      const tagValue = buttonElement.getAttribute("data-tag");
      if (buttonElement.classList.contains("selected")) {
        buttonElement.classList.remove("selected");
        selectedTags = selectedTags.filter((tag) => tag !== tagValue);
      } else {
        buttonElement.classList.add("selected");
        selectedTags.push(tagValue);
      }
      console.log("selectedTags", selectedTags);
      //boucler dans les photographes et sélectionner ceux qui ont tous
      //les tags de selectedTags
      const photographElements = document.querySelectorAll(".listitem");
      photographElements.forEach((photograph) => {
        const photographTagsString = photograph.getAttribute("data-tags");
        const photographTagsArray = photographTagsString.split(",");
        //vérifier si les selected tags sont tous inclus dans les tags du photograph
        const isAllTagsSelectedIncluded = selectedTags.every((elem) =>
          photographTagsArray.includes(elem)
        );

        // si le photagraph a bien les tags sélectionnés dans ses tags => display block sinon none
        if (isAllTagsSelectedIncluded) {
          photograph.style.display = "block";
        } else {
          photograph.style.display = "none";
        }
      });
    });
  });
};

addListenerButtonNav();
