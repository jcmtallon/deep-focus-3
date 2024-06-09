interface Category {
  /**
   * The name of the category.
   */
  name: string
  /** A hexadecimal color value.
   * (E.g: #RRGGBB, where the RR (red), GG (green) and BB (blue) hexadecimal integers specify the components of the color.)
   * */
  color: string
  /**
   * The unique identifier of the category.
   */
  id: number
}

export type { Category }
