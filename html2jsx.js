const fs = require('fs');
const path = require('path');

function htmlToJsx(html) {
  let jsx = html;
  
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  
  jsx = jsx.replace(/<img(.*?)>/g, (match, p1) => {
    if (match.endsWith('/>')) return match;
    return `<img${p1} />`;
  });
  jsx = jsx.replace(/<input(.*?)>/g, (match, p1) => {
    if (match.endsWith('/>')) return match;
    return `<input${p1} />`;
  });
  jsx = jsx.replace(/<hr(.*?)>/g, (match, p1) => {
    if (match.endsWith('/>')) return match;
    return `<hr${p1} />`;
  });
  jsx = jsx.replace(/<br(.*?)>/g, (match, p1) => {
    if (match.endsWith('/>')) return match;
    return `<br${p1} />`;
  });

  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').reduce((acc, rule) => {
      if (!rule.trim()) return acc;
      const [key, value] = rule.split(':');
      if (!key || !value) return acc;
      const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      acc[camelKey] = value.trim().replace(/'/g, '"');
      return acc;
    }, {});
    
    const objStr = Object.entries(styleObj)
      .map(([k, v]) => `${k}: '${v}'`)
      .join(', ');
    
    return `style={{ ${objStr} }}`;
  });

  jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
  jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
  jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
  jsx = jsx.replace(/fill-rule/g, 'fillRule');
  jsx = jsx.replace(/clip-rule/g, 'clipRule');
  jsx = jsx.replace(/clip-path/g, 'clipPath');
  jsx = jsx.replace(/viewbox/g, 'viewBox');
  
  const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    jsx = bodyMatch[1];
  }

  // Remove comment tags that are not valid JSX
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  return `export default function Page() {\n  return (\n    <>\n${jsx}\n    </>\n  );\n}\n`;
}

const conversions = [
  { in: 'auth.html', out: 'app/page.tsx' },
  { in: 'dashboard.html', out: 'app/(dashboard)/dashboard/page.tsx' },
  { in: 'projects.html', out: 'app/(dashboard)/projects/page.tsx' },
  { in: 'kanban.html', out: 'app/(dashboard)/projects/[id]/page.tsx' },
  { in: 'admin.html', out: 'app/(dashboard)/admin/page.tsx' }
];

for (const conv of conversions) {
  if (fs.existsSync(conv.in)) {
    const inputHtml = fs.readFileSync(conv.in, 'utf8');
    const outputJsx = htmlToJsx(inputHtml);
    const outDir = path.dirname(conv.out);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(conv.out, outputJsx);
    console.log(`Converted ${conv.in} to ${conv.out}`);
  } else {
    console.log(`File not found: ${conv.in}`);
  }
}
