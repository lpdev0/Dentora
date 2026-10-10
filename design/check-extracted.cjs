const { chromium } = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('node:url'); const path=require('node:path');const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('design/pacote-verificado/index.html')).href,{waitUntil:'networkidle'});
 await page.getByRole('heading',{name:'Seu sorriso. Sua melhor versão.'}).waitFor();
 const result={errors,css:await page.locator('.header').evaluate(e=>getComputedStyle(e).position),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)};
 await page.locator('.gallery-portrait').scrollIntoViewIfNeeded();await page.waitForTimeout(400);await page.screenshot({path:'design/mobile-gallery-final.png'});
 result.galleryPhoto=await page.locator('.gallery-portrait').evaluate(async el=>{const bg=getComputedStyle(el).backgroundImage;const url=bg.match(/url\(["']?(.*?)["']?\)/)?.[1];if(!url)return false;const i=new Image();i.src=url;try{await i.decode();return i.naturalWidth>0}catch{return false}});
 await page.locator('.mobile-booking button').click();
 await page.getByRole('button',{name:'Simular agendamento'}).click();result.requiredValidation=await page.locator('#service').evaluate(e=>!e.validity.valid);result.noPrematureSuccess=await page.getByRole('status').count()===0;
 await page.locator('#service').selectOption('Avaliação inicial');await page.locator('#date').fill('2026-12-20');await page.getByLabel('Tarde',{exact:true}).check();await page.getByRole('button',{name:'Simular agendamento'}).click();result.booking=await page.getByRole('status').isVisible();await page.keyboard.press('Escape');
 result.focusRestored=await page.locator('.mobile-booking button').evaluate(e=>e===document.activeElement);
 await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(400);await page.screenshot({path:'design/desktop-final.png'});
 result.localImages=await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>i.decode()));return imgs.every(i=>i.naturalWidth>0)});
 fs.writeFileSync('design/extracted-validation.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

