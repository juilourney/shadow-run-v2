import * as name from './screens/name.js';
import * as card from './screens/card.js';

const SCREENS = [name, card];

const app = document.getElementById('app');
app.innerHTML = SCREENS.map(s => s.render()).join('');
SCREENS.forEach(s => s.init());
