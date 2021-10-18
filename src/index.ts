const generate = function* (num: number) {
  if (num <= 0) {
    throw new Error('Collatz number must be greater than 0');
  }

  while (num > 2) {
    if (num % 2 === 0) {
      num /= 2;
    } else {
      num = 3 * num + 1;
    }

    yield num;
  }

  return 1;
};

const sequence = (start: number, limit?: number): number[] => {
  const result: number[] = [start];

  if (start === 1 || limit === 1) {
    return result;
  }

  const generator = generate(start);

  let current;
  do {
    current = generator.next();

    result.push(current.value);

    if (limit != null && result.length >= limit) {
      break;
    }
  } while (!current.done);

  return result;
};

const detail = (
  start: number,
  limit?: number
): {
  sequence: number[];
  max: number;
  min: number;
  length: number;
  finished: boolean;
  even: number;
  odds: number;
  primes: number[];
} => {
  const result = sequence(start, limit);

  const even = result.filter((num) => num % 2 === 0).length;
  const finished = result[result.length - 1] === 1;
  const isPrime = (num: number) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) {
        return false;
      }
    }

    return num > 1;
  };

  return {
    sequence: result,
    max: Math.max(...result),
    min: finished ? 1 : Math.min(...result),
    length: result.length,
    finished,
    even,
    odds: result.length - even,
    primes: result.filter(isPrime)
  };
};

export default { generate, sequence, detail };

export { generate, sequence, detail };
