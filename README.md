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
- [ES6](http://es6-features.org/#Constants) - ny JS-standard, också kallad ES2015
  - fat arrow notation - (arg1, arg2) => ( returnValue )
  - [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - för requests 
  - [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) - en lösning för asynkron programmering
- [node.js](https://nodejs.org/en/about/) - JS, fast för backend
  - [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)/[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
  - [npm](https://docs.npmjs.com/getting-started/what-is-npm) - Pakethanterare för JS


## Överkurs men ändå bra att veta
- [babel](https://babeljs.io/) - transpile ("översätter") JSX och ES6 till ES5
- [webpack](https://webpack.js.org/concepts/) - hanterar kompilering av kod, dev server, mm
  - modules
  - plugins
- [ESLint](https://eslint.org/) - formateringsprogram för JS