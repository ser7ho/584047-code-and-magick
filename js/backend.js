'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          default:
            error = 'Статус ответа: ' + xhr.status + ': ' + xhr.statusText;
            onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка загрузки волшебников');
      });

      xhr.addEventListener('timeout', function () {
        onError('время ожидания истекло');
      });

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad();
            break;
          default:
            error = 'Статус ответа: ' + xhr.status + ': ' + xhr.statusText;
            onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('ошибка соединения с сервером');
      });

      xhr.addEventListener('timeout', function () {
        onError('время ожидания истекло');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
