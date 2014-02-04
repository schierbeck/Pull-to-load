$(document).ready(function($){
	
	var container = $('#container'); // The container/wrapper selector
	var containerHeight = container.height(); // Height of container

	container.swipe( { // Let TouchSwipe jQuery plugin do the magic!
        swipeStatus:function(event, phase, direction, distance) {
        
        	$('#refresh-icon').css({ background: '#999', backgroundImage: 'none' });
        
			var position = container.position();

			//! IF CONTAINER TOP HAS BEEN PULLED 80 PIXELS OR MORE
			if( position.top >= 80 ){ 

				$('#refresh-icon').css({ display: 'block', backgroundImage: 'transparent' }); // Shows a feedback-icon to the user that something is about to happend!
				
			//! IF CONTAINER TOP ISNT PULLED FOR 80 PIXELS OR MORE
			} else if ( position.top < 80 ){
				$('#refresh-icon').css({ display: 'none' }); // If less than 80 pixels had been pulled, display no feedback-icon
			}
			
			//! WHEN PULLING
			if (phase=="move" && direction == 'down') {
				container.css({ top: distance + 'px' }); // Ok, this might not be the best for prestanda, but it seems to work and it works in all browsers Ive tried so far
            //! WHEN STOPPED PULLING
            }else if (phase=="end"){
				pullUp();
			}
		},
		threshold: containerHeight
	});
	
	//! IF MOUSE/TOUCH LEAVES AREA (OUTSIDE OF PHONESCREEN/BROWSER WINDOW) PULL IT UP!
	container.mouseleave(function(){
		pullUp();
		container.swipe("disable");
		container.swipe("enable");
	});
	
	function pullUp() {
		var position = container.position();

		if( position.top > 80 ){
			
			$.get('message.html', function(data) {
				$('#refresh-icon').css({ background: 'none', backgroundImage: 'url(pacman.gif)' });
				container.animate({ top: '80px' }, 200)
				.delay(1000).animate({ 
					top: '0px' 
				},200, function() {
					container.append(data);
					containerHeight = container.height();
					$('#refresh-icon').css({ display: 'none' });
					
				});
			});

		} else {
			container.animate({ top: '0px' }, 200);	
		}
	}
	
	// If smartphone do touch, if desktop do mouse
	var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(Windows Phone)|(iemobile)/i);
	
	function clickStart() {	
		if(isMobile != null) {
			return 'touchstart';	
		} else {
			return 'mousedown';
		}
	}
	function clickEnd() {	
		if(isMobile != null) {
			return 'touchend';
		} else {
			return 'mouseup';
		}
	}
	
});