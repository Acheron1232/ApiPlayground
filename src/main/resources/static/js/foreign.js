const userData = {
   country: undefined,
   city: undefined,
   position: {
      lotitude: undefined,
      longitude: undefined
   },
   geoGui: {
      country: document.querySelector(".g-country p"),
      city: document.querySelector(".g-city p"),
      changeGeo(args) {
         const { country, city } = args;
         country && (userData.country = country);
         city && (userData.city = city);
         userData.country && (this.country.textContent = userData.country);
         userData.city && (this.city.textContent = userData.city);
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
   languages: undefined
};
// variables
const geoFind = document.querySelector(".targetGeo");
const getCountry = document.querySelector(".getCountry");

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
      });
};
// listners
geoFind.addEventListener("click", function () {
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

getCountry.addEventListener("click", function () {
   fetch(`https://restcountries.com/v3.1/name/${"Ukraine"}`)
      .then((response) => response.json())
      .then((data) => {
         // console.log(userData);
         countryData.nativeName = data[0].name.nativeName;
         countryData.svgFlag = data[0].flags.svg;
         countryData.population = data[0].population;
         countryData.languages = data[0].languages;
         console.log(countryData);
         const ul = document.createElement("ul");
         ul.className = "country";

         // Create the li elements
         const liHero = document.createElement("li");
         liHero.className = "hero";
         const h4Hero = document.createElement("h4");
         const langObj = Object.entries(countryData.nativeName)[0][1];
         console.log(langObj)
         h4Hero.textContent = langObj.official
         const img = document.createElement("img");
         img.setAttribute("src", countryData.svgFlag);
         liHero.appendChild(h4Hero);
         liHero.appendChild(img);

         const liPopulation = document.createElement("li");
         liPopulation.className = "population";
         const h4Population = document.createElement("h4");
         h4Population.textContent = "Population:";
         const pPopulation = document.createElement("p");
         let formatedP = Math.trunc(countryData.population/1_0_000);
         formatedP = formatedP/100 + " millions"
         pPopulation.textContent = formatedP;
         liPopulation.appendChild(h4Population);
         liPopulation.appendChild(pPopulation);

         const liLanguages = document.createElement("li");
         liLanguages.className = "languages";
         const h4Languages = document.createElement("h4");
         h4Languages.textContent = "Languages:";
         const languagesList = document.createElement("ul");
         liLanguages.appendChild(h4Languages);
         liLanguages.appendChild(languagesList);
         console.log(Object.entries(countryData.languages));
         for (const [code, language] of Object.entries(countryData.languages)){
            console.log(language);
            const languageEl = document.createElement("li");
            languageEl.textContent = language;
            languagesList.appendChild(languageEl);
         }

         // Append li elements to ul
         ul.appendChild(liHero);
         ul.appendChild(liPopulation);
         ul.appendChild(liLanguages);
         console.log(document.querySelector(".countryData"))
         document.querySelector(".countryData").appendChild(ul);
      });
});
