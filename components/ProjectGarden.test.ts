import { describe, it, expect } from 'vitest';
import { rowEndFor } from './ProjectGarden';

// rowEndFor decides which grid cell holds the in-flow detail panel: the last
// cell of the open tile's row, clamped to the final tile when the last row is
// short. cols mirrors the garden's grid classes (2 below sm, 3 from sm up).
describe('rowEndFor', () => {
  it('ends each row at the next multiple of the column count (2-col)', () => {
    expect(rowEndFor(0, 2, 6)).toBe(1);
    expect(rowEndFor(1, 2, 6)).toBe(1);
    expect(rowEndFor(2, 2, 6)).toBe(3);
    expect(rowEndFor(4, 2, 6)).toBe(5);
  });

  it('ends each row at the next multiple of the column count (3-col)', () => {
    expect(rowEndFor(0, 3, 6)).toBe(2);
    expect(rowEndFor(2, 3, 6)).toBe(2);
    expect(rowEndFor(3, 3, 6)).toBe(5);
  });

  it('clamps to the last tile when the final row is short', () => {
    // 5 tiles in 3 columns: the last row is [3, 4], so 3 ends at 4, not 5.
    expect(rowEndFor(3, 3, 5)).toBe(4);
    expect(rowEndFor(4, 3, 5)).toBe(4);
    // 4 tiles in 3 columns: the only cell of the short row is its own end.
    expect(rowEndFor(3, 3, 4)).toBe(3);
  });

  it('handles a single tile', () => {
    expect(rowEndFor(0, 2, 1)).toBe(0);
    expect(rowEndFor(0, 3, 1)).toBe(0);
  });
});
