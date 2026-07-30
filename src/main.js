import { mount } from 'svelte';
import App from './App.svelte';
import { getAsset } from './utils/prepareAssets.js';

getAsset('pdfjsLib');

const app = mount(App, {
  target: document.body,
});

export default app;
