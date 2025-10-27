const $ = (sel) => document.querySelector(sel);

window.addEventListener('DOMContentLoaded', () => {
  const fromValue = $('#fromValue');
  const toValue = $('#toValue');
  const fromUnit = $('#fromUnit');
  const toUnit = $('#toUnit');
  const swapButton = document.querySelector('#swapButton');
  const statusEl = document.querySelector('#status');

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
  const flash = (el) => { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); };
  const setStatus = (msg) => { if (statusEl) statusEl.textContent = msg || ''; };
  const setInvalid = (el, invalid) => {
    if (!el) return;
    if (invalid) {
      el.classList.add('invalid');
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.classList.remove('invalid');
      el.removeAttribute('aria-invalid');
    }
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
          setInvalid(fromValue, false);
          setStatus('');
        } else if (from === 'K' && val < 0) {
          toValue.value = '';
          setInvalid(fromValue, true);
          setStatus('Kelvin não pode ser negativo.');
        } else {
          const result = convert(val, from, to);
          if (to === 'K' && result < 0) {
            toValue.value = '';
            setInvalid(fromValue, true);
            setStatus('Kelvin não pode ser negativo.');
          } else {
            toValue.value = result;
            setInvalid(fromValue, false);
            setStatus('');
            flash(toValue);
          }
        }
      } else {
        const val = parse(toValue);
        if (val === null) {
          fromValue.value = '';
          setInvalid(toValue, false);
          setStatus('');
        } else if (to === 'K' && val < 0) {
          fromValue.value = '';
          setInvalid(toValue, true);
          setStatus('Kelvin não pode ser negativo.');
        } else {
          const result = convert(val, to, from);
          if (from === 'K' && result < 0) {
            fromValue.value = '';
            setInvalid(toValue, true);
            setStatus('Kelvin não pode ser negativo.');
          } else {
            fromValue.value = result;
            setInvalid(toValue, false);
            setStatus('');
            flash(fromValue);
          }
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
  if (swapButton) {
    swapButton.addEventListener('click', () => {
      if (isUpdating) return;
      const u1 = fromUnit.value; const u2 = toUnit.value;
      fromUnit.value = u2; toUnit.value = u1;
      const v1 = parse(fromValue); const v2 = parse(toValue);
      if (v1 !== null) {
        updateOpposite('from');
      } else if (v2 !== null) {
        updateOpposite('to');
      }
      flash(fromValue); flash(toValue);
    });
  }
})
