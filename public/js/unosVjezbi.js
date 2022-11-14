let formaZadataka;
let brojVjezbi;
window.onload = function() {
    formaZadataka = document.getElementById("formaZadataka");
    brojVjezbi = document.getElementById("inputVjezbe");
    //VjezbeAjax.dodajInputPolja(formaZadataka,null);

    document.getElementById("posaljiVjezbe").addEventListener("click", function() {
        //console.log("usao");
        VjezbeAjax.dodajInputPolja(formaZadataka,brojVjezbi.value);
        
    });

    document.getElementById("posaljiZadatke").addEventListener("click",function() {
        //console.log("usao u zadatke");
        let objekat  = {
            brojVjezbi: brojVjezbi.value,
            brojZadataka: []
        }
        for(let i = 0; i < brojVjezbi.value; i++) {
            objekat.brojZadataka.push(document.getElementById("z" + i).value);
        }
        //console.log(objekat);
        VjezbeAjax.posaljiPodatke(objekat,(error,data) => {
            if(error) {
                throw error;
            }
            //console.log("pozvana callback fija");
        });
    });
}
