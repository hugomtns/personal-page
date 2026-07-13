import { describe, it, expect } from 'vitest';
import { roles, education, certifications } from './cv';

describe('cv data', () => {
  it('lists all five roles, most recent first', () => {
    expect(roles).toHaveLength(5);
    expect(roles[0].company).toBe('PVcase');
    expect(roles[0].end).toBe('Present');
    expect(roles[4].company).toBe('ResearchGate');
  });

  it('gives every role at least one story to expand into', () => {
    for (const role of roles) {
      expect(role.stories.length).toBeGreaterThan(0);
    }
  });

  it('keeps the headline outcomes that carry the leadership case', () => {
    const all = JSON.stringify(roles);
    expect(all).toContain('4M');   // ResearchGate ARR
    expect(all).toContain('95%');  // Staffbase CSAT
  });

  it('lists education and certifications', () => {
    expect(education).toHaveLength(2);
    expect(certifications).toHaveLength(2);
  });
});
