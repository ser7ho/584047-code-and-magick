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

  var wizards = [];

  var getRank = function (wizard, coat, eyes) {
    var rank = 0;

    if (wizard.colorCoat === coat) {
      rank += 2;
    }
    if (wizard.colorEyes === eyes) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.wizards = {
    appendWizards: function (arr) {
      wizards = arr;
      var similarListElement = setup.querySelector('.setup-similar-list');
      var fragment = document.createDocumentFragment();
      while (similarListElement.lastChild) {
        similarListElement.removeChild(similarListElement.lastChild);
      }
      for (var i = 0; i < WIZARDS_COUNT; i++) {
        fragment.appendChild(renderWizard(arr[i]));
      }
      similarListElement.appendChild(fragment);
    },
    updateWizards: window.debounce(function (coat, eyes) {
      wizards.forEach(function (el) {
        el.rank = getRank(el, coat, eyes);
      });
      window.wizards.appendWizards(wizards.sort(function (left, right) {
        var rankDiff = right.rank - left.rank;
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
    })
  };

})();

