'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_RADIUS = 50;
var CLOUD_GAP = 10;
var GAP = 40;
var FONT_GAP = 20;

var renderCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, CLOUD_HEIGHT);
  ctx.arcTo(x, y, CLOUD_WIDTH, y, CLOUD_RADIUS);
  ctx.arcTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_RADIUS);
  ctx.arcTo(x + CLOUD_WIDTH, CLOUD_HEIGHT + y, x, CLOUD_HEIGHT + y, CLOUD_RADIUS);
  ctx.arcTo(x, CLOUD_HEIGHT + y, x, y, CLOUD_RADIUS);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, GAP + FONT_GAP);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var BAR_HEIGHT_MAX = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  for (var i = 0; i < names.length; i++) {
    var barHeight = (BAR_HEIGHT_MAX * times[i]) / maxTime;
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - barHeight - CLOUD_GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var alphaChannel = Math.random().toFixed(1);
      ctx.fillStyle = 'rgba(0, 0, 255,  ' + alphaChannel + ')';
    }
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - barHeight, BAR_WIDTH, barHeight);
  }
};
