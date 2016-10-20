scratch-maven-react
===================

This project demonstrates how to integrate Maven, Spring Boot, and React within the same project. This allows both the
frontend and backend to be built together with Maven.

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

#### Karma

The tests are run with Karma which has also been configured to carry out code coverage analyses. Additional 
configuration has been added to allow Karma to support the [Enzyme](https://github.com/airbnb/enzyme) test library which 
is used the test to React components.