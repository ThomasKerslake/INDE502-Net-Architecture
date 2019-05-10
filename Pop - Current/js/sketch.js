//Overlay timeout function
setTimeout(function() {
	$('.overlay').fadeOut();
}, 2200);

//Background movement
$('body').mousemove(function(e) {
	var moveX = e.pageX * -1 / 30;
	var moveY = e.pageY * -1 / 30;
	$(this).css('background-position', moveX + 'px ' + moveY + 'px');
});

//Side menu / Nav control
function openSideMenu() {
	document.getElementById('menu').style.width = '100px';
	document.getElementById('nav-container').style.width = '100px';
}

function closeSideMenu() {
	document.getElementById('menu').style.width = '0';
	document.getElementById('nav-container').style.width = '0';
}

//Dragging notes
dragElement(document.getElementById('popNote'));

function dragElement(popElmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById(popElmnt.id + 'header')) {
		// if present, the header is where you move the DIV from:
		document.getElementById(popElmnt.id + 'header').onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		popElmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		popElmnt.style.top = popElmnt.offsetTop - pos2 + 'px';
		popElmnt.style.left = popElmnt.offsetLeft - pos1 + 'px';
		if ((popElmnt.style.top = -102)) {
			popElmnt.style.top - 20;
		}
		console.log(pos3, pos4);
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
