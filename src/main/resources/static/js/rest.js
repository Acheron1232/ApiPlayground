const modalWrite = document.querySelector(".modalWrite");

document.querySelector(".dbGUI .write").addEventListener("click", function(){
 modalWrite.classList.remove("--hidden");
})


document.querySelector(".modalWrite .overlay").addEventListener("click", function(){
   modalWrite.classList.add("--hidden");
})