import { launch } from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = [
  'post1-positioning.html',
  'post2-slide1.html',
  'post2-slide2.html',
  'post2-slide3.html',
  'post2-slide4.html',
  'post2-slide5.html',
  'post3-offer.html',
];

async function run() {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

  for (const file of files) {
    const filePath = path.resolve(__dirname, file).replace(/\\/g, '/');
    const pngName = file.replace('.html', '.png');
    const pngPath = path.resolve(__dirname, pngName);

    await page.goto(`file:///${filePath}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({ path: pngPath, type: 'png' });
    console.log(`Saved: ${pngName}`);
  }

  await browser.close();
  console.log('Done! All screenshots saved.');
}

run().catch(console.error);
