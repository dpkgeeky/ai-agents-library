/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toBeDefined(): R;
    toBeInstanceOf(expected: any): R;
    toThrow(): R;
  }
} 