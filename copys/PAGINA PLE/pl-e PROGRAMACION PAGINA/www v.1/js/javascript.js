/***************************
DEVELOPED BY: Ryan Stemkoski
*****************************/

$(document).ready(function() {
	 
	//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accordionButton').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton').removeClass('on','onAudio');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContentAudio').slideUp('normal');
	 	$('.accordionContentVideo').slideUp('normal');
	 	$('.accordionContentIluminacion').slideUp('normal');   		
	 	$('.accordionContentMobiliario').slideUp('normal');   		
	 	$('.accordionContentCatering').slideUp('normal');   		
		
		  
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
				  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 } 
		  
	 });
	  
/*************************
	CLOSES ALL S ON PAGE LOAD
******************************/	
	$('.accordionContentAudio').hide();
	$('.accordionContentVideo').hide();
	$('.accordionContentIluminacion').hide();
	$('.accordionContentMobiliario').hide();
	$('.accordionContentCatering').hide();			
});
