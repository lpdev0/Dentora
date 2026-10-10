const fs = require('node:fs');
// Rollup emits a self-contained IIFE; a classic deferred script also works via file://.
const html = fs.readFileSync('dist/index.html','utf8').replace('type="module" crossorigin','defer').replace('rel="stylesheet" crossorigin','rel="stylesheet"');
fs.writeFileSync('dist/index.html',html);
const errorPage = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta name="description" content="Página não encontrada — Dentora."><title>Página não encontrada — Dentora</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f4f0;color:#202521;font:16px Arial,sans-serif;text-align:center}h1{font-size:clamp(45px,8vw,90px);letter-spacing:-3px;line-height:1}a{color:inherit;display:inline-block;margin:10px;padding:16px 25px;border:1px solid;border-radius:40px}</style></head><body><main><p>DENTORA · 404</p><h1>Vamos voltar<br>a sorrir?</h1><p>Esse endereço não faz parte do nosso site.</p><a href="./index.html">Voltar ao início</a><a href="./index.html#contato">Contato</a></main></body></html>';
fs.writeFileSync('dist/404.html',errorPage);
console.log('Build portátil finalizado: index.html, style.css, script.js, img/ e font/.');
