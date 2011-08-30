// Global constants:
var ANCHO        = 1024;
var ALTO         = 768;
var REFRESH_RATE = 30;
var GAME_READY = false
var avion = new Array();

//Constants for the gameplay
var INTERVAL_MOV_BG = 50; //ms
var VEL_PLANTAS = 8;     //px 
var VEL_NUBES = 1;        //px
var VEL_PISO = 7;         //px
var ACELERACION = 0;
var TIEMPO_ACELERACION = 400;
var ACUMULADOR_ACELERACION = 0;  
var ACELERACION_MAXIMA = 18;    


// Gloabl animation holder
var animacionBackground = new Array();

//Global puntos
var puntos = 0;

$(function(){
	
    // Lista de imagenes:    
    var fondo = new $.gameQuery.Animation({
        imageURL: "/images/riviera_experience/background/background.jpg"});
    var header= new $.gameQuery.Animation({
	    imageURL: "/images/riviera_experience/background/header.png"});
	var footer= new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/background/footer.png"});	
    var piso= new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/background/piso.png"});	
	var plantas= new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/background/plantas.png"});
	var nubes= new $.gameQuery.Animation({
	    imageURL: "/images/riviera_experience/background/nubes.png"});
	var pasaporte= new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/background/pasaporte.png"});
	var avion_normal= new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/avion/avion.png"});	
	var avion_ruedas= new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/avion/avion_ruedas.png"});
	var avion_ruedas_sombra= new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/avion/avion_ruedas_sombra.png"});


    //ANIMACIONES
    avion["despegando"] = new $.gameQuery.Animation({
        imageURL: "/images/riviera_experience/avion/avion_despegue.png", numberOfFrame: 16, delta: 220, rate: 120, type: $.gameQuery.ANIMATION_VERTICAL});
	avion["despegue_stand"] = new $.gameQuery.Animation({
	    imageURL: "/images/riviera_experience/avion/avion_despegue_stand.png"});
	avion["guarda_ruedas"] = new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/avion/avion_guarda_ruedas.png", numberOfFrame: 6, delta: 220, rate: 200, type: $.gameQuery.ANIMATION_VERTICAL});
	avion["aire_sin_ruedas"] = new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/avion/avion_despegue_sin_ruedas.png"});
	avion["avion_aire_derecho"] = new $.gameQuery.Animation({
		imageURL: "/images/riviera_experience/avion/avion_aire_derecho.png"});
	avion["avion_aire_enderezar"] = new $.gameQuery.Animation({
	    imageURL: "/images/riviera_experience/avion/avion_aire_enderezar.png", numberOfFrame: 16, delta: 220, rate: 120, type: $.gameQuery.ANIMATION_VERTICAL});


    // Initialize the game:
    $("#juego").playground({
        height: ALTO, 
        width: ANCHO, 
        keyTracker: true});

    $("#juego").css("border", "1px solid");

    // Initialize the background
    $.playground()
        .addGroup("background",   {width: ANCHO, 
                                   height: ALTO})
        .addSprite("fondo", {animation: fondo, 
                                   width: ANCHO, 
                                   height: ALTO})
		.addSprite("fondo2", {animation: fondo, 
						           width: ANCHO, 
						           height: ALTO,
						           posx: ANCHO, posy: 0})
		.addSprite("plantas", {animation: plantas, 
								   width: ANCHO, 
								   height: 43,
								   posx: 0, posy: 587})
		.addSprite("plantas2", {animation: plantas, 
								   width: ANCHO, 
								   height: 43,
								   posx: ANCHO, posy: 587})				
		.addSprite("piso", {animation: piso, 
								   width: ANCHO, 
								   height: 189,
								   posx: 0, posy: 592})
		.addSprite("piso2", {animation: piso, 
								   width: ANCHO, 
								   height: 189,
								   posx: ANCHO, posy: 592})
		.addSprite("footer", {animation: footer, 
						           width: ANCHO, 
						           height: 65,
						           posx: 0, posy: 833})
		.addSprite("pasaporte", {animation: pasaporte, 
								   width: 166, 
								   height: 126,
								   posx: -166, posy: 636})
		.addSprite("nubes", {animation: nubes, 
								   width: ANCHO, 
								   height: 501,
								   posx: 0, posy: 0})
		.addSprite("nubes2", {animation: nubes, 
								   width: ANCHO, 
								   height: 501,
								   posx: ANCHO, posy: 0})
		.addSprite("header", {animation: header, 
						            width: ANCHO, 
						            height: 104,
						            posx: 0, posy: -104}).end()

		
   $.playground()
		.addGroup("avion",   {width: ANCHO, height: ALTO})
		.addSprite("avion_despegue", {animation: avion_ruedas_sombra, 
							               width: 479, 
							               height: 220,
							               posx: -500, posy: 525}).end()

   //loading bar
   $().setLoadBar("loadingBar", 365, function(percent){
	 if (percent == 100){
	 }  
   });


    //initialize game
    $(document).ready(function(){
	  setTimeout(function(){
      $.playground().startGame(function(){
	
	     posicionar_elementos();
	
	     setTimeout(function(){
		   	$('#header').animate({
			  top: '0px'
			}, 800);
			
		   	$('#footer').animate({
			  top: '703px'
			}, 800);

 
		   	$('#pasaporte').animate({
			  left: '10px'
			}, 800, function(){
				start_animation("despegue_avion");
			});

	     },200)
      });
	 }, 2000);
    });

	$('#plantas, #plantas2').each(function(){
	  if (parseInt($(this).css('left')) <= (ANCHO * -1)){
		$(this).css('left', ANCHO);
	  }
	});
	
    $(document).keydown(function(e){
	  if(GAME_READY == true ){
        mover_avion(e.keyCode);
      }
    });	

//fin
});



//para agrupar animaciones principales
function start_animation(animation_name){

	switch(animation_name){
	  case 'despegue_avion':
	    //MOVIMIENTO DEL AVION
	   	$('#avion_despegue').animate({
		  left: '150px'
		}, 1300, 'linear', function(){
		  //iniciar movimiento del bg
		  var bgmov = setInterval(function(){
			//movimiento de plantas
            var newPos = (parseInt($("#plantas").css("left")) - (VEL_PLANTAS + ACELERACION) - ANCHO) % (-2 * ANCHO) + ANCHO;
            $("#plantas").css("left", newPos);
            newPos = (parseInt($("#plantas2").css("left")) - (VEL_PLANTAS + ACELERACION) - ANCHO) % (-2 * ANCHO) + ANCHO;
            $("#plantas2").css("left", newPos);

            //movimiento de nubes
            var newPos = (parseInt($("#nubes").css("left")) - (VEL_NUBES + ACELERACION) - ANCHO) % (-2 * ANCHO) + ANCHO;
            $("#nubes").css("left", newPos);
            newPos = (parseInt($("#nubes2").css("left")) - (VEL_NUBES + ACELERACION) - ANCHO) % (-2 * ANCHO) + ANCHO;
            $("#nubes2").css("left", newPos);

            //movimiento del piso
            var newPos = (parseInt($("#piso").css("left")) - (VEL_PISO + ACELERACION) - ANCHO) % (-2 * ANCHO) + ANCHO;
            $("#piso").css("left", newPos);
            newPos = (parseInt($("#piso2").css("left")) - (VEL_PISO + ACELERACION) - ANCHO) % (-2 * ANCHO) + ANCHO;
            $("#piso2").css("left", newPos);

            ACUMULADOR_ACELERACION += INTERVAL_MOV_BG;
            if(ACUMULADOR_ACELERACION == TIEMPO_ACELERACION && ACELERACION != ACELERACION_MAXIMA){
	          ACUMULADOR_ACELERACION = 0;
	          ACELERACION ++;
	          if(ACELERACION == ACELERACION_MAXIMA){
		        $("#avion_despegue").setAnimation(avion["despegando"]);
		        setTimeout(function(){
			      $("#avion_despegue").setAnimation(avion["despegue_stand"]);
			      $("#avion_despegue").animate({
				    top: '225px'
			      }, 5000, 'linear', function(){					
				    $("#piso, #piso2, #plantas, #plantas2").animate({
					  top: '1000px'
				    }, 4000, 'linear', function(){
					  $("#avion_despegue").setAnimation(avion["guarda_ruedas"]);
					  setTimeout(function(){
					    $("#avion_despegue").setAnimation(avion["avion_aire_enderezar"]);
					    setTimeout(function(){
						  $("#avion_despegue").setAnimation(avion["avion_aire_derecho"]);
						  GAME_READY = true;  //ACTIVO EL JUEGO
					    },1920)
					  }, 1200)
				    });	
				 
			      });
	 	        },1920);
	          }
            }
 
          }, INTERVAL_MOV_BG);
		});
	  break;
	}
	
}

function posicionar_elementos(){
  $('#pasaporte').css('z-index', '3');
  $('#avion_despegue').css('z-index', '2');
}

function mover_avion(key_number){
    switch(key_number){
      case 38: //this is up! 
        var newPos = (parseInt($("#avion_despegue").css("top")) - 10 - ALTO) % (-2 * ALTO) + ALTO;
        if ( newPos > 107 && newPos < 563 ) {
		   	$('#avion_despegue').animate({
			  top: newPos+'px'
			}, 50, 'linear');
        }
      break
      case 40: //this is down! 
        var newPos = (parseInt($("#avion_despegue").css("top")) + 10 - ALTO) % (-2 * ALTO) + ALTO;
        if ( newPos > 107 && newPos < 563 ) {
		   	$('#avion_despegue').animate({
			  top: newPos+'px'
			}, 50, 'linear');
        }
      break
      }
}