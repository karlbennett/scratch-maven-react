scratch-maven-react
===================

This project demonstrates how to integrate [Maven](https://maven.apache.org/), 
[Spring Boot](https://projects.spring.io/spring-boot/), and [React](https://facebook.github.io/react/) within the 
same project. This allows both the frontend and backend to be built together with Maven.

## Building

To build this project simple use the following command:

```bash
mvn clean verify
```

This will build and test both the Java and JavaScript code. The JavaScript React code is built using the 
[`frontend-maven-plugin`](https://github.com/eirslett/frontend-maven-plugin), which downloads then installs Node and 
NPM, retrieves all the JavaScript dependencies with NPM, builds the code with [Webpack](https://webpack.github.io/), 
then lastly runs all the tests with [Karma](https://karma-runner.github.io/1.0/index.html).

The JavaScript project is setup as normal so can also be built with the traditional tools.

```
npm install
webpack
karma start
```

## Technologies Demonstrated

#### frontend-maven-plugin

This Maven plugin is used to run all the JavaScript build tools. It's configuration is in the [pom.xml](pom.xml).

#### NPM

NPM is used to retrieve all the JavaScript dependencies.

#### Webpack

The Webpack build tool is used to compile and build the React project. This includes checking the code style with 
[ESLint](http://eslint.org/) and compiling the [SASS](http://sass-lang.com/) into CSS.

['webpack-profiles'](https://www.npmjs.com/package/webpack-profiles) are used to provide the different configurations 
between the 'dev' and 'prod' builds.

#### Karma

The tests are run with Karma which has also been configured to carry out code coverage analyses. Additional 
configuration has been added to allow Karma to support the [Enzyme](https://github.com/airbnb/enzyme) test library which 
is used the test to React components.

The ['redux-mock-store'](https://www.npmjs.com/package/redux-mock-store) is used to carry out JavaScript unit tests on 
React components that have been bound to [Redux](http://redux.js.org/).

The ['inject-loader'](https://www.npmjs.com/package/injected-loader) is used to mock ES6 imports so that individual 
JavaScript files can be tested in isolation.

['fetch-mock'](https://www.npmjs.com/package/fetch-mock) has been used to mock 
[`fetch`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) requests to allow the unit testing of functions that 
make HTTP requests to the backend.

#### React

The main purpose of this project is to demonstrate a simple near real world React build. So naturally the view layer is 
written in React. A few extra packages have been added in addition to React to bring the application closer to what 
would be expected in a real world scenario.

['react-router'](https://www.npmjs.com/package/react-router) has been used to create URL mappings to React components.

['redux'](https://www.npmjs.com/package/redux) has been used to store the global application state and trigger React 
component renders on related state changes.

['redux-persist'](https://www.npmjs.com/package/redux-persist) has been used to persist the application state between 
browser refreshes.

['fetch-intercept'](https://www.npmjs.com/package/fetch-intercept) has been used to display the login page whenever a 
forbidden response is recieved by a `fetch` request.