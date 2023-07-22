type AstroName = 'WHITE_DWARF' | 'RED_GIANT' | 'SUPER_NOVA' | 'NEUTRON_STAR' | 'BLACK_HOLE'

type Astro = { name: AstroName; astroId: number; date: number }

export type { AstroName, Astro }
