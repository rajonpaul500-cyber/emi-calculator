/* ==========================================================================
   EMI Master - Currency module
   UI stays in English; only the currency sign is selectable.
   - fmt(v): formats amounts with the active currency symbol + grouping
   - setCurrency(code): persists choice and fires 'localechange' so engines
     re-render every amount with the new currency.
   Default: USD ($).
   ========================================================================== */

(function () {
  'use strict';

  var CURRENCIES = {
    'USD': { name: 'US Dollar', symbol: '$', group: 'en-US' },
    'INR': { name: 'Indian Rupee', symbol: '\u20B9', group: 'en-IN' },
    'BDT': { name: 'Bangladeshi Taka', symbol: '\u09F3', group: 'en-IN' },
    'EUR': { name: 'Euro', symbol: '\u20AC', group: 'en-US' },
    'GBP': { name: 'British Pound', symbol: '\u00A3', group: 'en-US' },
    'CAD': { name: 'Canadian Dollar', symbol: 'C$', group: 'en-US' },
    'AUD': { name: 'Australian Dollar', symbol: 'A$', group: 'en-US' },
    'JPY': { name: 'Japanese Yen', symbol: '\u00A5', group: 'en-US' },
    'CNY': { name: 'Chinese Yuan', symbol: 'CN\u00A5', group: 'en-US' },
    'AED': { name: 'UAE Dirham', symbol: 'AED', group: 'en-US' },
    'SAR': { name: 'Saudi Riyal', symbol: 'SAR', group: 'en-US' },
    'PKR': { name: 'Pakistani Rupee', symbol: '\u20A8', group: 'en-IN' },
    'LKR': { name: 'Sri Lankan Rupee', symbol: 'LKR', group: 'en-IN' },
    'NPR': { name: 'Nepalese Rupee', symbol: 'NPR', group: 'en-IN' },
    'SGD': { name: 'Singapore Dollar', symbol: 'S$', group: 'en-US' },
    'IDR': { name: 'Indonesian Rupiah', symbol: 'Rp', group: 'en-US' },
    'VND': { name: 'Vietnamese Dong', symbol: '\u20AB', group: 'en-US' }
  };

  var KEY = 'emimaster-currency';
  var current = 'USD';

  try {
    var saved = localStorage.getItem(KEY);
    if (saved && CURRENCIES[saved]) current = saved;
  } catch (e) { /* storage unavailable */ }

  function get() { return current; }

  function currency() { return CURRENCIES[current]; }

  function currencySymbol() {
    return currency().symbol;
  }

  function fmt(v) {
    return currencySymbol() + ' ' + Math.round(v).toLocaleString(currency().group);
  }

  var KNOWN_SYMBOLS = ['\u20B9', '$', '\u09F3', '\u20AC', '\u00A3', '\u00A5', 'C$', 'A$', 'S$', 'CN\u00A5', 'AED', 'SAR', 'LKR', 'NPR', 'Rp', '\u20AB', 'Rs'];

  function syncPrefixes() {
    var sym = currencySymbol();
    var els = document.querySelectorAll('.prefix');
    for (var i = 0; i < els.length; i++) {
      var txt = els[i].textContent.trim();
      if (KNOWN_SYMBOLS.indexOf(txt) !== -1 && txt !== sym) {
        els[i].textContent = sym;
      }
    }
  }

  function setCurrency(code) {
    if (!CURRENCIES[code]) return;
    current = code;
    try { localStorage.setItem(KEY, code); } catch (e) { /* ignore */ }
    syncPrefixes();
    window.dispatchEvent(new CustomEvent('localechange', { detail: { currency: code } }));
  }

  window.I18N = {
    t: function (key) { return key; },
    p: function (phrase) { return phrase; },
    fmt: fmt,
    currencySymbol: currencySymbol,
    setCurrency: setCurrency,
    setLocale: setCurrency,
    get: get,
    syncPrefixes: syncPrefixes,
    currencies: CURRENCIES
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncPrefixes);
  } else {
    syncPrefixes();
  }
})();
