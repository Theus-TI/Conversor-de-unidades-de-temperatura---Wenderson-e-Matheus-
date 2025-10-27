const $ = (sel) => document.querySelector(sel);

window.addEventListener('DOMContentLoaded', () => {
  const fromValue = $('#fromValue');
  const toValue = $('#toValue');
  const fromUnit = $('#fromUnit');
  const toUnit = $('#toUnit');

  const cToF = (c) => (c * 9/5) + 32;
  const fToC = (f) => (f - 32) * 5/9;
  const toCelsius = (val, unit) => {
    switch (unit) {
      case 'C': return val;
      case 'F': return (val - 32) * 5/9;
      case 'K': return val - 273.15;
      default: return NaN;
    }
  };
  const fromCelsius = (valC, unit) => {
    switch (unit) {
      case 'C': return valC;
      case 'F': return (valC * 9/5) + 32;
      case 'K': return valC + 273.15;
      default: return NaN;
    }
  };
  const convert = (value, from, to) => {
    if (from === to) return value;
    const c = toCelsius(value, from);
    return fromCelsius(c, to);
  };

  let isUpdating = false;
  const parse = (el) => {
    const v = parseFloat(el.value);
    return Number.isFinite(v) ? v : null;
  };

  const updateOpposite = (source) => {
    if (isUpdating) return;
    isUpdating = true;
    try {
      const from = fromUnit.value;
      const to = toUnit.value;
      if (source === 'from') {
        const val = parse(fromValue);
        if (val === null) {
          toValue.value = '';
        } else if (from === 'K' && val < 0) {
          toValue.value = '';
        } else {
          toValue.value = convert(val, from, to);
        }
      } else {
        const val = parse(toValue);
        if (val === null) {
          fromValue.value = '';
        } else if (to === 'K' && val < 0) {
          fromValue.value = '';
        } else {
          fromValue.value = convert(val, to, from);
        }
      }
    } finally {
      isUpdating = false;
    }
  };

  fromValue.addEventListener('input', () => updateOpposite('from'));
  toValue.addEventListener('input', () => updateOpposite('to'));
  const recalcOnUnitsChange = () => {
    const fv = parse(fromValue);
    const tv = parse(toValue);
    if (fv !== null) return updateOpposite('from');
    if (tv !== null) return updateOpposite('to');
    fromValue.value = '';
    toValue.value = '';
  };
  fromUnit.addEventListener('change', recalcOnUnitsChange);
  toUnit.addEventListener('change', recalcOnUnitsChange);
});
