import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      'keyboard-shortcuts': 'src/keyboard-shortcuts.ts',
      react: 'src/react.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: true,
    external: ['react'],
  },
  {
    entry: { 'keyboard-shortcuts': 'src/keyboard-shortcuts.ts' },
    format: ['iife'],
    globalName: 'KeyboardShortcutManagerGlobal',
    outExtension() {
      return {
        js: '.global.js',
      };
    },
    clean: false,
    sourcemap: true,
    minify: true,
  },
]);
