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
    var TRIG_FUNCS = {
        sin: 'Math.sin', cos: 'Math.cos', tan: 'Math.tan',
        asin: 'Math.asin', acos: 'Math.acos', atan: 'Math.atan',
        ln: 'Math.log', log10: 'Math.log10', log2: 'Math.log2', log: 'Math.log10',
        sqrt: 'Math.sqrt', cbrt: 'Math.cbrt', abs: 'Math.abs',
        floor: 'Math.floor', ceil: 'Math.ceil', round: 'Math.round',
        exp: 'Math.exp', pow: 'Math.pow', min: 'Math.min', max: 'Math.max'
    };

    function scientific(expr, isDegree) {
        try {
            var e = String(expr || '')
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/–/g, '-')
                .replace(/π/g, Math.PI)
                .replace(/√\(/g, 'sqrt(')
                .replace(/√/g, 'sqrt(')
                .replace(/\^/g, '**')
                .replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

            // Protect existing Math. prefixes, then map plain function names
            e = e.replace(/Math\./g, '\u0001');
            e = e.replace(/([A-Za-z]+)\(/g, function (m, name) {
                return TRIG_FUNCS[name] ? TRIG_FUNCS[name] + '(' : m;
            });
            e = e.replace(/\u0001/g, 'Math.');

            // Degree mode: convert sin/cos/tan arguments from degrees to radians
            if (isDegree) {
                var DEG = Math.PI / 180;
                e = e.replace(/Math\.sin\(([^()]*)\)/g, 'Math.sin((($1)*' + DEG + '))');
                e = e.replace(/Math\.cos\(([^()]*)\)/g, 'Math.cos((($1)*' + DEG + '))');
                e = e.replace(/Math\.tan\(([^()]*)\)/g, 'Math.tan((($1)*' + DEG + '))');
            }

            e = e.replace(/Math\.Math\./g, 'Math.')
                .replace(/(\d+)!/g, 'F($1)');

            // Whitelist: after masking function names, only operators/digits/markers may remain
            var clean = e
                .replace(/Math\.(sin|cos|tan|asin|acos|atan|log10|log2|log|ln|sqrt|cbrt|abs|floor|ceil|round|exp|pow|min|max|PI|E)/g, 'M')
                .replace(/Math\./g, 'M')
                .replace(/F\(/g, 'M(');
            if (!/^[0-9+\-*/().,%!\sM]+$/.test(clean)) {
                return { error: 'Invalid expression' };
            }

            var fn = Function('"use strict";' +
                'function F(n){n=Math.round(n);if(n<0||n>170)return NaN;var r=1;for(var i=2;i<=n;i++)r*=i;return r;}' +
                'return (' + e + ');');
            var result = fn();
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

    function simplifyFraction(num, den) {
        if (den === 0) return { error: 'Denominator cannot be zero' };
        var s = den < 0 ? -1 : 1;
        num *= s; den *= s;
        var g = gcd(num, den);
        return { num: num / g, den: den / g };
    }

    function toMixed(num, den) {
        if (den === 0) return { error: 'Denominator cannot be zero' };
        var whole = Math.trunc(num / den);
        var rem = num % den;
        if (rem === 0) return { whole: whole, num: 0, den: 1 };
        var f = simplifyFraction(rem, den);
        return { whole: whole, num: f.num, den: f.den };
    }

    function fromMixed(whole, num, den) {
        if (den === 0) return { error: 'Denominator cannot be zero' };
        var sign = whole < 0 ? -1 : 1;
        return { num: whole * den + sign * num, den: den };
    }

    function fractionToDecimal(num, den) {
        if (den === 0) return { error: 'Denominator cannot be zero' };
        return { value: num / den };
    }

    function decimalToFraction(dec, maxDen) {
        maxDen = maxDen || 10000;
        if (dec === null || dec === undefined || isNaN(dec)) return { error: 'Enter a number' };
        if (!isFinite(dec)) return { error: 'Value is not finite' };
        if (dec === Math.floor(dec)) return { num: dec, den: 1 };
        var neg = dec < 0;
        var x = Math.abs(dec);
        var h1 = 1, h2 = 0, k1 = 0, k2 = 1;
        var n = x;
        for (var i = 0; i < 2000; i++) {
            var a = Math.floor(n);
            var tmp = h1; h1 = a * h1 + h2; h2 = tmp;
            tmp = k1; k1 = a * k1 + k2; k2 = tmp;
            if (k1 > maxDen) break;
            if (Math.abs(x - h1 / k1) < 1e-12 || Math.abs(n - a) < 1e-15) break;
            n = 1 / (n - a);
        }
        if (k1 === 0) return { error: 'Cannot convert' };
        var g = gcd(h1, k1) || 1;
        return { num: (neg ? -h1 : h1) / g, den: k1 / g };
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

    /* ---------- Bitwise binary ops ---------- */
    function binaryAnd(a, b) { return { value: (parseInt(a, 2) & parseInt(b, 2)).toString(2) }; }
    function binaryOr(a, b) { return { value: (parseInt(a, 2) | parseInt(b, 2)).toString(2) }; }
    function binaryXor(a, b) { return { value: (parseInt(a, 2) ^ parseInt(b, 2)).toString(2) }; }
    function binaryNot(a) { return { value: (~parseInt(a, 2)).toString(2) }; }

    /* ---------- Octal ---------- */
    function decimalToOctal(n) {
        if (!Number.isInteger(n)) return { error: 'Enter an integer' };
        return { value: (n >>> 0).toString(8) };
    }
    function octalToDecimal(s) {
        if (!/^[0-7]+$/.test(s)) return { error: 'Only digits 0-7 allowed' };
        return { value: parseInt(s, 8) };
    }

    /* ---------- Half-Life solver (any unknown) ---------- */
    function halfLifeSolve(initial, remaining, time, halfLife) {
        var missing = 0;
        if (initial === null || initial === undefined || isNaN(initial)) missing = 'initial';
        else if (remaining === null || remaining === undefined || isNaN(remaining)) missing = 'remaining';
        else if (time === null || time === undefined || isNaN(time)) missing = 'time';
        else if (halfLife === null || halfLife === undefined || isNaN(halfLife)) missing = 'halfLife';
        if (!missing) return { error: 'Leave exactly one field empty' };
        var vals = { initial: initial, remaining: remaining, time: time, halfLife: halfLife };
        for (var k in vals) {
            if (k !== missing && (!(vals[k] > 0))) return { error: 'All filled values must be positive' };
        }
        var decay = 0, result = 0;
        if (missing === 'halfLife') {
            if (remaining >= initial) return { error: 'Remaining must be less than initial' };
            result = time * Math.log(2) / Math.log(initial / remaining);
            decay = Math.log(2) / result;
        } else if (missing === 'time') {
            result = halfLife * Math.log(initial / remaining) / Math.log(2);
            decay = Math.log(2) / halfLife;
        } else if (missing === 'initial') {
            result = remaining * Math.pow(2, time / halfLife);
            decay = Math.log(2) / halfLife;
        } else {
            result = initial * Math.pow(0.5, time / halfLife);
            decay = Math.log(2) / halfLife;
        }
        return { missing: missing, value: result, decayConstant: decay, remainingFraction: remaining / initial, meanLife: 1 / decay };
    }

    /* ---------- Quadratic extras ---------- */
    function quadraticInfo(a, b, c) {
        var r = quadratic(a, b, c);
        if (r.error) return r;
        var vx = -b / (2 * a);
        var vy = a * vx * vx + b * vx + c;
        r.vertex = { x: vx, y: vy };
        r.axis = vx;
        return r;
    }

    /* ---------- Antilog ---------- */
    function antiLog(value, base) {
        if (base <= 0 || base === 1) return { error: 'Invalid base' };
        return { value: Math.pow(base, value) };
    }
    function antiLog10(value) { return { value: Math.pow(10, value) }; }
    function antiLn(value) { return { value: Math.exp(value) }; }

    /* ---------- Ratio extras ---------- */
    function ratioSolve(a, b, c) {
        if (a === 0) return { error: 'First term cannot be zero' };
        return { value: b * c / a };
    }
    function ratioToPercent(a, b) {
        if (a + b === 0) return { error: 'Sum cannot be zero' };
        return { value: a / (a + b) * 100 };
    }

    /* ---------- Simplify radicals ---------- */
    function simplifyNthRoot(n, root) {
        if (root <= 0) return { error: 'Root must be positive' };
        if (n < 0 && root % 2 === 0) return { error: 'Even root of a negative number' };
        var neg = n < 0;
        n = Math.abs(n);
        if (n === 0) return { coeff: 0, radicand: 0, value: 0 };
        var coeff = 1;
        for (var i = 2; i <= Math.floor(Math.pow(n, 1 / root)) + 1; i++) {
            var p = Math.pow(i, root);
            while (p <= n && n % p === 0) { coeff *= i; n /= p; }
        }
        var v = Math.pow(coeff, 1) * Math.pow(n, 1 / root);
        return { coeff: neg ? -coeff : coeff, radicand: n, value: neg ? -v : v };
    }

    /* ---------- Significant figures ---------- */
    function roundSig(n, sig) {
        sig = sig || 3;
        if (n === 0) return 0;
        if (!isFinite(n)) return n;
        var e = Math.floor(Math.log10(Math.abs(n)));
        var factor = Math.pow(10, sig - 1 - e);
        return Math.round(n * factor) / factor;
    }

    /* ---------- Matrix extras ---------- */
    function matrixTranspose(m) {
        return m[0].map(function (_, c) { return m.map(function (row) { return row[c]; }); });
    }
    function matrixInverse2(m) {
        var det = matrixDet2(m);
        if (Math.abs(det) < 1e-12) return { error: 'Matrix is singular (determinant = 0)' };
        return {
            value: [[m[1][1] / det, -m[0][1] / det], [-m[1][0] / det, m[0][0] / det]]
        };
    }
    function matrixInverse3(m) {
        var det = matrixDet3(m);
        if (Math.abs(det) < 1e-12) return { error: 'Matrix is singular (determinant = 0)' };
        var c = function (a, b, c, d) { return a * d - b * c; };
        var inv = [
            [c(m[1][1], m[1][2], m[2][1], m[2][2]), -c(m[0][1], m[0][2], m[2][1], m[2][2]), c(m[0][1], m[0][2], m[1][1], m[1][2])],
            [-c(m[1][0], m[1][2], m[2][0], m[2][2]), c(m[0][0], m[0][2], m[2][0], m[2][2]), -c(m[0][0], m[0][2], m[1][0], m[1][2])],
            [c(m[1][0], m[1][1], m[2][0], m[2][1]), -c(m[0][0], m[0][1], m[2][0], m[2][1]), c(m[0][0], m[0][1], m[1][0], m[1][1])]
        ];
        return {
            value: inv.map(function (row) {
                return row.map(function (v) { return v / det; });
            })
        };
    }

    /* ---------- Scientific notation arithmetic ---------- */
    function sciNorm(m, e, sig) {
        if (m === 0) return { m: 0, e: 0 };
        while (Math.abs(m) >= 10) { m /= 10; e++; }
        while (Math.abs(m) < 1) { m *= 10; e--; }
        return { m: roundSig(m, sig || 6), e: e };
    }
    function sciAdd(a, b, sig) {
        sig = sig || 6;
        var e = Math.max(a.e, b.e);
        var m = a.m * Math.pow(10, a.e - e) + b.m * Math.pow(10, b.e - e);
        return sciNorm(m, e, sig);
    }
    function sciSub(a, b, sig) {
        sig = sig || 6;
        var e = Math.max(a.e, b.e);
        var m = a.m * Math.pow(10, a.e - e) - b.m * Math.pow(10, b.e - e);
        return sciNorm(m, e, sig);
    }
    function sciMul(a, b, sig) { return sciNorm(a.m * b.m, a.e + b.e, sig || 6); }
    function sciDiv(a, b, sig) {
        if (b.m === 0) return { error: 'Division by zero' };
        return sciNorm(a.m / b.m, a.e - b.e, sig || 6);
    }

    /* ---------- Big integer arithmetic (BigInt) ---------- */
    function bigIntValid(s) { return /^-?\d+$/.test(String(s).trim()); }
    function bigArith(a, b, op) {
        a = String(a).trim(); b = String(b).trim();
        if (!bigIntValid(a) || !bigIntValid(b)) return { error: 'Enter valid integers (digits only)' };
        try {
            var A = BigInt(a), B = BigInt(b), r;
            switch (op) {
                case 'add': r = A + B; break;
                case 'sub': r = A - B; break;
                case 'mul': r = A * B; break;
                case 'div':
                    if (B === 0n) return { error: 'Cannot divide by zero' };
                    r = A / B; break;
                case 'mod':
                    if (B === 0n) return { error: 'Cannot divide by zero' };
                    r = A % B; break;
                default: return { error: 'Unknown operation' };
            }
            return { value: r.toString() };
        } catch (e) { return { error: 'Big integer not supported in this browser' }; }
    }

    var ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var SCALES = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion'];

    function threeToWords(n) {
        var out = '';
        var h = Math.floor(n / 100), r = n % 100;
        if (h) out += ONES[h] + ' hundred' + (r ? ' ' : '');
        if (r) {
            if (r < 20) out += ONES[r];
            else out += TENS[Math.floor(r / 10)] + (r % 10 ? '-' + ONES[r % 10] : '');
        }
        return out;
    }

    function numberToWords(num) {
        if (num === null || num === undefined || isNaN(num)) return '—';
        var neg = num < 0;
        var n = Math.abs(Math.trunc(num));
        if (n === 0) return 'zero';
        var parts = [];
        var group = 0;
        while (n > 0 && group < SCALES.length) {
            var chunk = n % 1000;
            if (chunk) parts.unshift(threeToWords(chunk) + (SCALES[group] ? ' ' + SCALES[group] : ''));
            n = Math.floor(n / 1000);
            group++;
        }
        return (neg ? 'negative ' : '') + parts.join(' ');
    }

    function digitCount(s) {
        return String(s).replace(/[^0-9]/g, '').length;
    }

    /* ---------- Percentage extras ---------- */
    function percentIncrease(original, newValue) {
        if (original === 0) return { error: 'Original value cannot be zero' };
        return { value: (newValue - original) / original * 100 };
    }
    function percentOfPart(total, percent) {
        return { value: total * percent / 100 };
    }
    function whatPercent(part, total) {
        if (total === 0) return { error: 'Total cannot be zero' };
        return { value: part / total * 100 };
    }
    function addPercent(base, percent) {
        return { value: base * (1 + percent / 100) };
    }
    function subtractPercent(base, percent) {
        return { value: base * (1 - percent / 100) };
    }

    return {
        fmt: fmt, round: round,
        scientific: scientific,
        fraction: decimalToFraction,
        simplifyFraction: simplifyFraction, toMixed: toMixed, fromMixed: fromMixed,
        fractionToDecimal: fractionToDecimal, decimalToFraction: decimalToFraction,
        percentage: percentage, percentChange: percentChange,
        percentIncrease: percentIncrease, percentOfPart: percentOfPart,
        whatPercent: whatPercent, addPercent: addPercent, subtractPercent: subtractPercent,
        randomInt: randomInt, randomFloat: randomFloat,
        percentError: percentError,
        exponent: exponent,
        decimalToBinary: decimalToBinary, binaryToDecimal: binaryToDecimal,
        binaryAdd: binaryAdd, binarySub: binarySub, binaryMul: binaryMul, binaryDiv: binaryDiv,
        binaryAnd: binaryAnd, binaryOr: binaryOr, binaryXor: binaryXor, binaryNot: binaryNot,
        decimalToHex: decimalToHex, hexToDecimal: hexToDecimal,
        decimalToOctal: decimalToOctal, octalToDecimal: octalToDecimal,
        halfLife: halfLife, halfLifeAmount: halfLifeAmount, halfLifeSolve: halfLifeSolve,
        quadratic: quadratic, quadraticInfo: quadraticInfo,
        logarithm: logarithm, ln: ln, log10: log10,
        antiLog: antiLog, antiLog10: antiLog10, antiLn: antiLn,
        ratioSimplify: ratioSimplify, ratioSolve: ratioSolve, ratioToPercent: ratioToPercent,
        rootCalc: nthRoot, simplifyNthRoot: simplifyNthRoot,
        lcm: lcm, lcmMulti: lcmMulti,
        gcf: gcf, gcfMulti: gcfMulti,
        factor: factor, primeFactors: primeFactors,
        roundTo: roundTo, roundToNearest: roundToNearest, roundSig: roundSig,
        matrixAdd: matrixAdd, matrixSub: matrixSub, matrixMul: matrixMul,
        matrixDet2: matrixDet2, matrixDet3: matrixDet3,
        matrixTranspose: matrixTranspose, matrixInverse2: matrixInverse2, matrixInverse3: matrixInverse3,
        toScientific: toScientific, fromScientific: fromScientific,
        sciAdd: sciAdd, sciSub: sciSub, sciMul: sciMul, sciDiv: sciDiv,
        bigNumber: bigNumber, bigArith: bigArith, numberToWords: numberToWords, digitCount: digitCount
    };
})();
