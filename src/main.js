import * as name from './screens/name.js';

const SCREENS = [name];

const app = document.getElementById('app');
app.innerHTML = SCREENS.map(s => s.render()).join('');
SCREENS.forEach(s => s.init());
