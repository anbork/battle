import { Buffer } from 'buffer';
import { browser } from '$app/environment';

if (browser) {
  window.Buffer = Buffer;
  window.global = window;
  window.process = {...window.process, env: {}}
}

export const ssr = false;
