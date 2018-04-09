'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var HISTOGRAM_HEIGHT = 150;
var BAR_WIDTH = 40;
var INDENT = 50;
var INITIAL_X = 120;
var INITIAL_Y = 90;
var LINE_HEIGHT = 20;

var getMaxElement = function (array) {
  var currentIndex = 0;
  var maxValue = array[currentIndex];

  for (var i = currentIndex + 1; i <= array.length - 1; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

var getRandomColor = function () {
  var opacity = Math.random().toFixed(2);

  return (opacity === 0.00) ? 'rgba(0, 0, 255, ' + opacity + 0.01 + ')' : 'rgba(0, 0, 255, ' + opacity + ')';
};

var getFinalColor = function (specific) {
  return specific ? 'red' : getRandomColor();
};

window.renderStatistics = function (ctx, names, times) {
  var drawCanvas = function (ctx) {
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetY = GAP;
    ctx.shadowOffsetX = GAP;
    ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 30);
    ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + 50);
  };

  var signResults = function (text, positionX, positionY) {
    return ctx.fillText(text, positionX, positionY);
  };

  var drawBar = function (x, y, width, height) {
    return ctx.fillRect(x, y, width, height);
  };

  var step = HISTOGRAM_HEIGHT / (getMaxElement(times) - 0);

  drawCanvas(ctx);

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * step;
    var indentFinal = INDENT + BAR_WIDTH;
    ctx.fillStyle = 'black';
    signResults(names[i], INITIAL_X + indentFinal * i, INITIAL_Y + HISTOGRAM_HEIGHT + LINE_HEIGHT);
    signResults(times[i].toFixed(0), INITIAL_X + indentFinal * i, INITIAL_Y + HISTOGRAM_HEIGHT - barHeight - LINE_HEIGHT / 2);
    ctx.fillStyle = getFinalColor(names[i] === 'Вы');
    drawBar(INITIAL_X + indentFinal * i, INITIAL_Y + (HISTOGRAM_HEIGHT - barHeight), BAR_WIDTH, barHeight);
  }
};
