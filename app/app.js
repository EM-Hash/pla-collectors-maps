import Vue from 'nativescript-vue'

import App from './App';

import store from "./store";

Vue.registerElement('DropDown', () => require("nativescript-drop-down").DropDown);

new Vue({
  store: store,
  render: (h) => h('Frame', [h(App)]),
}).$start()
