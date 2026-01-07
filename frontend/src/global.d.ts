declare module 'react';
declare module 'react-dom/client';
declare module 'react/jsx-runtime';
declare module 'react-router-dom';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
