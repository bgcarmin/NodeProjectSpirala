let TestoviParser = (function () {
    const dajTacnost = function (report) {

        var reportJSON;

        try {
            reportJSON = JSON.parse(report);
        }
        catch(err) {
            var objError = {
                tacnost: '0%',
                greske: ['Testovi se ne mogu izvršiti'] 
            };
            return objError;
        }

        // testiramo da li report sadrzi potrebne kljuceve
        if(!reportJSON.hasOwnProperty('stats') || !reportJSON.hasOwnProperty('tests') || !reportJSON.hasOwnProperty('pending')
            || !reportJSON.hasOwnProperty('failures') || !reportJSON.hasOwnProperty('passes')) {
                var objError = {
                    tacnost: '0%',
                    greske: ['Testovi se ne mogu izvršiti'] 
                };
                return objError;    
            }

        var brTestova = reportJSON.stats.tests;
        var brTacnih = reportJSON.stats.passes; 
        var brNetacnih = reportJSON.stats.failures;

        var postotakTacnih = (parseFloat(brTacnih) / parseFloat(brTestova)) * 100.;
       
        postotakTacnih = Math.round(postotakTacnih*10) / 10;
        
        var obj = {
            tacnost: postotakTacnih.toString() + '%', 
            greske: []
        };
        
        for (let i in reportJSON.failures) {
            obj.greske.push(reportJSON.failures[i].fullTitle);
        }

        //var jsonRezultat = JSON.stringify(obj);

        return obj;
    }
    const porediRezultate = function(rezultat1, rezultat2) {
        var rez1JSON = JSON.parse(rezultat1);
        var rez2JSON = JSON.parse(rezultat2);

        // izdvajanje listi
        
        var lista1 = rez1JSON.tests.map(el => el.fullTitle);
        var lista2 = rez2JSON.tests.map(el => el.fullTitle);
        var listaGreske1 = rez1JSON.failures.map(el => el.fullTitle);
        var listaGreske2 = rez2JSON.failures.map(el => el.fullTitle);


        // testiranje da li su testovi identicni 
        if(lista1.length === lista2.length) {
            var sadrzi = true;
            for(let i in lista2) {
                if(!lista1.includes(lista2[i])) { sadrzi = false; break;}
            }
            if(sadrzi === true) {
                var postotakTacnih = (parseFloat(rez2JSON.stats.passes) / parseFloat(rez2JSON.stats.tests)) * 100.;
                postotakTacnih = Math.round(postotakTacnih*10) / 10;
                var obj1 = {
                    promjena: postotakTacnih.toString() + '%', 
                    greske: []
                };
                obj1.greske = listaGreske2.sort();

                return obj1;
            }
        }
        
        var rezNiz = [];

        // testovi koji padaju iz rezultata 1, a ne pojavljuju se u rezultatu 2
        for(let i in listaGreske1) {
            if(!lista2.includes(listaGreske1[i])) { rezNiz.push(listaGreske1[i]) }
        }
        
        // racunamo x za drugi slucaj
        var x = (rezNiz.length + listaGreske2.length) / (rezNiz.length + lista2.length) * 100.;
        x = Math.round(x*10) / 10;

        // sortiramo greske po specifikaciji
        rezNiz.sort();
        listaGreske2.sort();
        for(let i in listaGreske2) {
            rezNiz.push(listaGreske2[i]);
        }

        var obj2 = {
            promjena: x.toString() + '%',
            greske: []
        }
        obj2.greske = rezNiz;

        return obj2;
    }
    return {
        dajTacnost: dajTacnost,
        porediRezultate: porediRezultate
    }
 

}());
