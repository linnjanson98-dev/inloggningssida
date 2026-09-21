let formRef;
let felmeddelande;
const namn = "Kalle";
const lösenord = "qwe123";

function init() { //initiera sidan
    formRef = document.querySelector("form");
    felmeddelande = document.getElementById("felmeddelande");
    hideElement(felmeddelande);
    formRef.addEventListener("submit", event=>{
        event.preventDefault();
        getFormData();
        //checkLogin() 
    })
    console.log(formRef);
    console.log(username);
}

window.onload = init();

function getFormData(){
    let username = formRef.elements.username.value;
    let psw = formRef.elements.psw.value;
    console.log(username);
    console.log(psw);
    checkLogin(username, psw); //kan vara utanför getForm om jag använder local storage, get item i checkLogin
}

function checkLogin(user, psw){
    //get item local storage
    if (user != namn || psw != lösenord){
        //presentera fel användarnamn 
        //lägg till en paragraf över label? eller en alert? 
        showElement(felmeddelande);
    }
    else{
        hideElement(formRef);
        //gick att logga in, byter till välkommen in och en logga ut knapp
    }
}

function hideElement(element){
    element.style.display = "none";
}

function showElement(element){
    element.style.display = "block";
}