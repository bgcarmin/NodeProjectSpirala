const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db.js');
const Zadatak = require('./Zadatak.js');
db.sequelize.sync();


app.use(bodyParser.json())
app.use(bodyParser.text());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/js'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/vjezbe/', function(req,res) {
    // cita se file

    let brVjezbi;
    let objekat = {
        brojVjezbi: null,
        brojZadataka: []
    }

    // pronalazimo sve vjezbe i nakon toga 
    // za svaku vjezbu nalazimo zadatke koji imaju vezu na vjezbu
    db.Vjezba.findAll().then((vjezbe) => {
        objekat.brojVjezbi = vjezbe.length;
        //console.log(objekat.brojVjezbi);
        let brojac = 0;
        vjezbe.forEach((vjezba) => {
            vjezba.getZadaciVjezbe().then((zadaciVjezbe) => {
                //console.log(zadaciVjezbe.length);
                objekat.brojZadataka.push(zadaciVjezbe.length);
                //console.log(objekat);
                brojac++;
                if(brojac == objekat.brojVjezbi) {
                    res.send(objekat);

                }
            });
        });

    });

    

});


app.post('/vjezbe/', function(req,res) {


    const tijelo = req.body;

    //console.log(tijelo); // 1

    let brVjezbi = parseInt(tijelo['brojVjezbi']);
    //console.log(brVjezbi); // 2
    
    let objekat = {
        brojVjezbi: brVjezbi,
        brojZadataka: []
    };
    
    let brZadataka = tijelo['brojZadataka'];

    // validacija
    
    let greska = {
        status: "error",
        data: "Pogrešan parametar "
    }

    let porukaZadaci = "";
    for(let i = 0; i < brZadataka.length; i++) {
        if(brZadataka[i] > 10 || brZadataka[i] < 0) {
            if(porukaZadaci.localeCompare("") != 0) { porukaZadaci += ","; }
            porukaZadaci += "z" + i;
        }
    } 
    
    if(brVjezbi < 1 || brVjezbi > 15 || porukaZadaci.localeCompare("") != 0 || 
        brVjezbi != brZadataka.length) {
            let prvi = false;
            let poruka = "";
            if(brVjezbi < 1 || brVjezbi > 15) { poruka += "brojVjezbi"; prvi = true; }
            if(porukaZadaci.localeCompare("") != 0) {
                if(prvi === true) { poruka += ","}
                poruka += porukaZadaci; prvi = true;
            }
            if(brVjezbi != brZadataka.length) {
                if(prvi === true) { poruka += ","}
                poruka += "brojZadataka";
            }

            greska.data += poruka;
            res.json(greska);
        }
    
    // kraj validacije
    else {

        
        let nizVjezbi = [];
        let nizZadataka = [];
        let ukupanBrojZadataka = 0;
        for(let i = 0; i < brVjezbi; i++) {
            let obj = { naziv: 'VJEŽBA ' + String(parseInt(i+1))}
            nizVjezbi.push(obj);
            ukupanBrojZadataka += parseInt(brZadataka[i]);
        }

        //console.log(ukupanBrojZadataka);

        for(let i = 0; i < ukupanBrojZadataka; i++) {
            let obj = { naziv: 'ZADATAK ' + String(parseInt(i+1))}
            nizZadataka.push(obj);
        }
        
        
        //console.log('Broj vjezbi je ' + nizVjezbi.length);
        // brisemo postojece zadatke i vjezbe i onda dodajemo nove sa bulkCreate dodajemo vise odjednom
        db.Zadatak.destroy({
            where: {},
            truncate: true
        }).then((m) => {
            db.Vjezba.destroy({
                where: {},
                truncate: { cascade: true }
            });
        }).then((n) => {

            //Zadatak.sequelize.sync({force: true}).then(() => { 
            db.Vjezba.bulkCreate(nizVjezbi).then((p) => {
                db.Zadatak.bulkCreate(nizZadataka);
            }).then(() => {
                db.Vjezba.findAll().then((vjezbe) => {
                    //console.log("test vjezbe je: " + vjezbe.length)
                    let j = 1; // brojac zadatka
                    let iVjezbe = 0; // brojac vjezbe
                    // prolazimo kroz vjezbe i dodajemo veze na zadatke
                    vjezbe.forEach(vjezba => {
                        //console.log("duzina broja zadataka je: " + brZadataka[iVjezbe])
                        for(let i = 0; i < brZadataka[iVjezbe]; i++) {
                            //console.log("uslo ");
                            db.Zadatak.findOne({where:{id:j}}).then((zadatak) => {
                                vjezba.addZadaciVjezbe(zadatak);
                            });
                            j++;
                        }
                        iVjezbe++;
                        
                    });
                });
            });
    
            //});
        });
        
        objekat.brojVjezbi = brVjezbi;
        objekat.brojZadataka = brZadataka;
        res.json(objekat);
        
        
    }
});


app.post('/student', function (req,res) {
    let tijelo = req.body;
    
    // validacija
    // prvo testiramo da li su poslani svi atributi, zatim testiramo da li je neki od njih prazan, i na kraju testiramo da li je 
    // index iskljucivo broj bez slova ili znakova
    // ako je unos nevalidan postavljamo varijablu nevalidanUnos na true
    let nevalidanUnos = false;
    if(!tijelo.hasOwnProperty('ime') || !tijelo.hasOwnProperty('prezime') || !tijelo.hasOwnProperty('index') || 
        !tijelo.hasOwnProperty('grupa')) {
            // console.log("uslo test1"); // test1
            nevalidanUnos = true;
    }
    else if(tijelo.ime == "" || tijelo.prezime == "" || tijelo.index == "" || tijelo.grupa == "") {
        // console.log("uslo test2"); // test2
        nevalidanUnos = true;
    }
    else if(!(/^\d+$/.test(tijelo.index))) { 
        // console.log("uslo test3"); // test3
        nevalidanUnos = true; 
    }
    
    if(nevalidanUnos) {
        res.json({status:"Uneseni podaci nisu validni!"});
    }
    else {
        // ako su podaci validni dolazi od unosa u bazu ili poruke da student sa indeksom vec postoji
        
        let trebaUpisati = true;
        
        db.Student.count({
            where: {index:tijelo.index}
        }).then((broj) => {
            //console.log(broj + ", a ocekivani je: " + tijelo.index);
            if(broj != 0) {
                trebaUpisati = false;
                
            }
        }).then(() => {
            if(trebaUpisati == true) {
                db.Student.create({ime:tijelo.ime,prezime:tijelo.prezime,index:tijelo.index}).then(() => {
                    db.Grupa.findOne({where: {naziv: tijelo.grupa}}).then((grupa) => {
                        db.Student.findOne({where:{index:tijelo.index}}).then((student) => {
                            if(grupa) {
                                grupa.addStudentiGrupe(student);
                            }
                            else {
                                db.Grupa.create({naziv:tijelo.grupa}).then((novaGrupa) => {
                                    novaGrupa.addStudentiGrupe(student);
                                });
                                
                            }
                        });
                        
                        
                        
                    })
                });
                res.json({status:"Kreiran student!"});
            }
            else {
                res.json({status:"Student sa indexom " + tijelo.index + " već postoji!"});
            }
        });
    }
});
    
app.put('/student/:index', function(req,res) {
    // treba doci do indeksa
    let poslaniIndex = req.url.toString().split('/')[2];
    //console.log(poslaniIndex);
    let postojiStudent = false;
    let tijelo = req.body;

    // trazimo da li student postoji i ako postoji dodajemo vezu na grupu
    db.Student.findOne({where: {index:poslaniIndex}}).then((student) => {
        if(student) {
            postojiStudent = true;
            db.Grupa.findOne({where:{naziv:tijelo.grupa}}).then((grupa) => {
                // ako grupa postoji
                if(grupa) {
                    grupa.addStudentiGrupe(student);
                }
                else {
                    // ako grupa ne postoji napravi je 
                    db.Grupa.create({naziv:tijelo.grupa}).then((g) => {
                        g.addStudentiGrupe(student);
                    });
                }
            });
        }
    }).then(() => {
        if(postojiStudent) {
            res.json({status: "Promjenjena grupa studentu " + poslaniIndex});
        }
        else {
            res.json({status: "Student sa indexom " + poslaniIndex + " ne postoji"});
        }
    });   
});

app.post('/batch/student', function (req,res) {
    let csv = req.body;
    let studentiCsv = csv.split("\n");
    let postojeci = [];
    let studenti = [];

    // varijabla za nepravilne podatke
    let nepravilanUnos = false;
    
    // dolazimo do podataka iz csv i smjestamo u niz
    for(let i = 0; i < studentiCsv.length; i++) {
        let elStudent = studentiCsv[i].split(',');
        if(elStudent.length != 4) { nepravilanUnos = true; break; }
        elStudent[3] = elStudent[3].replace("\r","");
        let objekat = {ime: elStudent[0],prezime: elStudent[1],index: elStudent[2],grupa: elStudent[3]};
        studenti.push(objekat);
        postojeci.push(elStudent[2]); // dodano 19
    }

    if(nepravilanUnos) {
        res.json({status:"Uneseni podaci nisu validni!"});
    }

    else {
        // ako je unos pravila unosimo studente

        let ulazBrojac = 0;
        for(let i = 0; i < studenti.length; i++) {
            //let postojiStudent = false;
            db.Student.findOne({where: {index:studenti[i].index}}).then((student) => {
                ulazBrojac++;
                // ako postoji student, njegov indeks dodajemo u niz postojecih
                if(student) {
                    // student vec postoji
                }
                else {
                    // student ne postoji i dodaje se
                    // posto student ne postoji brisemo ga iz niza postojecih
                    let indexOd = postojeci.indexOf(String(studenti[i].index));
                    if (indexOd > -1) {
                        postojeci.splice(indexOd, 1);
                    }
                    //console.log("uslo");
                    // ako ne postoji student dodajemo ga
                    db.Student.create({
                        ime:studenti[i].ime,
                        prezime:studenti[i].prezime,
                        index:studenti[i].index
                    }).then((noviStudent) => {
                        // za dodanog studenta dodajemo vezu na grupu 
                        db.Grupa.findOne({where:{naziv:studenti[i].grupa}}).then((grupa) => {
                            // ako grupa postoji
                            if(grupa) {
                                grupa.addStudentiGrupe(noviStudent);
                            }
                            else {
                                // ako grupa ne postoji napravi je 
                                db.Grupa.create({naziv:studenti[i].grupa}).then((g) => {
                                    g.addStudentiGrupe(noviStudent);
                                });
                            }
                        });
                        
                    })
                }
                // ako smo dosli do kraja (prosli sve elemente) mozemo uraditi respond
                if(ulazBrojac == studenti.length) {
                    // ako je lista postojecih prazna znaci da su svi uspjesno dodani
                    if(postojeci.length == 0) {
                        //console.log("uslo u res");
                        res.json({status:"Dodano " + studenti.length +" studenata!"});
                    }
                    else {
                        // iz liste postojecih citamo postojece indekse i dodajemo u odgovor kao status
                        let string = "Dodano " + String(parseInt(studenti.length-postojeci.length)) + " studenata, a studenti ";
                        for(let i = 0; i < postojeci.length; i++) {
                            string += postojeci[i];
                            if(i != postojeci.length - 1) {
                                string += ",";
                            }
                        }
                        string += " već postoje!"
                        res.json({status:string});
                    }
                }
            });
        }
    }
});

app.listen(3000);

module.exports = {app,db};