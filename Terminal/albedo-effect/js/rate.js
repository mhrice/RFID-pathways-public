/*
* File Name: rate.js
* Author(s): James Guidry
* Date: 22 August 2017
* Description: provides rating functionality for the terminals
*/

/*
* Function Name: rate
* Description: Calculates the new average rating of a terminal and stores it
*              back into the database.
* Parameters:
*   rating: The rating given by the user
*   terminalNum: Which terminal was rated
*/

function rate( rating, terminalNum ){

  var ROUND_FACTOR = 100;   //Factor used for rounding the rating
  var SLIDE_TIME = 300;     //Time before the rating box toggles
  var TEXT_TIME = 500;      //Time before the thankyou text hides

  //Get the current rating reference
  var ratingRef = firebase.database().ref().child( "Terminals" ).child(
    terminalNum ).child( "Rating_Sys" ).child( "rating" );

  //Get the current number of raters reference
  var ratersRef = firebase.database().ref().child( "Terminals" ).child(
    terminalNum ).child( "Rating_Sys" ).child( "raters" );

  var numRaters;  //Number of user who have rated the terminal
  var newRating;  //The new terminal rating

  //Get the number of raters
  ratersRef.transaction( function( raters ){
    numRaters = raters + 1;
    return raters + 1;        //Store new number of raters
  });

  //Calculate and store new average rating
  ratingRef.transaction( function( oldRating ){

    //Calculate
    if( numRaters < 1 ){
        newRating = (( oldRating * numRaters) + rating) / numRaters;
    }
    else{
      newRating = (( oldRating * (numRaters-1)) + rating) / numRaters;
    }

    //Round to 2? decimals
    newRating = Math.round( newRating  * ROUND_FACTOR ) / ROUND_FACTOR;

    return newRating; //Store

  });

  //Show thankyou text --> Wyatt's stuff
  document.getElementById( 'Thankyou' ).style.display = "block";

  //Slide the rating box back down
  setTimeout( function(){
    $("#mainSlideBox").slideToggle();
  }, 300 );

  //Hide the thankyou text
  setTimeout( function(){
    document.getElementById( 'Thankyou' ).style.display = "none";
  }, TEXT_TIME );


/*
    //Show thankyou text --> Matt's stuff
    document.getElementById( 'Thankyou' ).style.visibility = "visible";

  //  Slide the rating box back down
    //Hide the thankyou text
    setTimeout( function(){

      $("#mainSlideBox").slideToggle();
      document.getElementById( 'Thankyou' ).style.visibility = "hidden";

    }, 500 );
*/


}

/*
* Function Name: rateMe()
* Description: Display the rating box to allow user input and rating.
*/

function rateMe(){

  document.getElementById('mainSlideBox').stlye = "display: inline-block";
  $("#mainSlideBox").slideToggle();

  return false;
}


/*

$(document).ready(function(){
  $("#mainSlideBox").hide();
  $( "#toggle" ).click(function () {
    if ( $( "#mainSlideBox:first" ).is( ":hidden" ) ) {
      $( "#mainSlideBox" ).slideDown( "slow" );
    } else {
      $( "#mainSlideBox" ).slideUp( "slow" );
    }
  });
  $( "#X" ).click(function () {
      $( "#mainSlideBox" ).slideUp( "slow" );
    });


});
*/
