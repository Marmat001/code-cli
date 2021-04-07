export type UnitTypes = 'code' | 'text'

export interface Unit {
  id: string
  type: UnitTypes
  content: string
}
