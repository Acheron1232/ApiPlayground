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

const countryData = {
   nativeName: undefined,
   svgFlag: undefined,
   population: undefined,
   languages: undefined,
   capital: undefined,
   currency: undefined
};
// variables
const geoFind = document.querySelector(".targetGeo");
const getCountry = document.querySelector(".getCountry");
const changePars = document.querySelectorAll(".geoGui button");
const geoInputs = document.querySelectorAll(".geoGui input");

const getCurrency = document.querySelector(".getCurrency");

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
      // box.classList.toggle("edit");
      inpt.readOnly = false;
      inpt.disabled = false;
      inpt.focus();

      // if (el.switch) {
      //    userData.geoGui.changeGeo({
      //       country: box.className.includes("co") ? inpt.value : undefined,
      //       city: box.className.includes("ci") ? inpt.value : undefined
      //    });
      //    el.switch = 0;
      // }
      // el.switch = 1;
   });
});

geoInputs.forEach((el) => {

   el.addEventListener("input", function(){
      el.style.width = Math.max(el.value.length, 6) + "ch";
   })
   // console.log(geoInputs);
   el.addEventListener("keydown", function (event) {
      // console.log(event);
      // console.log(event.key);
      // console.log(el.value.length);
      if (event.key === "Enter") {
         // el.blur();
         el.disabled = true;
         // console.log("?")
      }
   });
   el.addEventListener("blur", function () {
      el.readOnly = true;
      el.disabled = true;
      userData.geoGui.changeGeo({
         country: el.parentElement.className.includes("co")
            ? el.value
            : undefined,
         city: el.parentElement.className.includes("ci") ? el.value : undefined
      });
   });
});
getCountry.addEventListener("click", function () {
   fetch(`https://restcountries.com/v3.1/name/${userData.country}`)
      .then((response) => response.json())
      .then((data) => {
         // console.log(data[0]);
         countryData.nativeName = data[0].name.nativeName;
         countryData.svgFlag = data[0].flags.svg;
         countryData.population = data[0].population;
         countryData.languages = data[0].languages;
         countryData.capital = data[0].capital;
         if (document.querySelector(".countryData ul")) {
            const parentNode = document.querySelector(".countryData ul");
            // console.log(parentNode);
            // console.log(parentNode.querySelector(".hero h4"))
            parentNode.querySelector(".hero h4").textContent = Object.entries(
               countryData.nativeName
            )[0][1].official;
            parentNode
               .querySelector(".hero img")
               .setAttribute("src", countryData.svgFlag);
            let formatedP = Math.trunc(countryData.population / 1_0_000);
            formatedP = formatedP / 100 + " millions";
            parentNode.querySelector(".population p").textContent = formatedP;

            parentNode.querySelector(".capital p").textContent =
               countryData.capital;

            const langList = parentNode.querySelector(".languages ul");
            // console.log(langList);
            const langs = langList.querySelectorAll("li");
            langs.forEach((el) => {
               el.remove();
            });

            for (const [code, language] of Object.entries(
               countryData.languages
            )) {
               // console.log(language);
               const languageEl = document.createElement("li");
               languageEl.textContent = language;
               langList.appendChild(languageEl);
            }
         } else {

            document.querySelector(".currencyData").classList.remove("--hidden");
            // console.log(data[0]);
            // console.log(userData);

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
            for (const [code, language] of Object.entries(
               countryData.languages
            )) {
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
         }
      });
});

getCurrency.addEventListener("click", function () {
   fetch(`https://restcountries.com/v3.1/name/${userData.country}`)
      .then((res) => res.json())
      .then((dt) => {
         countryData.currency = Object.entries(dt[0].currencies)[0][0].toLowerCase();
         countryData.currencyFullName = Object.entries(dt[0].currencies)[0][1].name;
         console.log(countryData.currencyFullName);
         // console.log(countryData.currency);
         const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${countryData.currency}.json`
         fetch(url)
            .then((response) => response.json())
            .then((data) => {
               console.log(data[countryData.currency]);
               const eur = data[countryData.currency].eur;
               const usd = data[countryData.currency].usd;
               const parentNode = document.querySelector(".currencyData");
               const title = document.createElement("h3");
               title.textContent = countryData.currency.toUpperCase();
               const subTitle = document.createElement("h4");
               subTitle.textContent = countryData.currencyFullName;
               
               const box = document.createElement("div");
               box.className = "box";
               
               const usdBox = document.createElement("div");
               const h4Usd = document.createElement("h4");
               h4Usd.textContent = "USD"
               const pUsd = document.createElement("p");
               pUsd.textContent = Math.trunc((1/usd)*10) / 10;
               usdBox.appendChild(h4Usd);
               usdBox.appendChild(pUsd);

               const eurBox = document.createElement("div");
               const h4Eur = document.createElement("h4");
               h4Eur.textContent = "EURO"
               const pEur = document.createElement("p");
               pEur.textContent = Math.trunc((1/eur)*10) / 10;
               eurBox.appendChild(h4Eur);
               eurBox.appendChild(pEur);
               


               box.appendChild(usdBox);
               box.appendChild(eurBox);
               parentNode.appendChild(title);
               parentNode.appendChild(subTitle);
               parentNode.appendChild(box);

            });
      });
   
});
