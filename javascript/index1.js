window.addEventListener("load", init); //Här skapas en lyssnare på dokumentet och anropar på funktionen "init". Detta görs efter att sidan har laddats ner.

function init() {

    //En variabel skapas och tilldelas med DOM-objektet (formulär) med id:t "submitref". Därefter skapas en submit-lyssnare som anropar på funktionen GUI. 
    var form = document.querySelector("#submitref");
    form.addEventListener("submit", GUI);

}

function GUI(OEvent) { //En funktion som tar emot formulär-objektet som parameter. 
    OEvent.preventDefault(); //Metoden preventDefault används för att inte låta standardåtgärden som hör till händelsen att inträffas.

    //En variabel skapas och tilldelas med DOM-objektet med id:t "inputvalue". Därefter hämtar vi DOM-objektet med id:t "weathercard" och sätter innehålet som tomt.
    let inputRef = document.querySelector("#inputvalue");
    document.querySelector("#weathercard").innerHTML = "";

    /*Fetch metoden används för att kunna hämta resurser på ett enkelt sätt, asynkront (oberoende av tiden) över nätverket. 
    EncodeURIComponent används för att koda specialtecken (, / ? : @ & = + $ #). APPID är nyckeln för att kunna komma åt datan på den öppna dataset.*/
    window.fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
            encodeURIComponent(inputRef.value) +
            '&APPID=<<Token>>')
        .then(response => { //Response innehåller bland annat information om felkoder, feltext samt felmeddelanden.
            if (!response.ok) { //En if-sats som kollar om information är sant eller falskt, dvs rätt eller fel. Och om information är falskt då kastar vi ett felmeddelanden annars returnerar vi JSON-objekt där all information finns som vi behöver.
                throw response;
            } else {
                return response.json()
            }
        })

    .then(function(data) { //Därefter hanterar vi datan som vi får från API:n. Fetch funktionen returnerar ett promise objekt som innehåller ett response objekt som vi behöver ta hand om.
            //datan från API:n som vi ska ta hand om och presentera är beskrivning på vädret, väder ikon, grader, vind, tryck, fuktighet, soluppgång, solnedgång och stadens geografiska läge.

            //console.log(data);

            //Skapa flera DOM-objekt för att kunna presentera all data. 
            var containerref = document.querySelector("#weathercard");
            var divref = document.createElement("div");
            var h3ref = document.createElement("h2");
            var divrefimg = document.createElement("div");
            var imgref = document.createElement("img");
            var textref = document.createElement("h2");
            var grad = data['main'].temp - 273.15;
            var tableref = document.createElement("table");
            var theadref = document.createElement("thead");

            //Hämtar stadens namn och land. Hämtar även väder ikonen.
            h3ref.innerHTML = "Vädret i" + " " + data.name + ", " + data['sys'].country;
            imgref.src = "http://openweathermap.org/img/w/" + data['weather'][0].icon + ".png";

            //Definierar all CSS-egenskaper som behövs.
            h3ref.style.marginTop = "-10px";
            divrefimg.className = "justify-content-center row px-4 mb-3";
            imgref.className = "ml-2";
            textref.innerHTML = Math.trunc(grad) + "°C";
            tableref.className = "table-lg mb-5 my-4 row justify-content-center";
            tableref.setAttribute("cellpadding", "10");

            //skapar en nod som det sista barnet i en annan nod.
            containerref.appendChild(divref);
            divref.appendChild(h3ref);

            /*En for-loop som utför 7 varv (rader) och för varje varv så skapar vi ett tr, th och td element. En if-sats har också används för att kunna presentera all data i en tabell.  */
            for (var i = 0; i < 7; i++) {
                var trref = document.createElement("tr");
                var thref = document.createElement("th");
                var tdref = document.createElement("td");

                theadref.appendChild(trref);
                trref.appendChild(thref);
                trref.appendChild(tdref);

                if (i == 0) {
                    thref.innerHTML = "Description (Beskrivning)"
                    tdref.innerHTML = data["weather"][0].description;
                }
                if (i == 1) {
                    thref.innerHTML = "Wind (Vind)"
                    tdref.innerHTML = data["wind"].speed + " m/s";
                }
                if (i == 2) {
                    thref.innerHTML = "Pressure (Tryck)"
                    tdref.innerHTML = data["main"].pressure + " hpa";
                }
                if (i == 3) {
                    thref.innerHTML = "Humidity (Fuktighet)"
                    tdref.innerHTML = data["main"].humidity + " %";
                }
                if (i == 4) {

                    var unix = data["sys"].sunrise;
                    var date = new Date(unix * 1000);

                    thref.innerHTML = "Sunrise (Soluppgång)"
                    tdref.innerHTML = date.toLocaleString(); //Centraleuropeisk sommartid +02:00)
                }
                if (i == 5) {

                    var unix = data["sys"].sunset;
                    var date = new Date(unix * 1000);

                    thref.innerHTML = "Sunset (Solnedgång):"
                    tdref.innerHTML = date.toLocaleString(); //Centraleuropeisk sommartid +02:00)
                }
                if (i == 6) {

                    thref.innerHTML = "Stadens geografiska läge, lat & long"
                    tdref.innerHTML = "[" + data["coord"].lat + ", " + data["coord"].lon + "]";
                }

            }

            //skapar en nod som det sista barnet i en annan nod.
            containerref.appendChild(divrefimg);
            divrefimg.appendChild(textref);
            divrefimg.appendChild(imgref);

            theadref.appendChild(trref);
            tableref.appendChild(theadref);
            containerref.appendChild(tableref);


        })
        //Hanterar de felaktiga svaren och exekvera en funktion. På DOM-objektet med id:t "weathercard" presenteras felmeddelanden.
        .catch(error => {
            document.querySelector("#weathercard").innerHTML = "<strong>" + error.statusText + "</strong";
            console.log(error.statusText);

        })

}