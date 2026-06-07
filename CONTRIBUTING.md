# Contributing to Keyboard Shortcuts Library

Thank you for your interest in contributing to the Keyboard Shortcuts Library! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Ways to Contribute

- **Report bugs**: Found a bug? Please open an issue with a clear description and steps to reproduce.
- **Suggest features**: Have an idea for a new feature? Open an issue to discuss it.
- **Improve documentation**: Help us improve our docs, examples, or guides.
- **Submit code**: Fix bugs or implement features with a pull request.
- **Write tests**: Help improve code coverage and test reliability.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```sh
   git clone https://github.com/your-username/keyboard-shortcuts.git
   cd keyboard-shortcuts
   ```
3. **Create a branch** for your work:
   ```sh
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```sh
   npm install
   ```

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write tests for new features
- Run tests before submitting a PR:
  ```sh
  npm test
  ```
- Ensure all tests pass

### Commits

- Use clear, descriptive commit messages
- Follow the format: `[type]: description`
- Types: `feat` (feature), `fix` (bug fix), `docs` (documentation), `style` (formatting), `test` (tests), `refactor` (refactoring)
- Example: `feat: add support for triple key combinations`

## Submitting Changes

### Before You Submit

1. **Check existing issues and PRs** to avoid duplicates
2. **Update your branch** with the latest changes from main
3. **Test your changes** thoroughly
4. **Update documentation** if needed

### Pull Request Process

1. **Push to your fork**:
   ```sh
   git push origin feature/your-feature-name
   ```
2. **Open a Pull Request** on GitHub with:
   - Clear title describing the changes
   - Detailed description of what changed and why
   - Reference to any related issues (e.g., "Closes #123")
   - Screenshots or examples if applicable
3. **Respond to feedback** - maintainers may request changes
4. **Wait for approval** - a maintainer will review and merge when ready

## Reporting Issues

### Bug Reports

Include:

- Clear description of the bug
- Steps to reproduce
- Expected behavior vs actual behavior
- JavaScript version and browser/environment
- Any error messages or logs

### Feature Requests

Include:

- Clear description of the feature
- Use case and why it's needed
- Examples of how it would be used
- Any related issues or discussions

## Development Setup

### Build the project:

```sh
npm run build
```

### Run tests:

```sh
npm test
```

### Watch for changes during development:

```sh
npm run dev
```

## Project Structure

```
keyboard-shortcuts/
├── src/              # Source code
├── dist/             # Compiled/built files
├── test/             # Unit test files
├── package.json      # Project metadata
└── README.md         # Project README
```

## Questions or Need Help?

- Check existing issues and discussions
- Open a new issue with your question
- Review the sample integrations in `/sample`

## Recognition

Contributors who submit accepted pull requests will be recognized in:

- Release notes
- Contributors list in README

## License

By contributing to this project, you agree that your contributions will be licensed under the same GNU General Public License v3.0 (GPL-3.0) as the project.

## Additional Resources

- [GitHub's guide to contributing](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
- [How to write a good commit message](https://cbea.ms/git-commit/)
- [Pull Request Best Practices](https://github.com/github/gitignore)

Thank you for contributing! 🎉
