/**
 * @file react.ts
 * @description React hooks for KeyboardShortcutManager.
 * @license GPL-3.0-or-later
 * @author Utkarsh Priyadarshi
 */

import { useEffect, useRef } from 'react';
import {
  KeyboardShortcutManager,
  KeyboardShortcutOptions,
  ShortcutConfig,
} from './keyboard-shortcuts';

export interface HookShortcutConfig extends ShortcutConfig {
  keyCombo: string;
  callback: (event: KeyboardEvent) => void;
}

/**
 * React hook to register a single keyboard shortcut.
 *
 * @param keyCombo The key combination (e.g. 'Ctrl+S', 'Alt+K')
 * @param callback Callback function executed when shortcut is triggered
 * @param config Optional configuration including scope, description, and targetElement
 */
export function useKeyboardShortcut(
  keyCombo: string,
  callback: (event: KeyboardEvent) => void,
  config: ShortcutConfig & KeyboardShortcutOptions = {},
): void {
  const callbackRef = useRef(callback);

  // Keep callback reference updated to prevent stale closures without re-binding
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const target = config.targetElement || (typeof document !== 'undefined' ? document : null);
    if (!target) return;

    const manager = new KeyboardShortcutManager({ targetElement: target });
    manager.register(
      keyCombo,
      (event) => {
        callbackRef.current(event);
      },
      config,
    );

    return () => {
      manager.destroy();
    };
  }, [keyCombo, config.targetElement, config.scope, config.description]);
}

/**
 * React hook to register multiple keyboard shortcuts on a target element.
 *
 * @param shortcuts Array of key combinations and callbacks
 * @param options General manager options (e.g. targetElement)
 */
export function useKeyboardShortcuts(
  shortcuts: HookShortcutConfig[],
  options: KeyboardShortcutOptions = {},
): void {
  const shortcutsRef = useRef(shortcuts);

  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  useEffect(() => {
    const target = options.targetElement || (typeof document !== 'undefined' ? document : null);
    if (!target) return;

    const manager = new KeyboardShortcutManager({ targetElement: target });

    for (const item of shortcutsRef.current) {
      manager.register(
        item.keyCombo,
        (event) => {
          // Find target callback in latest ref to prevent stale closures
          const targetShortcut = shortcutsRef.current.find(
            (s) => s.keyCombo.toUpperCase() === item.keyCombo.toUpperCase(),
          );
          if (targetShortcut) {
            targetShortcut.callback(event);
          }
        },
        item,
      );
    }

    return () => {
      manager.destroy();
    };
  }, [options.targetElement]);
}
