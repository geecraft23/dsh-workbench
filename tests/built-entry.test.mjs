import assert from 'node:assert/strict'
import test from 'node:test'

test('the built entry exports a Cordis plugin module', async () => {
  const plugin = await import('../lib/index.js')

  assert.equal(plugin.name, 'dsh-workbench')
  assert.equal(typeof plugin.apply, 'function')
})
