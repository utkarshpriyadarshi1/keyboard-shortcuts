import { vi } from 'vitest';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';

// Mock jQuery on window before importing the module to ensure the plugin registers
const mockJQueryData = new Map<any, Map<string, any>>();
const mockJQuery = vi.fn((selector: any) => {
  const element =
    selector && typeof selector.addEventListener === 'function'
      ? selector
      : document.createElement('div');

  if (!mockJQueryData.has(element)) {
    mockJQueryData.set(element, new Map());
  }

  const chainObj = Object.assign(Object.create(mockJQuery.fn), {
    first() {
      return chainObj;
    },
    data(key: string, value?: any) {
      const store = mockJQueryData.get(element)!;
      if (value === undefined) {
        return store.get(key);
      }
      store.set(key, value);
      return chainObj;
    },
    each(callback: any) {
      callback.call(element);
      return chainObj;
    },
  });
  return chainObj;
}) as any;
mockJQuery.fn = {};
(window as any).jQuery = mockJQuery;

import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';

let KeyboardShortcutManager: any;
let useKeyboardShortcut: any;
let useKeyboardShortcuts: any;

beforeAll(async () => {
  // Suppress React act warnings in testing environments
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

  const mod = await import('../src/keyboard-shortcuts');
  KeyboardShortcutManager = mod.KeyboardShortcutManager;

  const reactMod = await import('../src/react');
  useKeyboardShortcut = reactMod.useKeyboardShortcut;
  useKeyboardShortcuts = reactMod.useKeyboardShortcuts;
});

describe('KeyboardShortcutManager', () => {
  let manager: any;

  beforeEach(() => {
    manager = new KeyboardShortcutManager();
  });

  afterEach(() => {
    manager.destroy();
    mockJQueryData.clear();
  });

  describe('Initialization', () => {
    it('should initialize with default document target', () => {
      expect(manager).toBeInstanceOf(KeyboardShortcutManager);
      expect(manager.getShortcuts()).toHaveLength(0);
    });

    it('should initialize with custom targetElement', () => {
      const el = document.createElement('div');
      const customManager = new KeyboardShortcutManager({ targetElement: el });
      expect(customManager).toBeInstanceOf(KeyboardShortcutManager);
      customManager.destroy();
    });
  });

  describe('Registering Shortcuts', () => {
    it('should register a shortcut successfully', () => {
      const callback = vi.fn();
      manager.register('Ctrl+S', callback, { scope: 'global', description: 'Save' });

      const list = manager.getShortcuts();
      expect(list).toHaveLength(1);
      expect(list[0].keyCombo).toBe('CTRL+S');
      expect(list[0].callback).toBe(callback);
      expect(list[0].config?.scope).toBe('global');
      expect(list[0].config?.description).toBe('Save');
    });

    it('should throw error if combination is empty', () => {
      expect(() => manager.register('', () => {})).toThrow('Shortcut key combination is required');
    });

    it('should throw error if callback is not a function', () => {
      expect(() => manager.register('Ctrl+S', null as unknown as () => void)).toThrow(
        'Callback must be a function',
      );
    });

    it('should normalize and handle whitespaces/casing', () => {
      manager.register('  ctrl  +   s  ', () => {});
      expect(manager.getShortcuts()[0].keyCombo).toBe('CTRL+S');
    });

    it('should normalize CONTROL modifier to CTRL', () => {
      manager.register('Control+S', () => {});
      expect(manager.getShortcuts()[0].keyCombo).toBe('CTRL+S');
    });

    it('should throw error for invalid key combination formats', () => {
      expect(() => manager.register('Ctrl', () => {})).toThrow(
        'Shortcuts must consist of exactly two keys',
      );
      expect(() => manager.register('Ctrl+Shift+S', () => {})).toThrow(
        'Shortcuts must consist of exactly two keys',
      );
      expect(() => manager.register('A+B', () => {})).toThrow('First key must be a modifier');
    });
  });

  describe('Keyboard Event Handling', () => {
    it('should trigger callback when matched shortcut keys are pressed', () => {
      const callback = vi.fn();
      manager.register('Ctrl+S', callback);

      const event = new KeyboardEvent('keydown', {
        key: 's',
        ctrlKey: true,
        cancelable: true,
      });
      const prevented = !document.dispatchEvent(event);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(prevented).toBe(true);
    });

    it('should match case-insensitively', () => {
      const callback = vi.fn();
      manager.register('Ctrl+S', callback);

      const event = new KeyboardEvent('keydown', {
        key: 'S',
        ctrlKey: true,
      });
      document.dispatchEvent(event);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should ignore input when modifier keys themselves are pressed', () => {
      const callback = vi.fn();
      manager.register('Ctrl+Control', callback);

      const event = new KeyboardEvent('keydown', {
        key: 'Control',
        ctrlKey: true,
      });
      document.dispatchEvent(event);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should prioritize modifiers by Ctrl > Alt > Shift', () => {
      const ctrlCallback = vi.fn();
      const altCallback = vi.fn();

      manager.register('Ctrl+K', ctrlCallback);
      manager.register('Alt+K', altCallback);

      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
        altKey: true,
      });
      document.dispatchEvent(event);

      expect(ctrlCallback).toHaveBeenCalledTimes(1);
      expect(altCallback).not.toHaveBeenCalled();
    });
  });

  describe('Unregistering Shortcuts', () => {
    it('should remove registered shortcuts', () => {
      const callback = vi.fn();
      manager.register('Ctrl+S', callback);
      expect(manager.getShortcuts()).toHaveLength(1);

      manager.unregister('Ctrl+S');
      expect(manager.getShortcuts()).toHaveLength(0);

      const event = new KeyboardEvent('keydown', {
        key: 's',
        ctrlKey: true,
      });
      document.dispatchEvent(event);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Clearing and Destroying', () => {
    it('should clear all shortcuts using clearAll', () => {
      manager.register('Ctrl+S', () => {});
      manager.register('Alt+K', () => {});
      expect(manager.getShortcuts()).toHaveLength(2);

      manager.clearAll();
      expect(manager.getShortcuts()).toHaveLength(0);
    });

    it('should remove event listeners upon destruction', () => {
      const callback = vi.fn();
      manager.register('Ctrl+S', callback);

      manager.destroy();

      const event = new KeyboardEvent('keydown', {
        key: 's',
        ctrlKey: true,
      });
      document.dispatchEvent(event);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('jQuery Plugin Extension', () => {
    it('should add the keyboardShortcuts function to jQuery prototype', () => {
      expect(mockJQuery.fn.keyboardShortcuts).toBeTypeOf('function');
    });

    it('should initialize KeyboardShortcutManager via jQuery call', () => {
      const el = document.createElement('div');
      const $el = mockJQuery(el);

      // Call jQuery plugin to initialize
      $el.keyboardShortcuts({});

      // Check if instance was created and stored in data
      const instance = $el.data('keyboardShortcutManager');
      expect(instance).toBeInstanceOf(KeyboardShortcutManager);
    });

    it('should proxy register and getShortcuts calls correctly', () => {
      const el = document.createElement('div');
      const $el = mockJQuery(el);

      // Initialize
      $el.keyboardShortcuts({});
      const instance = $el.data('keyboardShortcutManager') as KeyboardShortcutManager;
      expect(instance).toBeInstanceOf(KeyboardShortcutManager);

      // Register via jQuery call
      const callback = vi.fn();
      $el.keyboardShortcuts('register', 'Ctrl+S', callback);

      const shortcuts = $el.keyboardShortcuts('getShortcuts');
      expect(shortcuts).toHaveLength(1);
      expect(shortcuts[0].keyCombo).toBe('CTRL+S');
      expect(shortcuts[0].callback).toBe(callback);
    });
  });

  describe('React Hook Extension', () => {
    it('should register shortcut on mount and unregister on unmount', () => {
      const callback = vi.fn();

      function TestComponent() {
        useKeyboardShortcut('Ctrl+S', callback);
        return null;
      }

      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(React.createElement(TestComponent));
      });

      // Dispatch event
      const event = new KeyboardEvent('keydown', {
        key: 's',
        ctrlKey: true,
      });
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(1);

      // Unmount
      act(() => {
        root.unmount();
      });

      // Dispatch event again
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(1); // Should not increase

      document.body.removeChild(container);
    });

    it('should register multiple shortcuts using useKeyboardShortcuts hook', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      function TestComponent() {
        useKeyboardShortcuts([
          { keyCombo: 'Ctrl+S', callback: callback1 },
          { keyCombo: 'Alt+N', callback: callback2 },
        ]);
        return null;
      }

      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(React.createElement(TestComponent));
      });

      // Press Ctrl+S
      const event1 = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
      document.dispatchEvent(event1);
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).not.toHaveBeenCalled();

      // Press Alt+N
      const event2 = new KeyboardEvent('keydown', { key: 'n', altKey: true });
      document.dispatchEvent(event2);
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);

      act(() => {
        root.unmount();
      });
      document.body.removeChild(container);
    });
  });
});
