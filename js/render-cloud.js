'use strict';

(function () {
  var CLOUD_X = 100;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_RADIUS = 50;
  var GAP = 40;
  var FONT_GAP = 20;

  window.renderCloud = function (ctx, x, y, color) {
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
})();
