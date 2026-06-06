const fs = require('fs');
const path = require('path');

const dirs = ['components', 'pages'];
dirs.forEach(d => fs.mkdirSync(path.join('d:/art supply/frontend/src', d), { recursive: true }));

const components = ['Navbar'];
const pages = ['Home', 'Login', 'Register', 'Dashboard', 'Marketplace', 'ProductDetail', 'SwapRequests', 'Chat', 'AdminPanel'];

components.forEach(c => {
  fs.writeFileSync(path.join('d:/art supply/frontend/src/components', `${c}.jsx`), `export default function ${c}() { return <div>${c} Component</div>; }`);
});

pages.forEach(p => {
  fs.writeFileSync(path.join('d:/art supply/frontend/src/pages', `${p}.jsx`), `export default function ${p}() { return <div className="glass-panel" style={{padding: '2rem'}}><h1>${p} Page</h1></div>; }`);
});
