

// Increment button function for set temperature

$(document).ready(function(){
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday", "Sunday"
    ];


    var today = new Date();
    var day = today.getDay();
    document.getElementById('dayOf').innerHTML = DAY_NAMES[day -1];

    var month = today.getMonth();
    var year = today.getFullYear();
    document.getElementById('dateOf').innerHTML =
        MONTH_NAMES[month] + " " + year;
    console.log(month);

    var hour = today.getHours();
    var minute = today.getMinutes();
    checkTime(minute);
    document.getElementById('timeOf').innerHTML =
        hour + ":" + minute;

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }


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
    });



});
