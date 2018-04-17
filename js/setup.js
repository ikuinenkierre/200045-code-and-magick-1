'use strict';

var WIZARD_NAMES = [
'Иван',
'Хуан Себастьян',
'Мария',
'Кристоф',
'Виктор',
'Юлия',
'Люпита',
'Вашингтон'
];

var WIZARD_SURNAMES = [
'да Марья',
'Верон',
'Мирабелла',
'Вальц',
'Онопко',
'Топольницкая',
'Нионго',
'Ирвинг'
];

var WIZARD_COAT_COLORS = [
'rgb(101, 137, 164)',
'rgb(241, 43, 107)',
'rgb(146, 100, 161)',
'rgb(56, 159, 117)',
'rgb(215, 210, 55)',
'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
'black',
'red',
'blue',
'yellow',
'green'
];

var showSetupBlockWithGeneratedWizards = function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var showSetupBlock = function () {
    var userDialog = document.querySelector('.setup');
    userDialog.classList.remove('hidden');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var generateWizardCharacter = function (wizards, wizardsQuantity) {
    for (var i = 0; i < wizardsQuantity; i++) {
      var wizardCharacter = {
        name: WIZARD_NAMES[getRandomInteger(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInteger(0, WIZARD_SURNAMES.length - 1)],
        coatColor: WIZARD_COAT_COLORS[getRandomInteger(0, WIZARD_COAT_COLORS.length - 1)],
        eyesColor: WIZARD_EYES_COLORS[getRandomInteger(0, WIZARD_EYES_COLORS.length - 1)]
      };
      wizards.push(wizardCharacter);
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var generateTemplateInDocument = function (wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return similarListElement.appendChild(fragment);
  };

  showSetupBlock();
  generateTemplateInDocument(generateWizardCharacter([], 4));
};

showSetupBlockWithGeneratedWizards();

