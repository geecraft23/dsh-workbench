import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it } from 'vitest'
import * as Workbench from '../src/index.ts'

describe('dsh-workbench plugin', () => {
  it('exports a stable plugin name', () => {
    expect(Workbench.name).toBe('dsh-workbench')
  })

  it('mounts and disposes through the Cordis lifecycle', async () => {
    const root = new Context()

    try {
      const fiber = await root.plugin(Workbench)
      expect(fiber.uid).not.toBeNull()

      await fiber.dispose()
      expect(fiber.uid).toBeNull()
    } finally {
      await root.fiber.dispose()
    }
  })
})
