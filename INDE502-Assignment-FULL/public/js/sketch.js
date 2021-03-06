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
interact('.dragSVG').draggable({
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

//Expand and deletion functionality
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

interact('.dragSVG').on('hold', function(event) {
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

//Note ('blob') creation
function addNewNote() {
	//SVG paths
	var svgArray = [
		'd="m403.445058,11.3c41.2,8.7 78.3,41.7 91.2,82.2c12.9,40.4 1.7,88.3 -6.8,135.5c-8.5,47.2 -14.2,93.8 -36.5,134.2c-22.2,40.5 -61,74.9 -107.6,93.7c-46.6,18.8 -101,22 -139.9,-1.6c-38.8,-23.5 -62,-73.8 -93.7,-114.4c-31.6,-40.6 -71.8,-71.6 -89.1,-113.2c-17.3,-41.6 -11.8,-93.7 13,-132.5c24.8,-38.8 68.9,-64.2 111.6,-72.2c42.8,-8 84.3,1.5 127.7,-1.6c43.4,-3.1 88.8,-18.7 130.1,-10.1z"',
		'd="m304.016127,25.6c21.4,20.5 26.1,60.2 34.8,93.8c8.7,33.5 21.4,61 12.3,81.4c-9.2,20.3 -40.2,33.5 -58.2,62.6c-18,29.2 -23,74.2 -40.7,82.5c-17.8,8.3 -48.3,-20.2 -80.8,-33.6c-32.6,-13.3 -67.1,-11.5 -102.8,-24.5c-35.7,-12.9 -72.6,-40.6 -65.8,-67.7c6.7,-27.1 57,-53.6 82.1,-84.6c25.2,-31.1 25,-66.6 41.1,-89.6c16.1,-23 48.3,-33.4 83.5,-37.9c35.1,-4.5 73.2,-3 94.5,17.6z"',
		'd="m313.6,69.7c25.2,37.9 33.8,79.6 48.2,135.7c14.3,56.1 34.5,126.5 9.3,148c-25.2,21.5 -95.6,-5.9 -165.6,-6.4c-70,-0.5 -139.6,26.1 -174.4,4.6c-34.8,-21.5 -35,-91.1 -16.3,-142c18.6,-50.9 56,-83.2 90.8,-121c34.8,-37.8 67.1,-81.2 104.1,-85.9c37,-4.8 78.7,29.2 103.9,67z"',
		'd="m252.3,87.6c28.9,18 69.2,19 95.5,37.8c26.3,18.8 38.7,55.4 33.6,89.3c-5,34 -27.4,65.4 -50.9,99.8c-23.6,34.4 -48.2,72 -84.6,93.5c-36.3,21.4 -84.3,26.9 -121,9.1c-36.6,-17.8 -62,-58.8 -76.3,-97.2c-14.3,-38.3 -17.6,-74.1 -25.9,-111c-8.3,-37 -21.6,-75.1 -14.8,-110c6.9,-34.8 33.7,-66.3 67.1,-82.2c33.3,-16 73.2,-16.3 101.9,0.9c28.8,17.3 46.4,52.1 75.4,70z"',
		'd="m324.3,46c31.8,13.5 61.8,39.2 69.4,70.3c7.6,31.2 -7.3,67.7 -14.4,112.2c-7.1,44.5 -6.3,96.8 -30.7,110.4c-24.5,13.6 -74,-11.7 -117.2,-20.4c-43.2,-8.8 -80.1,-1.1 -119.1,-9.9c-39,-8.9 -80.1,-34.2 -98,-71.4c-17.9,-37.1 -12.5,-86 3,-131.1c15.5,-45 41.1,-86.1 77.4,-98.2c36.3,-12 83.3,5 123.6,14.2c40.4,9.2 74.1,10.5 106,23.9z"',
		'd="m327.6,10.9c30.9,16.1 45.9,60.5 64,106.2c18.1,45.7 39.3,92.8 20.1,118.9c-19.3,26.1 -79,31.2 -120.5,61.5c-41.6,30.3 -64.9,85.9 -88.6,86.5c-23.7,0.5 -47.8,-54 -88.2,-84.7c-40.4,-30.7 -97.2,-37.6 -110.2,-62.3c-13,-24.7 17.8,-67.3 37,-109.5c19.3,-42.3 27.1,-84.3 52.1,-102.3c25.1,-18 67.4,-12.1 112,-15.2c44.5,-3.1 91.4,-15.2 122.3,0.9z"',
		'd="m345,79.7c30.7,42.1 44.9,87.5 50.8,132.6c5.9,45.1 3.4,89.9 -16.8,124.3c-20.1,34.3 -57.9,58.3 -98.9,72.9c-40.9,14.7 -85.1,20 -130.5,11.2c-45.5,-8.8 -92.3,-31.8 -119.1,-70.1c-26.7,-38.4 -33.3,-92.2 -17.7,-135.4c15.7,-43.1 53.6,-75.6 91.8,-116.4c38.3,-40.7 76.8,-89.8 119.7,-94.9c42.8,-5.1 90,33.7 120.7,75.8z"'
	];
	//SVG Colours
	var colorArray = [
		'fill="#fcb900"',
		'fill="#d34545"',
		'fill="#8037d3"',
		'fill="#77d31b"',
		'fill="#3462aa"',
		'fill="#ec75ff"',
		'fill="#75fff8"'
	];
	//HTML element creation
	var codeBlock = document.createElement('div');
	codeBlock.setAttribute('class', 'dragSVG');
	codeBlock.innerHTML =
		'<svg width="370" height="400" xmlns="http://www.w3.org/2000/svg">' +
		'<g id="svg_1">' +
		'<path id="svg_2"' +
		colorArray[Math.floor(Math.random() * colorArray.length)] +
		svgArray[Math.floor(Math.random() * svgArray.length)] +
		'/>' +
		'</g>' +
		'</svg>' +
		'<div class="textCont" contenteditable="true">' +
		'Edit' +
		'</div>' +
		'<div class="optionBtn">' +
		'<div class="onHoverBtn"><img src="/images/Colourbtn.png" id="hvrBtn" alt="Move button"></div>' +
		'<div class="onHoverBtn"><img src="/images/Lockbtn.png" id="hvrBtn" alt="Move button"></div>' +
		'<div class="onHoverBtn"><img src="/images/Stackbtn.png" id="hvrBtn" alt="Move button"></div>' +
		'</div>';
	document.getElementById('apNote').appendChild(codeBlock);
}
