import svelte from 'rollup-plugin-svelte';
import open from 'open';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ postcss: true }),
      // enable run-time checks when not in production
      compilerOptions: {
        dev: !production,
      },
    }),
    css({ output: 'bundle.css' }),

    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte'],
      dedupe: ['svelte'],
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('public'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('yarn', ['start', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
        open('http://localhost:5000');
      }
    },
  };
}
