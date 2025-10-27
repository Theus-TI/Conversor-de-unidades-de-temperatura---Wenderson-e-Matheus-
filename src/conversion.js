export const toCelsius = (val, unit) => {
  switch (unit) {
    case 'C': return val;
    case 'F': return (val - 32) * 5/9;
    case 'K': return val - 273.15;
    default: return NaN;
  }
};

export const fromCelsius = (valC, unit) => {
  switch (unit) {
    case 'C': return valC;
    case 'F': return (valC * 9/5) + 32;
    case 'K': return valC + 273.15;
    default: return NaN;
  }
};

const PRECISION = 1e8; // 8 casas decimais
const precise = (x) => {
  if (!Number.isFinite(x)) return x;
  const y = Math.round((x + Number.EPSILON) * PRECISION) / PRECISION;
  return Object.is(y, -0) ? 0 : y;
};

export const convert = (value, from, to) => {
  if (from === to) return precise(value);
  const c = toCelsius(value, from);
  return precise(fromCelsius(c, to));
};
