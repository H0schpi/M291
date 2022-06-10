const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const age = document.getElementById("age")
const email = document.getElementById("email")
const submit = document.getElementById("submit")
submit.disabled = true

const validate = () => {
    if (email.value == "") {
        submit.disabled = true
    } else {
        submit.disabled = false
    }
}

const atcheck = () =>{
    if(email.value.indexOf('@') === -1) {
        return false;
    } else {
        return true;
    }
}

fname.addEventListener("keyup", (event) => {
    validate()
})

lname.addEventListener("keyup", (event) => {
    validate()
})

age.addEventListener("keyup", (event) => {
    validate()
})

email.addEventListener("keyup", (event) => {
    validate()
})


submit.addEventListener("click", async (event) => {
    if (atcheck() === true) {
        event.preventDefault()
        const result = await databaseClient.insertInto("users", ["fname", "lname", "age", "email"], [fname.value, lname.value, age.value, email.value])
        if (result.error) {
            alert("Datenbank Fehler: " + JSON.stringify(result.error, null, 2))
        }
        else {
            // Weiterleitung auf die Game Page  
            location.href = "./game-play.html"
        }
    } else{
        alert("Bitte gib eine gültige E-Mail an.");
    }

})