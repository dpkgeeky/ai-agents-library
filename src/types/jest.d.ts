declare namespace jest {
  interface Matchers<R> {
    toBeDefined(): R;
    toBeGreaterThan(expected: number): R;
    toThrow(): R;
    toBe(expected: any): R;
    toBeInstanceOf(expected: any): R;
    rejects: {
      toThrow(): Promise<R>;
    };
  }
}

declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void | Promise<void>): void;
declare function beforeEach(fn: () => void | Promise<void>): void;
declare function expect(value: any): jest.Matchers<any>; 