'use strict';
(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_HEIGHT = 270;
  var CLOUD_GAP = 10;
  var GAP = 40;
  var FONT_GAP = 20;

  window.renderStatistics = function (ctx, names, times) {
    var BAR_HEIGHT_MAX = 150;
    var BAR_WIDTH = 40;
    var BAR_GAP = 50;
    var maxTime = window.utils.getMaxElement(times);

    window.renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    window.renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

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
})();

