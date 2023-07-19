import { checkNewlyAchievedAstro } from './points'
import { BLACK_HOLE, NEUTRON_STAR, RED_GIANT, SUPER_NOVA, WHITE_DWARF } from './points.types'

describe('checkNewlyAchievedAstro', () => {
  test('should return null if both values are 0', () => {
    const result = checkNewlyAchievedAstro(0, 0)
    expect(result).toBeNull()
  })

  test('should return null if no new astro achieved', () => {
    const result = checkNewlyAchievedAstro(WHITE_DWARF - 200, WHITE_DWARF - 100)
    expect(result).toBeNull()
  })

  test('should return achieved WHITE_DWARF', () => {
    const result = checkNewlyAchievedAstro(WHITE_DWARF - 200, WHITE_DWARF + 100)
    expect(result).toBe('WHITE_DWARF')
  })

  test('should return achieved RED_GIANT', () => {
    const result = checkNewlyAchievedAstro(RED_GIANT - 200, RED_GIANT + 100)
    expect(result).toBe('RED_GIANT')
  })

  test('should return achieved SUPER_NOVA', () => {
    const result = checkNewlyAchievedAstro(SUPER_NOVA - 200, SUPER_NOVA + 100)
    expect(result).toBe('SUPER_NOVA')
  })

  test('should return achieved NEUTRON_STAR', () => {
    const result = checkNewlyAchievedAstro(NEUTRON_STAR - 200, NEUTRON_STAR + 100)
    expect(result).toBe('NEUTRON_STAR')
  })

  test('should return achieved BLACK_HOLE', () => {
    const result = checkNewlyAchievedAstro(BLACK_HOLE - 200, BLACK_HOLE + 100)
    expect(result).toBe('BLACK_HOLE')
  })

  test('should return highest achieved astro', () => {
    const result = checkNewlyAchievedAstro(WHITE_DWARF - 200, NEUTRON_STAR + 100)
    expect(result).toBe('NEUTRON_STAR')
  })

  test('should not return previously achieved astro', () => {
    const result = checkNewlyAchievedAstro(NEUTRON_STAR - 200, NEUTRON_STAR - 100)
    expect(result).toBe(null)
  })
})
