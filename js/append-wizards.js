'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var setup = document.querySelector('.setup');
  setup.querySelector('.setup-similar').classList.remove('hidden');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.appendWizards = function (arr) {
    var similarListElement = setup.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    similarListElement.appendChild(fragment);
  };

})();

