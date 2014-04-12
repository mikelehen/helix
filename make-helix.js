var fs = require('fs');

var LEDS_PER_STRAND = 90;

// I was working in mm, but you could work in whatever unit you want (but you'll need to tweak SCALE below)
var RADIUS = 500;
var STRUCTURE_HEIGHT = 2000;

// how many full rotations we want.
var REVOLUTIONS = 2;

// Used to adjust where / how big it shows up in the simulator.
var MIN_Z = -2;
var SCALE = (1 / 500); 

// Using the parametric equations / arc length formula from http://mathworld.wolfram.com/Helix.html
var helixHeight = STRUCTURE_HEIGHT / REVOLUTIONS; // height between layers.
var tMax = REVOLUTIONS * 2 * Math.PI;
var c = helixHeight / (2 * Math.PI);
var arcLength = tMax * Math.sqrt(RADIUS * RADIUS + c * c);
var distBetweenLEDs = arcLength / LEDS_PER_STRAND;


console.log('Radius:', RADIUS);
console.log('Height:', STRUCTURE_HEIGHT);
console.log('Revolutions:', REVOLUTIONS);
console.log('Distance between LEDs:', distBetweenLEDs.toFixed(2));

var tStep = tMax / LEDS_PER_STRAND;

var pixels = [];

// First helix
for(var i = 0; i < LEDS_PER_STRAND; i++) {
  var t = tStep * i;
  var x = RADIUS * Math.cos(t) * SCALE;
  var y = RADIUS * Math.sin(t) * SCALE;
  var z = MIN_Z + t * c * SCALE;
  pixels.push({"point": [x, y, z]});
}

// Second helix
for(var i = 0; i < LEDS_PER_STRAND; i++) {
  var t = tStep * i;
  var x = -RADIUS * Math.cos(t) * SCALE;
  var y = -RADIUS * Math.sin(t) * SCALE;
  var z = MIN_Z + t * c * SCALE;
  pixels.push({"point": [x, y, z]});
}

fs.writeFileSync('helix.json', JSON.stringify(pixels, undefined, 4));
console.log('helix.json generated.');
