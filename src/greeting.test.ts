import { describe, expect, it } from 'vitest';

import { starterMessage } from './greeting';

describe('starterMessage', () => {
  it('includes a trimmed product name', () => {
    expect(starterMessage('  something great  ')).toBe(
      'Ready to build something great.',
    );
  });

  it('handles an empty product name', () => {
    expect(starterMessage('   ')).toBe('Ready to build.');
  });
});
