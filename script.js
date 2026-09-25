let inloggning;
let felmeddelande;
let inloggad; //deklarerar variabler som måste vara tillgängliga i alla funktioner
const namn = "Kalle";
const lösenord = "qwe123"; 
/*konstanter med de korrekta inloggningsuppifterna, const för att de inte ska
ändras någonstans. */

function init() { //initiera sidan

    /* Hämtar element från min html. Min form med inloggningen, 
    mitt felmeddelande och min andra form som ska visas vid lyckad inloggning.*/
    inloggning = document.getElementById("inloggning");
    felmeddelande = document.getElementById("felmeddelande");
    inloggad = document.getElementById("inloggad"); 

    /*Kollar om det finns sparade uppgifter i local storage och isåfall är man redan
     inloggad när sidan laddas in annars så visas inloggningssidan istället.*/
    let user = localStorage.getItem("username");
    if (user == namn){
        loggedIn();
    }
    else{
        showElement(inloggning)
        /*visar inloggningssidan, den visas inte direkt för den är dold i css. 
        Detta är för att elementet "blinkade" lite när man laddade in sidan om jag valde att dölja dom i init()
        Så det mesta är dolt och sen bestämmer javascript vad som visas beroende på info och interaktion*/
    }

    /* Lägger ett event på "submit" knappen som gör att de olika inloggningsfunktionerna körs*/
    inloggning.addEventListener("submit", event=>{
        event.preventDefault(); //Ser till at JS har kontroll över vad som händer när man klickar på submit och inte html. 
        getFormData(); 
        checkLogin(); 
    });
}

window.onload = init;

/* Hämtar användarens input och sparar i variabler som sedan också sparas i localstorage
    username och password i local storage används för att hålla användaren inloggat (som nämnt längre upp i koden)*/
function getFormData(){
    const username = inloggning.elements.username.value;
    const password = inloggning.elements.psw.value;
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}
/* Här används också local storage för att kolla ifall användarens input och de korrekta uppgifterna setämmer överens
    Jag hade nog kunnat deklarera namn och lösen längst upp i koden med de andra variablerna så de varit tillgängliga
    för alla funktioner och inte behövt använda getItem här, men kändes smidigt att använda mig av localstorage när jag ändå
    har sparad information där. Och ett bra tillfälle att öva på användningen localstorage.*/
function checkLogin(){
    const user = localStorage.getItem("username");
    const psw = localStorage.getItem("password")

    /* jämför input med korrekta inloggningsupgifterna och visar felmeddelandet om det inte stämmer
        Stämmer uppgifterna körs loggedIn*/
    if (user != namn || psw != lösenord){
        showElement(felmeddelande);
    }
    else{
        loggedIn();
    }
}

//Två funktioner jag gjorde för att kunna visa och dölja olika element. 
function hideElement(element){
    element.style.display = "none";
}

function showElement(element){
    element.style.display = "block";
}

/* Här döljs inloggningssidan och visar istället välkomstmeddelandet. 
    .textContent för att skriva välkomstmeddelandet. Skriver texten här och inte html för att kunna använda 
    mig av ${username} så det blir exakt det användarnamn som är sparat istället för att bara skriva "Kalle", 
    ger mer möjlighet att ändra vilket namn som skrivs ut*/
function loggedIn(){
    hideElement(felmeddelande) //Har man skrivit fel och sen rätt inloggning så fortsatte felmeddelandet visas så jag behövde sätta en hideElement här
    let user = localStorage.getItem("username");
    document.getElementById("welcomeMessage").textContent = `Välkommen ${user}, du är nu inloggad, där ${user} är ditt användarnamn`;
    hideElement(inloggning);
    showElement(inloggad);
    inloggad.addEventListener("submit", event=>{
        event.preventDefault();
        localStorage.clear(); //Tömmer local storage så man inte hålls inloggad, använder clear och inte removeItem eftersom det inte är något annat i localstorage
        hideElement(inloggad) /*döljer välkomstmeddelandet men behöver inte visa inloggning för eftersom localstorage är tomt 
                                så går if-satsen till else i init() och showContent(inloggning) körs*/
        inloggning.reset(); //Vile inte att namn och lösen skulle vara ifyllt när man går tillbaka till inloggning så jag kör reset på formuläret.
        init(); //kör init igen och då kan man köra hela inloggningsprocessen igen!
    })
}