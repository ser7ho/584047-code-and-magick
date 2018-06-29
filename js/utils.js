'use strict';

(function () {
  window.utils = {
    getRandomIndex: function (arr) {
      return Math.floor(Math.random() * arr.length);
    },
    getMaxElement: function (arr) {
      var maxElement = arr[0];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    error: function (message) {
      var error = document.querySelector('.error');
      error.style.display = 'block';
      error.textContent = message;
      document.addEventListener('click', function () {
        error.style.display = '';
        error.textContent = '';
      });
    }
  };
})();
