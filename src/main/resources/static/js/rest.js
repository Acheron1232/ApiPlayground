const YESS = 'sdf';

const PHurl = "https://restcountries.com/v3.1/name/usa";

const urls = {
   insert: (YESS && "/api/v2/database/insert") || PHurl,
   retrieve: (YESS && "/api/v2/database/all") || PHurl,
   retrieveOne: (YESS && "/api/v2/database/id") || PHurl,
   server: (YESS && "/api/v2/server") || PHurl,
}

//Server
const sInfo = document.querySelector(".sInfo");
const sList = document.querySelector(".server-info ul");

sInfo.addEventListener("mouseenter", function(){
   axios.get(urls.server).then(response=>{
      const data = response.data;
      sList.querySelector("li:nth-child(1)").textContent = data[0];
      sList.querySelector("li:nth-child(2)").textContent = data[1];
      sList.querySelector("li:nth-child(3)").textContent = data[2];
   })
})


// Vissual+
const modalWrite = document.querySelector(".modalWrite");
document.querySelector(".dbGUI .write").addEventListener("click", function () {
   modalWrite.classList.remove("--hidden");
});
document
   .querySelector(".modalWrite .overlay")
   .addEventListener("click", function () {
      modalWrite.classList.add("--hidden");
   });
// Visual-

// Write
const dbWrite = document.querySelector(".modalWrite input[type='button']");

const inputs = {
   name: document.querySelector("input[name='name']"),
   age: document.querySelector("input[name='age']"),
   job: document.querySelector("input[name='job']"),
   get() {
      return [this.name.value, this.age.value, this.job.value];
   }
};

dbWrite.addEventListener("click", function () {

   const data = inputs.get();

   fetch(urls.insert, {
      method: "POST",
      headers:{
         "Content-type":"application/json"
      },
      body: JSON.stringify({
         username: data[0],
         age:Number(data[1]),
         occupation: data[2]
      })
   });
});

const testData = [
   { id: 1, name: "oleg", age: 23, job: "bobr" },
   { id: 2, name: "pedro", age: 45, job: "Devil Hunter" }
];

const secretdata = {
   date: "23.45.2208",
   os: ""
};


const globals = {
   dbLength: undefined
}

// Get
const retrieve = document.querySelector(".retrieve");

retrieve.addEventListener("click", function () {
   axios.get(urls.retrieve).then((response) => {
      const data = response.data;
      if (globals.dbLength === testData.length) {
      } else {
         document.querySelector(".recievedData").innerHTML = "";
         for (const i of data) {
            const row = document.createElement("ul");
            row.classList.add("row");
            const rowData = [
               document.createElement("li"),
               document.createElement("li"),
               document.createElement("li")
            ];
            row.idid = i.id;
            rowData[0].textContent = i.username;
            rowData[0].addEventListener("mouseenter", function () {
               axios
                  .get(urls.retrieveOne+`/${row.idid}`)
                  .then((response) => {
                     const date = response.data.time || "23.67.2009";
                     rowData[0].setAttribute("date", date);
                     // console.log(rowData[0].attributes)
                  });
            });
            rowData[1].textContent = i.age;
            rowData[2].textContent = i.occupation;
            rowData.forEach((el) => {
               row.appendChild(el);
            });
            // console.log(rowData)
            document.querySelector(".recievedData").appendChild(row);
            globals.dbLength = data.length;
         }
      }
   });
});
