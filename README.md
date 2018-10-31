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

## Django API
Det finns 3 alternativ för vilken backend du vill använda.
* Heroku - https://dsek-api-dev.herokuapp.com
* Sätta upp ett lokalt API - se https://github.com/d-sektionen/django-api
* Den på d-sektionens sida - NEJ!!!

Se `src/config.js` för att ställa in vilken url front-endend pekar på.

## Linting
Linting används för att analysera kod och hitta potentialla fel. Detta är i princip nödvädigt om du vill utveckla JavaScript då den fångar väldigt många dumma fel samt formaterar all kod åt en. För detta projekt används [StandardJS](https://standardjs.com/) (som kör ESLint i bakgrunden). Linting-programmet installerades automatiskt när du körde `npm install`. För att att sedan köra lintern kan du använda något plugin för din editor / IDE. För VSCode finns det [denna skönhet](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs).

För andra miljöer kolla: https://standardjs.com/#are-there-text-editor-plugins.

Du vill sedan se till att den automatiskt rättar fel varje gång du sparar dina filer. Detta sparar enormt mycket tid när du utvecklar. I VSCode gör detta i dina inställningar med:
```
"standard.autoFixOnSave": true,
```

# Deploya till servern
Bygg allting med
```
npm run build
npm run sass-build
```
Detta genererar två filer i `dist`-mappen. Hela denna mapp ska sedan pushas till produktions-branchen. Detta kan enkelt göras med:

```
git subtree push --prefix public origin prod
```

Logga sedan in på servern och pulla filerna
```
ssh liuID123@d-sektionen.se
cd /srv/dwebb/wordpress/dashboard
git pull
```


