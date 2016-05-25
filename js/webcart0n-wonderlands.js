/************************************************************************************/
// @source: transmission-libre.org                                                  */
/*                                                                                  */
/* AliceInWonderlands , par Xavier Dubourdieu                                       */
/*                                                                                  */
/* @licstart  The following is the entire license notice for the JavaScript code in this page. ... */
/* @licstart  Ce qui suit est la totalité de la notice de licence pour le code JavaScript de cette page. ... */
/*                                                                                  */
/* Copyright (C)2016 Jerome Blanchi. The JavaScript code in this page is free       */
/* software: you can redistribute it and/or modify it under the terms of the GNU    */
/* General Public License (GNU GPL) as published by the Free Software Foundation,   */
/* either version 3 of the License, or (at your option) any later version.  The     */
/* code is distributed WITHOUT ANY WARRANTY; without even the implied warranty of   */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU GPL for more   */
/* details. As additional permission under GNU GPL version 3 section 7, you may     */
/* distribute non-source (e.g., minimized or compacted) forms of that code without  */
/* the copy of the GNU GPL normally required by section 4, provided you include     */
/* this license notice and a URL through which recipients can access the            */
/* Corresponding Source.                                                            */
/*                                                                                  */
/* @licend  The above is the entire license notice for the JavaScript code in this page. */
/* @licend  Ce qui précède est la totalité de la notice de licence pour le code JavaScript de cette page. */
/*                                                                                  */
/*  getRandomIntInclusive function from  Mozilla.org/Dev                           */
/*  */
/*                                                                                  */
/* parallax_wonderland function is adapted from                                         */
/* http://allshoreit.com/Blog/?page_id=84                                           */
/************************************************************************************/


  var defaults = {
    strength: 25,
    scale: 1.05,
    animationSpeed: "100ms",
    contain: true,
    wrapContent: false
  };  
  
var imageBeingRotated = false;  // The DOM image currently being rotated (if any)
var mouseStartAngle = false;    // The angle of the mouse relative to the image centre at the start of the rotation
var imageStartAngle = false;    // The rotation angle of the image at the start of the rotation

var clientSceneSizeX;


// hophop ya un debut a tout!
document.onreadystatechange = function () {


  if (document.readyState == "complete") {
    window.onresize=function(){updateSceneSize();};
	  //on lance la boucle des bouches
	  bouche_random();
	  //pour la scene suivante.
	  document.getElementById('bouchecentre').onclick = affiche_wonderlands;
	  
	  updateSceneSize();
	  }
}

var bouche_random_timerid;


function bouche_random() {
  var bouchecentre = document.getElementById('bouchecentre'); //get the element
  bouchecentre.setAttribute('class', "boucheloaded") ;
  var delayInSeconds = 1;                           //delay in seconds
   
  var bouche_bank = ['./res/bouche_anissaAITALIOUYAHIA_3cruels2.gif',
'./res/bouche_roxane.gif',
'./res/bouche_barakaISSIHAKA_3cruel.gif',
'./res/bouche_bret.gif',
'./res/bouche_KENGYBORGESRODRIGUES_SECONDA.gif',
'./res/bouche_mouslimDARSIGOOV_3cruelsxcf.gif'];

  var bouche_elements = document.getElementsByClassName('bouche');

  bouche_random_timerid = setInterval(function()  //interval changer
  {                           
    var bouche_nb = bouche_bank.length-1;
    for (var i = 0; i < bouche_elements.length; ++i)
    {
      var item = bouche_elements[i];  
      item.src = bouche_bank[getRandomIntInclusive(0, bouche_nb)];    //change picture
    }       
  }, delayInSeconds * 1000);
  
}

function affiche_wonderlands(e) {

  //on cache et stop les bouches
  var item = document.getElementById('bouchecentre');
  item.style.visibility = "hidden";
  clearTimeout(bouche_random_timerid);

  //on affiche le decors
 document.body.onmousemove = parallax_wonderland;  
 document.getElementById('wonderparallax').style.visibility = "visible";

  // on appelle a la main une premiere fois
  //pour eviter les glitch (de la position fixe des css)
 parallax_wonderland(e);

  //on affiche les alices
  //TODO precharge les alice dans document complete ?
  affiche_les_alices();
}

/*
adapt from http://allshoreit.com/Blog/?page_id=84
*/
function parallax_wonderland(e){
  
var layer1 = document.getElementById('wonderlands_avant');
var layer2 = document.getElementById('wonderlands_milieu');
var layer3 = document.getElementById('wonderlands_apres');

var xPosition = e.clientX; //it stores the mouse X position
var yPosition = e.clientY; //it stores the mouse Y position and both //changes with mouse move event per pixel.

// Now we will change the X position of each layer on mouse move, to provide the smooth and slow effect we will divide position with some numbers.
//layer1.style.backgroundPosition=(xPosition/8-400)+"px " + (yPosition/8-600)+"px";

// TODO pourcentage base sur taille ecran !!!
// de haut en bas 
// avant 4px , milieu 6 ciel 10
//var 
layer1.style.right=(xPosition/100-80)+"px";
layer1.style.bottom= (yPosition/100)+"px";

//layer2.style.backgroundPosition=(xPosition/6-300)+"px "+ (yPosition/6-300)+"px";

layer2.style.right=(xPosition/80-50)+"px " 
layer2.style.top= (yPosition/80-50)+"px";

//layer3.style.backgroundPosition=(xPosition/4-400)+"px " + (yPosition/4-400)+"px";

 layer3.style.right=(xPosition/60-100)+"px " 
 layer3.style.top= (yPosition/60-50)+"px ";

}


var alice_bank = [
{name:"alice", url:'./res/alice_katheryn_queen.gif', zindex:100, bottom:"30%", top:"auto", right:"40%", left:"auto", width: "90px", height:"auto" },
{name:"alice", url:'./res/alice_jorge_couto.gif', zindex:100, bottom:"3%", top:"auto", right:"10%", left:"auto", width: "90px", height:"auto" },
{name:"alice", url:'./res/alice_gagik_Hakobyan.gif', zindex:100, bottom:"20%", top:"auto", right:"auto", left:"50%", width: "90px", height:"auto" },
{name:"alice", url:'./res/alice_bilel.gif', zindex:100, bottom:"20%", top:"auto", right:"auto", left:"35%", width: "90px", height:"auto" },
{name:"alice", url:'./res/alice_barakaISSIHAKA.gif', zindex:100, bottom:"auto", top:"10%", right:"auto", left:"10%", width: "90px", height:"auto" },
{name:"alice", url:'./res/alice_roxane.gif', zindex:100, bottom:"2%", top:"auto", right:"auto", left:"10%", width: "90px", height:"auto" },
{name:"alice", url:'./res/alice_KENGYBORGESRODRIGUES.gif', zindex:100, bottom:"auto", top:"30%", right:"20%", left:"auto", width: "80px", height:"auto" },
{name:"alice", url:'./res/alice_anissa.gif', zindex:100, bottom:"15%", top:"auto", right:"auto", left:"18%", width: "90px", height:"auto" },
{name:"alice", url:'./res/alice_COLOMBIKYLLIAN.gif', zindex:100, bottom:"12%", top:"auto", right:"auto", left:"50%", width: "150px", height:"auto" }
];

function affiche_les_alices()
{	
  var alice_nb = alice_bank.length;
  for (var i = 0; i < alice_nb; ++i)
  {
//var divIndex = this.id.substring(5); // alpha.lenght

	  var newElemAlpha= document.createElement("div");
    newElemAlpha.setAttribute("class", "resizable draggable alice");
    $(newElemAlpha).draggable({ start: dragStart } ); // Make the animal draggable
    

	$(newElemAlpha).draggable({

			scroll: false,
			cursor: "move",
			start: function(event, ui)
				{
					var divIndex = this.id.substring(5); // alpha.lenght
					$("#alice"+divIndex).css("zIndex", 1001);

				},
			drag: function()
				{
					var divIndex = this.id.substring(5); // alpha.lenght
					$("#alice"+divIndex).css('left', $(this).css('left'));
					$("#alice"+divIndex).css('top', $(this).css('top'));
				},
			stop: function(event, ui)
				{
	       var divIndex = this.id.substring(5); // alpha.lenght
// On limite la zone de deplacement de l'object a l'interieur d'une zone
/*					if ($(this).css("left").replace(/px|pt|%/,'')<getClientSceneSizeX()
					 &&
						 $(this).css("left").replace(/px|pt|%/,'')>min_x && 
						 $(this).css("top").replace(/px|pt|%/,'')<max_y_suivre && 
						 $(this).css("top").replace(/px|pt|%/,'')>min_y) */
					{

						$("#alice"+divIndex).css("zIndex", 100+Math.floor(Math.random()*100));						
						
						
						//get in screen position
						var thisSizeX = $(this).width();
//						var mousePosition = getMousePosition(event);
				//		var positionX = mousePosition[0] - (thisSizeX/2);
						//choose base zindex to glue the object to foreground (scene)or background (sky) 
						var thiszIndexBase = 1;
						var glueToSky = 1;
						var fondPositionX;
/*						
						if(mousePosition[1] > 220)
						{
							fondPositionX = getBackgroundPositionX();
							//reminder : Scene ZIndex=100, door Zindex=101
							thiszIndexBase = 101; glueToSky = 0;
						}
						else
						{ 
							fondPositionX = getSkyPositionX();
						}
*/
						//convert to background position
	/*					if(fondPositionX < 0)
						{	positionX += Math.abs(fondPositionX) - DangBestLib.sceneTailleX; }
						//update sprite Z
						var divIndex = this.id.substring(5); // alpha.lenght
						$("#pp"+divIndex).css("zIndex", thiszIndexBase+Math.floor(Math.random()*100));

						scroll_suivre($(this).attr('id'), sizee, maxx, positionX, glueToSky);
						*/
					}
				;}
		});    
    
    
    
    
    newElemAlpha.style.bottom = alice_bank[i].bottom;
    newElemAlpha.style.top = alice_bank[i].top;
    newElemAlpha.style.right = alice_bank[i].right;
    newElemAlpha.style.left = alice_bank[i].left;
    newElemAlpha.style.width = alice_bank[i].width;
    //TODO §!!!!!!!! FIXED SIZE !
    newElemAlpha.style.height = "100px";
    newElemAlpha.style.zIndex = 1000;
//    newElemAlpha.style.backgroundColor = "yellow";
    newElemAlpha.style.backgroundPosition = "0,0";
    newElemAlpha.id = "alpha" + i;
    	  
    var newElemDiv = document.createElement("div");
    newElemDiv.setAttribute("class", "resizable draggable alice");
//    $(newElemDiv).draggable({ start: dragStart } ); // Make the animal draggable
    
    newElemDiv.style.bottom = alice_bank[i].bottom;
    newElemDiv.style.top = alice_bank[i].top;
    newElemDiv.style.right = alice_bank[i].right;
    newElemDiv.style.left = alice_bank[i].left;
    newElemDiv.style.width = alice_bank[i].width;
    newElemDiv.style.height = alice_bank[i].height;
    newElemDiv.style.zIndex = alice_bank[i].zindex;
    newElemDiv.id = "alice" + i;
        
    var newElemImg = document.createElement("img");
    newElemImg.src = alice_bank[i].url;
    newElemDiv.appendChild(newElemImg); 
    
    var newElemTL = document.createElement("div");
    newElemTL.setAttribute("class", "corner TL rotatable");
    newElemDiv.appendChild(newElemTL);
    
    $(newElemTL).each(function (index){   // Make the animal rotatable	 
		var elementParent = $(this)[0].parentNode;	
		$.data(elementParent, 'currentRotation', 0 ); 
		$(this).mousedown( startRotate );
  	});


    var newElemBL = document.createElement("div");
    newElemBL.setAttribute("class", "corner BL duplicatable");
    newElemDiv.appendChild(newElemBL);

    var wonderParaElem = document.getElementById("wonderparallax");
    wonderParaElem.appendChild(newElemAlpha);
    wonderParaElem.appendChild(newElemDiv);
//    document.body.appendChild(newElemDiv);

  }

  // Add an event handler to stop the rotation when the mouse button is released
	$(document).mouseup( stopRotate );

}
  
/* UTILS */

// Update the scene to context client screen
function updateSceneSize() {
	
	var factor = 0.3;
	if (document.body.clientWidth > 1800){
		factor = 1.1;
	}else if (document.body.clientWidth > 1000){
		factor = 0.8;
	}else if (document.body.clientWidth > 800){
		factor = 0.6;
	}else if (document.body.clientWidth > 600){
		factor = 0.5;
	}
	
	clientSceneSizeX = document.body.clientWidth;;
}


function getClientSceneSizeX()
{
	return clientSceneSizeX;
}



//////////////// ROTATE

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Prevent the image being dragged if it's already being rotated
function dragStart( e, ui ) {
  if ( imageBeingRotated ) return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
function stopRotate( e ) {

  // Exit if we're not rotating an image
  if ( !imageBeingRotated ) return;

  // Remove the event handler that tracked mouse movements during the rotation
  $(document).unbind( 'mousemove' );

  // Cancel the image rotation by setting imageBeingRotated back to false.
  // Do this in a short while - after the click event has fired -
  // to prevent the lightbox appearing once the Shift key is released.
  setTimeout( function() { imageBeingRotated = false; }, 10 );
  return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Start rotating an image
function startRotate( e ) {

  // Track the image from parentElement that we're going to rotate
  imageBeingRotated = this.parentElement;

  // Store the angle of the mouse at the start of the rotation, relative to the image centre
  var imageCentre = getImageCentre( imageBeingRotated );
  var mouseStartXFromCentre = e.pageX - imageCentre[0];
  var mouseStartYFromCentre = e.pageY - imageCentre[1];
  mouseStartAngle = Math.atan2( mouseStartYFromCentre, mouseStartXFromCentre );

  // Store the current rotation angle of the image at the start of the rotation
  imageStartAngle = $(imageBeingRotated).data('currentRotation');

  // Set up an event handler to rotate the image as the mouse is moved
  $(document).mousemove( rotateImage );

  return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Rotate image based on the current mouse position
function rotateImage( e ) {

  // Exit if we're not rotating an image
  if ( !imageBeingRotated ) return;

  // Calculate the new mouse angle relative to the image centre
  var imageCentre = getImageCentre( imageBeingRotated );
  var mouseXFromCentre = e.pageX - imageCentre[0];
  var mouseYFromCentre = e.pageY - imageCentre[1];
  var mouseAngle = Math.atan2( mouseYFromCentre, mouseXFromCentre );

  // Calculate the new rotation angle for the image
  var rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;

  // Rotate the image to the new angle, and store the new angle
  $(imageBeingRotated).css('transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).data('currentRotation', rotateAngle );
  return false;
}

/* adapted from http://www.elated.com/articles/smooth-rotatable-images-css3-jquery/ */
// Calculate the centre point of a given image
function getImageCentre( image ) {

  // Rotate the image to 0 radians
  $(image).css('transform','rotate(0rad)');
  $(image).css('-moz-transform','rotate(0rad)');
  $(image).css('-webkit-transform','rotate(0rad)');
  $(image).css('-o-transform','rotate(0rad)');

  // Measure the image centre
  var imageOffset = $(image).offset();
  var imageCentreX = imageOffset.left + $(image).width() / 2;
  var imageCentreY = imageOffset.top + $(image).height() / 2;

  // Rotate the image back to its previous angle
  var currentRotation = $(image).data('currentRotation');
  $(imageBeingRotated).css('transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + currentRotation + 'rad)');

  // Return the calculated centre coordinates
  return Array( imageCentreX, imageCentreY );
}





/* FROM MOZ DEV */
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}









