const userData = {
   position: {
      lotitude: undefined,
      longitude: undefined
   },
   geoGui: {
      country :document.querySelector(".g-country p"),
      city: document.querySelector(".g-city p"),
      changeGeo(args){
         const {country, city} = args;
         country ?? (this.country.textContent = country);
         city ?? (this.country.textContent = city);
      },
      getGeo(){
         return {country: this.country.textContent,
         city: this.city.textContent}
      }
   },
};

console.log(userData);
console.log(userData.geoGui.getGeo());

navigator.geolocation.getCurrentPosition(
   function (position) {
      console.log("oleg");
      console.log(position);
      userData.position.lotitude = position.coords.latitude;
      userData.position.longitude = position.coords.longitude;
   },
   function () {
      console.log("could not acess location");
   }
);

// country.addEventListener("click", function () {
//    fetch("https://restcountries.com/v3.1/name/deutschland")
//       .then((response) => response.json())
//       .then((data) => {
//          console.log(data);
//       });
// });

// infocountry.addEventListener("click", function () {
//    fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userData.position.lotitude}&longitude=${userData.position.longitude}&localityLanguage=en`
//    )
//       .then((response) => response.json())
//       .then((data) => {
//          console.log(data);
//       });
// });
