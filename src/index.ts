/**
 * Cordis entry point for the dsh-workbench bundle.
 * @module @geecraft23/dsh-workbench
 */

import type { Context } from '@deepseek-ai/cordis'

/** Stable plugin name used by Cordis diagnostics. */
export const name = 'dsh-workbench'

/**
 * Mount the workbench plugin.
 *
 * This package owns no runtime registrations until it has a concrete feature.
 * @param _ctx - Cordis plugin context reserved for lifecycle-owned registrations.
 */
export function apply(_ctx: Context): void {}
