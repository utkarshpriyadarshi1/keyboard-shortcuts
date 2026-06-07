# React Integration Sample

This folder contains a sample showing how to use the library in a React application.

## Usage

1. Import the hook from the react subpath:

   ```javascript
   import { useKeyboardShortcut } from 'keyboard-shortcuts-library/react';
   ```

2. Register shortcuts inside your functional component:

   ```javascript
   function Editor() {
     useKeyboardShortcut(
       'Ctrl+S',
       (event) => {
         saveDocument();
       },
       { scope: 'editor', description: 'Save current document' },
     );

     return <div />;
   }
   ```

## Key features

- **No Stale Closures**: Active callbacks are kept updated via internal React refs, ensuring that callbacks always access the latest React state without having to re-bind event listeners.
- **Auto Cleanup**: The hook removes the listener automatically when the component unmounts, avoiding memory leaks.
