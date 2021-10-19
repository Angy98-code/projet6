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
                  `<span><a href="index.html" class="tagsphotograph" aria-label="${tag}">#${tag}</a></span>`
              )
              .join("")}
          </ul>                               
          
             <div class="formulaire" alt="formulaire de contact" aria-label="contact me"></div>      
          <div class="taillephotographiphone">
       
            <img src="image/${portrait}" id="portraitphotograph" alt="photo de ${name}"/>       
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
            <option class="optionpopularite" value="popularity" aria-label="popularité">Popularité</option>
            <option class="optiondate" value="date" aria-label="date">Date</option>
            <option class="optiontitre" value="title" aria-label="titre">Titre</option>
          </select>
        </div>
    </div aria-hidden="true">
    <article id="articlephotograph" aria-hidden="false"></article>`;
// la modal trier par
//console.log(data.mediaFiltered.likes);
//
// PARTIE GALERIE PHOTOS
//
//lightbox

/////////////////////:galery plus des données plus haut
function setupLightbox() {
  // creer html de la lightbox , elle doit etre au depart en display none
  const lightboxHtml = `<div class="lightbox" aria-hidden="false">
    <div class="lightbox__container" aria-label="image closeup view">
      <div class="slide"><img aria-label="Lilac breasted roller"/><video controls aria-label="Lilac breasted roller"></video></div>
      <div class="lightbox__prev" aria-label="Previous image"><i class="fas fa-chevron-left" name="prev"></i></div>
      <div class="lightbox__next" aria-label="Next image"><i class="fas fa-chevron-right" name="next"></i></div>
   <div class="titrePhotoDansCarousel" aria-label="Title from media"></div>
      </div>
    <div class="lightbox__close" aria-label="Close dialog"><i class="fas fa-times"></i></div>
  </div aria-hidden="true">`;
  //  ---------------SLIDE

  // injecter au bon endroit html
  const element = document.getElementById("lightbox");
  element.innerHTML = lightboxHtml;

  // -------------FERMETURE LIGHTBOX
  const btnCloseLightbox = document.querySelector(".lightbox__close");
  const modallb = document.querySelector(".lightbox");
  btnCloseLightbox.addEventListener("click", function (event) {
    modallb.style.display = "none";
  });
  //------------------------------------------------------------------------------
} // -----------------------fermeture setuptLightbox

// faut mettre le reste dans cette fonction n'est-il pas ?
// car openLightbox fait appel à cette fonction donc non
const openLightbox = (mediaId, index) => {
  setupLightbox();

  //passer la lightbox en display block
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";

  //récupérer la ref à l'img ds lightbox
  const image = document.querySelector(".lightbox img");
  console.log("image", image);

  const mediaClick = mediasFiltered.find((media) => media.id === mediaId);
  //définir la src de l'img via attribut src
  image.src = `image/${mediaClick.image}`;

  // POUR VIDEO,
  const video = document.querySelector(".lightbox video");
  console.log(video);
  const videoClick = mediasFiltered.find((media) => media.id === mediaId);
  video.src = `image/${videoClick.video}`;

  const affichageLightbox = () => {
    //cette fonction doit apparaitre
    //dans le addeventlistener non ?
    if (image === image) {
      return image;
    } else if (video === video) {
      return video;
    }
  };

  /////////////////SLIDER A METTRE ICI
  // //autre exemple
  //const arraySlide = mediasFiltered;
  // const slideImageVideo = document.querySelector(".slide"); //???
  const buttonNext = document.querySelector("div.lightbox__next");
  const buttonPrev = document.querySelector("div.lightbox__prev");
  let i = 0; //current image or video
  // const image2 = document.querySelector("div.lightbox img video");
  //const arrayImageVideo ?????

  //const btnCloseLightbox = document.querySelector(".lightbox__close");
  modallb = document.querySelector(".lightbox"); //close modal ici pour exemple
  // btnCloseLightbox.addEventListener("click", function (event) {
  buttonNext.addEventListener("click", function (event) {
    i++;
    //add 1 to current index
    if (i > mediaClick.length - 1) {
      //? mediasFiltered (arrayphoto)
      //if current index passes last photo in array
      i = 0;
      //     //set index back to zero
    }

    //video.src = mediasFiltered[i]; //mediaclick ne fonctionne pas
    image.src = mediaClick[i];
    //video.src = videoClick[i]; //ca bouge un peu mais ne fonctionne pas
    console.log("mediaClick", mediaClick);
    //??? (photo !!)non pas slideimagevideo
    //attention j'ai image et video !!!!
    //   //set slide to current index
  });
  buttonPrev.addEventListener("click", function (event) {
    modallb.style.display = "none";
  });
}; // ---------------fermeture openLightbox

//autre exemple
// var i = 0;

// function ChangeSlide(sens) {
//     i = i + sens;
//     if (numero < 0)
//         numero = slide.length - 1;
//     if (numero > slide.length - 1)
//         numero = 0;
//     document.getElementById("slide").src = slide[numero];
// }

//previous slide
// const goPreviousMedia = () => {
//   if (indexCurrentMedia > 0) indexCurrentMedia--;
//   else indexCurrentMedia = mediasFiltered.length - 1;

//   createNewMedia();
// };

// //next slide
// const goNextPhotoMedia = () => {
//   if (indexCurrentMedia < media.length - 1) indexCurrentMedia++;
//   else indexCurrentMedia = 0;

//   createNewMedia();
// };

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

  <div class="cardonlytitlelikes" >
    <p aria-label="text">${title}</p>
    <div class="heartbtn" data-id="${id}"> 
      <span class="onelike" aria-label="likes">${likes}</span>
    </div>
  </div>
  
  <template class="date">${date}</template>
  </div>`;
  const htmlImage = `  <div onclick="return openLightbox(${id}, ${index})"><img src="image/${image}" class="imagesgalery" alt="${title}" role="image"/><template>${image}</template>
    </div>
  `;

  const htmlVideo = `  <div onclick="return openLightbox(${id}, ${index})"><video controls src="image/${video}" class="videosgalery" alt="${title}" role="video" aria-label="video, ${video}"/><template>${video}</template>
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
  //1er a enlever
  // const sortingSelect = document.querySelector("#sortingSelect");
  // console.log(sortingSelect);
  // sortingSelect.addEventListener("change", (event) => {
  //   console.log(event.target.value);
  // });

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
    setupLightbox();
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
    newOption.addEventListener("click", function (event) {
      event.stopPropagation();
      const sortValue = event.target.textContent;
      const mediasBeforeSort = [...mediasFiltered];
      //retrier les éléments photo en fonction event target
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

        console.log(
          "pour les likes mediasFiltered, mediasBeforeSort",
          mediasFiltered,
          mediasBeforeSort
        );
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
        console.log(
          "pour les dates mediasFiltered, mediasBeforeSort",
          mediasFiltered,
          mediasBeforeSort
        );
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
        console.log(
          "pour les dates mediasFiltered, mediasBeforeSort",
          mediasFiltered,
          mediasBeforeSort
        );
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
        console.log("selectElt.options", selectElt.options);
        //if les options de mon select d'origine est égal a l'élément que
        // je viens de cliquer
        if (option.innerHTML === this.innerHTML) {
          // on active la bonne option dans le select
          selectElt.selectedIndex = option.index;
          //on change le texte pour le mettre en haut

          // une fois que j'ai trouvé le bon textcontent pas la peine d'aller plus loin
          // on met sur le menu sur ce que l'on clique
          newSelect.innerHTML = this.innerHTML;
          console.log(newSelect);
          break;
        }
        //apparait comme avant lors d'un nouveau click
        else {
          selectElt.selectedIndex = selectElt.options.index;
          newSelect.innerHTML = this.innerHTML;
        }
      }

      // apres la boucle for on simule un click sur newSelect

      // ca va fermer le menu
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
    // selectItems.style.marginTop = "-47px";
    //selectItems.firstChild.style.color = "transparent";
    selectItems.firstChild.classList.add("fleche_haut");
    selectItems.firstChild.style.borderRadius = "5px 5px 0 0";
    selectItems.lastChild.style.borderRadius = "0 0 5px 5px";
    selectItems.firstChild.style.backgroundColor = "orange !important";
    // if ((selectItems.firstChild.style.color = "transparent")) {
    //   selectItems.firstChild.style.color = "white";
    // }

    // empêche la propagation du click
    e.stopPropagation();
    // on retire le select hide de notre menu
    // on cherche la balise suivante
    newSelect.nextSibling.classList.toggle("select-hide");
    // on ajoute la classe active à newSelect pour changer la flèche
    newSelect.classList.toggle("active");

    // if (this.classList.toggle("select-hide")) {
    //   this.style.borderRadius = "5px 5px 5px 5px";
    // }
    // } // permet le bon affichage mais manque le flèche
  });
}; // fin de la fonction renderSelect pour la dropdown

//  fin trier par
// -----------------------Début click likes
//console.log(media.likes);

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
//-------------------IMPORTANT ACCESSIBILITE

// Func
//pour modal
/*
const onOpenModal = () => {
   $mainWrapper.attr('aria-hidden', 'true')
   $modal.attr('aria-hidden', 'false')
   $body.addClass('no-scroll')
   $modal.css('display', 'flex')
   $modalCloseBtn.focus()
}
 
const onCloseModal = () => {
   $mainWrapper.attr('aria-hidden', 'false')
   $modal.attr('aria-hidden', 'true')
   $body.removeClass('no-scroll')
   $modal.css('display', 'none')
   $openModalBtn.focus()
}

le focus sur le bouton d’ouverture ou de fermeture de la modale ;

la gestion des touches clavier, et notamment la touche “Esc”.

const onOpenModal = () => {
   $mainWrapper.attr('aria-hidden', 'true')
   $modal.attr('aria-hidden', 'false')
   $body.addClass('no-scroll')
   $modal.css('display', 'flex')
   $modalCloseBtn.focus()
}
Quand la modale s’ouvre, en plus de mettre à jour les attributs `aria-hidden`, nous mettons le focus sur le bouton de fermeture de la modale (ce qui permet de la fermer avec la barre “espace”.)

// Close modal when escape key is pressed
$(document).on('keydown', e => {
   const keyCode = e.keyCode ? e.keyCode : e.which
 
   if ($modal.attr('aria-hidden') == 'false' && keyCode === 27) {
       onCloseModal()
   }
})

Ici, via le JavaScript, nous écoutons les touches du clavier pour pouvoir fermer la modale quand la touche Esc   est pressée.


// pour caroussel

$(document).keydown(function(e) {
   const keyCode = e.keyCode ? e.keyCode : e.which
 
   if (keyCode === 39) {
       goToNextSlide()
   } else if (keyCode === 37) {
       goToPreviousSlide()
   }
})
 
$carouselPauseBtn.on('click', function() {
   clearInterval(carouselInterval)
})
$(document).keydown(function(e) {
   const keyCode = e.keyCode ? e.keyCode : e.which
 
   if (keyCode === 39) {
       goToNextSlide()
   } else if (keyCode === 37) {
       goToPreviousSlide()
   }
})
 
$carouselPauseBtn.on('click', function() {
   clearInterval(carouselInterval)
})

$(document).keydown(function(e) {
   const keyCode = e.keyCode ? e.keyCode : e.which
 
   if (keyCode === 39) {
       goToNextSlide()
   } else if (keyCode === 37) {
       goToPreviousSlide()
   }
})
 
$carouselPauseBtn.on('click', function() {
   clearInterval(carouselInterval)
})
$(document).keydown(function(e) {
   const keyCode = e.keyCode ? e.keyCode : e.which
 
   if (keyCode === 39) {
       goToNextSlide()
   } else if (keyCode === 37) {
       goToPreviousSlide()
   }
})
 
$carouselPauseBtn.on('click', function() {
   clearInterval(carouselInterval)
})

D’ailleurs, concernant les contrôles, notez qu’ils sont masqués visuellement, mais sont affichés pour les technologies d'assistance.

<div role="button" class="controls controls-left">
   <span class="img prev-image">
       <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
   </span>
   <p class="sr-only">Previous</p>
</div>
De la même façon, chacun des items du carrousel dispose d’un attribut  aria-hidden  . 

Ce dernier est changé via le JavaScript ici :

const setNodeAttributes = (lastItem, currentItem) => {
   $(lastItem).css('display', 'none')
   $(currentItem).css('display', 'block')
   $(lastItem).attr('aria-hidden', 'true')
   $(currentItem).attr('aria-hidden', 'false')
}
Ce script permet de mettre :

un  display: none;  à l’élément qui vient d’être affiché, et passe l’attribut  aria-hidden  à true ;

un  display: block;  à l’élément qui est affiché.
*/
