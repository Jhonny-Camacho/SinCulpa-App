import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath} from 'node:url';
const entry=path=>fileURLToPath(new URL(path,import.meta.url));
export default defineConfig({plugins:[tailwindcss()],build:{rollupOptions:{input:{app:entry('./index.html'),landing:entry('./semana/index.html'),guide:entry('./semana/guia/index.html'),offer:entry('./semana/oferta/index.html')}}}});
