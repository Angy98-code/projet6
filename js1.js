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
<a href="index2.html?photographId=${id}" id="list_container" class="portrait"><img src="image/${portrait}"/></a>        
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
//debugger;
element.innerHTML = photographArray
  .map((photograph) => {
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
  })
  .join("");
console.log(photographArray);

// tags

//console.log({ tags });
