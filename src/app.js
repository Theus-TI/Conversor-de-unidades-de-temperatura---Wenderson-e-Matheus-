const $ = (sel) => document.querySelector(sel);

window.addEventListener('DOMContentLoaded', () => {
  const fromValue = $('#fromValue');
  const toValue = $('#toValue');
  const fromUnit = $('#fromUnit');
  const toUnit = $('#toUnit');

  const cToF = (c) => (c * 9/5) + 32;
  const fToC = (f) => (f - 32) * 5/9;

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
      if ((from === 'C' && to === 'F') || (from === 'F' && to === 'C')) {
        if (source === 'from') {
          const val = parse(fromValue);
          if (val === null) {
            toValue.value = '';
          } else {
            toValue.value = from === 'C' ? cToF(val) : fToC(val);
          }
        } else {
          const val = parse(toValue);
          if (val === null) {
            fromValue.value = '';
          } else {
            fromValue.value = to === 'C' ? fToC(val) : cToF(val);
          }
        }
      } else {
        // fora do escopo deste commit
        if (source === 'from') toValue.value = '';
        if (source === 'to') fromValue.value = '';
      }
    } finally {
      isUpdating = false;
    }
  };

  fromValue.addEventListener('input', () => updateOpposite('from'));
  toValue.addEventListener('input', () => updateOpposite('to'));
});
