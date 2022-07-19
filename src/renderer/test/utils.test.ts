import { describe, expect, test } from 'vitest'
import { dtConverter } from '../src/utils'

describe('test utils dtConverter', () => {
  test('test dtConverter', () => {
    const res = dtConverter(326000)
    const res2 = dtConverter(369528)
    expect(res).toBe('05 : 26')
    expect(res2).toBe('06 : 09')
  })
})
