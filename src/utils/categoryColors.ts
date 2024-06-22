const CategoryColor: Record<string, string> = {
  '#B3DEC1': 'Celadon' as const, // Soft green
  '#788475': 'Reseda green' as const, // Muted green
  '#96BDC6': 'Light blue' as const, // Soft blue
  '#C1DBE3': 'Columbia blue' as const, // Light blue-gray
  '#EDF2F4': 'Anti-flash white' as const, // Very light gray
  '#CEBEBE': 'Silver' as const, // Light gray
  '#7F9183': 'Battleship gray' as const, // Medium gray
  '#FFEDB3': 'Light yellow' as const, // Light yellow (added)
  '#F6E27F': 'Mellow yellow' as const, // Soft yellow (added)
  '#FFC87C': 'Topaz' as const, // Yellow-orange (added)
  '#BA9790': 'Rosy brown' as const, // Soft brown
  '#A26769': 'Rose taupe' as const, // Taupe
  '#CE796B': 'Old rose' as const, // Muted pink
  '#FCB1A6': 'Melon' as const, // Light peach
  '#D8BFD8': 'Thistle' as const, // Light purple (added)
  '#DDA0DD': 'Plum' as const, // Soft purple (added)
  '#E6A8D7': 'Orchid' as const, // Light magenta (added)
  '#DD614A': 'Jasper' as const, // Red-orange
  '#F48668': 'Coral' as const, // Soft orange
  '#FB6376': 'Bright pink' as const, // Bright pink
  '#E072A4': 'Thulian Pink' as const, // Muted pink
  '#f03a47': 'Imperial red' as const, // Red
  '#F4C2C2': 'Baby pink' as const, // Soft pink (added for balance)
}

type CategoryColor = (typeof CategoryColor)[keyof typeof CategoryColor]

const getCategoryColorName = (colorValue: string): string => {
  if (colorValue in CategoryColor) {
    return CategoryColor[colorValue]
  }

  return 'Unknown'
}

const getDefaultCategoryColor = (): string => {
  return Object.keys(CategoryColor).find(key => CategoryColor[key] === 'Light blue') ?? '#96BDC6'
}

export { CategoryColor, getCategoryColorName, getDefaultCategoryColor }
