/*jslint browser: true*/
/*global $, jQuery*/


/*
* Description:
*/
$(document).ready(function () {

    "use strict";
    var scanned = false,
        scannedInput = [];    //Array to hold the ID number read by Scanner

    $(window).keypress(function (scanEvent) {   //On scan

        // check to make sure input is a number 0 - 9 in ASCII
        if (scanEvent.which >= 48 && scanEvent.which <= 57) {

            // push number to array
            scannedInput.push(String.fromCharCode(scanEvent.which));
            //scannedInput.push(scanEvent.which);
            //window.alert( scannedInput );
        }

        setTimeout(function () {
            //window.alert( scannedInput.length ); //All lengths are 1 for some reason

            // if length is equivalent to proper length, add string to userID
            if (scannedInput.length === 8) {



                // store array into string
                var userID = scannedInput.join("");
                scanned = true;
                $("#userId").val(userID);
                console.log("user: " + userID);
                //alert(userID);

                if (scanned) {
                    console.log("scanned");
                    //save RFID input
                    window.localStorage.setItem('userID', userID);

                    //winodw.alert( "Scanned input: " + window.localStorage.getItem( userID ));

                    //jump to exhibit_terminal page
                    //XXX Commented out other teams redirect
                    //window.location.href = "../html/exhibit_terminal.html";
                }
            }

            // clear array
            scannedInput = [];

        }, 500);
    });
});
