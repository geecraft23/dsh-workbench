import { afterEach, describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import Include, { applyEntryPatches, entryListSchema, type PatchOptions } from '@deepseek-ai/cordis-plugin-include'
import Loader from '@deepseek-ai/cordis-plugin-loader'
import { load } from 'js-yaml'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import * as Workbench from '../src/index.ts'

let fixtureRoot: string | undefined
let context: Context | undefined

afterEach(async () => {
  await context?.fiber.dispose()
  context = undefined
  if (fixtureRoot !== undefined) await rm(fixtureRoot, { recursive: true, force: true })
  fixtureRoot = undefined
})

async function loadComposition(): Promise<Context> {
  fixtureRoot = await mkdtemp(join(tmpdir(), 'dsh-workbench-loader-'))
  const configPath = join(fixtureRoot, 'cordis.json')
  const patch = load(
    await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8'),
    { schema: entryListSchema },
  ) as PatchOptions[]
  const entries = applyEntryPatches([], patch, message => {
    throw new Error(`unexpected bundle patch warning: ${message}`)
  })
  await writeFile(configPath, JSON.stringify(entries))

  context = new Context()
  context.baseUrl = pathToFileURL(fixtureRoot).href + '/'
  await context.plugin(Loader)
  context.loader.builtins.include = Include
  context.loader.internal = {
    version: 'v2',
    async import(specifier: string) {
      if (specifier === '@geecraft23/dsh-workbench') return Workbench
      throw new Error(`unexpected Loader import: ${specifier}`)
    },
  } as unknown as NonNullable<typeof context.loader.internal>
  await context.loader.create({
    name: 'cordis:include',
    config: { path: pathToFileURL(configPath).href },
  })
  await context.loader.await()
  return context
}

describe('Loader composition', () => {
  it('loads the package as a Cordis plugin module', async () => {
    const ctx = await loadComposition()
    const unloaded = [...ctx.loader.entries()]
      .filter(entry => entry.fiber === undefined && !entry.disabled)
      .map(entry => entry.options.name)

    expect(unloaded).toEqual([])
    expect([...ctx.loader.entries()]
      .some(entry => entry.options.name === '@geecraft23/dsh-workbench' && entry.fiber !== undefined))
      .toBe(true)
  })
})
