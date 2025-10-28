import { toCelsius, fromCelsius, convert } from '../src/conversion.js';

const approx = (a, b, eps = 1e-6) => Math.abs(a - b) < eps;

describe('toCelsius', () => {
  test('Celsius para Celsius', () => {
    expect(toCelsius(25, 'C')).toBe(25);
  });
  test('Fahrenheit para Celsius', () => {
    expect(approx(toCelsius(32, 'F'), 0)).toBe(true);
    expect(approx(toCelsius(212, 'F'), 100)).toBe(true);
  });
  test('Kelvin para Celsius', () => {
    expect(approx(toCelsius(273.15, 'K'), 0)).toBe(true);
    expect(approx(toCelsius(373.15, 'K'), 100)).toBe(true);
  });
});

describe('fromCelsius', () => {
  test('Celsius para Fahrenheit', () => {
    expect(approx(fromCelsius(0, 'F'), 32)).toBe(true);
    expect(approx(fromCelsius(100, 'F'), 212)).toBe(true);
  });
  test('Celsius para Kelvin', () => {
    expect(approx(fromCelsius(0, 'K'), 273.15)).toBe(true);
    expect(approx(fromCelsius(100, 'K'), 373.15)).toBe(true);
  });
});

describe('convert (genérico)', () => {
  test('C -> F', () => {
    expect(approx(convert(0, 'C', 'F'), 32)).toBe(true);
    expect(approx(convert(100, 'C', 'F'), 212)).toBe(true);
  });
  test('F -> C', () => {
    expect(approx(convert(32, 'F', 'C'), 0)).toBe(true);
    expect(approx(convert(212, 'F', 'C'), 100)).toBe(true);
  });
  test('K -> C', () => {
    expect(approx(convert(273.15, 'K', 'C'), 0)).toBe(true);
  });
  test('C -> K', () => {
    expect(approx(convert(0, 'C', 'K'), 273.15)).toBe(true);
  });
  test('F -> K', () => {
    expect(approx(convert(32, 'F', 'K'), 273.15)).toBe(true);
  });
  test('K -> F', () => {
    expect(approx(convert(273.15, 'K', 'F'), 32)).toBe(true);
  });
});
