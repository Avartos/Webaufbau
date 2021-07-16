# SQUID

## Installation

Zunächst die Datenbank wiederherstellen. Hierfür muss mariaDB verwendet werden.

```
Port: 3306
Nutzername: root
Passwort: kein Passwort
```

Die DatenbankDatei befindet sich im Verzeichnis:
[./api/src/squid.sql](./api/src/squid.sql)

Anschließend das Backend sowie das Frontend starten.
Das Backend befindet sich im Ordner api, für das Frontend genügt im Hauptverzeichnis:

```cmd
npm start
```

Um die Webseite auf z.B. anderen Geräten zu testen, sollte im Ordner in der Konfigurationsdatei der Pfad zum Server angepasst werden. (Anstelle von localhost die tatsächliche IP-Adresse). Die Datei befiundet sich unter:

```
./src/core/config.jsx
```

Für die Webseite gibt es bereits einige Vordefinierte User.
Folgende Nutzer stehen zur Verfügung:
```
Squid1 (Administrator)
Squid2
Squid3
Squid7601
Squid5628
Squid12251
Squid11020
Squid1230
```

```
Standardpasswort: QWEasd123!
```

## Allgemein

Github-Repository:
https://github.com/Avartos/Webaufbau

Team-Mitglieder:

- Dirk Hofmann (Munchkin129)
- John Klippstein (Avartos)
- Matthias Gabel (f0rkster)
- Saskia Wohlers (schnoernja)
- Robin Beck (LittleBigPlaye)

## Was ist Squid?

Squid ist ein Forum, in dem sich Nutzer austauschen können. Dabei soll die Anonymität der Nutzer gewahrt werden, indem jeder User nur den Namen 'Squid' gefolgt von einer Nummer trägt.

## Funktionalitäten von Squid

Squid beinhaltet folgende Funktionalitäten:

- Allgemeine Forenfunktionen
  - Anlegen/Bearbeiten von Threads
  - Antworten auf Threads
  - Abonnieren von Threads und Foren
  - Suchen nach Foren und Threads
  - Bewerten von Antworten auf ein Post in einem Thread
  - Beanchrichtigung bei neuen Aktivitäten in abonnierten Foren
  - API Token für Dritte bereitstellen
- Kontoverwaltung
  - Auswahl eines eigenen Profilbildes aus einer Auswahl vorgegebener Profilbilder
  - Änderung des Passwortes
  - Nutzerverwaltung für Admins

## Verworfene Funktionalitäten

Es waren mehr Funktionalitäten geplant, leider mussten diese aufgrund von Zeitmangel verworfen werden:

- Durchführung von Voicecalls (wurde getestet, hat aber nicht stabil genug funktioniert und war zu kurzfristig)
- Anhängen von Dateien/ Bildern / Dokumenten an Posts
- Implementierung von Straw Poll als externe API

## Nutzung - Fremde API

Als Fremd API wurde eine API von Tenor eingebunden. Diese zeigt auf der 404 Seite und bei der Ergebnislosen Suche nach Suchkriterien festgelegte, zufällige gifs an.

## Nutzung - Eigene API

Die Eigene API liefert einen zufälligen Thread oder ein Zufälliges Forum zurück. Um die API zu nutzen, muss zunöchst ein Token generiert werden. Das Token kann nur von angemeldeten Nutzern generiert werden. Die Option hierfür befindet sich im Profil-Dropdown Menü. Sobald ein Token generiert wurde, kann dieser via query Parameter 't' an die Anfrage angehangen werden.

Es werden ein zufälliger Thread sowie ein zufälliges Forum zurückgeliefert.

---

## Ursprüngliche Ideen

### Beiträge

- Erstellen von Kategorien
- Erstellen von Threads
- Antworten auf Threads
- Einbetten von Bildern, Sounds, html (?), markdown
- Direktes Erwähnen von anderen Nutzern mit @
- Eigene Syntax für Smileys / Symbole
- Kleine Vorschau auf eingebettete Links zu anderen Webseiten
- Markierung von Beiträgen als Spoiler
- Name für alle Nutzer „Squid“ + Zahl

### Kommunikation

- Schreiben in Threads
- Schreiben per Direktnachricht
- Voice-Calls (EasyRTC, SimpleWebRTC, PeerJS)

### API-Ideen

- Hook-Up Links für Benachrichtigungen (stellen wir bereit)
- StrawPoll anzeigen lassen (nutzen wir)

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
