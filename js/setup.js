'use strict';

var WIZARD_NAMES = ['Иван', 'Хуaн Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
setup.querySelector('.setup-similar').classList.remove('hidden');

var generateWizards = function (names, surnames, coatColors, eyesColors, count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: names[generateWizardElement(names)] + ' ' + surnames[generateWizardElement(surnames)],
      coatColor: coatColors[generateWizardElement(coatColors)],
      eyesColor: eyesColors[generateWizardElement(eyesColors)]
    };
  }
  return wizards;
};

var generateWizardElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var appendWizards = function (arr) {
  var similarListElement = setup.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
};

appendWizards(generateWizards(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS, WIZARD_COUNT));

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.top = '';
  setup.style.left = '';
};


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

var onWizardCoatClick = function () {
  setupWizard(COAT_COLORS, wizardCoat, 'coat-color');
};

var onWizardEyesClick = function () {
  setupWizard(EYES_COLORS, wizardEyes, 'eyes-color');
};

var onWizardFireballClick = function () {
  setupWizard(FIREBALL_COLORS, wizardFireball, 'fireball-color');
};

var setupWizard = function (colors, wizard, inputName) {
  var color = colors[generateWizardElement(colors)];
  if (wizard === wizardFireball) {
    while (color === convertRgbToHex(wizard.style.background)) {
      color = colors[generateWizardElement(colors)];
    }
    wizard.style.background = color;
  } else {
    while (color === wizard.style.fill) {
      color = colors[generateWizardElement(colors)];
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
