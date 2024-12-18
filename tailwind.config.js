/** @type {import('tailwindcss').Config} */

import { scopedPreflightStyles, isolateInsideOfContainer } from 'tailwindcss-scoped-preflight';

module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx,mdx}', './docs/**/*.mdx'],
    corePlugins: { preflight: false },
    important: "#tailwind",
    theme: {
        extend: {
            colors: {
                primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
            }
        }
    },
    darkMode: ['class', '[data-theme="dark"]'],
    plugins: [
        scopedPreflightStyles({
            isolationStrategy: isolateInsideOfContainer('.preflight', {
                except: '.no-preflight',
            }),
        }),
    ]
  };