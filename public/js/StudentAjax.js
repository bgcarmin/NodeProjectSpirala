let StudentAjax = (function () {
const dodajStudenta = function(student,fnCallback) {

    let greska = null;
    // TODO validacija studenta

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        //console.log(ajax.responseText);
        if(ajax.readyState == 4 && ajax.status == 200) {
            fnCallback(greska,ajax.responseText);
        }
        else if(ajax.readyState == 4) {
            fnCallback("Greska kod slanja podataka",ajax.responseText);
        }
    }
    ajax.open("POST","http://localhost:3000/student",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send(JSON.stringify(student));
}

const postaviGrupu = function(index,grupa,fnCallback) {
    let greska = null;
    let objekat = { grupa: grupa }

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        //console.log(ajax.responseText);
        if(ajax.readyState == 4 && ajax.status == 200) {
            fnCallback(greska,ajax.responseText);
        }
        else if(ajax.readyState == 4) {
            fnCallback("Greska kod slanja podataka",ajax.responseText);
        }
    }
    ajax.open("PUT","http://localhost:3000/student/" + index,true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send(JSON.stringify(objekat));
}

const dodajBatch = function(csvStudenti,fnCallback) {
    let greska = null;
    
    //console.log(csvStudenti);

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        //console.log(ajax.responseText);
        if(ajax.readyState == 4 && ajax.status == 200) {
            fnCallback(greska,ajax.responseText);
        }
        else if(ajax.readyState == 4) {
            fnCallback("Greska kod slanja podataka",ajax.responseText);
        }
    }

    ajax.open("POST","http://localhost:3000/batch/student",true);
    ajax.setRequestHeader("Content-Type","text/plain");
    ajax.send(csvStudenti);    
}
return {
    dodajStudenta: dodajStudenta,
    postaviGrupu: postaviGrupu,
    dodajBatch: dodajBatch
}
}());