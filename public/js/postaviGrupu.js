let index;
let grupa;

window.onload = function() {
    index = document.getElementById("inputIndex");
    grupa = document.getElementById("inputGrupa");

    document.getElementById("postaviGrupu").addEventListener("click", function() {
        StudentAjax.postaviGrupu(String(index.value), grupa.value, (error,data) => {
            if(error) {
                throw error;
            }
            //console.log(JSON.parse(data).status);
            document.getElementById("ajaxstatus").innerHTML = JSON.parse(data).status;
        });
    });
}