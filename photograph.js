//
// HEADER NAV ARRAY
//
/*
const navArray = [
  { Portrait: "#Portrait" },
  { Art: "#Art" },
  { Fashion: "#Fashion" },
  { Architecture: "#Architecture" },
  { Travel: "#Travel" },
  { Sport: "#Sport" },
  { Animals: "#Animals" },
  { Event: "#Event" },
];
const getBlockNav = (
  Portrait,
  Art,
  Fashion,
  Architecture,
  Travel,
  Sport,
  Animals,
  Events
) => `
<div id="list_nav">
    <ul>
    <a href="">${Portrait}</a>
    <a href="">${Art}</a>
<a href="">${Fashion}</a>
    <a href="">${Architecture}</a>
     <a href="">${Travel}</a>
    <a href="">${Sport}</a>
<a href="">${Animals}</a>
    <a href="">${Events}</a>
    
    </ul>

    </div>
`;

/*
class Photograph {
    getBlock(){
        return `
<div>
    <h1>${name}</h1>
    <div>${town}</div>

</div>
`;
    }
}


const elementNav = document.getElementById("list_nav");
elementNav.innerHTML = navArray.map((nav) => {
  // nav.preventDefault();
  return getBlockNav(
    nav.Portrait,
    nav.Art,
    nav.Fashion,
    nav.Architecture,
    nav.Travel,
    nav.Sport,
    nav.Animals,
    nav.Events
  );
});
*/
//{ name: "Mimi Keel", town: "London UK" },
//{ name: "Mary Ton", city: "London UK" },

//
// SECTION PHOTOGRAPH ARRAY
//
const photographArray = [
  {
    name: "Mimi Keel",
    id: 243,
    city: "London",
    country: "UK",
    tags: ["portrait", "events", "travel", "animals"],
    tagline: "Voir le beau dans le quotidien",
    price: 400,
    portrait: "MimiKeel.jpg.jpg",
  },

  {
    name: "Ellie-Rose Wilkens",
    id: 930,
    city: "Paris",
    country: "France",
    tags: ["sports", "architecture"],
    tagline: "Capturer des compositions complexes",
    price: 250,
    portrait: "EllieRoseWilkens.jpg",
  },
  {
    name: "Tracy Galindo",
    id: 82,
    city: "Montreal",
    country: "Canada",
    tags: ["art", "fashion", "events"],
    tagline: "Photographe freelance",
    price: 500,
    portrait: "TracyGalindo.jpg",
  },
  {
    name: "Nabeel Bradford",
    id: 527,
    city: "Mexico City",
    country: "Mexico",
    tags: ["travel", "portrait"],
    tagline: "Toujours aller de l'avant",
    price: 350,
    portrait: "NabeelBradford.jpg",
  },
  {
    name: "Rhode Dubois",
    id: 925,
    city: "Barcelona",
    country: "Spain",
    tags: ["sport", "fashion", "events", "animals"],
    tagline: "Je crée des souvenirs",
    price: 275,
    portrait: "RhodeDubois.jpg",
  },
  {
    name: "Marcel Nikolic",
    id: 195,
    city: "Berlin",
    country: "Germany",
    tags: ["travel", "architecture"],
    tagline: "Toujours à la recherche de LA photo",
    price: 300,
    portrait: "MarcelNikolic.jpg",
  },
];
const getBlock = (name, id, city, country, tags, tagline, price, portrait) => `
<div id="list_container">
    <h2 class="name">${name}</h2>
    <template class="id">${id}</template>
    <div class="city">${city}</div>
    <div class="country">${country}</div>
    <div class="tags">${tags}</div>
    <div class="tagline">${tagline}</div>
    <div class="price">${price}</div>
    <div class="portrait">${portrait}</div>
    </div>
`;

var nouvelleimage = document.createElement("IMG");
document.getElementById("portrait").appendChild(nouvelleimage);
document
  .getElementById("portrait")
  .lastChild.setAttribute("src", MimiKeel.jpg.jpg);

/*
class Photograph {
    getBlock(){
        return `
<div>
    <h1>${name}</h1>
    <div>${town}</div>

</div>
`;
    }
}
*/
const element = document.getElementById("list_container");
element.innerHTML = photographArray.map((photograph) => {
  return getBlock(
    photograph.name,
    photograph.id,
    photograph.city,
    photograph.country,
    photograph.tags,
    photograph.tagline,
    photograph.price,
    photograph.portrait
  );
});
//
//pour les images des photographes NE FONCTIONNE PAS
//
//
/*
let imgMimiKeel = document.createElement("imgMimiKeel");
img.src = "MimiKeel.jpg.jpg";

let photoPortrait = document.getElementById("portrait");
photoPortrait.appendChild(img);*/
//block.setAttribute("style", "text-align:center");
