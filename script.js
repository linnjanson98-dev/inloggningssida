let formRef;
let felmeddelande;
let inloggad;
const namn = "Kalle";
const lösenord = "qwe123";

function init() { //initiera sidan
    formRef = document.querySelector("form");
    felmeddelande = document.getElementById("felmeddelande");
    inloggad = document.getElementById("inloggad");

    let user = localStorage.getItem("username");
    if (user == namn){
        loggedIn();
    }
    else{
        showElement(formRef)
    }

    formRef.addEventListener("submit", event=>{
        event.preventDefault();
        getFormData();
        checkLogin(); 
    });
}

window.onload = init;

function getFormData(){
    let username = formRef.elements.username.value;
    let password = formRef.elements.psw.value;
    console.log(username);
    console.log(password);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}

function checkLogin(){
    const user = localStorage.getItem("username");
    const psw = localStorage.getItem("password")

    if (user != namn || psw != lösenord){
        showElement(felmeddelande);
    }
    else{
        loggedIn();
    }
}

function hideElement(element){
    element.style.display = "none";
}

function showElement(element){
    element.style.display = "block";
}

function loggedIn(){
    hideElement(felmeddelande)
    let user = localStorage.getItem("username");
    document.getElementById("welcomeMessage").textContent = `Välkommen ${user}, du är nu inloggad, där ${user} är ditt användarnamn`;
    hideElement(formRef);
    showElement(inloggad);
    inloggad.addEventListener("submit", event=>{
        event.preventDefault();
        localStorage.clear();
        hideElement(inloggad)
        showElement(formRef);
        formRef.reset();
        init();
    })
}