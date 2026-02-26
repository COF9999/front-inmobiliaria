import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import os from 'os';
import dotenv from 'dotenv';
// export default defineConfig({
//   plugins: [react()],

//   optimizeDeps: {
//     exclude: ['@swc/wasm'], // Marcar la ruta problemática como externa
//   },
// })
dotenv.config();


// Detecta la dirección IP local de la máquina
const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; // Retorna la IP local
      }
    }
  }
  return 'localhost'; // Si no se detecta una IP, usa localhost
};

const hostReact = getLocalIPAddress();

const replacePlugin = (mode) => {
  return {
    name: "html-inject-env",
    transformIndexHtml: (html) => {
      if (mode === "production") {
        return html.replace(
          "<!-- REACT_ENV -->",
          '<script src="./config/env.js"></script>'
        );
      }
      return null;
    },
  };
};


export default defineConfig(({mode})=>({
  plugins: [react(),replacePlugin(mode)],
  server:{
    host: process.env.VITE_REACT_HOST || hostReact
  }
}))


// // vite.config.js
// import { defineConfig } from 'vite';
// import nodePolyfills from 'rollup-plugin-node-polyfills'; // Importa el plugin de polyfills de Node.js

// export default defineConfig({
//     plugins: [
//         // Otros plugins...
//         nodePolyfills(), // Utiliza el plugin de polyfills de Node.js para cargar archivos .node
//     ],
// });