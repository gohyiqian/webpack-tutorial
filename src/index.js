import helloWorld from './hello-world.js';
// import addImage from './add-image.js';
import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import Heading from './components/heading/heading.js';

// addImage();

const heading = new Heading();
heading.render();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

helloWorld(); //see console
// helloWorldButton.methodThatNotExists();
