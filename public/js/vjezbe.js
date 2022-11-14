window.onload = function() {

    odabirVjezbe = document.getElementById("odabirVjezbe");

    VjezbeAjax.dohvatiPodatke((error,data) => {
        if(error) {
            throw error;
        }
        VjezbeAjax.iscrtajVjezbe(odabirVjezbe,data);
        
    })
}