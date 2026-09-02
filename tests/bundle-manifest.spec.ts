import { readFile } from 'node:fs/promises'
import { applyEntryPatches, entryListSchema, type PatchOptions } from '@deepseek-ai/cordis-plugin-include'
import { load } from 'js-yaml'
import { describe, expect, it } from 'vitest'

describe('DSH bundle manifest', () => {
  it('publishes the patch that mounts this package', async () => {
    const manifest = JSON.parse(
      await readFile(new URL('../package.json', import.meta.url), 'utf8'),
    ) as {
      name: string
      dsh: { bundle: { patch: string } }
      files: string[]
    }
    const patch = load(
      await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8'),
      { schema: entryListSchema },
    ) as PatchOptions[]
    const warnings: string[] = []
    const entries = applyEntryPatches([], patch, message => warnings.push(message))

    expect(manifest.name).toBe('@geecraft23/dsh-workbench')
    expect(manifest.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect(manifest.files).toContain('cordis.patch.yml')
    expect(warnings).toEqual([])
    expect(entries).toEqual([
      {
        id: 'geecraft23-workbench',
        name: '@geecraft23/dsh-workbench',
      },
    ])
  })
})
