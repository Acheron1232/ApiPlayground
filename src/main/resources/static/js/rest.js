// Vissual+
const modalWrite = document.querySelector(".modalWrite");
document.querySelector(".dbGUI .write").addEventListener("click", function(){
 modalWrite.classList.remove("--hidden");
})
document.querySelector(".modalWrite .overlay").addEventListener("click", function(){
   modalWrite.classList.add("--hidden");
})
// Visual-



// Write
const dbWrite = document.querySelector(".modalWrite input[type='button']");

const inputs = {
   name: document.querySelector("input[name='name']"),
   age: document.querySelector("input[name='age']"),
   job: document.querySelector("input[name='job']"),
   get(){
      return [this.name.value, this.age.value, this.job.value]
   }
}

dbWrite.addEventListener("click",function(){
   console.log(inputs);
   console.log(inputs.get());
   const data = inputs.get();
   fetch("obamakiller/database/insert", {
      method: "post",
      body:{
         name: data[0],
         age: data[1],
         job: data[2]
      }
   })
})


// Get
