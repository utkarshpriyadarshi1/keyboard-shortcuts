import React, { useState } from 'react';
import { useKeyboardShortcut } from 'keyboard-shortcuts-library/react';

export default function App() {
  const [saveCount, setSaveCount] = useState(0);

  // Register Ctrl+S globally
  useKeyboardShortcut(
    'Ctrl+S',
    (event) => {
      setSaveCount((prev) => prev + 1);
      console.log('Document saved successfully via react hook!');
    },
    { scope: 'global', description: 'Trigger save file' },
  );

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: '600px',
        margin: '40px auto',
        padding: '24px',
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
    >
      <h1>React Integration Sample</h1>
      <p>
        This component uses the custom React hook <code>useKeyboardShortcut</code>.
      </p>
      <p>
        Press{' '}
        <kbd
          style={{
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '2px 6px',
            fontFamily: 'monospace',
          }}
        >
          Ctrl+S
        </kbd>{' '}
        to save.
      </p>

      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '6px',
          color: '#166534',
          fontWeight: 'bold',
        }}
      >
        Simulated Save Count: {saveCount}
      </div>
    </div>
  );
}
