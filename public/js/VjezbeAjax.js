let VjezbeAjax = (function () {
    var pozvaniZadaci = [];
    const dodajInputPolja = function(DOMelementDIVauFormi,brojVjezbi) {
        //console.log('uslo u dodajInputPolja');

        if(DOMelementDIVauFormi == null || DOMelementDIVauFormi == undefined || brojVjezbi < 1 || brojVjezbi > 15) {
            console.log("Greska kod slanja podataka");
        }
        else {
            let strHTML="";
            for(let i = 0; i < brojVjezbi; i++) {
                strHTML += "<div class=\"unosZadataka\"> ";
                strHTML += "<label for=\"z" + i + "\">z" + i + "<\/label> ";
                strHTML += "<input type=\"number\" value=\"4\" name=\"z" + i + "\" id=\"z" + i + "\"> ";
                strHTML += "<\/div> ";
            }
            
            DOMelementDIVauFormi.innerHTML = strHTML;
        }
        
    }
    const posaljiPodatke = function(vjezbeObjekat,callbackFja) {
        

        let objekat = vjezbeObjekat;
        // testiranje 
        let greska = null;
        if(!objekat.hasOwnProperty('brojVjezbi') || !objekat.hasOwnProperty('brojZadataka')) {
            greska = "Greska kod slanja podataka";
        }
        else if(objekat.brojVjezbi != objekat.brojZadataka.length) {
            greska = "Greska kod slanja podataka";
        }
        else if(objekat.brojVjezbi < 1 || objekat.brojVjezbi > 15) {
            greska = "Greska kod slanja podataka";
        }
        for(let i = 0; i < objekat.brojZadataka.length; i++) { 
            if(objekat.brojZadataka[i] > 10 || objekat.brojZadataka[i] < 0) { 
                greska = "Greska kod slanja podataka"; 
            }
        }

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                callbackFja(greska,ajax.responseText);
            }
            else if(ajax.readyState == 4) {
                callbackFja("Greska kod slanja podataka",ajax.responseText);
            }
        }
        ajax.open("POST","http://localhost:3000/vjezbe",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(objekat));
    }
    const dohvatiPodatke = function(callbackFja) {
        //console.log('uslo u dohvatiPodatke');

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                var jsonRez = JSON.parse(ajax.responseText);
                callbackFja(null,jsonRez);
            }
            else if(ajax.readyState == 4) {
                callbackFja("Greska kod dohvacanja podataka",ajax.responseText);
            }
        }
        ajax.open("GET","http://localhost:3000/vjezbe",true);
        ajax.send();
        
        
    }
    const iscrtajVjezbe = function(divDOMelement,podatak) {
        let strHTML = "";
        let brVjezbi = podatak.brojVjezbi;
        let brZadataka = podatak.brojZadataka;

        let brNetacnihZadataka = 0;
        // provjera broja vjezbi i zadataka
        for(let i = 0; i < brZadataka.length; i++) {
            if(brZadataka[i] > 10 || brZadataka[i] < 0) { brNetacnihZadataka += 1; }
        }

        if(brVjezbi > 15 || brVjezbi < 1 || brNetacnihZadataka != 0 || brVjezbi != brZadataka.length) {
            console.log("Broj vjezbi ili zadataka nije validan!");
        }
        else {

            for(let i = 0; i < brVjezbi; i++) {
    
                strHTML += "<div class=\"Vz" + String(parseInt(i+1)) + "\">";
                
                strHTML += "<div class=\"vjezba\" onclick=\"VjezbeAjax.iscrtajZadatke(this.parentNode," + brZadataka[i] + ")\" >VJEŽBA " + String(parseInt(i+1)) + "<\/div>";
                
                strHTML += "<\/div>";
            }
    
            divDOMelement.innerHTML = strHTML;

        }

    }
    const iscrtajZadatke = function(vjezbaDOMelement,brojZadataka) {
        //console.log("uslo u iscrtajZadatke");
        
        if(brojZadataka < 0 || brojZadataka > 10 || vjezbaDOMelement == null || vjezbaDOMelement == undefined) {
            console.log("Broj zadataka nije validan!");
        }
        else {

            // ako niz sadrzi dom, ucini ga vidljivim
            if(pozvaniZadaci.includes(vjezbaDOMelement)) {
                
                for(el of pozvaniZadaci) {
                    if(el == vjezbaDOMelement) {
                        el.children[1].hidden = false;
                    }
                    else {
                        el.children[1].hidden = true;
                    }
                }
                
            }
            else {
    
                // ako ne sadrze dom, dodaj i upisi ga u niz 
                strHTML = "";
                strHTML += "<div class=\"zadaci\">";
                strHTML += " <ul class=\"listaZadaci\">";
                for(let i = 0; i < brojZadataka; i++) {
                    strHTML += "  <li>ZADATAK " + String(parseInt(i+1)) + "<\/li>";
                }
                strHTML += " <\/ul>";
                strHTML += "<\/div>";
                
                for(el of pozvaniZadaci) {
                    el.children[1].hidden = true;
                }
                vjezbaDOMelement.innerHTML += strHTML;
                pozvaniZadaci.push(vjezbaDOMelement);
                
            }

        }
        
    }
    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    }
}());
