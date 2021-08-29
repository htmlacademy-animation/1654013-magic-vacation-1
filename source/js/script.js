// modules
import EventEmitter from './modules/event-emitter';
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import page from './modules/page.js';
import FullPageScroll from './modules/full-page-scroll';

const eventEmitter = new EventEmitter();

// init modules
mobileHeight();
slider(eventEmitter);
menu(eventEmitter);
footer();
chat();
result();
form();
social(eventEmitter);
page();

const fullPageScroll = new FullPageScroll(eventEmitter);
fullPageScroll.init();
