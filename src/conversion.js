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

export const convert = (value, from, to) => {
  if (from === to) return value;
  const c = toCelsius(value, from);
  return fromCelsius(c, to);
};
