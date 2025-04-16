# WebCards

WebCards is a card-based web application built with Angular and Firebase.
It's a deckbuilding game. (Work still in progress)
Also contains admin functions to manage the cards and scenario's.

## Features

- Create and edit cards with attributes like rarity, description, effects, and more.
- Firebase integration for hosting, Firestore, and other services.
- Responsive design using Angular Material components.
- Customizable styles with SCSS.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Firebase Hosting

This project is hosted on Firebase. To deploy the application, use the following command:

```bash
firebase deploy
```

Ensure that you have configured your Firebase project and updated the `firebase.json` file as needed.

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
