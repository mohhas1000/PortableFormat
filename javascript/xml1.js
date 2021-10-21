window.addEventListener("load", init); //Här skapas en lyssnare på dokumentet och anropar på funktionen "init". Detta görs efter att sidan har laddats ner.

function init() {

    //En variabel skapas och tilldelas med DOM-objektet (formulär) med id:t "submitref". Därefter skapas en submit-lyssnare som anropar på funktionen GUI. 
    var form = document.querySelector("#submitref");
    form.addEventListener("submit", GUI);

}

function GUI(OEvent) { //En funktion som tar emot formulär-objektet som parameter. 

    OEvent.preventDefault(); //Metoden preventDefault används för att inte låta standardåtgärden som hör till händelsen att inträffas.

    //En variabel skapas och tilldelas med DOM-objektet med id:t "inputvalue". Därefter hämtar vi DOM-objektet med id:t "moviecard" och sätter innehålet som tomt.
    let inputRef = document.querySelector("#inputvalue");
    document.querySelector("#moviecard").innerHTML = "";

    /*Fetch metoden används för att kunna hämta resurser på ett enkelt sätt, asynkront (oberoende av tiden) över nätverket.
    EncodeURIComponent används för att koda specialtecken (, / ? : @ & = + $ #). APPID är nyckeln för att kunna komma åt datan från AP:t */
    window.fetch('https://www.omdbapi.com/?t=' + encodeURIComponent(inputRef.value) + '&r=xml&apikey=<<Token>>')

    .then(response => response.text()) //Response är ett objekt som vi gör om till en textsträng.
        .then(MovieData) //Anropar på funktionen movieData och skicka textsträngen som parameter.
        .catch(removeData); //tar hand om allt fel som kan uppstå och anropar på funktionen removeData.

}

function removeData() { //En funktion som skapar DOM-objekt för att felmeddelande ska kunna visas på sidan.
    let inputRef = document.querySelector("#inputvalue");
    var errormsg = document.querySelector("#errormsg");
    var errorMsgBS = document.createElement("div");
    var errorbutton = document.createElement("button");

    inputRef.value = "";
    errorMsgBS.className = "alert alert-danger alert-dismissible fade show"; //fade och show klasserna är för att animera varningsmeddelande när du avvisar dem.

    //Skapar en knapp på felmeddelandet
    errorbutton.setAttribute("type", "button");
    errorbutton.className = "close"; //Detta behövs för att knappen ska förvinna när du klickar på den.
    errorbutton.setAttribute("data-dismiss", "alert"); //ger extra padding
    errorbutton.innerHTML = "&times;" //Detta behövs för att knappen ska synas.
    errorMsgBS.innerHTML = "<strong>" + "Varning!" + "</strong>" + " Filmen finns inte."

    //skapar en nod som det sista barnet i en annan nod.
    errorMsgBS.appendChild(errorbutton);
    errormsg.appendChild(errorMsgBS);

}

function MovieData(recieveData) {

    let parser = new window.DOMParser();
    let xmlDOM = parser.parseFromString(recieveData, 'application/xml'); //Skapar ett XMl DOM för att kunna komma åt och manipulera XML.

    //Skapar flera DOM-objekt för att kunna presesentera all data på sidan.
    var poster = xmlDOM.querySelector("movie").getAttribute("poster");

    var cardref = document.querySelector("#moviecard");
    var cardhead = document.createElement("div");
    var divimg = document.createElement("div");
    var cardimg = document.createElement("img");

    cardhead.className = "row m-0";
    divimg.className = "col-sm-3 col-md-6 mb-5";
    divimg.style.textAlign = "center";
    cardimg.src = poster;



    var cardbody = document.createElement("div");
    cardbody.className = "col-sm-5 col-md-5 mb-5";

    //Här hämtar vi data som bland annat director, genre, released, plot och awards och sätter in dem i h5-taggar.
    var h5ref = document.createElement("h5");
    h5ref.innerHTML = xmlDOM.querySelector("movie").getAttribute("title") + " (" + xmlDOM.querySelector("movie").getAttribute("year") + ")";

    var nodeirector = document.createElement("h5");
    nodeirector.innerHTML = "Director: " + xmlDOM.querySelector("movie").getAttribute("director");

    var nodegenre = document.createElement("h5");
    nodegenre.innerHTML = "Genre: " + xmlDOM.querySelector("movie").getAttribute("genre");

    var nodeplot = document.createElement("h5");
    nodeplot.innerHTML = "Plot: " + xmlDOM.querySelector("movie").getAttribute("plot");

    var nodereleased = document.createElement("h5");
    nodereleased.innerHTML = "Released: " + xmlDOM.querySelector("movie").getAttribute("released");

    var noderuntime = document.createElement("h5");
    noderuntime.innerHTML = "Runtime: " + xmlDOM.querySelector("movie").getAttribute("runtime");

    var nodecountry = document.createElement("h5");
    nodecountry.innerHTML = "Country: " + xmlDOM.querySelector("movie").getAttribute("country");

    var nodelanguage = document.createElement("h5");
    nodelanguage.innerHTML = "Language: " + xmlDOM.querySelector("movie").getAttribute("language");

    var nodeawards = document.createElement("h5");
    nodeawards.innerHTML = "Awards: " + xmlDOM.querySelector("movie").getAttribute("awards");

    var noderating = document.createElement("h5");
    noderating.innerHTML = "ImdbRating: " + xmlDOM.querySelector("movie").getAttribute("imdbRating") + " (" + xmlDOM.querySelector("movie").getAttribute("imdbVotes") + ")";

    //skapar en nod som det sista barnet i en annan nod.
    cardref.appendChild(cardhead);
    cardhead.appendChild(divimg);
    cardhead.appendChild(cardbody);
    divimg.appendChild(cardimg);
    cardbody.appendChild(h5ref);
    cardbody.appendChild(nodeirector);
    cardbody.appendChild(nodegenre);
    cardbody.appendChild(nodeplot);
    cardbody.appendChild(nodereleased);
    cardbody.appendChild(noderuntime);
    cardbody.appendChild(nodecountry)
    cardbody.appendChild(nodelanguage)
    cardbody.appendChild(nodeawards)
    cardbody.appendChild(noderating)

}