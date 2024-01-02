const YESS = "YESS";

const PHurl = "https://restcountries.com/v3.1/name/usa";

const urlPopusk = (url) => (YESS ? url : PHurl);

const urls = {
   insert: urlPopusk("/api/v2/database/insert"),
   retrieve: urlPopusk("/api/v2/database/all"),
   retrieveOne: urlPopusk("/api/v2/database/id"),
   server: urlPopusk("/api/v2/server"),
   deleteUser: urlPopusk("/api/v2/delete/id"),
   editUser: urlPopusk("/api/v2/database/id")
};

//Server
const sInfo = document.querySelector(".sInfo");
const sList = document.querySelector(".server-info ul");

sInfo.addEventListener("mouseenter", function () {
   axios.get(urls.server).then((response) => {
      console.log(urls.server)
      const data = response.data;
      sList.querySelector("li:nth-child(1)").textContent = data[0];
      sList.querySelector("li:nth-child(2)").textContent = data[1];
      sList.querySelector("li:nth-child(3)").textContent = data[2];
   });
});

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
      return {
         name: this.name.value,
         age: this.age.value,
         job: this.job.value
      };
   }
};

dbWrite.addEventListener("click", function () {
   const { name, age, job } = inputs.get();

   fetch(urls.insert, {
      method: "POST",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify({
         username: name,
         age: Number(age),
         occupation: job
      })
   });
});

const testData = [
   { id: 1, username: "oleg", age: 23, occupation: "bobr" },
   { id: 2, username: "pedro", age: 45, occupation: "Devil Hunter" }
];

const secretdata = {
   date: "23.45.2208",
   os: ""
};

const globals = {
   dbLength: undefined
};

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
            rowData[0].addEventListener("contextmenu", function () {
               axios.get(urls.retrieveOne + `/${row.idid}`).then((response) => {
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

            const deleteUser = document.createElement("button");
            deleteUser.textContent = "";
            deleteUser.classList.add("deleteBtn");
            deleteUser.addEventListener("click", () => {
               fetch(urls.deleteUser + `/${row.idid}`, {
                  method: "DELETE",
                  headers: {
                     "Content-type": "application/json"
                  },
                  body: JSON.stringify({
                     userID: row.idid
                  })
               });
            });

            const editUser = document.createElement("button");
            editUser.textContent = "";
            editUser.classList.add("editBtn");
            editUser.addEventListener("click", () => {
               if (editUser.classList.contains("save")) {
                  rowData.forEach((field) => {
                     field.setAttribute("contenteditable", "false");
                  });
                  document.activeElement.blur();
                  row.classList.remove("editable");
                  const [name, age, job] = rowData.map((el) => el.textContent);
                  console.log("oleg");
                  console.log(name, age, job);
                  fetch(urls.editUser + `/${row.idid}`, {
                     method: "PUT",
                     headers: {
                        "Content-type": "application/json"
                     },
                     body: JSON.stringify({
                        username: name,
                        age: Number(age),
                        occupation: job
                     })
                  });
               } else {
                  row.classList.add("editable");
                  rowData.forEach((field) => {
                     field.setAttribute("contenteditable", "true");
                  });
                  rowData[0].focus();
               }
               editUser.classList.toggle("save");
            });
            row.appendChild(deleteUser);
            row.appendChild(editUser);
            // console.log(rowData)
            document.querySelector(".recievedData").appendChild(row);
            globals.dbLength = data.length;
         }
      }
   });
});

// (function () {
//    const { name, age, job } = inputs.get();
//    fetch(urls.editUser + `/${row.idid}`, {
//       method: "PUT",
//       headers: {
//          "Content-type": "application/json"
//       },
//       body: JSON.stringify({
//          username: name,
//          age: Number(age),
//          occupation: job
//       })
//    });
// })();
