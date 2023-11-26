const country = document.querySelector(".getCountry");
const infocountry = document.querySelector(".getCountry2");

navigator.geolocation.getCurrentPosition(function(position){
   console.log('oleg')
   console.log(position);
},function(){
   console.log("could not acess location")
})
country.addEventListener("click", function() {
   fetch("https://restcountries.com/v3.1/name/deutschland")
  .then((response) => response.json())
  .then((data) => {
   console.log(data)
  })
})

