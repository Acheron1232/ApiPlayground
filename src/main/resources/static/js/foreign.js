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
         userData.coty && (this.city.textContent = userData.city);
      },
      getGeo() {
         return {
            country: this.country.textContent,
            city: this.city.textContent
         };
      }
   }
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

const getCounrtyData = function (userD) {
   return function () {
      const country = userD.country;
      fetch(`https://restcountries.com/v3.1/name/${userData.country}`)
         .then((response) => response.json())
         .then((data) => {
            console.log(userData);
            console.log(data);
         });
   };
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

getCountry.addEventListener("click", getCounrtyData(userData));
