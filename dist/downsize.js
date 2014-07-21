
"use strict";

function downsize(options) {

  if(typeof options === 'undefined' || typeof options.src === 'undefined') {
    console.error("invalid options");
    return;
  }

  var defaults = function (option, defaults) {
    return (typeof option === 'undefined') ? defaults : option;
  };

  var newCanvas = function() {
    var canvas = document.createElement('canvas');
    return canvas;
  }

  this.options = {
    canvas : defaults(options.canvas, newCanvas()),
    src: options.src,
    steps : defaults(options.steps, 4),
    size : defaults(options.size, 0.5)
  }

  var canvas = this.options.canvas;
  var steps = this.options.steps;
  var size = Math.pow(this.options.size, 1/this.options.steps);
  var ctx = this.options.canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  var image = new Image();
  image.onload = function () {
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.webkitImageSmoothingEnabled = false;
    tempCtx.mozImageSmoothingEnabled = false;
    if(this.options.size > 1) {
      tempCanvas.width = image.width*this.options.size;
      tempCanvas.height = image.height*this.options.size;
    }
    else {
      tempCanvas.width = image.width;
      tempCanvas.height = image.height;
    }
    tempCtx.drawImage(image, 0, 0, image.width, image.height);

    while (steps--) {
      tempCtx.drawImage(
        tempCanvas, 0, 0,
        tempCanvas.width * size,
      tempCanvas.height * size);
    }

    canvas.width = image.width * this.options.size;
    canvas.height = image.height * this.options.size;

    ctx.drawImage(tempCanvas, 0, 0, image.width * this.options.size, image.height * this.options.size, 0, 0, canvas.width, canvas.height);
  }.bind(this);
  image.src = this.options.src;

  return this.options.canvas;
};


