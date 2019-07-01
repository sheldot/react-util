# react-util

## i18nify 
A simple utility lib that allows for fast tokenization, inline implementation and retrieval of language strings

### Sample usecase:
```
import {
  constructI18Nify,
  fromI18N,
} from '../../utils/i18n.util';

const languageMap = {
  helloText: {
    en: 'Hello',
    es: 'Hola',
    fr: 'Bonjour',
  },
  goodbyeText: {
    en: 'Bye',
    es: 'Adiós',
    fr: 'Au revoir',
  },
}
// The language of the entire application
const applicationDefault = 'en';

// The language of the entire application
const userDefault = 'fr';
```

#### This can be used now in two ways
(1) Build the connection between the map of iso language tokens to language strings
```
const i18nify = constructI18Nify(applicationDefault, userDefault);
const _i = i18nify(languageMap);

const RandomElement = <p>{_i('helloText')}</p>;
```
#### OR
(2) Directly pull the string and language you are insterested in
```
fromI18N(
  languageBlock['goodbyeText'],
  applicationDefault,
  'es',
);
```
### More documentation coming soon...
