const { chromium } = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({headless:true,channel:'msedge'});
 const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.waitForSelector('.splash',{state:'detached'});
 await page.waitForTimeout(1400);
 await page.screenshot({path:'design/desktop-hero.png'});
 for(let y=0;y<await page.locator('body').evaluate(e=>e.scrollHeight);y+=650){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(130);}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(800); await page.screenshot({path:'design/desktop-full.png',fullPage:true});
 const report={errors,desktopOverflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),images:await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0}))),fonts:await page.evaluate(()=>document.fonts.check('16px "Open Sauce One"'))};
 await page.getByRole('button',{name:'Conhecer Facetas dentárias',exact:true}).click();
 await page.locator('#modal-title').filter({hasText:'Facetas dentárias'}).waitFor();await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Agendar avaliação',exact:true}).first().click();
 await page.locator('#service').selectOption('Avaliação inicial');
 await page.locator('#date').fill('2026-12-10');await page.getByLabel('Manhã',{exact:true}).check();
 await page.getByRole('button',{name:'Simular agendamento'}).click();
 report.booking=await page.getByRole('status').innerText();await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'As fotos mostram pacientes reais da Dentora?'}).click();
 report.faq=await page.locator('#answer-4').innerText();
 for(const width of [320,390,768,1024,1920]){await page.setViewportSize({width,height:900});await page.waitForTimeout(200);report['overflow'+width]=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);}
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);await page.screenshot({path:'design/mobile-hero.png'});
 await page.getByRole('button',{name:'Abrir menu'}).click();await page.getByRole('navigation',{name:'Navegação móvel'}).getByRole('link',{name:'Tratamentos'}).click();
 report.menuClosed=await page.locator('#mobile-menu').evaluate(e=>!e.open);
 for(let y=0;y<await page.locator('body').evaluate(e=>e.scrollHeight);y+=650){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(100);}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(800);await page.screenshot({path:'design/mobile-full.png',fullPage:true});
 await page.getByRole('button',{name:'Privacidade',exact:true}).click();report.privacy=await page.getByRole('heading',{name:'Sua privacidade, com clareza.'}).isVisible();await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});report.reducedMotion=await page.locator('.splash').count()===0;
 await page.goto('http://127.0.0.1:5173/inexistente');report.notFound=await page.getByRole('heading',{name:'Vamos voltar a sorrir?'}).isVisible();
 fs.writeFileSync('design/validation.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
