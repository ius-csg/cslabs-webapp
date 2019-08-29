# CS Labs - Web App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Read more about the default yarn scripts provided by `react-scripts` [here](docs/available-scripts.md)

## Requirements

* [Nodejs](https://nodejs.org/en/download/) - (this will install the `node` and the `npm` commands)
* [Yarn](https://yarnpkg.com/en/) - Run `npm i -g yarn` to install yarn

## Setup and running

In the project directory run `yarn install` to install all the project's dependencies. 
To run the application use `yarn start`. You also will need to run `yarn run watch:lint` to run the 
command line linter so you can see linting errors in for the entire project. Any PR's with lint issues
will be rejected.

## Development

#### Official IDE

The official IDE for this project will be [WebStorm](https://www.jetbrains.com/webstorm/). If you haven't already 
applied for student licensing, do so [here](https://www.jetbrains.com/student/) with you ius email address. 
This let's you have all of Jetbrain's products for free for a year. 

See the [Linting](#linting) section to make sure the linter is running in WebStorm.


#### Git Workflow

The main branch is master. When some work needs to be done, you will branch off from master. 
After the work has completed, the developer will create a PR in Github to merge back into master and notify the project lead
to review. Any PR's with linting issues will be rejected so make sure you run the linter via `yarn run lint` before submitting a PR. 
To run the linter while developing run `yarn run watch:lint`.



## Concepts to know

#### Yarn

This project uses `yarn` instead of `npm`. If you need to install a library then you will use `yarn add {library name}`
instead of `npm install {library-name}`. 

#### Linting

This project uses `tslint` an `stylelint` to enforce a standard code style. Follow the [Setup WebStorm](docs/setup-webstorm.md)
guide to make sure the linter is running in your editor.

#### Theming / Components

This project uses [react-bootrstrap](https://react-bootstrap.github.io/components/alerts). Please use the documentation
to help build the UI. If there is a feature that `react-bootstrap` doesn't have then you can find a library to handle it 
for you by either googling or using github awesome lists like [this one](https://github.com/brillout/awesome-react-components)
or [this one](https://github.com/enaqx/awesome-react). (If you google awesome + {technology name} then you usually get a nice
list of helpful libraries.)

The bootstrap theme is located in `public/bootstrap/css/bootstrap.min.css` and the colors in `theme.scss` match the 
bootstrap theme otherwise bootstrap components will use one color scheme and the application will use another.

#### Navigation

The project uses [react-router](https://reacttraining.com/react-router/) to handle page navigation.
Pages are just normal components that are routed in the [src/router/Routes.tsx](src/router/Routes.tsx) file.

#### Typescript

Typescript is simply javascript with types. If you are unfamiliar with Typescript please read the 
[Typescript in 5 minutes guide](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

#### React

This application uses React to map the application state to the UI. If you are unfamiliar with React, please
go through this [tutorial](https://reactjs.org/tutorial/tutorial.html). In the tutorial you will notice that they use
the `.jsx` extension for rendering the XML-like extension of javascript. This project uses the `.tsx` extension
instead because we are using typescript instead of javascript (hence the `t` instead of `j`).

#### Redux

The application's database models will be stored in redux to provide a quick desktop like experience. 
If you are unfamiliar with Redux, follow [this guide](https://redux.js.org/basics/basic-tutorial).

We are going to go with a render first approach to provide seamless experiences if users already have the data cached.
Using this approach we will only show a loading indicator if the application is both retrieving data and has no entities
in the cache. We will always request the newest data and replace our local content to ensure our cache is up to date.

