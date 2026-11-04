import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const sourceCssPath = path.join(root, 'node_modules/@fortawesome/fontawesome-free/css/all.min.css');
const outputCssPath = path.join(root, 'dist/vendor/font-awesome/6.4.0/css/all.minimal.css');
const sourceDirectories = ['layouts', 'src'];
const excludedDirectories = new Set(['node_modules', '.backup', '.work', '.tools', 'dist', 'tests', '__tests__', 'docs']);
const modifierNames = new Set([
    'fa', 'fas', 'far', 'fab', 'fal', 'fad', 'fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone',
    'fa-spin', 'fa-pulse', 'fa-fw', 'fa-status-', 'fa-rotate-90', 'fa-rotate-180', 'fa-rotate-270',
]);

function collectFiles(directory) {
    const files = [];
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (excludedDirectories.has(entry.name)) continue;
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...collectFiles(fullPath));
        else files.push(fullPath);
    }
    return files;
}

const iconNames = new Set();
for (const directory of sourceDirectories) {
    for (const file of collectFiles(path.join(root, directory))) {
        const source = fs.readFileSync(file, 'utf8');
        for (const match of source.matchAll(/\bfa-[a-z0-9-]+/g)) {
            if (!modifierNames.has(match[0])) iconNames.add(match[0].slice(3));
        }
        for (const match of source.matchAll(/<(?:icon|Icon)\b[^>]*\bname\s*=\s*["']([^"']+)["']/g)) {
            for (const name of match[1].matchAll(/\b[a-z][a-z0-9-]+\b/g)) {
                const value = name[0].startsWith('fa-') ? name[0].slice(3) : name[0];
                if (!modifierNames.has(`fa-${value}`)) iconNames.add(value);
            }
        }
    }
}

const source = fs.readFileSync(sourceCssPath, 'utf8');
const fontFreeSource = source.replace(/@font-face\{[^}]*\}/g, '');
const rules = [];
for (const match of fontFreeSource.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!match[2].includes('content:')) continue;
    if (!/:before/.test(match[1])) continue;
    rules.push({ selector: match[1], body: match[2] });
}

const iconRules = [];
const matchedNames = new Set();
for (const rule of rules) {
    const names = [...rule.selector.matchAll(/\.fa-([a-z0-9-]+):before/g)].map((match) => match[1]);
    if (!names.some((name) => iconNames.has(name))) continue;
    iconRules.push(`${rule.selector}{${rule.body}}`);
    names.filter((name) => iconNames.has(name)).forEach((name) => matchedNames.add(name));
}

const base = fontFreeSource.replace(/[^{}]+\{[^{}]*content:[^{}]*\}/g, '');
const fontFaces = '@font-face{font-family:"Font Awesome 6 Free";font-style:normal;font-weight:900;font-display:block;src:url("../webfonts/fa-solid-900.woff2") format("woff2")}@font-face{font-family:"Font Awesome 6 Free";font-style:normal;font-weight:400;font-display:block;src:url("../webfonts/fa-regular-400.woff2") format("woff2")}';
const output = `${base}${fontFaces}${iconRules.join('')}`;
fs.mkdirSync(path.dirname(outputCssPath), { recursive: true });
fs.writeFileSync(outputCssPath, output);
const missing = [...iconNames].filter((name) => !matchedNames.has(name));
console.log(`[fontawesome] icons=${matchedNames.size} css=${output.length} bytes missing=${missing.length}`);
if (missing.length > 0) console.log(`[fontawesome] missing=${missing.join(',')}`);
