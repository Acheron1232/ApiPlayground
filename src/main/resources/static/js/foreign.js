const userData = {
   country: undefined,
   city: undefined,
   position: {
      lotitude: undefined,
      longitude: undefined
   },
   geoGui: {
      country: document.querySelector(".g-country input"),
      city: document.querySelector(".g-city input"),
      changeGeo(args) {
         const { country, city } = args;
         country && (userData.country = country);
         city && (userData.city = city);
         userData.country && (this.country.value = userData.country);
         userData.city && (this.city.value = userData.city);
      },
      getGeo() {
         return {
            country: this.country.textContent,
            city: this.city.textContent
         };
      }
   }
};

const countryData = {
   nativeName: undefined,
   svgFlag: undefined,
   population: undefined,
   languages: undefined,
   capital: undefined
};
// variables
const geoFind = document.querySelector(".targetGeo");
const getCountry = document.querySelector(".getCountry");

const changePars = document.querySelectorAll(".geoGui button");
const geoInputs = document.querySelectorAll(".geoGui input");

// functions
const handlePosition = function (args) {
   const { lotitude, longitude } = args;
   fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lotitude}&longitude=${longitude}&localityLanguage=en`
   )
      .then((response) => response.json())
      .then((data) => {
         userData.geoGui.changeGeo({
            country: data.countryName,
            city: data.city
         });
         userData.geoGui.country.classList.remove("loading");
         userData.geoGui.city.classList.remove("loading");
      });
};
// listners
geoFind.addEventListener("click", function () {
   userData.geoGui.country.classList.add("loading");
   userData.geoGui.city.classList.add("loading");
   // console.log(userData.geoGui);
   // console.log(userData.geoGui.country.classList);
   // console.log(userData.geoGui.country);
   navigator.geolocation.getCurrentPosition(
      function (position) {
         // console.log(position);
         userData.position.lotitude = position.coords.latitude;
         userData.position.longitude = position.coords.longitude;
         handlePosition(userData.position);
      },
      function () {
         console.log("could not acess location");
      }
   );
});

changePars.forEach((el) => {
   el.addEventListener("click", function () {
      const box = el.parentElement;
      const inpt = box.querySelector("input");
      box.classList.toggle("edit");
      inpt.readOnly = !inpt.readOnly;
      inpt.focus();
      if (el.switch) {
         userData.geoGui.changeGeo({
            country: box.className.includes("co") ? inpt.value : undefined,
            city: box.className.includes("ci") ? inpt.value : undefined
         });
         el.switch = 0;
      }
      el.switch = 1;
   });
});

geoInputs.forEach((el) => {
   // console.log(geoInputs);
   el.addEventListener("input", function(){
      el.style.width = Math.max(el.value.length, 6) + "ch";
   })
});
getCountry.addEventListener("click", function () {
   fetch(`https://restcountries.com/v3.1/name/${userData.country}`)
      .then((response) => response.json())
      .then((data) => {
         // if (countryData.)
         // console.log(data[0]);
         // console.log(userData);
         countryData.nativeName = data[0].name.nativeName;
         countryData.svgFlag = data[0].flags.svg;
         countryData.population = data[0].population;
         countryData.languages = data[0].languages;
         countryData.capital = data[0].capital;
         // console.log(countryData);
         const ul = document.createElement("ul");
         ul.className = "country";

         // Create the li elements
         const liHero = document.createElement("li");
         liHero.className = "hero";
         const h4Hero = document.createElement("h4");
         const langObj = Object.entries(countryData.nativeName)[0][1];
         // console.log(langObj)
         h4Hero.textContent = langObj.official;
         const img = document.createElement("img");
         img.setAttribute("src", countryData.svgFlag);
         liHero.appendChild(h4Hero);
         liHero.appendChild(img);

         const liPopulation = document.createElement("li");
         liPopulation.className = "population";
         const h4Population = document.createElement("h4");
         h4Population.textContent = "Population:";
         const pPopulation = document.createElement("p");
         let formatedP = Math.trunc(countryData.population / 1_0_000);
         formatedP = formatedP / 100 + " millions";
         pPopulation.textContent = formatedP;
         liPopulation.appendChild(h4Population);
         liPopulation.appendChild(pPopulation);

         const liCapital = document.createElement("li");
         liCapital.className = "capital";
         const h4Capital = document.createElement("h4");
         h4Capital.textContent = "Capital:";
         const pCapital = document.createElement("p");
         pCapital.textContent = countryData.capital;
         liCapital.appendChild(h4Capital);
         liCapital.appendChild(pCapital);

         const liLanguages = document.createElement("li");
         liLanguages.className = "languages";
         const h4Languages = document.createElement("h4");
         h4Languages.textContent = "Languages:";
         const languagesList = document.createElement("ul");
         liLanguages.appendChild(h4Languages);
         liLanguages.appendChild(languagesList);
         // console.log(Object.entries(countryData.languages));
         for (const [code, language] of Object.entries(countryData.languages)) {
            // console.log(language);
            const languageEl = document.createElement("li");
            languageEl.textContent = language;
            languagesList.appendChild(languageEl);
         }

         // Append li elements to ul
         ul.appendChild(liHero);
         ul.appendChild(liPopulation);
         ul.appendChild(liCapital);
         ul.appendChild(liLanguages);
         // console.log(document.querySelector(".countryData"))
         document.querySelector(".countryData").appendChild(ul);
      });
});
