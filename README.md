# Keyboard Shortcuts Library

A lightweight, flexible JavaScript library for creating and managing custom keyboard shortcuts in web applications.

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)

## Overview

This library allows for the creation of custom keyboard shortcuts for web applications. It is designed to be flexible and easy to integrate into any JavaScript-based project. Whether you're building a productivity app, a code editor, or any web application that needs keyboard shortcuts, this library has you covered.

## Features

- ✨ **Easy to use** - Simple API for defining and managing shortcuts
- 🎯 **Flexible** - Support for complex key combinations
- ⚡ **Lightweight** - Minimal footprint, no dependencies
- 🔌 **Easy integration** - Works with any JavaScript project
- 🛡️ **Type-safe** - Well-documented with clear examples
- 📱 **Cross-platform** - Works on all modern browsers

## Technologies Used

- **JavaScript** - Core functionality (88.2% of codebase)
- **HTML** - Examples and documentation (11.8% of codebase)

## Prerequisites

- **Node.js** (v12 or higher) - for development and building
- **npm** or **yarn** - for package management
- **Modern browser** - Chrome, Firefox, Safari, Edge with ES6+ support

## Installation

### Via npm

```sh
npm install keyboard-shortcuts-library
```

### Via yarn

```sh
yarn add keyboard-shortcuts-library
```

### Manual Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/utkarshpriyadarshi1/keyboard-shortcuts.git
   cd keyboard-shortcuts
   ```

2. Navigate to the project directory:
   ```sh
   cd keyboard-shortcuts
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Quick Start

### Basic Usage

```html
<script src="path/to/keyboard-shortcuts.global.js"></script>

<script>
  // Initialize the library
  const manager = new KeyboardShortcutManager();

  // Register a simple shortcut
  manager.register('Ctrl+S', () => {
    console.log('Save triggered!');
  });

  // Register another shortcut
  manager.register('Alt+N', () => {
    console.log('New file created!');
  });
</script>
```

### Advanced Usage

```javascript
// Create manager instance with custom target element
const manager = new KeyboardShortcutManager({ targetElement: document.getElementById('editor') });

// Register shortcut with configuration options
manager.register('Ctrl+Z', () => {
  console.log('Undo action');
}, { scope: 'editor', description: 'Undo last action' });

// Unregister a shortcut
manager.unregister('Ctrl+S');

// Get all shortcuts
const allShortcuts = manager.getShortcuts();

// Clear all shortcuts
manager.clearAll();

// Destroy instance and remove event listeners
manager.destroy();
```

### jQuery Plugin Extension (Optional)

If jQuery is loaded in your environment, you can optionally use it as a jQuery plugin:

```javascript
// Initialize on target element
const $editor = $('#editor').keyboardShortcuts({ scope: 'editor' });

// Register shortcuts
$editor.keyboardShortcuts('register', 'Ctrl+S', () => {
  console.log('Save editor content!');
});

// Retrieve registered shortcuts
const shortcuts = $editor.keyboardShortcuts('getShortcuts');

// Unregister a shortcut
$editor.keyboardShortcuts('unregister', 'Ctrl+S');

// Clear all shortcuts
$editor.keyboardShortcuts('clearAll');

// Destroy the manager instance
$editor.keyboardShortcuts('destroy');
```

### React Hook Extension (Optional)

In React projects, you can use the built-in React hooks to declare keyboard shortcuts. The hook automatically handles registering the shortcut on mount and unregistering/cleaning it up on unmount to prevent memory leaks.

```javascript
import { useKeyboardShortcut, useKeyboardShortcuts } from 'keyboard-shortcuts-library/react';

function MyComponent() {
  // Register a single shortcut
  useKeyboardShortcut('Ctrl+S', (event) => {
    console.log('Document saved!');
  }, { scope: 'editor', description: 'Save document' });

  // Or register multiple shortcuts at once
  useKeyboardShortcuts([
    { keyCombo: 'Ctrl+Z', callback: () => console.log('Undo!') },
    { keyCombo: 'Ctrl+Y', callback: () => console.log('Redo!') }
  ]);

  return <div>My Editor Component</div>;
}
```

## API Documentation

### Constructor

```javascript
const manager = new KeyboardShortcutManager(options);
```

#### Options
- **targetElement** (HTMLElement | Document, optional): The target element to listen to keyboard events on. Defaults to `document`.

### Methods

#### `register(keyCombo, callback, config)`

Registers a new keyboard shortcut.

- **keyCombo** (string): The key combination (e.g., 'Ctrl+S', 'Alt+D')
- **callback** (function): Function to execute when shortcut is triggered
- **config** (object, optional): Additional configuration
  - **scope** (string): Optional scope/context for the shortcut
  - **description** (string): Optional description of what the shortcut does

```javascript
manager.register('Ctrl+S', () => {
  saveDocument();
}, { description: 'Save document', scope: 'document-editor' });
```

#### `unregister(keyCombo)`

Removes a keyboard shortcut.

```javascript
manager.unregister('Ctrl+S');
```

#### `getShortcuts()`

Returns all registered shortcuts.

```javascript
const shortcuts = manager.getShortcuts();
console.log(shortcuts);
```

#### `clearAll()`

Removes all shortcuts.

```javascript
manager.clearAll();
```

#### `destroy()`

Removes all shortcuts and unbinds all keydown event listeners from the target element.

```javascript
manager.destroy();
```

## Deployment

### Build the project:

```sh
npm run build
```

### Deploy:

The compiled files in the `dist/` directory are ready for deployment:

```sh
# Copy dist folder to your web server
cp -r dist/ /var/www/html/keyboard-shortcuts/
```

## Project Structure

```
keyboard-shortcuts/
├── src/                 # Source code
│   └── keyboard-shortcuts.ts # Main TypeScript library file
├── dist/               # Compiled/bundled assets (ESM, CJS, Browser)
├── test/               # Unit tests using Vitest & happy-dom
├── .gitignore          # Git ignore rules
├── package.json        # Project metadata and dependencies
├── LICENSE             # GPL-3.0 License
├── CONTRIBUTING.md     # Contribution guidelines
└── README.md           # This file
```

## Current Limitations

⚠️ Please note the following limitations:

1. **Key pairs only** - Key combinations must consist of exactly two keys
2. **Modifier keys** - The first key must be either `ALT`, `CTRL`, or `SHIFT`
3. **Special character** - The `+` character cannot be used in shortcuts

**Future versions will address these limitations!**

## Security Guidelines

- 🔒 **Report vulnerabilities responsibly** - Email security concerns to the repository maintainer
- 📦 **Keep dependencies updated** - Regularly run `npm update` to patch vulnerabilities
- 🛡️ **Follow secure coding practices** - Avoid evaluating user input as code
- 🔐 **Validate inputs** - Always sanitize and validate keyboard input

## Contributing

We welcome contributions from the community! Whether you want to report bugs, suggest features, or submit code, please:

1. **Read our [Contributing Guidelines](./CONTRIBUTING.md)**
2. **Check existing issues** to avoid duplicates
3. **Follow our code style** and conventions
4. **Write tests** for new features
5. **Submit a pull request** with a clear description

### Quick Contribution Steps

```bash
# Fork the repository
git clone https://github.com/your-username/keyboard-shortcuts.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m 'feat: add amazing feature'

# Push to your fork
git push origin feature/amazing-feature

# Create a pull request on GitHub
```

## Reporting Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/utkarshpriyadarshi1/keyboard-shortcuts/issues) with:

- Clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Your environment details

## Support

- 📖 Check the [docs](./docs/) folder for detailed documentation
- 💬 Open an issue for questions or discussions
- 📝 Review [examples](./docs/examples.md) for usage patterns

## Roadmap

- [ ] Support for multi-key combinations (more than 2 keys)
- [ ] Platform-specific shortcuts (Mac Cmd key)
- [ ] Shortcut conflict detection
- [ ] Built-in shortcut presets (VS Code, Emacs, Vim-style)
- [ ] TypeScript support
- [ ] Improved documentation and examples
- [ ] Performance benchmarking

## License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](./LICENSE) file for details.

Under GPL-3.0:
- ✅ You can use this in any project (proprietary or open source)
- ✅ You can modify the code
- ✅ You can distribute it
- ⚠️ You must disclose changes and use the same license

## Acknowledgments

- Thanks to all [contributors](https://github.com/utkarshpriyadarshi1/keyboard-shortcuts/graphs/contributors) who have helped improve this library
- Inspired by keyboard shortcut libraries in popular code editors
- Community feedback and suggestions

## Author

**Utkarsh Priyadarshi**

- GitHub: [@utkarshpriyadarshi1](https://github.com/utkarshpriyadarshi1)
- Open to questions, suggestions, and collaboration!

## Contact & Support

- 🐛 **Report bugs**: [Open an issue](https://github.com/utkarshpriyadarshi1/keyboard-shortcuts/issues)
- 💡 **Feature requests**: [GitHub Discussions](https://github.com/utkarshpriyadarshi1/keyboard-shortcuts/discussions)
- 📧 **Questions?**: Feel free to open an issue!

---

**Status:** Initial working fine. 
**Any suggestions, errors, or issues are warmly welcomed!** 🎉

**Help us improve!** ⭐ Star this repository if you find it useful, and consider contributing!