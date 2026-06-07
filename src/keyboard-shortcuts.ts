/**
 * @file keyboard-shortcuts.ts
 * @description Modern, robust keyboard shortcut manager with optional jQuery integration.
 * @license GPL-3.0-or-later
 * @author Utkarsh Priyadarshi
 */

export interface KeyboardShortcutOptions {
  /**
   * The target element to listen to keyboard events on.
   * Defaults to `document`.
   */
  targetElement?: HTMLElement | Document;
}

export interface ShortcutConfig {
  /**
   * Optional scope/context for the shortcut (e.g., 'editor', 'global').
   */
  scope?: string;
  /**
   * Optional description of what the shortcut does.
   */
  description?: string;
}

export interface RegisteredShortcut {
  /**
   * Normalized key combination string (e.g., 'CTRL+S').
   */
  keyCombo: string;
  /**
   * The callback function executed when the shortcut is triggered.
   */
  callback: (event: KeyboardEvent) => void;
  /**
   * Additional configuration options.
   */
  config?: ShortcutConfig;
}

export class KeyboardShortcutManager {
  private targetElement: HTMLElement | Document;
  private registeredShortcuts: Map<string, RegisteredShortcut> = new Map();
  private keyDownHandler: (event: Event) => void;

  constructor(options: KeyboardShortcutOptions = {}) {
    this.targetElement =
      options.targetElement ||
      (typeof document !== 'undefined' ? document : (null as unknown as Document));

    this.keyDownHandler = (event: Event) => {
      this.handleKeyDown(event as KeyboardEvent);
    };

    if (this.targetElement) {
      this.targetElement.addEventListener('keydown', this.keyDownHandler);
    }
  }

  /**
   * Registers a new keyboard shortcut.
   * @param keyCombo The key combination (e.g. 'Ctrl+S', 'Alt+K')
   * @param callback Function to call when shortcut is triggered
   * @param config Additional shortcut configuration
   */
  public register(
    keyCombo: string,
    callback: (event: KeyboardEvent) => void,
    config?: ShortcutConfig,
  ): void {
    if (!keyCombo) {
      throw new Error('Shortcut key combination is required');
    }
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    const normalizedKey = this.normalizeKeyCombo(keyCombo);
    this.registeredShortcuts.set(normalizedKey, {
      keyCombo: normalizedKey,
      callback,
      config,
    });
  }

  /**
   * Unregisters a keyboard shortcut.
   * @param keyCombo The key combination to remove
   */
  public unregister(keyCombo: string): void {
    if (!keyCombo) return;
    try {
      const normalizedKey = this.normalizeKeyCombo(keyCombo);
      this.registeredShortcuts.delete(normalizedKey);
    } catch {
      // If normalization fails, it wasn't registered anyway
    }
  }

  /**
   * Returns all registered shortcuts.
   */
  public getShortcuts(): RegisteredShortcut[] {
    return Array.from(this.registeredShortcuts.values());
  }

  /**
   * Clears all registered shortcuts.
   */
  public clearAll(): void {
    this.registeredShortcuts.clear();
  }

  /**
   * Destroys this instance by removing all shortcuts and event listeners.
   */
  public destroy(): void {
    this.clearAll();
    if (this.targetElement) {
      this.targetElement.removeEventListener('keydown', this.keyDownHandler);
    }
  }

  /**
   * Normalizes shortcut string representation:
   * "Ctrl+S" -> "CTRL+S", "alt + k" -> "ALT+K"
   */
  private normalizeKeyCombo(keyCombo: string): string {
    const parts = keyCombo.split('+');
    if (parts.length !== 2) {
      throw new Error('Shortcuts must consist of exactly two keys (e.g., "Ctrl+S")');
    }

    let modifier = parts[0].trim().toUpperCase();
    const key = parts[1].trim().toUpperCase();

    if (modifier === 'CONTROL') {
      modifier = 'CTRL';
    }

    if (!['CTRL', 'ALT', 'SHIFT'].includes(modifier)) {
      throw new Error('First key must be a modifier: Ctrl, Alt, or Shift');
    }

    if (!key) {
      throw new Error('Second key cannot be empty');
    }

    return `${modifier}+${key}`;
  }

  /**
   * Event listener for the keydown event.
   */
  private handleKeyDown(event: KeyboardEvent): void {
    const activeKey = event.key;

    // Ignore if the pressed key is a modifier itself
    if (
      activeKey === 'Control' ||
      activeKey === 'Alt' ||
      activeKey === 'Shift' ||
      activeKey === 'Meta'
    ) {
      return;
    }

    // Identify primary modifier matching the original code's priority list
    let modifier: string | null = null;
    if (event.ctrlKey) {
      modifier = 'CTRL';
    } else if (event.altKey) {
      modifier = 'ALT';
    } else if (event.shiftKey) {
      modifier = 'SHIFT';
    }

    if (!modifier) {
      return;
    }

    const pressedCombo = `${modifier}+${activeKey.toUpperCase()}`;
    const shortcut = this.registeredShortcuts.get(pressedCombo);

    if (shortcut) {
      event.preventDefault();
      shortcut.callback(event);
    }
  }
}

// Expose globally for browser environments loading the library via <script>
if (typeof window !== 'undefined') {
  (window as any).KeyboardShortcutManager = KeyboardShortcutManager;

  // Optional jQuery plugin extension
  const g = window as any;
  if (g.jQuery) {
    g.jQuery.fn.keyboardShortcuts = function (
      this: any,
      action:
        | 'register'
        | 'unregister'
        | 'getShortcuts'
        | 'clearAll'
        | 'destroy'
        | KeyboardShortcutOptions,
      ...args: any[]
    ) {
      // Getter case
      if (action === 'getShortcuts') {
        const firstEl = this.first();
        const manager = firstEl.data('keyboardShortcutManager');
        return manager ? manager.getShortcuts() : [];
      }

      return this.each(function (this: HTMLElement) {
        const $el = g.jQuery(this);
        let manager = $el.data('keyboardShortcutManager');

        if (!manager) {
          if (typeof action === 'object' || !action) {
            manager = new KeyboardShortcutManager({ targetElement: this, ...action });
            $el.data('keyboardShortcutManager', manager);
          }
        } else {
          if (typeof action === 'string' && typeof (manager as any)[action] === 'function') {
            (manager as any)[action](...args);
          }
        }
      });
    };
  }
}

export default KeyboardShortcutManager;
