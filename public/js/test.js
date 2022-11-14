let assert = chai.assert;
let expect = chai.expect;

chai.should();


describe('VjezbeAjax', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
 
    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });
 
  afterEach(function() {
    this.xhr.restore();
  });


  it('posaljiPodatkeUspjesno', function() {
    
    let objekat  = {
      brojVjezbi: 3,
      brojZadataka: []
    }
    for(let i = 0; i < 3; i++) {
      objekat.brojZadataka.push(5-i);
    }
    
    objekatJson = JSON.stringify(objekat);
    
    VjezbeAjax.posaljiPodatke(objekat, (error,data) => {
      if(error) {
          throw error;
      }
      //data.should.deep.equal(objekat);
      //assert.equal(objekat,data);
      });
   
    this.requests[0].requestBody.should.equal(objekatJson);
  });

  it('posaljiPodatkeErrorRazlicitBrojVjezbiIZadataka', function(done) {
    
    let objekat  = {
      brojVjezbi: 3,
      brojZadataka: []
    }
    for(let i = 0; i < 4; i++) {
      objekat.brojZadataka.push(5-i);
    }
    
    objekatJson = JSON.stringify(objekat);
    
    VjezbeAjax.posaljiPodatke(objekat, (error,data) => {
      error.should.exist;
      done();
      });
   
    this.requests[0].respond(500);
  });

  it('posaljiPodatkeErrorBrojVjezbiPreko15', function(done) {
    
    let objekat  = {
      brojVjezbi: 17,
      brojZadataka: []
    }
    for(let i = 0; i < 17; i++) {
      objekat.brojZadataka.push(5);
    }
    
    objekatJson = JSON.stringify(objekat);
    
    VjezbeAjax.posaljiPodatke(objekat, (error,data) => {
      error.should.exist;
      done();
      });
   
    this.requests[0].respond(500);
  });

  it('posaljiPodatkeErrorBrojZadatkaPreko10', function(done) {
    
    let objekat  = {
      brojVjezbi: 5,
      brojZadataka: []
    }
    for(let i = 0; i < 5; i++) {
      objekat.brojZadataka.push(12);
    }
    
    objekatJson = JSON.stringify(objekat);
    
    VjezbeAjax.posaljiPodatke(objekat, (error,data) => {
      error.should.exist;
      done();
      });
   
    this.requests[0].respond(500);
  });

  it('posaljiPodatkeErrorBrojVjezbiNegativan', function(done) {
    
    let objekat  = {
      brojVjezbi: -1,
      brojZadataka: []
    }
    for(let i = 0; i < 0; i++) {
      objekat.brojZadataka.push(5);
    }
    
    objekatJson = JSON.stringify(objekat);
    
    VjezbeAjax.posaljiPodatke(objekat, (error,data) => {
      error.should.exist;
      done();
      });
   
    this.requests[0].respond(500);
  });

  it('posaljiPodatkeErrorBrojVjezbiNula', function(done) {
    
    let objekat  = {
      brojVjezbi: 0,
      brojZadataka: []
    }
    for(let i = 0; i < 0; i++) {
      objekat.brojZadataka.push(5);
    }
    
    objekatJson = JSON.stringify(objekat);
    
    VjezbeAjax.posaljiPodatke(objekat, (error,data) => {
      error.should.exist;
      done();
      });
   
    this.requests[0].respond(500);
  });

  it('dohvatiPodatkeUspjesno', function(done) {
    let data = {
        "brojVjezbi": 4, 
        "brojZadataka": [5,3,2,1]
    }

    let dataJson = JSON.stringify(data);
    VjezbeAjax.dohvatiPodatke(function(err,result) {
      result.should.deep.equal(data);
      done();
    });

    this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);

  });

  it('dohvatiPodatkeError', function(done) {
    VjezbeAjax.dohvatiPodatke(function(err,result) {
      err.should.exist;
      done();
    });
   
    this.requests[0].respond(500);
  });

});

describe('Iscrtavanje', function() {

  afterEach(function() {
    // kako bi bio moguc poziv novog testa brisemo sve child divove
    let div = document.getElementById("crtanjeVjezbi");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
  
  });

  it('dodajInputPoljaISPRAVNO', function() {

    let forma = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.dodajInputPolja(forma,5);
    brojInputa = 0;
    for(let i = 0; i < forma.childNodes.length; i++) {
      if(forma.childNodes[i] instanceof HTMLDivElement) brojInputa += 1;
    }
    assert.equal(5,brojInputa);

  });

  it('dodajInputPoljaNEISPRAVNO - poslan null element', function() {

    let forma = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.dodajInputPolja(null,5);
    assert.equal(forma.childElementCount,0);

  });

  it('dodajInputPoljaNEISPRAVNO - broj vjezbi veci od 15', function() {

    let forma = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.dodajInputPolja(forma,16);
    assert.equal(forma.childElementCount,0);

  });

  it('dodajInputPoljaNEISPRAVNO - broj vjezbi manji od 1', function() {

    let forma = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.dodajInputPolja(forma,16);
    assert.equal(forma.childElementCount,0);

  });

  it('IscrtajVjezbeISPRAVNO', function() {

    let vjezbe = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.iscrtajVjezbe(vjezbe,{ brojVjezbi: 4, brojZadataka: [6,4,2,1]});
    assert.equal(4,vjezbe.childNodes.length);

  });

  it('IscrtajVjezbeNEISPRAVNO - broj vjezbi preko 15', function() {

    let vjezbe = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.iscrtajVjezbe(vjezbe,{ brojVjezbi: 16, brojZadataka: [6,4,2,1]});
    assert.equal(0,vjezbe.childNodes.length);

  });

  it('IscrtajVjezbeNEISPRAVNO - broj vjezbi manje od 1', function() {

    let vjezbe = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.iscrtajVjezbe(vjezbe,{ brojVjezbi: -1, brojZadataka: [6,4,2,1]});
    assert.equal(0,vjezbe.childNodes.length);

  });

  it('IscrtajVjezbeNEISPRAVNO - broj vjezbi i broj zadataka razlicit', function() {

    let vjezbe = document.getElementById("crtanjeVjezbi");
    VjezbeAjax.iscrtajVjezbe(vjezbe,{ brojVjezbi: 5, brojZadataka: [6,4,2,1]});
    assert.equal(0,vjezbe.childNodes.length);

  });

  it('IscrtajZadatkeISPRAVNO', function() {

    let zadaci = document.getElementById("crtanjeZadataka");
    VjezbeAjax.iscrtajZadatke(zadaci,5);
    assert(document.getElementsByClassName("listaZadaci"));

  });

  it('IscrtajZadatkeISPRAVNO - drugi put poslan dom element', function() {

    let zadaci = document.getElementById("crtanjeZadataka");
    VjezbeAjax.iscrtajZadatke(zadaci,5);
    VjezbeAjax.iscrtajZadatke(zadaci,5);
    assert(document.getElementsByClassName("listaZadaci"));

  });

  it('IscrtajZadatkeNEISPRAVNO - broj Zadataka veci od 10', function() {

    let zadaci = document.getElementById("crtanjeZadatakaNeispravno");
    VjezbeAjax.iscrtajZadatke(zadaci,11);
    assert.equal(0,document.getElementById("crtanjeZadatakaNeispravno").childElementCount);

  });

  it('IscrtajZadatkeNEISPRAVNO - broj Zadataka manji od 0', function() {

    let zadaci = document.getElementById("crtanjeZadatakaNeispravno");
    VjezbeAjax.iscrtajZadatke(zadaci,-1);
    assert.equal(0,document.getElementById("crtanjeZadatakaNeispravno").childElementCount);

  });

  it('IscrtajZadatkeNEISPRAVNO - poslan null dom element', function() {

    let zadaci = document.getElementById("crtanjeZadatakaNeispravno");
    VjezbeAjax.iscrtajZadatke(null,5);
    assert.equal(0,document.getElementById("crtanjeZadatakaNeispravno").childElementCount);

  });

});
