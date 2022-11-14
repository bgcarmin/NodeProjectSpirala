let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = require('chai').should();
let server = require('./index')


describe('testiranje POST na /student i /batch/student i PUT na /student/:index', function () {
    this.timeout(10000);
    
    before(function (done) {
        // pokrece se jednom prije prvog testa u ovom bloku
        server.db.sequelize.sync().then((p) => {
            //console.log("zavrsen before");
            server.db.Student.destroy({
                where: {},
                truncate: true
            }).then((m) => {
                server.db.Grupa.destroy({
                    where: {},
                    truncate: { cascade: true }
                });
            }).then((p) => {
                //console.log("zavrseno brisanje potpuno");
                done();
            });
        }); 
    });

    after(function () {
        // pokrece se jednom nakon posljednjeg testa u ovom bloku
        // brise postojece redove studente i redove grupe nakon uradjenih testova
        server.db.Student.destroy({
            where: {},
            truncate: true
        }).then((m) => {
            server.db.Grupa.destroy({
                where: {},
                truncate: { cascade: true }
            });
        });
    });


    it('POST /student test statusa', function (done) {
        let student = {
            ime: "Armin",
            prezime: "Begic",
            index: "20",
            grupa: "Grupa 1"
        }
        chai.request(server.app)
        .post('/student')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                should.not.exist(err); //ne bi trebalo biti gresaka
                done();
            });
    });

    it('POST /student pravilan unos studenta {Imenko,Prezimenko,10,Grupa 2}', function (done) {
        let student = {
            ime: "Imenko",
            prezime: "Prezimenko",
            index: "10",
            grupa: "Grupa 2"
        }
        chai.request(server.app)
        .post('/student')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                //console.log(res.body.status);
                res.body.status.should.be.equal('Kreiran student!');
                done();
            });
    });

    it('POST /student pravilan unos studenta sa grupom koja je vec u bazi {Armin2,Beg2,11,Grupa 1}', function (done) {
        let student = {
            ime: "Armin2",
            prezime: "Beg2",
            index: "11",
            grupa: "Grupa 1"
        }
        chai.request(server.app)
        .post('/student')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                //console.log(res.body.status);
                res.body.status.should.be.equal('Kreiran student!');
                done();
            });
    });

    it('POST /student sa indeksom 20 koji je vec unijet u bazu', function (done) {
        let student = {
            ime: "Imenko",
            prezime: "Prezimenko",
            index: "20",
            grupa: "Grupa 2"
        }
        chai.request(server.app)
        .post('/student')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                //console.log(res.body.status);
                res.body.status.should.be.equal('Student sa indexom 20 već postoji!');
                done();
            });
    });

    it('POST /student nevalidan unos (bez imena)', function (done) {
        let student = {
            prezime: "Prezimenko",
            index: "21",
            grupa: "Grupa 2"
        }
        chai.request(server.app)
        .post('/student')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                //console.log(res.body.status);
                res.body.status.should.be.equal('Uneseni podaci nisu validni!');
                done();
            });
    });

    it('POST /student nevalidan unos (sa praznim imenom)', function (done) {
        let student = {
            ime: "",
            prezime: "Prezimenko",
            index: "22",
            grupa: "Grupa 2"
        }
        chai.request(server.app)
        .post('/student')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                //console.log(res.body.status);
                res.body.status.should.be.equal('Uneseni podaci nisu validni!');
                done();
            });
    });

    it('POST /student nevalidan unos (sa indeksom koji sadrzi slova)', function (done) {
        let student = {
            ime: "Imenko",
            prezime: "Prezimenko",
            index: "abc",
            grupa: "Grupa 2"
        }
        chai.request(server.app)
        .post('/student')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                //console.log(res.body.status);
                res.body.status.should.be.equal('Uneseni podaci nisu validni!');
                done();
            });
    });

    it('PUT /student/:index pravilan unos indexa i nove grupe', function (done) {
        let student = {
            grupa: "Grupa 3"
        }
        chai.request(server.app)
        .put('/student/20')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Promjenjena grupa studentu 20');
                done();
            });
    });

    it('PUT /student/:index pravilan unos indexa i postojece grupe', function (done) {
        let student = {
            grupa: "Grupa 2"
        }
        chai.request(server.app)
        .put('/student/20')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Promjenjena grupa studentu 20');
                done();
            });
    });

    it('PUT /student/:index nevalidan unos (student sa indexom ne postoji u bazi)', function (done) {
        let student = {
            grupa: "Grupa 1"
        }
        chai.request(server.app)
        .put('/student/100')
        .set('content-type', 'application/json')
        .send(student)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Student sa indexom 100 ne postoji');
                done();
            });
    });

    it('POST /batch/student pravilan unos 3 studenta', function (done) {
        let string = "Armin1,Begic1,210,Grupa 1\nArmin2,Begic2,211,Grupa 2\nArmin3,Begic3,212,Grupa 3"
        chai.request(server.app)
        .post('/batch/student')
        .set('content-type', 'text/plain')
        .send(string)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Dodano 3 studenata!');
                done();
            });
    });

    it('POST /batch/student unos 3 studenta (jedan vec postoji)', function (done) {
        let string = "Armin4,Begic4,213,Grupa 4\nArmin5,Begic5,214,Grupa 1\nArmin3,Begic3,212,Grupa 3"
        chai.request(server.app)
        .post('/batch/student')
        .set('content-type', 'text/plain')
        .send(string)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Dodano 2 studenata, a studenti 212 već postoje!');
                done();
            });
    });

    it('POST /batch/student unos 5 studenta (4 vec postoje)', function (done) {
        let string = "Armin4,Begic4,213,Grupa 4\nArmin5,Begic5,214,Grupa 1\nArmin3,Begic3,212,Grupa 3\nArmin5,Begic6,220,Grupa 2\nArmin1,Begic1,210,Grupa 1"
        chai.request(server.app)
        .post('/batch/student')
        .set('content-type', 'text/plain')
        .send(string)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Dodano 1 studenata, a studenti 213,214,212,210 već postoje!');
                done();
            });
    });


    it('POST /batch/student nepravilan unos (nedostaje prezime)', function (done) {
        let string = "Armin4,213,Grupa 4\nArmin5,214,Grupa 1\nArmin3,212,Grupa 3\nArmin5,220,Grupa 2\nArmin1,210,Grupa 1"
        chai.request(server.app)
        .post('/batch/student')
        .set('content-type', 'text/plain')
        .send(string)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Uneseni podaci nisu validni!');
                done();
            });
    });

    it('POST /batch/student nepravilan unos (nedostaje index)', function (done) {
        let string = "Armin4,Begic4,Grupa 4\nArmin5,Begic5,Grupa 1\nArmin3,Begic3,Grupa 3\nArmin5,Begic6,Grupa 2\nArmin1,Begic1,Grupa 1"
        chai.request(server.app)
        .post('/batch/student')
        .set('content-type', 'text/plain')
        .send(string)
        .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.status.should.be.equal('Uneseni podaci nisu validni!');
                done();
            });
    });

});

