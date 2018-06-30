'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var setup = document.querySelector('.setup');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var eyesColor = setup.querySelector('input[name="eyes-color"]');

  var onWizardCoatClick = function () {
    setupWizard(COAT_COLORS, wizardCoat, 'coat-color');
    window.wizards.updateWizards(wizardCoat.style.fill, eyesColor.value);
  };

  var onWizardEyesClick = function () {
    setupWizard(EYES_COLORS, wizardEyes, 'eyes-color');
    window.wizards.updateWizards(wizardCoat.style.fill, eyesColor.value);
  };

  var onWizardFireballClick = function () {
    setupWizard(FIREBALL_COLORS, wizardFireball, 'fireball-color');
  };

  var setupWizard = function (colors, wizard, inputName) {
    var color = colors[window.utils.getRandomIndex(colors)];
    if (wizard === wizardFireball) {
      while (color === convertRgbToHex(wizard.style.background)) {
        color = colors[window.utils.getRandomIndex(colors)];
      }
      wizard.style.background = color;
    } else {
      while (color === wizard.style.fill) {
        color = colors[window.utils.getRandomIndex(colors)];
      }
      wizard.style.fill = color;
    }
    setup.querySelector('input[name=' + inputName + ']').value = color;
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);

  var convertRgbToHex = function (rgb) {
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    return '#' + ((1 << 24) + (+rgb[0] << 16) + (+rgb[1] << 8) + +rgb[2]).toString(16).slice(1);
  };

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, window.utils.error);
    evt.preventDefault();
  });
})();
