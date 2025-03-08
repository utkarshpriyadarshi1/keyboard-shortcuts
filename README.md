# Keyboard Shortcuts Library

## Overview
This library allows for the creation of custom keyboard shortcuts for web applications. It is designed to be flexible and easy to integrate into any JavaScript-based project.

## Features
- Define custom keyboard shortcuts
- Easy integration with any JavaScript project
- Lightweight and efficient
- Supports complex key combinations

## Technologies Used
- JavaScript
- HTML

## Prerequisites
- Node.js (for development)
- npm (for package management)

## Installation Guide
1. Clone the repository:
    ```sh
    git clone https://github.com/utkarshpriyadarshi1/keyboard-shortcuts.git
    ```
2. Navigate to the project directory:
    ```sh
    cd keyboard-shortcuts
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Deployment Guide
1. Build the project:
    ```sh
    npm run build
    ```
2. Deploy the contents of the `dist` directory to your web server.

## Usage Guide
1. Import the library:
    ```html
    <script src="path/to/keyboard-shortcuts.js"></script>
    ```
2. Define your keyboard shortcuts:
    ```javascript
    const shortcuts = new KeyboardShortcuts();
    shortcuts.add('Ctrl+S', () => {
        console.log('Save');
    });
    ```

## Contributing Guide
1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```sh
    git push origin feature-branch
    ```
5. Create a pull request.

## Security Guidelines
- Report any security vulnerabilities to the repository maintainer.
- Follow best practices for secure coding.
- Regularly update dependencies to patch known vulnerabilities.

## Project Structure
- `src/`: Source code for the library
- `dist/`: Compiled code ready for deployment
- `docs/`: Documentation files
- `tests/`: Unit tests

### Status: Initial working fine.
### Current Limitation: 
1. Key combo must be a pair of two keys.
2. Key combo must have first key as either ALT, CTRL or SHIFT key.
3. Use of key '+' is not allowed.

***Any suggestions, errors or issues are warmly welcomed.***
