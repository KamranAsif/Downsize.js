//(function(root, undefined) {

"use strict";


/* downsize.js main */
/*global document:false*/
/*global Image:false*/

function Downsize(options) {
  if(!options) { console.log(options); throw new Error('missing options'); }
  if (!options.src) { console.log(options); throw new Error('missing source paramter'); }

  if(!(this instanceof Downsize)) {
  console.log(1, options);
    return new Downsize(options);
  }

  this.canvas = options.canvas || document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.src = options.src;
  this.steps = options.steps || 4;
  this.size = options.size || 0.5;
  this.stepSize = Math.pow(this.size, 1/this.steps);

  this.createImage(this.src);

  return this.canvas;
}

Downsize.prototype.createImage = function(src) {
  var image = new Image();
  image.onload = function() {
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    tempCtx.drawImage(image, 0, 0, image.width, image.height);
    this.steps--;
    this.downSample(tempCanvas);
  }.bind(this);
  image.src = src;
  this.image = image;
};

Downsize.prototype.downSample = function(canvas) {
  var steps = this.steps;
  var stepSize = this.stepSize;
  var ctx = canvas.getContext('2d');
  while (steps > 0) {
    steps--;
    ctx.drawImage(
      canvas, 0, 0,
      canvas.width * stepSize,
    canvas.height * stepSize);
  }
  this.saveCanvas(canvas);
};

Downsize.prototype.saveCanvas = function(downScaledCanvas) {
  var canvas = this.canvas;
  var ctx = this.ctx;
  var image = this.image;
  var size = this.size;
  canvas.width = image.width * size;
  canvas.height = image.height * size;
  ctx.drawImage(downScaledCanvas, 0, 0, image.width * size, image.height * size, 0, 0, canvas.width, canvas.height);
};

// Version.
Downsize.VERSION = '0.1.0';


// Export to the root, which is probably `window`.
//root.Downsize = Downsize;


if (typeof module !== 'undefined' && module.exports) {
    module.exports = Downsize;
}

//}(this));
