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
import pageMain from './modules/page-main';
import pageStory from './modules/page-story';
import pageTransition from './modules/page-transition';
import pagePrizes from './modules/page-prizes';
import pageRules from './modules/page-rules';
import pageGame from './modules/page-game';
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
pageTransition(eventEmitter);
pageMain();
pageStory();
pagePrizes();
pageRules();
pageGame();

const fullPageScroll = new FullPageScroll(eventEmitter);
fullPageScroll.init();
