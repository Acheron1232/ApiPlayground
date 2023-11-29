

async function asd(){
    let a = await fetch("/api/v2/add",{
        method:"POST",
        body:{
            name:JSON.stringify("asdasd")

        }
    });
    // let b = await a.json()
    // console.log(b)
}
asd()