// Uploads every local image referenced in app/data/*.ts to FileHarbor and swaps the path for the FileHarbor URL.
// pnpm upload-images (FILEHARBOR_API_KEY from .env or the environment)
// The data file is rewritten after each upload, so a rerun after a failure skips what already went up.
import { openAsBlob } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

const base = process.env.FILEHARBOR_URL ?? 'https://fileharbor.heyatom.dev'
const key = process.env.FILEHARBOR_API_KEY
if (!key) {
  console.error('FILEHARBOR_API_KEY mancante')
  process.exit(1)
}

const dataDir = 'app/data'
// openAsBlob has no type and FileHarbor checks the MIME type.
const types = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }
const localPath = /'(\/[^']+\.(?:webp|png|jpe?g))'/g

for (const name of await readdir(dataDir)) {
  const file = join(dataDir, name)
  let src = await readFile(file, 'utf8')
  for (const [, path] of src.matchAll(localPath)) {
    const form = new FormData()
    form.append('file', await openAsBlob(join('public', path), { type: types[extname(path)] }), basename(path))
    form.append('tags', 'puma-arts')
    const res = await fetch(`${base}/v2/images`, { method: 'POST', headers: { 'X-API-Key': key }, body: form })
    if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`)
    const { fullPath } = await res.json()
    src = src.replace(`'${path}'`, `'${fullPath}'`)
    await writeFile(file, src)
    console.log(`${path} -> ${fullPath}`)
  }
}
