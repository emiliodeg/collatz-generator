import collatz from './index';

describe('generate', () => {
  it('should get a finished generator for 1', () => {
    const generator = collatz.generate(1).next();

    expect(generator.value).toBe(1);
    expect(generator.done).toBe(true);
  });

  it('should get an unfinished generator for 2', () => {
    const result = collatz.generate(2).next();

    expect(result.value).toBe(1);
    expect(result.done).toBe(true);
  });

  it('should get an 10 for 3', () => {
    const result = collatz.generate(3).next();

    expect(result.value).toBe(10);
    expect(result.done).toBe(false);
  });

  it('should finish after 5 times using 5', () => {
    const generator = collatz.generate(5);

    let result = generator.next(); // 16

    expect(result.value).toBe(16);
    expect(result.done).toBe(false);

    generator.next(); // 8
    generator.next(); // 4
    generator.next(); // 2

    result = generator.next(); // 1 and done

    expect(result.value).toBe(1);
    expect(result.done).toBe(true);
  });

  it('should get an error with invalid input', () => {
    expect(() => collatz.generate(0).next()).toThrow(Error);
    expect(() => collatz.generate(-13).next()).toThrow(Error);
  });
});

describe('sequence', () => {
  it('should get min sequence', () => {
    const result = collatz.sequence(1);

    expect(result).toEqual([1]);
  });

  it('should get the right sequence for 2', () => {
    const result = collatz.sequence(2);

    expect(result).toEqual([2, 1]);
  });

  it('should get first value equal as init value', () => {
    const init = 4;
    const result = collatz.sequence(init);

    expect(result[0]).toBe(init);
  });

  it('should check long sequence', () => {
    const result = collatz.sequence(7);

    expect(result).toEqual([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]);
  });

  it('should contain 9232 on 27', () => {
    const result = collatz.sequence(27);

    expect(result).toContain(9232);
  });

  it('should get first item', () => {
    const result = collatz.sequence(7, 1);

    expect(result).toEqual([7]);
  });

  it('should get first 5 items', () => {
    const result = collatz.sequence(7, 5);

    expect(result).toEqual([7, 22, 11, 34, 17]);
  });
});

describe('detail', () => {
  it('should get a sequence', () => {
    const result = collatz.detail(13);

    expect(result.sequence).toEqual([13, 40, 20, 10, 5, 16, 8, 4, 2, 1]);
  });

  it('should get max', () => {
    const result = collatz.detail(13);

    expect(result.max).toBe(40);
  });

  it('should get min', () => {
    const result = collatz.detail(13);

    expect(result.min).toBe(1);
  });

  it('should get min and not finished', () => {
    const result = collatz.detail(13, 4);

    expect(result.min).toBe(10);
    expect(result.finished).toBe(false);
  });

  it('should get length and finished', () => {
    const result = collatz.detail(8);

    expect(result.length).toBe(4);
    expect(result.finished).toBe(true);
  });

  it('should count even and odd numbers', () => {
    const result = collatz.detail(19);

    expect(result.even).toBe(14);
    expect(result.odds).toBe(7);
  });

  it('should get primes numbers', () => {
    const result = collatz.detail(19);

    expect(result.primes).toEqual([19, 29, 11, 17, 13, 5, 2]);
  });
});
