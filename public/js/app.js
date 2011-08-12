
$(document).ready(function() {

  $('.ayuda').hide();

  $('#btn_generar_cod').click(function(){
	if ($('#tu_pagina').val() == "http://www.tupagina.com"){
	  alert("Necesitamos la direccion de tu pagina web!");
	}else{
	  generate_code($('#tu_pagina').val());
	  $('.code_generated').slideDown();	
	}
  }); 

  //actualiza script
  $('#tu_pagina').keyup(function(){
    generate_code($(this).val());
  }); 

});

function generate_code(valor){
	codigo = '<p>&#60;script&#62;</p>';
	codigo += '<p>Esturistico = new Object();</p>';
	codigo += '<p>Esturistico.tag = "' + get_tag(valor) + '"&#59; </p>';
	codigo += '<p>Esturistico.redirect = "' + get_redirect(valor) + '"&#59; </p>';	
	codigo += '<p>&#60;/script&#62;</p>';
	codigo += '<p>&#60;script src="http://www.esturisti.co/javascripts/cortina_external.js" &#62;</p>';
	$('.pega_code').html(codigo);
}

function get_tag(url){
	url = url.split('.');
	return url[url.length - 2];  //devuelve el valor antes del .com, .net. etc...
}

function get_redirect(url){
	return url.replace("http://", "").replace("www.","").replace(" ", ""); //remuevo dato inecesario del url
}
