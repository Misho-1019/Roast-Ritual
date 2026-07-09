export interface BrewStep {
  number: number
  instruction: string
  duration: number
}

export interface BrewMethod {
  id: string
  name: string
  shortDescription: string
  difficulty: string
  totalTime: string
  icon: string
  steps: BrewStep[]
}

export const brewMethods: BrewMethod[] = [
  {
    id: 'pourover',
    name: 'Pour-over (V60)',
    shortDescription: 'Single-cup pour-over for clean, bright flavor',
    difficulty: 'Medium',
    totalTime: '~3:30 min',
    icon: 'coffee_maker',
    steps: [
      { number: 1, instruction: 'Heat water to 96°C (205°F). Place a filter in the V60 and rinse with hot water.', duration: 30 },
      { number: 2, instruction: 'Add 15g of medium-fine ground coffee. Create a small well in the center.', duration: 15 },
      { number: 3, instruction: 'Pour 30g of water in a circular motion. Wait 30 seconds for the bloom.', duration: 30 },
      { number: 4, instruction: 'Continue pouring slowly to 250g total water in spirals.', duration: 60 },
      { number: 5, instruction: 'Allow water to drain through. Total brew time should be ~3 minutes.', duration: 75 },
    ],
  },
  {
    id: 'french-press',
    name: 'French Press',
    shortDescription: 'Full immersion for rich, full-bodied coffee',
    difficulty: 'Easy',
    totalTime: '~4:00 min',
    icon: 'air',
    steps: [
      { number: 1, instruction: 'Coarsely grind 30g of coffee beans.', duration: 15 },
      { number: 2, instruction: 'Add grounds to French Press and pour 100ml hot water (96°C). Stir gently.', duration: 15 },
      { number: 3, instruction: 'Pour remaining 300ml water. Place lid on with plunger up. Wait 4 minutes.', duration: 240 },
      { number: 4, instruction: 'Slowly press the plunger down. Pour and enjoy immediately.', duration: 15 },
    ],
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    shortDescription: 'Quick pressurized brew for smooth coffee',
    difficulty: 'Easy',
    totalTime: '~1:30 min',
    icon: 'bolt',
    steps: [
      { number: 1, instruction: 'Heat water to 85°C (185°F). Insert a paper filter into the cap and rinse.', duration: 20 },
      { number: 2, instruction: 'Add 15g of fine-ground coffee. Pour 50g water and stir for 10 seconds.', duration: 10 },
      { number: 3, instruction: 'Pour remaining 200g water. Insert plunger and press gently for 30 seconds.', duration: 30 },
      { number: 4, instruction: 'Stop pressing when you hear a hiss. Dilute with hot water to taste.', duration: 10 },
    ],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    shortDescription: 'Slow steeped for smooth, low-acid coffee',
    difficulty: 'Easy',
    totalTime: '~14-16 hours',
    icon: 'ac_unit',
    steps: [
      { number: 1, instruction: 'Coarsely grind 100g of coffee beans.', duration: 30 },
      { number: 2, instruction: 'Combine grounds with 1 liter of cold, filtered water in a large jar. Stir well.', duration: 30 },
      { number: 3, instruction: 'Cover and refrigerate for 14-16 hours. Do not disturb during steeping.', duration: 54000 },
      { number: 4, instruction: 'Filter through a fine-mesh sieve lined with cheesecloth or a paper filter.', duration: 120 },
      { number: 5, instruction: 'Dilute concentrate with equal parts water or milk. Serve over ice.', duration: 30 },
    ],
  },
]
