import Heading from './components/heading/heading.js';
import KiwiImage from './components/kiwi-image/kiwi-image.js';
// import _ from 'lodash';
import React from 'react';

// code-splitting
const heading = new Heading();
// heading.render(_.upperFirst('kiwi page'));
heading.render('kiwi');
const kiwiImage = new KiwiImage();
kiwiImage.render();
