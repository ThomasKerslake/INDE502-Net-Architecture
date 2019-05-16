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
//Open
function openSideMenu() {
	document.getElementById('menu').style.width = '100px';
	document.getElementById('nav-container').style.width = '100px';
}
//close
function closeSideMenu() {
	document.getElementById('menu').style.width = '0';
	document.getElementById('nav-container').style.width = '0';
}

//Using Interact.js to move individual elements
interact('.resize-drag').draggable({
	inertia: true,
	// Stopping the SVG's from moving out of they parent element
	modifiers: [
		interact.modifiers.restrict({
			restriction: 'parent',
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		})
	],
	autoScroll: true,

	onmove: window.dragMoveListener
});

interact('#svg_2').on('hold', function(event) {
	var selectedTarget = event.currentTarget;
	var expAudio = document.getElementById('expAudio');
	expAudio.play();
	setTimeout(function() {
		var popAudio = document.getElementById('popAudio');
		popAudio.play();
	}, 1000);
	selectedTarget.classList.toggle('large');
	event.preventDefault();
});

interact('.resize-drag').on('hold', function(event) {
	setTimeout(function() {
		var selectedTarget2 = event.currentTarget;
		selectedTarget2.innerHTML = '';
	}, 2000);
});

function dragMoveListener(event) {
	var target = event.target,
		// Store the moved position any targeted attribute
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	// Move the the element to the new position
	target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion of each targeted SVG
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

// Position bug work around
function moveLoad() {
	document.getElementById('111').style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
	document.getElementById('222').style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
	document.getElementById('333').style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
	document.getElementById('444').style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
}
