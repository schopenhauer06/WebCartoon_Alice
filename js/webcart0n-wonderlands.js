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

//PRIO 1
//TODO alice position : conversion % en px a l'init
//TODO : fix replace des alices apres changement resolution (ctrl-f5)
//TODO Alice sound support (onhover)
//TODO Bouche sound
//TODO Parallax sound
//TODO Logo + page credit

//PRIO 2
//TODO replace le all perso sur retaille ecran
//document.getElementById("my-link").addEventListener("click", myFunction, false);
//TODO ajout class autoresizable pour la fonction mettre a jour position
//TODO precharge les alice dans document complete ?
//TODO parallax : pourcentage base sur taille ecran !!!
//TODO touch screen support for alice
//TODO gyroscope
//TODO Restrict alice drag in scene size


/*
window.ondeviceorientation = function(event) {
   var delta = Math.round(event.beta);

    switch (window.orientation) {
        case 0:
            delta = Math.round(event.gamma);
            break;
        case 180:
            delta = -Math.round(event.gamma);
            break;
    }

   var position = 15000 + (delta * 400);
   position = Math.floor(position);
   sym.stop(position);
   console.log(position);
}
*/
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

var factorScene = 0.3;
var clientSceneSizeX, clientSceneSizeY;
var shouldUpdateElementsPosition = false;

var terrier_height = "16%";

// hophop ya un debut a tout!
document.onreadystatechange = function () {

  if (document.readyState == "complete")
  {
    affiche_les_scrolls(false);
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
  item = document.getElementById('bouchecentre');
  item.style.display = "none";
  clearTimeout(bouche_random_timerid);

  shouldUpdateElementsPosition = true;
  //on affiche le decors
  document.body.style.backgroundColor = "black";
  affiche_le_decors(true);
  document.getElementById('wonderparallax').style.visibility = "visible";

  item = document.getElementById('terrier');
  item.style.bottom = getSceneBottom() + "px";
  item.style.height = (getSceneSizeY()* parseInt(terrier_height)) / 100 + "px";
  item.onclick = crazyLapinou;
  // on appelle parallax_wonderland une premiere fois
  //pour eviter les glitch (de la position fixe des css)
  parallax_wonderland(e);

  //on affiche les alices
  //TODO precharge les alice dans document complete ?
  affiche_les_alices();
  affiche_les_champis();
  
  //on affiche le logooo
  update_logo_position(false);
  document.getElementById('logooo').style.visibility = "visible";
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
 // TODO pourcentage base sur taille ecran !!!???
 layer1.style.right=(xPosition/100)+"px";
 layer1.style.top= -(yPosition/100)+"px";

 layer2.style.right=(xPosition/80)+"px";
 layer2.style.top= (yPosition/80)+"px";

 layer3.style.right=(xPosition/60)+"px";
 layer3.style.top= (yPosition/60)+"px";
}

var alice_bank = [
/*{name:"alice", url:'./res/xxx.gif', zindex:100, bottom:"%", top:"auto",  right:"%", left:"auto", width: "px", height:"auto" },*/
{name:"alice", url:'./res/alice_katheryn_queen.gif', zindex:120, bottom:"15", top:"auto",  right:"40%", left:"auto", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_jorge_couto.gif', zindex:120, bottom:"3", top:"auto",      right:"10%", left:"auto", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_gagik_Hakobyan.gif', zindex:120, bottom:"20", top:"auto",  right:"auto", left:"50%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_bilel.gif', zindex:120, bottom:"20", top:"auto",           right:"30%", left:"auto", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_barakaISSIHAKA.gif', zindex:120, bottom:"3", top:"auto",   right:"auto", left:"10%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_roxane.gif', zindex:120, bottom:"2", top:"auto",           right:"auto", left:"42%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_KENGYBORGESRODRIGUES.gif', zindex:100, bottom:"8", top:"auto", right:"20%", left:"auto", width: "80", height:"auto" },
{name:"alice", url:'./res/alice_anissa.gif', zindex:120, bottom:"15", top:"auto",          right:"auto", left:"38%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_COLOMBIKYLLIAN.gif', zindex:120, bottom:"12", top:"auto",  right:"auto", left:"25%", width: "150", height:"auto" }
];

function affiche_les_alices()
{	
  for (var i = 0; i < alice_bank.length; ++i)
  {
	  var newElemAlpha= document.createElement("div");
    newElemAlpha.setAttribute("class", "draggable alice");

    $(newElemAlpha).draggable({
			scroll: false,
			cursor: "move",
			start: function(event, ui)
				{
				  //on start display div front
					var divIndex = this.id.substring(5); // alpha.lenght
					document.getElementById("alice"+divIndex).style.zIndex = 2001;
				},
			drag: function()
				{
//TODO Restrict drag in scene size
// On limite la zone de deplacement de l'object a l'interieur d'une zone
/*					if ($(this).css("left").replace(/px|pt|%/,'')<getClientSceneSizeX()
					 &&
						 $(this).css("left").replace(/px|pt|%/,'')>min_x &&
						 $(this).css("top").replace(/px|pt|%/,'')<max_y_suivre &&
						 $(this).css("top").replace(/px|pt|%/,'')>min_y) */
					{
					var divIndex = this.id.substring(5); // alpha.lenght
					//update alice position based on alpha'
				  var item = document.getElementById("alice"+divIndex);
					item.style.left = this.style.left;
					item.style.top = this.style.top;
					//update alice size based on screen coordinate
          var altitude = (100/getSceneSizeY())*parseInt(this.style.top);
          var sizefactor = altitude/100;
          this.setAttribute("sizefactor", sizefactor);
          this.style.width =  this.getAttribute("originalwidth") * factorScene * (sizefactor+0.2) +"px";
          this.style.height =  this.getAttribute("originalheight") * factorScene * (sizefactor+0.2) +"px";
					item.style.height = this.style.height;
					item.style.width = this.style.width;
					}
				},
			stop: function(event, ui)
				{
	        var divIndex = this.id.substring(5); // alpha.lenght
					{
					  //assign new zindex based on altitude (sizefactor)
					  var zindexbase = 10;
					  if (parseFloat(this.getAttribute("sizefactor")) > 0.60 ) {
					    zindexbase = 120;
					  }
					  document.getElementById("alice"+divIndex).style.zIndex = getRandomIntInclusive(zindexbase,zindexbase+20);
					}
				;}
		});

    newElemAlpha.style.bottom = getSceneBottom() + (getSceneSizeY()* alice_bank[i].bottom) / 100 + "px";
    newElemAlpha.style.top = alice_bank[i].top;
    newElemAlpha.style.right = alice_bank[i].right;
    newElemAlpha.style.left = alice_bank[i].left;
    newElemAlpha.style.width = alice_bank[i].width*factorScene + "px";
    //newElemAlpha.style.height : see after <img> creation
    newElemAlpha.style.zIndex = 2000;
    newElemAlpha.style.backgroundPosition = "0,0";
    newElemAlpha.id = "alpha" + i;
//    newElemAlpha.style.backgroundColor = "orange";

    //init alice size based on screen coordinate
    var altitude = (100/getSceneSizeY())*parseInt(newElemAlpha.style.bottom);
    var sizefactor = altitude/100;
    newElemAlpha.setAttribute("sizefactor", sizefactor);

    var newElemDiv = document.createElement("div");
    //TODO remove draggable 
    newElemDiv.setAttribute("class", "draggable alice");
    newElemDiv.style.bottom = newElemAlpha.style.bottom;
    newElemDiv.style.top = alice_bank[i].top;
    newElemDiv.style.right = alice_bank[i].right;
    newElemDiv.style.left = alice_bank[i].left;
//    newElemDiv.style.width = alice_bank[i].width + "px";
    newElemDiv.style.width = alice_bank[i].width*factorScene + "px";
//    newElemDiv.style.height = alice_bank[i].height;
    newElemDiv.style.height = alice_bank[i].height;
    newElemDiv.style.zIndex = alice_bank[i].zindex;
    newElemDiv.id = "alice" + i;
    newElemDiv.setAttribute("sizefactor", sizefactor);

    var newElemImg = document.createElement("img");
    newElemImg.src = alice_bank[i].url;
    newElemDiv.appendChild(newElemImg);

//    newElemAlpha.style.height = alice_bank[i].width/parseInt(newElemImg.width) * parseInt(newElemImg.height) + "px";
    newElemAlpha.style.height = (alice_bank[i].width*factorScene)/parseInt(newElemImg.width) * parseInt(newElemImg.height) + "px";
    newElemAlpha.setAttribute("originalwidth", alice_bank[i].width);
    newElemAlpha.setAttribute("originalheight", parseInt(newElemAlpha.style.height));

    var wonderParaElem = document.getElementById("wonderparallax");
    wonderParaElem.appendChild(newElemAlpha);
    wonderParaElem.appendChild(newElemDiv);
//    document.body.appendChild(newElemDiv);

  }
}

var champi_bank = [
/*{name:"champi", url:'./res/xxx.gif', zindex:100, bottom:"%", top:"auto",  right:"%", left:"auto", width: "px", height:"auto" },*/
{name:"champi", url:'./res/mushroom_KENGYBORGESRODRIGUES.gif', zindex:100, bottom:"10", top:"auto",  right:"30%", left:"auto", width: "100px", height:"auto" },
{name:"champi", url:'./res/mushroom_KENGYBORGESRODRIGUES02.gif', zindex:501, bottom:"8", top:"auto",      right:"auto", left:"17%", width: "240px", height:"auto" },
{name:"champi", url:'./res/mushroom_vrai.gif', zindex:100, bottom:"22", top:"auto",  right:"auto", left:"5%", width: "100px", height:"auto" },
{name:"champi", url:'./res/mushroom.gif', zindex:100, bottom:"32", top:"auto",           right:"auto", left:"50%", width: "100px", height:"auto" }
];

function affiche_les_champis() {
  for (var i = 0; i < champi_bank.length; ++i)
  {
	  var newElemAlpha= document.createElement("div");
    newElemAlpha.setAttribute("class", "champi");
    newElemAlpha.style.bottom = getSceneBottom() + (getSceneSizeY()* champi_bank[i].bottom) / 100 + "px";
    newElemAlpha.style.top = champi_bank[i].top;
    newElemAlpha.style.right = champi_bank[i].right;
    newElemAlpha.style.left = champi_bank[i].left;
    newElemAlpha.style.width = champi_bank[i].width;
    //newElemAlpha.style.height : see after <img> creation
    newElemAlpha.style.zIndex = 1000;
    newElemAlpha.style.backgroundPosition = "0,0";
    newElemAlpha.id = "alpha" + i;

    var newElemDiv = document.createElement("div");
    newElemDiv.setAttribute("class", "champi");
    newElemDiv.style.bottom = newElemAlpha.style.bottom;
    newElemDiv.style.top = champi_bank[i].top;
    newElemDiv.style.right = champi_bank[i].right;
    newElemDiv.style.left = champi_bank[i].left;
    newElemDiv.style.width = champi_bank[i].width;
    newElemDiv.style.height = champi_bank[i].height;
    newElemDiv.style.zIndex = champi_bank[i].zindex;
    newElemDiv.id = "champ" + i;

    var newElemImg = document.createElement("img");
    newElemImg.src = champi_bank[i].url;
    newElemDiv.appendChild(newElemImg);

    newElemAlpha.style.height = parseInt(champi_bank[i].width)/parseInt(newElemImg.width) * parseInt(newElemImg.height) + "px";
    newElemAlpha.onclick = affichePersoAuChampi;

    var wonderParaElem = document.getElementById("wonderparallax");
    wonderParaElem.appendChild(newElemAlpha);
    wonderParaElem.appendChild(newElemDiv);
  }
}

var lapinou_bank = [
/*{name:"lapinou", url:'./res/xxx.gif', zindex:100, bottom:"%", top:"auto",  right:"%", left:"auto", width: "px", height:"auto" },*/
{name:"lapinou", url:'./res/lapin_jorge_couto.gif', zindex:100, bottom:"15%", top:"auto",  right:"40%", left:"auto", width: "90px", height:"auto" },
{name:"lapinou", url:'./res/lapin_lapin.gif', zindex:100, bottom:"3%", top:"auto",      right:"10%", left:"auto", width: "90px", height:"auto" },
{name:"lapinou", url:'./res/lapin_iman.gif', zindex:100, bottom:"20%", top:"auto",  right:"auto", left:"50%", width: "90px", height:"auto" },
{name:"lapinou", url:'./res/lapin_bilel.gif', zindex:100, bottom:"20%", top:"auto",           right:"30%", left:"auto", width: "90px", height:"auto" },
{name:"lapinou", url:'./res/lapin_katheryn.gif', zindex:100, bottom:"3%", top:"auto",   right:"auto", left:"10%", width: "90px", height:"auto" },
{name:"lapinou", url:'./res/lapin_ocean.gif', zindex:100, bottom:"2%", top:"auto",           right:"auto", left:"42%", width: "90px", height:"auto" }
];


function crazyLapinou()
{
  for (var i = 0; i < lapinou_bank.length; ++i)
  {
    var newElemDiv = document.createElement("div");
    newElemDiv.setAttribute("class", "lapinou");
    newElemDiv.style.bottom =  getRandomIntInclusive(0,90) + "%";
//    newElemDiv.style.top = lapinou_bank[i].top;
    newElemDiv.style.right = getRandomIntInclusive(0,90) + "%";
//    newElemDiv.style.left = lapinou_bank[i].left;
    newElemDiv.style.width = lapinou_bank[i].width;
    newElemDiv.style.height = lapinou_bank[i].height;
    newElemDiv.style.zIndex = lapinou_bank[i].zindex;

    var newElemImg = document.createElement("img");
    newElemImg.src = lapinou_bank[i].url;
    newElemDiv.appendChild(newElemImg);

    var wonderParaElem = document.getElementById("wonderparallax");
    wonderParaElem.appendChild(newElemDiv);
  }

  var delayInSeconds = 1;                           //delay in seconds
  var lapinou_elements = document.getElementsByClassName('lapinou');

  var lapinou_random_timerid = setInterval(function()  //interval changer
  {
    for (var i = 0; i < lapinou_elements.length; ++i)
    {
      var item = lapinou_elements[i];
      switch(getRandomIntInclusive(0,3))
      {
        case 0: //NE
            item.style.bottom = parseInt(item.style.bottom) + 5 + "%";
            item.style.right = parseInt(item.style.right) + 5 + "%";
        break;
        case 1: //NW
            item.style.bottom = parseInt(item.style.bottom) + 5 + "%";
            item.style.right = parseInt(item.style.right) - 5 + "%";
        break;
        case 2: //SW
            item.style.bottom = parseInt(item.style.bottom) - 5 + "%";
            item.style.right = parseInt(item.style.right) - 5 + "%";
        break;
        case 3: //SE
            item.style.bottom = parseInt(item.style.bottom) - 5 + "%";
            item.style.right = parseInt(item.style.right) + 5 + "%";
        break;
      }
    }
  }, delayInSeconds * 1000);

}

var perso_bank = [
/*{name:"lapinou", url:'./res/xxx.gif', zindex:100, bottom:"%", top:"auto",  right:"%", left:"auto", width: "px", height:"auto" },*/
{name:"chat", url:'./res/chat_katherynle.gif', zindex:100, bottom:"15%", top:"auto",  right:"40%", left:"auto", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_eyes.gif', zindex:100, bottom:"3%", top:"auto",      right:"10%", left:"auto", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_ocean.gif', zindex:100, bottom:"20%", top:"auto",  right:"auto", left:"50%", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_alyzea.gif', zindex:100, bottom:"20%", top:"auto",           right:"30%", left:"auto", width: "50px", height:"auto" },
{name:"peintre", url:'./res/bilel_peintre.gif', zindex:100, bottom:"7%", top:"auto",           right:"auto", left:"77%", width: "50px", height:"auto" },
{name:"caterpillar", url:'./res/caterpilar_darsigovmouslim.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"caterpillar", url:'./res/alyzea_caterpillar.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"grenouille", url:'./res/gagik.Hakobyan.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"twins", url:'./res/katheryn_twins.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"rose", url:'./res/katheryn_rose.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"chapeau", url:'./res/katheryn_hat.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" }
];


function affichePersoAuChampi(event) {

  var perso_nb = getRandomIntInclusive(0, perso_bank.length);
  for (var i = 0; i < perso_nb; ++i)
  {
    var perso_index = getRandomIntInclusive(0, perso_bank.length-1);
    var newElemDiv = document.createElement("div");
    newElemDiv.setAttribute("class", "allperso");

    newElemDiv.style.width = perso_bank[perso_index].width;
    newElemDiv.style.height = perso_bank[perso_index].height;
    newElemDiv.style.zIndex = perso_bank[perso_index].zindex;
    newElemDiv.id = "perso" + perso_index;

    var newElemImg = document.createElement("img");
    newElemImg.src = perso_bank[perso_index].url;
    newElemDiv.appendChild(newElemImg);

    newElemDiv.style.top = event.clientY + getRandomIntInclusive(-100,100) - parseInt(newElemImg.height)/2 + "px";
    newElemDiv.style.left = event.clientX + getRandomIntInclusive(-100,100) - parseInt(newElemImg.width)/2 + "px";


    var wonderParaElem = document.getElementById("wonderparallax");
    wonderParaElem.appendChild(newElemDiv);
  }
}

/******************************************************************/
/*********************** UI ***************************************/
/******************************************************************/
var creditDisplayed = false;
function affiche_les_credits()
{
  if(creditDisplayed)
  {
    //on cache le credits
    window.scrollTo( 0, 0 );
    var item = document.getElementById('creditpage');
    item.style.display = "none";
    affiche_les_scrolls(false);
    affiche_le_decors(true);
    updateSceneSize();
    update_logo_position(false);
  }else {
    window.scrollTo( 0, 0 );
    affiche_le_decors(false);
    affiche_les_scrolls(true);
    update_logo_position(true);
    //on affiche le credits
    var item = document.getElementById('creditpage');
    item.style.display = "inline";
  }
  creditDisplayed = !creditDisplayed;
}

function affiche_le_decors(visible) {
  if (visible) {
//    document.body.addEventListener("mousemove", myFunction, false);
    document.body.onmousemove = parallax_wonderland;
    document.getElementById('wonderparallax').style.display = "block";
//    document.getElementById('wonderparallax').style.visibility = "visible";
  }else{
  //  document.body.onmousemove = parallax_wonderland;
    document.getElementById('wonderparallax').style.display = "none";
//    document.getElementById('wonderparallax').style.visibility = "hidden";
  }
}

function affiche_les_scrolls(visible) {
  if (visible) {
    document.documentElement.style.overflow = 'visible';	 // firefox, chrome
    document.body.scroll = "yes";	// ie only
  }else {
    document.documentElement.style.overflow = 'hidden';	 // firefox, chrome
    document.body.scroll = "no";	// ie only
  }
}

/******************************************************************/
/*********************** UTILS ************************************/
/******************************************************************/

// Update the scene to context client screen
// adapted from http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function updateSceneSize(){
  clientSceneSizeX = 0;
  clientSceneSizeY = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    clientSceneSizeX = window.innerWidth;
    clientSceneSizeY = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    clientSceneSizeX = document.documentElement.clientWidth;
    clientSceneSizeY = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    clientSceneSizeX = document.body.clientWidth;
    clientSceneSizeY = document.body.clientHeight;
  }

	if (clientSceneSizeX > 1800){
		factorScene = 1.1;
	}else if (clientSceneSizeX > 1000){
		factorScene = 0.8;
	}else if (clientSceneSizeX > 800){
		factorScene = 0.6;
	}else if (clientSceneSizeX > 600){
		factorScene = 0.5;
	}

	if (shouldUpdateElementsPosition)
  	updateElementsPosition();
}


function getClientSceneSizeX()
{
	return clientSceneSizeX;
}

function getClientSceneSizeY()
{
	return clientSceneSizeY;
}

function getSceneSizeY()
{
  return document.getElementById("wonderparallax").clientHeight;
}

function getSceneBottom() {
  return getClientSceneSizeY()/2 - getSceneSizeY()/2;
}

function updateElementsPosition()
{
  //update terrier position
  var item = document.getElementById('terrier');
  item.style.bottom = getSceneBottom() + "px";
  item.style.height = (getSceneSizeY()* parseInt(terrier_height)) / 100 + "px";
  //update logooo position
  update_logo_position(false);

  //update alices' position (alphas included)
  var alice_elements = document.getElementsByClassName('alice');
  for (var i = 0; i < alice_elements.length; ++i)
  {
    var item = alice_elements[i];
    var divIndex = item.id.substring(5); // alpha.lenght
    // TODO FROM THE TOP after drag!
    item.style.bottom = getSceneBottom() + (getSceneSizeY()* alice_bank[divIndex].bottom)/100 + "px";
    
    item.style.width =  parseInt(alice_bank[divIndex].width) * factorScene  +"px";
//    item.style.width =  parseInt(alice_bank[divIndex].width) * factorScene * (item.getAttribute("sizefactor")+0.2) +"px";

    //only for alpha div"
    if(item.getAttribute("originalheight"))
    {
  //    console.log(parseInt(item.style.height) * factorScene +"px");
      item.style.height =  parseInt(item.getAttribute("originalheight")) * factorScene +"px";
    }

//      item.style.height =  parseInt(alice_bank[divIndex].height) * factorScene * (item.getAttribute("sizefactor")+0.2) +"px";    

    //TODO if dragged, x pos in pixel (right/left)
 //   if(item.style.right.indexOf("px")
 //     item.style.right = getSceneBottom() + (getSceneSizeY()* alice_bank[divIndex].bottom)/100 + "px";
 //   item.style.
  }

  //update champi' position (alphas included)
  var champi_elements = document.getElementsByClassName('champi');
  for (var i = 0; i < champi_elements.length; ++i)
  {
    var item = champi_elements[i];
    var divIndex = item.id.substring(5); // alpha.lenght
    item.style.bottom = getSceneBottom() + (getSceneSizeY()* champi_bank[divIndex].bottom)/100 + "px";
 
 //   item.style.
  }

}

/*    //update logooo position */
function update_logo_position(pourlescredits) {
  var item = document.getElementById('logooo');
  if(pourlescredits)
  {
    item.style.bottom = "0px";
  }
  else {
    item.style.bottom = getSceneBottom() + "px";
  }
}

/* FROM MOZ DEV */
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

