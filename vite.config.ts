import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import basicSsl from '@vitejs/plugin-basic-ssl' 
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    https: {
      cert: readFileSync(resolve('./cert/exam.com+3.pem')),
      key: readFileSync(resolve('./cert/exam.com+3-key.pem'))
    },
  }
})
