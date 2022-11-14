let ime;
let prezime;
let index;
let grupa;
window.onload = function() {
    ime = document.getElementById("inputIme");
    prezime = document.getElementById("inputPrezime");
    index = document.getElementById("inputIndex");
    grupa = document.getElementById("inputGrupa");

    document.getElementById("posaljiStudenta").addEventListener("click", function() {
        let objekat = {
            ime: ime.value,
            prezime: prezime.value,
            index: String(index.value),
            grupa: grupa.value
        }
        //console.log(objekat);
        StudentAjax.dodajStudenta(objekat,(error,data) => {
            if(error) {
                throw error;
            }
            //console.log(JSON.parse(data).status);
            document.getElementById("ajaxstatus").innerHTML = JSON.parse(data).status;
        });
    });
}