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
//TODO : fix alices size apres changement resolution (ctrl-f5)
//TODO Alice sound support (onhover)

//PRIO 2
//document.getElementById("my-link").addEventListener("click", myFunction, false);
//TODO ajout class autoresizable pour la fonction mettre a jour position
//TODO parallax : pourcentage base sur taille ecran !!!
//TODO touch screen support for alice
//TODO gyroscope
//TODO Restrict alice drag in scene size
//TODO restrict lapinou pos in scene size

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

var bouche_random_timerid;

var zIndexAlphaLapinou = 3000;
var zIndexAlphaAlice = 2000;
var zIndexAlphaChampi = 1000;

// hophop ya un debut a tout!
document.onreadystatechange = function () {
  if (document.readyState == "complete")
  {
	document.addEventListener("soundBankLoaded", function (e){
  		// e.target matches elem
	 	//prépa pour la scene suivante.
		document.getElementById('bouchecentre').onclick = affiche_wonderlands;
		//on lance la boucle des bouches
		bouche_random();
	}, false);
  }
  if (document.readyState == "interactive")
  {
	updateSceneSize();
	window.scrollTo( 0, 0 );
   affiche_les_scrolls(false);
   window.onresize=function(){updateSceneSize();};
   //preload images
   setTimeout("preloadImages()",100);
   }
}

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

  var bouche_elements = document.getElementsByClassName('boucheimage');

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

var poemeencours = -1;
function lire_le_poeme(lirelepoeme) {

  if(lirelepoeme) {
    poemeencours = getRandomIntInclusive(0, 2);
    var strartindex = getRandomIntInclusive(0, 20);
    playSound(poemeencours, strartindex);
  }
  else{
    if(poemeencours != -1){
      stopSound(poemeencours);
      poemeencours = -1;
    }
  }

}

function affiche_les_bouches() {
  document.body.style.backgroundColor = "white";
  affiche_le_decors(false);
  document.getElementById('logooo').style.visibility = "hidden";

  //on affiche et demarre les bouches
  var item = document.getElementById('bouchecentre');
  item.style.display = "inline-block";

  bouche_random();
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

  item = document.getElementById('terrier');
  item.style.bottom = getSceneBottom() + "px";
  item.style.height = (getSceneSizeY()* parseInt(terrier_height)) / 100 + "px";
  item.onclick = crazyLapinou;
  // on appelle parallax_wonderland une premiere fois
  //pour eviter les glitch (de la position fixe des css)
  parallax_wonderland(e);

  //on affiche les alices
  affiche_les_alices();
  affiche_les_champis();

  //on affiche le logooo
  update_logo_position();
  document.getElementById('logooo').style.visibility = "visible";
  document.getElementById('wonderparallax').style.visibility = "visible";

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
{name:"alice", url:'./res/alice_bilel.gif', zindex:110, bottom:"20", top:"auto",           right:"32%", left:"auto", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_barakaISSIHAKA.gif', zindex:80, bottom:"38", top:"auto",   right:"33%", left:"auto", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_roxane.gif', zindex:120, bottom:"2", top:"auto",           right:"auto", left:"42%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_KENGYBORGESRODRIGUES.gif', zindex:100, bottom:"8", top:"auto", right:"20%", left:"auto", width: "80", height:"auto" },
{name:"alice", url:'./res/alice_anissa.gif', zindex:120, bottom:"15", top:"auto",          right:"auto", left:"38%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_shahynesse.gif', zindex:100, bottom:"33", top:"auto",          right:"auto", left:"40%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_rachel.gif', zindex:100, bottom:"25", top:"auto",          right:"auto", left:"33%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_hicham.gif', zindex:180, bottom:"17", top:"auto",          right:"auto", left:"6%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_denis.gif', zindex:120, bottom:"30", top:"auto",          right:"auto", left:"67%", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_xd.gif', zindex:120, bottom:"30", top:"auto",  				right:"37%", left:"auto", width: "90", height:"auto" },
{name:"alice", url:'./res/alice_COLOMBIKYLLIAN.gif', zindex:120, bottom:"23", top:"auto",  right:"auto", left:"10%", width: "150", height:"auto" }
];

function affiche_les_alices()
{	
  for (var i = 0; i < alice_bank.length; ++i)
  {
	  var newElemAlpha= document.createElement("div");
    newElemAlpha.setAttribute("class", "draggable alice");

    newElemAlpha.style.bottom = getSceneBottom() + (getSceneSizeY()* alice_bank[i].bottom) / 100 + "px";
    newElemAlpha.style.top = alice_bank[i].top;
    newElemAlpha.style.right = alice_bank[i].right;
    newElemAlpha.style.left = alice_bank[i].left;
    newElemAlpha.style.width = alice_bank[i].width*factorScene + "px";
    //newElemAlpha.style.height : see after <img> creation
    newElemAlpha.style.zIndex = zIndexAlphaAlice;
    newElemAlpha.style.backgroundPosition = "0,0";
    newElemAlpha.id = "alpha" + i;

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
    newElemDiv.style.width = alice_bank[i].width*factorScene + "px";
    newElemDiv.style.height = alice_bank[i].height;
    newElemDiv.style.zIndex = alice_bank[i].zindex;
    newElemDiv.id = "alice" + i;
    newElemDiv.setAttribute("sizefactor", sizefactor);

    //create an real js Image, in place of 'document.createElement("img")' + preload img to fix unknown height 
    //that was causing functionnalies (drag/click/... on elements ) malfunctions (and a needed reload)
    var newElemImg = new Image();
    newElemImg.src = alice_bank[i].url;
    newElemDiv.appendChild(newElemImg);

    newElemAlpha.style.height = (alice_bank[i].width*factorScene)/parseInt(newElemImg.width) * parseInt(newElemImg.height) + "px";
    newElemAlpha.setAttribute("originalwidth", alice_bank[i].width);
    newElemAlpha.setAttribute("originalheight", parseInt(newElemAlpha.style.height));

    var wonderParaElem = document.getElementById("wonderparallax");
    wonderParaElem.appendChild(newElemAlpha);
    wonderParaElem.appendChild(newElemDiv);

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
					this.style.height =  item.firstChild.height  +"px";
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
					  if (parseFloat(this.getAttribute("sizefactor")) > 0.5 ) {
					    zindexbase = 120;
					  }
					  document.getElementById("alice"+divIndex).style.zIndex = getRandomIntInclusive(zindexbase,zindexbase+20);
					}
				;}
		});

  }
}

var champi_bank = [
/*{name:"champi", url:'./res/xxx.gif', zindex:100, bottom:"%", top:"auto",  right:"%", left:"auto", width: "px", height:"auto" },*/
{name:"champi", url:'./res/mushroom_KENGY.gif',   zindex:100, bottom:"10", top:"auto",  right:"30%",  left:"auto", width: "100", height:"auto" },
{name:"champi", url:'./res/mushroom_KENGY02.gif', zindex:501, bottom:"8",  top:"auto",  right:"auto", left:"17%", width: "240", height:"auto" },
{name:"champi", url:'./res/mushroom_vrai.gif',    zindex:100, bottom:"22", top:"auto",  right:"auto", left:"5%", width: "100", height:"auto" },
{name:"champi", url:'./res/mushroom_2.gif',       zindex:100, bottom:"18", top:"auto",  right:"5%", left:"auto", width: "100", height:"auto" },
{name:"champi", url:'./res/mushroom.gif',         zindex:100, bottom:"32", top:"auto",  right:"auto", left:"50%", width: "100", height:"auto" }
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
    newElemAlpha.style.width = champi_bank[i].width * factorScene  +"px";
    //newElemAlpha.style.height : see after <img> creation
    newElemAlpha.style.zIndex = zIndexAlphaChampi;
    newElemAlpha.style.backgroundPosition = "0,0";
    newElemAlpha.id = "alpha" + i;

    var newElemDiv = document.createElement("div");
    newElemDiv.setAttribute("class", "champi");
    newElemDiv.style.bottom = newElemAlpha.style.bottom;
    newElemDiv.style.top = champi_bank[i].top;
    newElemDiv.style.right = champi_bank[i].right;
    newElemDiv.style.left = champi_bank[i].left;
    newElemDiv.style.width = champi_bank[i].width * factorScene  +"px";
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
{name:"lapinou", url:'./res/lapin_iman2.gif', zindex:100, bottom:"3%", top:"auto",   right:"auto", left:"10%", width: "90px", height:"auto" },
{name:"lapinou", url:'./res/lapin_ocean.gif', zindex:100, bottom:"2%", top:"auto",           right:"auto", left:"42%", width: "90px", height:"auto" }
];


function crazyLapinou()
{
  for (var i = 0; i < lapinou_bank.length; ++i)
  {
    var newElemDiv = document.createElement("div");
    newElemDiv.setAttribute("class", "lapinou");
    newElemDiv.id = "lapinou" + i;
    newElemDiv.style.bottom =  getRandomIntInclusive(0,90) + "%";
    newElemDiv.style.right = getRandomIntInclusive(0,90) + "%";
    newElemDiv.style.width = lapinou_bank[i].width;
    newElemDiv.style.height = lapinou_bank[i].height;
    newElemDiv.style.zIndex = lapinou_bank[i].zindex;

    var newElemImg = new Image();
    newElemImg.src = lapinou_bank[i].url;
    newElemDiv.appendChild(newElemImg);

    var newElemAlpha = document.createElement("div");
    newElemAlpha.setAttribute("class", "lapinoualpha");
    newElemAlpha.id = "alphalapinou" + i;
    newElemAlpha.style.bottom = newElemDiv.style.bottom;
    newElemAlpha.style.right = newElemDiv.style.right;
    newElemAlpha.style.width = newElemImg.width+"px";
    newElemAlpha.style.height = newElemImg.height+"px";
    newElemAlpha.style.zIndex = zIndexAlphaLapinou;
    newElemAlpha.onclick = affiche_les_bouches;

    var wonderParaElem = document.getElementById("wonderparallax");
    wonderParaElem.appendChild(newElemDiv);
    wonderParaElem.appendChild(newElemAlpha);
  }

  var delayInSeconds = 1;                           //delay in seconds
  var lapinou_elements = document.getElementsByClassName('lapinou');

  var lapinou_random_timerid = setInterval(function()  //interval changer
  {
    for (var i = 0; i < lapinou_elements.length; ++i)
    {
      var item = lapinou_elements[i];
      var divIndex = item.id.substring(7); // lapinou.lenght
      var itemAlpha = document.getElementById("alphalapinou" + divIndex);

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
      itemAlpha.style.bottom = item.style.bottom;
      itemAlpha.style.right = item.style.right;
    }
  }, delayInSeconds * 1000);

}

var perso_bank = [
/*{name:"lapinou", url:'./res/xxx.gif', zindex:100, bottom:"%", top:"auto",  right:"%", left:"auto", width: "px", height:"auto" },*/
{name:"chat", url:'./res/chat_katherynle.gif', zindex:100, bottom:"15%", top:"auto",  right:"40%", left:"auto", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_eyes.gif', zindex:100, bottom:"3%", top:"auto",      right:"10%", left:"auto", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_ocean.gif', zindex:100, bottom:"20%", top:"auto",  right:"auto", left:"50%", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_alyzea.gif', zindex:100, bottom:"20%", top:"auto",           right:"30%", left:"auto", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_hicham2.gif', zindex:100, bottom:"20%", top:"auto",           right:"30%", left:"auto", width: "50px", height:"auto" },
{name:"chat", url:'./res/chat_hicham.gif', zindex:100, bottom:"20%", top:"auto",           right:"30%", left:"auto", width: "50px", height:"auto" },
{name:"peintre", url:'./res/bilel_peintre.gif', zindex:100, bottom:"7%", top:"auto",           right:"auto", left:"77%", width: "50px", height:"auto" },
{name:"caterpillar", url:'./res/caterpilar_darsi.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"caterpillar", url:'./res/alyzea_caterpillar.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"grenouille", url:'./res/gagik.Hakobyan.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"twins", url:'./res/katheryn_twins.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"rose", url:'./res/katheryn_rose.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"chapeliere", url:'./res/chapelier_shahynesse.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"smiley", url:'./res/smiley_ramy.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"reine", url:'./res/reine_rachel.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"crapaud", url:'./res/crapaud.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"caterpillar", url:'./res/caterpillar_amine.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" },
{name:"chapeau", url:'./res/katheryn_hat.gif', zindex:100, bottom:"10%", top:"auto",           right:"62%", left:"auto", width: "50px", height:"auto" }
];


function affichePersoAuChampi(event) {

  var perso_nb = 3;/* getRandomIntInclusive(0, perso_bank.length); */
  for (var i = 0; i < perso_nb; ++i)
  {
    var perso_index = getRandomIntInclusive(0, perso_bank.length-1);
    var newElemDiv = document.createElement("div");
    newElemDiv.setAttribute("class", "allperso");

    newElemDiv.style.width = perso_bank[perso_index].width;
    newElemDiv.style.height = perso_bank[perso_index].height;
    newElemDiv.style.zIndex = perso_bank[perso_index].zindex;
    newElemDiv.id = "perso" + perso_index;

    var newElemImg = new Image();
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
  creditDisplayed = !creditDisplayed;
  window.scrollTo( 0, 0 );
  if(!creditDisplayed)
  {
    //on cache le credits
    var item = document.getElementById('creditpage');
    item.style.display = "none";
    affiche_les_scrolls(false);
    affiche_le_decors(true);
    //to fix size after display none
    updateSceneSize();

  }else {
    affiche_le_decors(false);
    affiche_les_scrolls(true);
    //on affiche le credits
    var item = document.getElementById('creditpage');
    item.style.display = "inline";
  }
  update_logo_position();
}

function affiche_le_decors(visible) {
  if (visible) {
    document.body.onmousemove = parallax_wonderland;
    document.getElementById('wonderparallax').style.display = "block";
  }else{
    document.getElementById('wonderparallax').style.display = "none";
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
  update_logo_position();

  //update alices' position (alphas included)
  var alice_elements = document.getElementsByClassName('alice');
  for (var i = 0; i < alice_elements.length; ++i)
  {
    var item = alice_elements[i];
    var divIndex = item.id.substring(5); // alpha.lenght
    // TODO FROM THE TOP after drag!
    item.style.bottom = getSceneBottom() + (getSceneSizeY()* alice_bank[divIndex].bottom)/100 + "px";

    if(item.firstChild)
    {
      item.style.width = item.firstChild.width;
    }

    //only for alpha div"
    if(item.getAttribute("originalheight"))
    {
    	item.style.height = document.getElementById("alice"+divIndex).firstChild.height + "px";
    }
  }

  //update champi' position (alphas included)
  var champi_elements = document.getElementsByClassName('champi');
  for (var i = 0; i < champi_elements.length; ++i)
  {
    var item = champi_elements[i];
    var divIndex = item.id.substring(5); // alpha.lenght
    item.style.bottom = getSceneBottom() + (getSceneSizeY()* champi_bank[divIndex].bottom)/100 + "px";
    item.style.width =  champi_bank[divIndex].width * factorScene  +"px";
  }
}

/*    //update logooo position */
function update_logo_position() {

  var item = document.getElementById('logooo');
  if(creditDisplayed)
  {
    item.style.bottom = "0px";
  }
  else {
    item.style.bottom = getSceneBottom() + "px";
  }
}

function preloadImages(){
	//preload img to get ride of "no defined heigth" error that use to break the draggable.
	preloadAlices();
	preloadChampi();
	preloadLapinou();
}

function preloadAlices() {
  for (var i = 0; i < alice_bank.length; ++i)
  {
    var tmpImg = new Image();
    tmpImg.src = alice_bank[i].url;
  }
}

function preloadChampi() {
  for (var i = 0; i < champi_bank.length; ++i)
  {
    var tmpImg = new Image();
    tmpImg.src = champi_bank[i].url;
  }
}

function preloadLapinou() {
  for (var i = 0; i < lapinou_bank.length; ++i)
  {
    var tmpImp = new Image();
    tmpImp.src = lapinou_bank[i].url;
  }
}

/* FROM MOZ DEV */
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

