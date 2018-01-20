Frontend för D-sektionens röstningssystem.

https://d-sektionen.se/voting

# Lokal utveckling

## Quick start
Installera senaste versionen av [node.js](https://nodejs.org/en/)

```
sudo apt install nodejs
```

Klona github-repositoriet och installera alla dependencies som projektet har
```
git clone git@github.com:d-sektionen/d-sektionen_voting.git
cd d-sektionen_voting
npm install
```
Starta en lokal server med
```
npm start
```

## Bra att kunna
- [React](https://reactjs.org/docs/hello-world.html) - UI-framework
  - [JSX](https://reactjs.org/docs/introducing-jsx.html) - fancy notation för React
- [Redux](https://redux.js.org/docs/introduction/Motivation.html) - håller globala tillstånd i React
  - [Redux-thunk](https://redux.js.org/docs/advanced/AsyncActions.html) - plugin som hanterar asynkrona tillstånd 
- [ES6](http://es6-features.org/#Constants) - ny JS-standard, också kallad ES2015
  - fat arrow notation - (arg1, arg2) => ( returnValue )
  - [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - för requests 
  - [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) - en lösning för asynkron programmering
- [node.js](https://nodejs.org/en/about/) - JS, fast för backend
  - [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)/[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
  - [npm](https://docs.npmjs.com/getting-started/what-is-npm) - Pakethanterare för JS
- [Materialize](http://next.materializecss.com/about.html) - CSS-framework 
- [Sass](http://sass-lang.com/guide) - CSS++
## Överkurs men ändå bra att veta
- [babel](https://babeljs.io/) - transpile ("översätter") JSX och ES6 till ES5
- [webpack](https://webpack.js.org/concepts/) - hanterar kompilering av kod, dev server, mm
  - [modules](https://webpack.js.org/concepts/modules/)
  - [plugins](https://webpack.js.org/concepts/plugins/)
- [ESLint](https://eslint.org/) - formateringsprogram för JS

## Scripts

# Struktur
INDEX.JS
## React - containers vs components
- App (pure)
  - Header
    - SectionSelection
  - Meetings
    - Panel (pure)
      - ListContainer (pure)
  - Votes
    - Panel (pure)
      - ListContainer (pure)
  - Users
    - Panel (pure)
      - ListContainer (pure)


## API

## Redux - tillstånd


## Materialize


# Förbättringar
Inline css - usch

# Programkoder
- 6CITE - IT
- 6CDDD - D
- 6CMJU - U
- 6KIPR - IP