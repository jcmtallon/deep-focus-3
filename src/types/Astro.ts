type Astro = 'WHITE_DWARF' | 'RED_GIANT' | 'SUPER_NOVA' | 'NEUTRON_STAR' | 'BLACK_HOLE'

type ObtainedAstro = { astro: Astro; astroId: number }

export type { Astro, ObtainedAstro }
