let studenti;

window.onload = function() {
    studenti = document.getElementById("inputBatch");

    document.getElementById("dodajStudente").addEventListener("click", function() {
        //console.log(studenti.value);
        StudentAjax.dodajBatch(studenti.value,(error,data) => {
            if(error) {
                throw error;
            }
            //console.log(JSON.parse(data).status);
            document.getElementById("ajaxstatus").innerHTML = JSON.parse(data).status;
        })
    });
}