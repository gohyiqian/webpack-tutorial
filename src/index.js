import helloWorld from './hello-world.js';
import addImage from './add-image.js';
import HelloWorldButton from './components/hello-world-button/hello-world-button.js';

addImage();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

helloWorld(); //see console
