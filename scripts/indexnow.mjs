/**
 * Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that the site changed.
 *
 * ChatGPT search leans on Bing's index, so a page Bing has not re-crawled is a page ChatGPT
 * still answers from the old copy of. Run after every production deploy:
 *
 *   node scripts/indexnow.mjs
 *
 * The key is public by design: IndexNow proves ownership by fetching
 * https://www.oanduaia.ee/<key>.txt and checking it holds the same key.
 * Do not delete that file from public/.
 */
const HOST = 'www.oanduaia.ee'
const KEY = '5698fdbcca4fd29b825353057d4f861f'

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
urls.push(`https://${HOST}/llms.txt`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})
console.log(`IndexNow: ${urls.length} URLs → HTTP ${res.status}`)
if (res.status >= 300) console.log(await res.text())
