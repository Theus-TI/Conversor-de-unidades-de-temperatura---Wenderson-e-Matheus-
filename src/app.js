import { convert } from './conversion.js';
const $ = (sel) => document.querySelector(sel);

window.addEventListener('DOMContentLoaded', () => {
  const fromValue = $('#fromValue');
  const toValue = $('#toValue');
  const fromUnit = $('#fromUnit');
  const toUnit = $('#toUnit');
  const swapButton = document.querySelector('#swapButton');
  const statusEl = document.querySelector('#status');
  const themeToggle = document.querySelector('#themeToggle');
  const historyList = document.querySelector('#historyList');
  const clearHistoryBtn = document.querySelector('#clearHistory');

  

  let isUpdating = false;
  const parse = (el) => {
    const raw = (el.value || '').trim().replace(',', '.');
    const v = parseFloat(raw);
    return Number.isFinite(v) ? v : null;
  };

  // format output only (no grouping, up to 4 decimals)
  const numberFormatter = new Intl.NumberFormat(undefined, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
  const formatNumber = (n) => numberFormatter.format(n);
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

  const THEME_KEY = 'theme';
  const HISTORY_KEY = 'history';
  const applyTheme = (t) => { document.documentElement.setAttribute('data-theme', t); };
  const getSystemPref = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const loadTheme = () => localStorage.getItem(THEME_KEY) || getSystemPref();
  const setTheme = (t) => { localStorage.setItem(THEME_KEY, t); applyTheme(t); };
  setTheme(loadTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || loadTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  const loadHistory = () => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
  };
  let history = loadHistory();
  const saveHistory = () => { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50))); };
  const renderHistory = () => {
    if (!historyList) return;
    historyList.innerHTML = '';
    history.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      historyList.appendChild(li);
    });
  };
  renderHistory();
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      history = [];
      saveHistory();
      renderHistory();
    });
  }

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
            toValue.value = formatNumber(result);
            setInvalid(fromValue, false);
            setStatus('');
            flash(toValue);
            if (Number.isFinite(val) && Number.isFinite(result)) {
              const entry = `${formatNumber(val)} ${from} → ${formatNumber(result)} ${to}`;
              history.unshift(entry);
              saveHistory();
              renderHistory();
            }
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
            fromValue.value = formatNumber(result);
            setInvalid(toValue, false);
            setStatus('');
            flash(fromValue);
            if (Number.isFinite(val) && Number.isFinite(result)) {
              const entry = `${formatNumber(val)} ${to} → ${formatNumber(result)} ${from}`;
              history.unshift(entry);
              saveHistory();
              renderHistory();
            }
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

  // Atalhos de teclado
  window.addEventListener('keydown', (e) => {
    if (!e.ctrlKey) return;
    switch (e.key.toLowerCase()) {
      case 'i': // Ctrl+I: inverter
        e.preventDefault();
        swapButton?.click();
        break;
      case 'l': // Ctrl+L: limpar histórico
        e.preventDefault();
        clearHistoryBtn?.click();
        break;
      case '1': // Ctrl+1: focar origem
        e.preventDefault();
        fromValue?.focus();
        break;
      case '2': // Ctrl+2: focar destino
        e.preventDefault();
        toValue?.focus();
        break;
      default:
        break;
    }
  });
})
