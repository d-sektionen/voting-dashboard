Dashboard för D-sektionens röstningssystem.

https://d-sektionen.se/dashboard

# Lokal utveckling

## Quick start
Installera senaste versionen av [node.js](https://nodejs.org/en/)

På Debian-baserade system (t.ex. Ubuntu eller Mint) görs detta lättast med
```bash
sudo snap install node --channel=9/stable
```

Klona sedan github-repot och installera alla dependencies som projektet har
```bash
git clone git@github.com:d-sektionen/voting-dashboard.git
cd voting-dashboard
npm install
```

Starta en lokal server och gå in på `localhost:8080` i valfri browser:

```bash
npm start
```

Jag har valt att bygga SASS separat från JavaScript, vill du köra båda samtidigt så kan du öppna en ny terminal och köra
```
npm run sass-watch
```

## Linting
Linting används för att analysera kod och hitta potentialla fel. Detta är i princip nödvädigt om du vill utveckla JavaScript då den fångar väldigt många dumma fel samt formaterar all kod åt en. För detta projekt används [StandardJS](https://standardjs.com/) (som kör ESLint i bakgrunden). Linting-programmet installerades automatiskt när du körde `npm install`. För att att sedan köra lintern kan du använda något plugin för din editor / IDE. För VSCode finns det [denna skönhet](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs).

För andra miljöer kolla: https://standardjs.com/#are-there-text-editor-plugins.

Du vill sedan se till att den automatiskt rättar fel varje gång du sparar dina filer. Detta sparar enormt mycket tid när du utvecklar. I VSCode gör detta i dina inställningar med:
```
"standard.autoFixOnSave": true,
```

## Lista över bra saker att kunna
- [React](https://reactjs.org/docs/hello-world.html) - UI-ramverk
  - [JSX](https://reactjs.org/docs/introducing-jsx.html) - fancy notation för React
- [Unstated](https://github.com/jamiebuilds/unstated) - håller globala tillstånd i React
- [ES6](http://es6-features.org/#Constants) - ny JS-standard, också kallad ES2015. Innhåller många nya features och mycket [syntaktiskt socker](https://sv.wikipedia.org/wiki/Syntaktiskt_socker)
  - fat arrow notation: (arg1, arg2) => ( returnValue )
  - destructuring: const {property1, property2} = object 
  - Array-functionerna: [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) och [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
  - Array och object-spreading: const shallowCopy = [...array]
  - [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - för requests 
  - [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) - en lösning för asynkron programmering
- [node.js](https://nodejs.org/en/about/) - JS, fast för backend
  - [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) och [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) - tillåter modulär kodning
- [Skeleton](http://getskeleton.com/) - Vädligt litet och simplet CSS-bibliotek
- [Sass](http://sass-lang.com/guide) - CSS++++
## Överkurs men ändå bra att veta
- Websockets - tillåter servern att på egen hand skicka information till klienten
- [npm](https://docs.npmjs.com/getting-started/what-is-npm) - Pakethanterare för JS
- [babel](https://babeljs.io/) - transpile ("översätter") JSX och ES6 till ES5
- [webpack](https://webpack.js.org/concepts/) - hanterar kompilering av kod, dev-server och mycket annat gällande byggprocessen
  - [modules](https://webpack.js.org/concepts/modules/)
  - [plugins](https://webpack.js.org/concepts/plugins/)
- [ESLint](https://eslint.org/) - formateringsprogram för JS
  - [Standard](https://standardjs.com/) - Konfig-fri och "opinionated" linter som använder ESLint


# Deployment
Bygg allting med
```
npm run build
npm run sass-build
```
Detta genererar två filer i `public/dist`-mappen. Hela denna mapp ska sedan pushas till produktions-branchen. Detta kan enkelt göras med:

```
git subtree push --prefix public origin prod
```

Logga sedan in på servern och pulla filerna
```
ssh liuID123@d-sektionen.se
cd /srv/dwebb/wordpress/dashboard
git pull
```



