

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

        var hour = today.getHours();
        var minute = today.getMinutes();

        document.getElementById('timeOf').innerHTML =
            hour + ":" + checkTime(minute);;
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

//Function for onClick when next page is clicked.

function storeTriggerValues() {
    var trigger = document.forms[0];
    var txt = "";
    var triggerValue = "";
    var chosenTemprature = "";

    for(i = 0; i < trigger.length; i++){
        if (trigger[i].checked) {
           triggerValue = txt + trigger[i].value;
        }
        localStorage.setItem ("trigger", triggerValue);
    }

    chosenTemprature = document.getElementById("setTemperature").value;
    chosenSensorPlace = "Temprature Sensor: Living Room";

    localStorage.setItem("place", chosenSensorPlace);
    localStorage.setItem("temprature", chosenTemprature);
}

function storActionComponentValue() {
    var actionComponent = document.forms[0];
    var txt = "";
    var chosenActionComponent;

    for(i = 0; i < actionComponent.length; i++){
        if (actionComponent[i].checked) {
            chosenActionComponent = txt + actionComponent[i].value;
        }
        localStorage.setItem("action", chosenActionComponent);
    }

    var triggerTemp = localStorage.getItem("trigger");
    var tempratureTemp = localStorage.getItem("temprature");
    var chosenActionComponentTemp = localStorage.getItem("action");

    console.log(triggerTemp, tempratureTemp, chosenActionComponentTemp);
}

function storeAction() {
    var actionTrigger = document.forms[0];
    var txt = "";
    var chosenActionTrigger;

    for(i = 0; i < actionTrigger.length; i++){
        if (actionTrigger[i].checked) {
            chosenActionTrigger = txt + actionTrigger[i].value;
        }
        localStorage.setItem("actionTrigger", chosenActionTrigger);
    }

    chosenActionTemprature = document.getElementById("setTemperature").value;
    localStorage.setItem("actionTemprature", chosenActionTemprature);


    var triggerTemp = localStorage.getItem("trigger");
    var tempratureTemp = localStorage.getItem("temprature");
    var chosenActionComponentTemp = localStorage.getItem("action");
    var chosenActionTriggerTemp = localStorage.getItem("actionTrigger"); 
    var chosenActionTempratureTemp = localStorage.getItem("actionTemprature");

    

}

function newRuleOverView(){

    var placeTemp = localStorage.getItem("place");
    var triggerTemp = localStorage.getItem("trigger");
    var tempratureTemp = localStorage.getItem("temprature").toString();
    var chosenActionComponentTemp = localStorage.getItem("action").toString();
    var chosenActionTriggerTemp = localStorage.getItem("actionTrigger").toString(); 
    var chosenActionTempratureTemp = localStorage.getItem("actionTemprature").toString();

    document.getElementById("overview").innerHTML = placeTemp + " will trigger at " + triggerTemp + " " + tempratureTemp + " and turn " + chosenActionTriggerTemp + " " 
                                                    + chosenActionComponentTemp + " until it's " + chosenActionTempratureTemp;
    console.log(triggerTemp);
    //console.log(placeTemp " will trigger at" + triggerTemp + " " + tempratureTemp + "and turn " + chosenActionTriggerTemp
    //+ " " + chosenActionComponentTemp + " until it's " + chosenActionTempratureTemp);
}