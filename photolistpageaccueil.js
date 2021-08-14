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
const getListItemHtml = (
  portrait,
  name,
  id,
  city,
  country,
  tagline,
  price,
  tags
) => `
<div id="list_container1">
<a href="photographpersopage.html?photographId=${id}" id="list_container" class="portrait"><img src="images/${portrait}"/></a>        
<h2 class="name">${name}</h2>
    <template class="id">${id}</template>
    <div class="city_country">${city}, ${country}</div>
    <div class="tagline">${tagline}</div>
    <div class="price">${price}€/jour</div>
    <ul class="container_tags">
      ${tags
        .map(
          (tag) => ` <li><a href="index.html" class="tags">#${tag}</a></li>
               
      `
        )
        .join("")}
                    </ul>                               
    </div>
    `;

const element = document.getElementById("list_container");
element.innerHTML = photographArray.map((photograph) => {
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
/*
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
*/
