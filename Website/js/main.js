

// Increment button function for set temperature

$(document).ready(function(){

    var quantitiy=0;
    $('.turnUp').click(function(e){

        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#setTemperature').val());

        // If is not undefined

        $('#setTemperature').val(quantity + 1);


        // Increment

    });

    $('.turnDown').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#setTemperature').val());

        // If is not undefined

        // Increment
        if(quantity>0){
            $('#setTemperature').val(quantity - 1);
        }
    });

    $('.setTemp').click(function (e) {
        //Get submitted value
        var newTemp = document.getElementById("setTemperature").value;

        $('#setTemperature').val(newTemp);

        $('#currentTemperature').val(newTemp);
    })

});
