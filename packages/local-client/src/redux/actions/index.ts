import { ActionType } from '../action-types'
import { UnitTypes, Unit } from '../unit'

export type Direction = 'up' | 'down'

export interface MoveUnitAction {
  type: ActionType.MOVE_UNIT
  payload: {
    id: string
    direction: Direction
  }
}

export interface DeleteUnitAction {
  type: ActionType.DELETE_UNIT
  payload: string
}

export interface InsertUnitAfterAction {
  type: ActionType.INSERT_UNIT_AFTER
  payload: {
    id: string | null
    type: UnitTypes
  }
}

export interface UpdateUnitAction {
  type: ActionType.UPDATE_UNIT
  payload: {
    id: string
    content: string
  }
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START
  payload: {
    id: string
  }
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE
  payload: {
    id: string
    bundle: {
      code: string
      error: string
    }
  }
}

export interface FetchUnitsAction {
  type: ActionType.FETCH_UNITS
}

export interface FetchUnitsCompleteAction {
  type: ActionType.FETCH_UNITS_COMPLETE
  payload: Unit[]
}

export interface FetchUnitsErrorAction {
  type: ActionType.FETCH_UNITS_ERROR
  payload: string
}

export interface SaveUnitsErrorAction {
  type: ActionType.SAVE_UNITS_ERROR
  payload: string
}

export type Action =
  | MoveUnitAction
  | DeleteUnitAction
  | InsertUnitAfterAction
  | UpdateUnitAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchUnitsAction
  | FetchUnitsCompleteAction
  | FetchUnitsErrorAction
  | SaveUnitsErrorAction
