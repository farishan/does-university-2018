var menuToggled = false;
var sectionCount = 0;
const sections = [
	{
		name: 'home',
		ui_color: 'white'
	},
	{
		name: 'about',
		ui_color: 'black'
	},
	{
		name: 'testimoni',
		ui_color: 'black'
	},
	{
		name: 'merchandise',
		ui_color: 'black'
	},
	{
		name: 'contact',
		ui_color: 'white'
	}
];

function toggleMenu(){
	console.log('toggle menu')

	if(!menuToggled){
		el('content').style.display = 'none'
		el('menu').style.display = 'block'
		el('menuTrigger').style.display = 'none'
		el('close').style.display = 'block'
		el('logoBlack').style.display = 'block'

		if(window.innerWidth < 480){
			el('social').style.display = 'flex'
			el('menuTriggerBlack').style.display = 'none'
		}
	}else{
		el('menu').style.display = 'none'
		el('close').style.display = 'none'
		if(window.location.pathname == '/'){
			el('content').style.display = 'block'
			el('logoBlack').style.display = 'none'
		}else{
			el('content').style.display = 'flex'
		}

		if(window.innerWidth < 480){
			el('menuTriggerBlack').style.display = 'block'
			el('social').style.display = 'none'
		}else{
			el('menuTrigger').style.display = 'block'
		}
	}

	menuToggled = !menuToggled
}

function routerpush(route){
	console.log(route)
	window.location.replace(route);
}

window.onload = function(){
	setCustomNav();
	setHomeSectionUI();
	setSectionNumbersNav();
}

function setCustomNav(){

	
	if(window.innerWidth < 480){
		
		// MOBILE
		var uis = document.querySelectorAll('.ui-black')
		for (var i = 0; i < uis.length; i++) {
			uis[i].style.display = 'block'
		}
		el('logoBlack').style.display = 'none'
		el('social').style.display = 'none'
		el('scrollWhite').style.display = 'block'
		el('scrollBlack').style.display = 'none'
	}else{

		// Desktop
		if(window.location.pathname == '/'){
			if(sections[sectionCount].ui_color == 'white'){
				var uis = document.querySelectorAll('.ui-white')
				for (var i = 0; i < uis.length; i++) {
					uis[i].style.display = 'block'
				}

				var uis2 = document.querySelectorAll('.ui-black')
				for (var i = 0; i < uis2.length; i++) {
					uis2[i].style.display = 'none'
				}
			}else{
				var uis = document.querySelectorAll('.ui-black')
				for (var i = 0; i < uis.length; i++) {
					uis[i].style.display = 'block'
				}

				var uis2 = document.querySelectorAll('.ui-white')
				for (var i = 0; i < uis2.length; i++) {
					uis2[i].style.display = 'none'
				}
			}
		}else{
			var uis = document.querySelectorAll('.ui-black')
			for (var i = 0; i < uis.length; i++) {
				uis[i].style.display = 'block'
			}
		}
	}
}

function setHomeSectionUI(){
	if(sectionCount == 0 && window.location.pathname == '/'){
		el('logo').style.display = 'none'
		el('play').style.display = 'block'
	}else if(window.scrollY < window.innerHeight){
		el('logo').style.display = 'none'
	}else{
		el('play').style.display = 'none'
	}

	if(!menuToggled){
		el('close').style.display = 'none'
	}else{
		el('close').style.display = 'block'
	}
}

function setSectionNumbersNav(){
	if(window.location.pathname == '/'){
		el('sectionNumbers').innerHTML = '';
		if(sectionCount > 0){
			for (var i = 0; i < sections.length; i++) {
				var li = document.createElement('li');
				li.innerHTML = '0' + /*sections[i]*/ i

				if(i == sectionCount){
					li.classList.add('active-'+sections[i].ui_color)
				}else{
					li.className = '';
				}

				el('sectionNumbers').appendChild(li)
			}
		}
	}
}

// Smooth Scroll Listener
document.onmousewheel = function( e ) {
	if(!menuToggled && window.location.pathname == '/'){
		let direction = detectMouseWheelDirection( e )
		if ( direction == 'down' ) {
			// do something, like show the next page
			if(sectionCount < sections.length-1){
				sectionCount++;
				// self.$root.$emit('scrolling', self.sectionCount)
				smoothScroll(sections[sectionCount].name, ()=>{
					// console.log('ok')
					setCustomNav();
					setHomeSectionUI();
					setSectionNumbersNav();
				})
			}
		} else if ( direction == 'up' ) {
			// do something, like show the previous page
			if(sectionCount > 0){
				sectionCount--;
				// self.$root.$emit('scrolling', self.sectionCount)
				smoothScroll(sections[sectionCount].name, ()=>{
					// console.log('ok')
					setCustomNav();
					setHomeSectionUI();
					setSectionNumbersNav();
				})
			}
		} else {
			// this means the direction of the mouse wheel could not be determined
		}
	}
};

// Smooth Scroll Module
function detectMouseWheelDirection( e ) {
	var delta = null,
	direction = false
	;
	if ( !e ) { // if the event is not provided, we get it from the window object
		e = window.event;
	}
	if ( e.wheelDelta ) { // will work in most cases
		delta = e.wheelDelta / 60;
	} else if ( e.detail ) { // fallback for Firefox
		delta = -e.detail / 2;
	}
	if ( delta !== null ) {
		direction = delta > 0 ? 'up' : 'down';
	}

	return direction;
}
// if ( window.addEventListener ) {
//     document.addEventListener( 'DOMMouseScroll', function( e ) {
//         handleMouseWheelDirection( detectMouseWheelDirection( e ) );
//     });
// }

function currentYPosition() {
	// Firefox, Chrome, Opera, Safari
	if (self.pageYOffset) return self.pageYOffset;
	// Internet Explorer 6 - standards mode
	if (document.documentElement && document.documentElement.scrollTop)
		return document.documentElement.scrollTop;
	// Internet Explorer 6, 7 and 8
	if (document.body.scrollTop) return document.body.scrollTop;
	return 0;
}

function elmYPosition(eID) {
	var elm = document.getElementById(eID);
	var y = elm.offsetTop;
	var node = elm;
	while (node.offsetParent && node.offsetParent != document.body) {
		node = node.offsetParent;
		y += node.offsetTop;
	} return y;
}

function smoothScroll(eID, callback) {
	var startY = currentYPosition();
	var stopY = elmYPosition(eID);
	var distance = stopY > startY ? stopY - startY : startY - stopY;
	if (distance < 100) {
		scrollTo(0, stopY); 
		callback();
	}else{
		var speed = Math.round(distance / 100);
		if (speed >= 20) speed = 20;
		var step = Math.round(distance / 25);
		var leapY = stopY > startY ? startY + step : startY - step;
		var timer = 0;
		if (stopY > startY) {
			for ( var i=startY; i<stopY; i+=step ) {
				setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
				leapY += step; if (leapY > stopY) leapY = stopY; timer++;
			} 
			callback();
		}else{
			for ( var j=startY; j>stopY; j-=step ) {
				setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
				leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
			}
			callback();
		}
	}
}

// Modules
function el(id){
	return document.getElementById(id)
}