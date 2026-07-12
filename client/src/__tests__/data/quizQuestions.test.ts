import { describe, it, expect } from 'vitest'
import { calculateMatch, products } from '../../data/quizQuestions'

describe('calculateMatch', () => {
  it('returns anaerobic gesha for experimental + fruity', () => {
    const result = calculateMatch({ 1: 'black', 2: 'fruity', 3: 'light', 4: 'morning', 5: 'experimental' })
    expect(result.slug).toBe('anaerobic-gesha')
  })

  it('returns colombian for nutty preference', () => {
    const result = calculateMatch({ 1: 'milk', 2: 'nutty', 3: 'medium', 4: 'afternoon', 5: 'balanced' })
    expect(result.slug).toBe('colombian-supremo')
  })

  it('returns midnight sumatra for chocolate + dark', () => {
    const result = calculateMatch({ 1: 'sweet', 2: 'chocolate', 3: 'dark', 4: 'evening', 5: 'classic' })
    expect(result.slug).toBe('midnight-sumatra')
  })

  it('returns ethiopian yirgacheffe for morning + light', () => {
    const result = calculateMatch({ 1: 'black', 3: 'light', 4: 'morning' })
    expect(result.slug).toBe('ethiopian-yirgacheffe')
  })

  it('returns costa rican tarrazu for evening + classic', () => {
    const result = calculateMatch({ 1: 'sweet', 2: 'citrus', 3: 'medium', 4: 'evening', 5: 'classic' })
    expect(result.slug).toBe('costa-rican-tarrazu')
  })

  it('returns kenyan AA for citrus without sweet', () => {
    const result = calculateMatch({ 1: 'black', 2: 'citrus', 3: 'light', 4: 'morning', 5: 'balanced' })
    expect(result.slug).toBe('kenyan-aa')
  })

  it('returns default product (ethiopian) when no rules match', () => {
    const result = calculateMatch({})
    expect(result.slug).toBe('ethiopian-yirgacheffe')
  })

  it('returns a valid product from the products list', () => {
    const result = calculateMatch({ 1: 'black', 2: 'nutty', 3: 'medium', 4: 'morning', 5: 'balanced' })
    const slugs = products.map((p) => p.slug)
    expect(slugs).toContain(result.slug)
  })
})
