import './assets/global.css';
import { createApp } from 'vue';
import App from './App.vue';
import { VueFinalModal, ModalsContainer } from 'vue-final-modal';

import 'vue-final-modal/style.css';

const app = createApp(App);

app.component('VueFinalModal', VueFinalModal);
app.component('ModalsContainer', ModalsContainer);

app.mount('#app');