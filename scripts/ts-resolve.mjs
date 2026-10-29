// Lets the check scripts import the lib/*.ts modules, whose relative imports have no extension.
import { registerHooks } from 'node:module'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      const url = new URL(spec + '.ts', ctx.parentURL)
      if (existsSync(fileURLToPath(url))) return next(url.href, ctx)
    }
    return next(spec, ctx)
  },
})
