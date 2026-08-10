import glob

patterns = [
    ('href="debt-to-income"', 'href="debt-to-income.html"'),
    ('href="annuity-payout-calculator"', 'href="annuity-payout-calculator.html"'),
    ('to="debt-to-income"', 'to="debt-to-income.html"'),
    ('to="annuity-payout-calculator"', 'to="annuity-payout-calculator.html"'),
]

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    original = content
    for old, new in patterns:
        content = content.replace(old, new)
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        print('Updated: ' + f)

print('Done.')