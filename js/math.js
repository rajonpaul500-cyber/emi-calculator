/* EMI Master - Math Calculators logic */
window.MathCalc = (function () {
    'use strict';

    function fmt(n, dp) {
        if (n === null || n === undefined || isNaN(n)) return '—';
        dp = dp || 4;
        return Number(n).toLocaleString('en-US', { maximumFractionDigits: dp });
    }

    function round(n, dp) {
        var m = Math.pow(10, dp || 4);
        return Math.round(n * m) / m;
    }

    /* ---------- Scientific ---------- */
    function scientific(expr) {
        try {
            // Replace symbols
            var e = expr
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/\^/g, '**')
                .replace(/π/g, Math.PI)
                .replace(/√\(/g, 'Math.sqrt(')
                .replace(/√/g, 'Math.sqrt(');

            // Allowed: numbers, operators, (), ., functions
            if (!/^[0-9+\-*/().\sMathsqrt.cossintanloglneE%]+$/.test(e)) {
                return { error: 'Invalid expression' };
            }
            e = e.replace(/Math\.Math\./g, 'Math.');
            // Convert function names
            e = e.replace(/Math\.Math\./g, 'Math.');
            var result = Function('"use strict"; return (' + e + ')')();
            if (typeof result !== 'number' || !isFinite(result)) return { error: 'Invalid result' };
            return { value: result };
        } catch (err) {
            return { error: 'Invalid expression' };
        }
    }

    /* ---------- Fraction ---------- */
    function gcd(a, b) {
        a = Math.abs(a); b = Math.abs(b);
        while (b) { var t = b; b = a % b; a = t; }
        return a;
    }

    function fraction(dec, tol) {
        tol = tol || 1e-8;
        var neg = dec < 0;
        dec = Math.abs(dec);
        var num = 1, den = 1, x = dec, prevDen = 0;
        for (var i = 0; i < 1000; i++) {
            var floor = Math.floor(x);
            var newNum = floor * num + (i === 0 ? 0 : prevDen === 0 ? 1 : prevDen);
            // Simpler continued fraction
        }
        // Simple approach - search denominators
        for (var d = 1; d <= 10000; d++) {
            var n = Math.round(dec * d);
            if (Math.abs(n / d - dec) < tol) {
                var g = gcd(n, d);
                num = n / g; den = d / g;
                break;
            }
        }
        return { numerator: neg ? -num : num, denominator: den };
    }

    /* ---------- Percentage ---------- */
    function percentage(value, percent) {
        return { value: value * percent / 100 };
    }

    function percentChange(from, to) {
        if (!from) return { error: 'Starting value cannot be zero' };
        return { value: (to - from) / from * 100 };
    }

    /* ---------- Random Number ---------- */
    function randomInt(min, max, count) {
        if (min > max) { var t = min; min = max; max = t; }
        min = Math.ceil(min); max = Math.floor(max);
        var out = [];
        for (var i = 0; i < count; i++) {
            out.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return out;
    }

    function randomFloat(min, max, count, decimals) {
        var out = [];
        for (var i = 0; i < count; i++) {
            var v = Math.random() * (max - min) + min;
            out.push(round(v, decimals || 4));
        }
        return out;
    }

    /* ---------- Percent Error ---------- */
    function percentError(observed, trueVal) {
        if (trueVal === 0) return { error: 'True/expected value cannot be zero' };
        return { value: Math.abs((observed - trueVal) / trueVal) * 100 };
    }

    /* ---------- Exponent ---------- */
    function exponent(base, exp) {
        return { value: Math.pow(base, exp) };
    }

    /* ---------- Binary ---------- */
    function decimalToBinary(n) {
        if (!Number.isInteger(n)) return { error: 'Enter an integer' };
        return { value: (n >>> 0).toString(2) };
    }
    function binaryToDecimal(bin) {
        if (!/^[01]+$/.test(bin)) return { error: 'Only 0 and 1 allowed' };
        return { value: parseInt(bin, 2) };
    }
    function binaryAdd(a, b) { return { value: (parseInt(a, 2) + parseInt(b, 2)).toString(2) }; }
    function binarySub(a, b) { return { value: (parseInt(a, 2) - parseInt(b, 2)).toString(2) }; }
    function binaryMul(a, b) { return { value: (parseInt(a, 2) * parseInt(b, 2)).toString(2) }; }
    function binaryDiv(a, b) {
        if (parseInt(b, 2) === 0) return { error: 'Cannot divide by zero' };
        return { value: { quotient: (parseInt(a, 2) / parseInt(b, 2)) >> 0, remainder: parseInt(a, 2) % parseInt(b, 2) } };
    }

    /* ---------- Hex ---------- */
    function decimalToHex(n) {
        if (!Number.isInteger(n)) return { error: 'Only an integer' };
        return { value: Number(n).toString(16).toUpperCase() };
    }
    function hexToDecimal(hex) {
        if (!/^[0-9A-Fa-f]+$/.test(hex)) return { error: 'Invalid hexadecimal' };
        return { value: parseInt(hex, 16) };
    }

    /* ---------- Half-Life ---------- */
    function halfLife(initial, remaining, time) {
        if (initial <= 0) return { error: 'Initial amount must be positive' };
        if (remaining <= 0) return { error: 'Remaining must be positive' };
        var decayConstant = Math.log(2) / time;
        var elapsed = Math.log(initial / remaining) / decayConstant;
        return { value: elapsed };
    }

    function halfLifeAmount(initial, decayConstant, time) {
        return { value: initial * Math.pow(0.5, decayConstant * time) };
    }

    /* ---------- Quadratic ---------- */
    function quadratic(a, b, c) {
        if (a === 0) return { error: 'Coefficient a cannot be zero' };
        var disc = b * b - 4 * a * c;
        if (disc < 0) {
            var realPart = -b / (2 * a);
            var imagPart = Math.sqrt(-disc) / (2 * a);
            return { roots: [realPart + ' + ' + imagPart + 'i', realPart + ' - ' + imagPart + 'i'], discriminant: disc, complex: true };
        }
        var r1 = (-b + Math.sqrt(disc)) / (2 * a);
        var r2 = (-b - Math.sqrt(disc)) / (2 * a);
        return { roots: [r1, r2], discriminant: disc, complex: false };
    }

    /* ---------- Log ---------- */
    function logarithm(n, base) {
        if (n <= 0) return { error: 'Number must be positive' };
        if (base <= 0 || base === 1) return { error: 'Invalid base' };
        return { value: Math.log(n) / Math.log(base) };
    }

    function ln(n) {
        if (n <= 0) return { error: 'Number must be positive' };
        return { value: Math.log(n) };
    }

    function log10(n) {
        if (n <= 0) return { error: 'Number must be positive' };
        return { value: Math.log10(n) };
    }

    /* ---------- Ratio ---------- */
    function ratioSimplify(a, b) {
        if (a === 0 || b === 0) return { error: 'Zero not allowed' };
        var g = gcd(a, b);
        return { value: a / g + ':' + b / g, original: a + ':' + b };
    }

    /* ---------- Root (nth root) ---------- */
    function nthRoot(n, root) {
        if (root === 0) return { error: 'Root cannot be zero' };
        if (n < 0 && root % 2 === 0) return { error: 'Even root of a negative number' };
        var v = Math.pow(Math.abs(n), 1 / root);
        return { value: n < 0 ? -v : v };
    }

    /* ---------- LCM ---------- */
    function lcm(a, b) {
        if (a === 0 || b === 0) return { error: 'Zero not allowed' };
        return { value: Math.abs(a * b) / gcd(a, b) };
    }

    function lcmMulti(arr) {
        if (!arr.length) return { error: 'Enter numbers' };
        var r = Math.abs(arr[0]);
        for (var i = 1; i < arr.length; i++) {
            if (!arr[i]) return { error: 'Zero not allowed' };
            r = lcm(r, arr[i]).value;
        }
        return { value: r };
    }

    /* ---------- GCF ---------- */
    function gcf(a, b) { return { value: gcd(a, b) }; }
    function gcfMulti(arr) {
        var r = Math.abs(arr[0]);
        for (var i = 1; i < arr.length; i++) { r = gcd(r, arr[i]); }
        return { value: r };
    }

    /* ---------- Factor ---------- */
    function factor(n) {
        n = Math.abs(n);
        var factors = [];
        for (var i = 1; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                factors.push(i);
                if (i !== n / i) factors.push(n / i);
            }
        }
        factors.sort(function (a, b) { return a - b; });
        return { value: factors };
    }

    function primeFactors(n) {
        n = Math.abs(n);
        var out = [];
        for (var p = 2; p * p <= n; p++) {
            while (n % p === 0) { out.push(p); n /= p; }
        }
        if (n > 1) out.push(n);
        return out;
    }

    /* ---------- Rounding ---------- */
    function roundTo(value, precision) {
        return { value: round(value, precision) };
    }
    function roundToNearest(value, nearest) {
        if (nearest <= 0) return { error: 'Nearest must be positive' };
        return { value: Math.round(value / nearest) * nearest };
    }

    /* ---------- Matrix (2x2 & 3x3) ---------- */
    function matrixAdd(a, b) {
        return a.map(function (row, i) { return row.map(function (v, j) { return v + b[i][j]; }); });
    }
    function matrixSub(a, b) {
        return a.map(function (row, i) { return row.map(function (v, j) { return v - b[i][j]; }); });
    }
    function matrixMul(a, b) {
        var r = a.length, c = b[0].length, k = a[0].length;
        var out = [];
        for (var i = 0; i < r; i++) {
            out[i] = [];
            for (var j = 0; j < c; j++) {
                var sum = 0;
                for (var m = 0; m < k; m++) sum += a[i][m] * b[m][j];
                out[i][j] = round(sum, 6);
            }
        }
        return out;
    }
    function matrixDet2(m) { return m[0][0] * m[1][1] - m[0][1] * m[1][0]; }
    function matrixDet3(m) {
        return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
            - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
            + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    }

    /* ---------- Scientific Notation ---------- */
    function toScientific(n, digits) {
        var d = digits || 6;
        if (n === 0) return { value: '0' };
        var exp = Math.floor(Math.log10(Math.abs(n)));
        var mant = n / Math.pow(10, exp);
        return { value: round(mant, d) + ' × 10^' + exp };
    }

    function fromScientific(mantissa, exponent) {
        return { value: mantissa * Math.pow(10, exponent) };
    }

    /* ---------- Scientific Notation helper ---------- */
    function toSci(n, digits) {
        var d = digits || 4;
        if (n === 0) return '0';
        var exp = Math.floor(Math.log10(Math.abs(n)));
        var mant = n / Math.pow(10, exp);
        return round(mant, d) + 'e' + exp;
    }

    /* ---------- Big Number (format) ---------- */
    function bigNumber(n, format) {
        if (format === 'words') {
            var billion = n / 1e9, million = n / 1e6, thousand = n / 1e3;
            return {
                value: fmt(n),
                billion: fmt(billion) + ' billion',
                million: fmt(million) + ' million',
                thousand: fmt(thousand) + ' thousand'
            };
        }
        if (format === 'scientific') return { value: toSci(n, 4) };
        if (format === 'number-of-digits') return { value: String(Math.abs(Math.trunc(n))).replace(/[^0-9]/g, '').length };
        return { value: fmt(n) };
    }

    return {
        fmt: fmt, round: round,
        scientific: scientific,
        fraction: fraction,
        percentage: percentage, percentChange: percentChange,
        randomInt: randomInt, randomFloat: randomFloat,
        percentError: percentError,
        exponent: exponent,
        decimalToBinary: decimalToBinary, binaryToDecimal: binaryToDecimal,
        binaryAdd: binaryAdd, binarySub: binarySub, binaryMul: binaryMul, binaryDiv: binaryDiv,
        decimalToHex: decimalToHex, hexToDecimal: hexToDecimal,
        halfLife: halfLife, halfLifeAmount: halfLifeAmount,
        quadratic: quadratic,
        logarithm: logarithm, ln: ln, log10: log10,
        ratioSimplify: ratioSimplify,
        rootCalc: nthRoot,
        lcm: lcm, lcmMulti: lcmMulti,
        gcf: gcf, gcfMulti: gcfMulti,
        factor: factor, primeFactors: primeFactors,
        roundTo: roundTo, roundToNearest: roundToNearest,
        matrixAdd: matrixAdd, matrixSub: matrixSub, matrixMul: matrixMul,
        matrixDet2: matrixDet2, matrixDet3: matrixDet3,
        toScientific: toScientific, fromScientific: fromScientific,
        bigNumber: bigNumber
    };
})();
