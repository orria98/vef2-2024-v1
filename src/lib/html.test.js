import { describe, expect, it } from '@jest/globals';
import { indexTemplate } from './html';

describe('html', () => {
  describe('indexTemplate', () => {
    it('should have a test', () => {

      expect(indexTemplate().length).toBeGreaterThan(1);
    });
  });
});
