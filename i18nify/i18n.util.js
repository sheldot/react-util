export const i18nLanguageAbbrMap = {
  mixed: {
    en: 'English',
    es: 'Español',
  },
  en: {
    en: 'English',
    es: 'Spanish',
  },
  es:  {
    en: 'inglés',
    es: 'español',
  },
};

// Reason to try both is because the platform default language
// could be different from user settings language
export function fromI18N(stringObj, platformLang, defaultLang) {
  if (typeof stringObj === 'object' && stringObj !== null) {

    // Check if the element is an object then try the user default language,
    if (!!defaultLang && (defaultLang in stringObj)) return stringObj[defaultLang];

    // If that doesnt work, try the platform default language,
    if (!!platformLang && (platformLang in stringObj)) return stringObj[platformLang];

    // Otherwise default to English if nothing then return a blank string
    if ('en' in stringObj) return stringObj.en;

    return '';
  }

  return stringObj;
}

// Take an array of languages and return the 
export function toI18N(langArr=['en']) {
  const i18nObj = {}
  langArr.map(currentLang => {
    i18nObj[currentLang] = '';
    return null;
  });
  return i18nObj;
}

// Given an object that maps language tags to langauge strings (a "languageBlock"),
// this simplifies pulling out the specific stringTag
function _i18nify(languageBlock, platformLang, defaultLang) {
  return stringTag => fromI18N(languageBlock[stringTag], platformLang, defaultLang)
}

// Take in the overall language and the current user defualt language and
// send back a function to create an i18nify object
export function constructI18Nify(platformLang='en', defaultLang=platformLang) {
  return languageBlock => _i18nify(languageBlock, platformLang, defaultLang);
}

export function setI18N(i18nObj, langField, strValue) {
  const updatedI18nObj = Object.assign({}, i18nObj);
  updatedI18nObj[langField] = strValue;
  return updatedI18nObj;
}

export function pullDefaultLanguages(user=null, project=null) {
  // Gather overall language settings
  let defaultLanguage = !!project &&
    ('settings' in project) &&
    ('defaultLanguage' in project.settings) &&
    !!project.settings.defaultLanguage &&
    project.settings.defaultLanguage in i18nLanguageAbbrMap
      ? project.settings.defaultLanguage
      : 'en';
  const platformDefaultLanguage = defaultLanguage;

  // Prioritize user language settings
  defaultLanguage = !!user &&
    ('settings' in user) &&
    ('defaultLanguage' in user.settings) &&
    !!user.settings.defaultLanguage &&
    user.settings.defaultLanguage in i18nLanguageAbbrMap
      ? user.settings.defaultLanguage
      : defaultLanguage;

  return {
    defaultLanguage,
    platformDefaultLanguage,
  }
}
