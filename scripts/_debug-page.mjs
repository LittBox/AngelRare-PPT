import puppeteer from 'puppeteer'

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1920, height: 1080 })

p.on('console', msg => console.log('console.' + msg.type() + ':', msg.text()))
p.on('pageerror', e => console.log('pageerror:', e.message))
p.on('requestfailed', r => console.log('failed:', r.url(), r.failure()?.errorText))

await p.goto('http://127.0.0.1:4173/AngelRare-PPT/', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise(r => setTimeout(r, 3000))

const info = await p.evaluate(() => {
  return {
    title: document.title,
    bodyHTML: document.body.innerHTML.length,
    sectionCount: document.querySelectorAll('.section').length,
    hasRenderError: !!document.querySelector('.render-error'),
    renderErrorText: document.querySelector('.render-error')?.querySelector('pre')?.textContent,
    appHtml: document.getElementById('app')?.innerHTML?.slice(0, 200),
    hasFullpageApi: !!window.fullpage_api,
  }
})
console.log('INFO:', JSON.stringify(info, null, 2))
await b.close()