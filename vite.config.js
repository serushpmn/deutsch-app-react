import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// ⚠️ نام ریپازیتوری خود را اینجا وارد کنید (مثلاً dual-app)
const repoName = 'deutsch-app-react'; // اگر نام ریپازیتوری شما چیز دیگری است، همینجا اصلاح کنید

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
});
