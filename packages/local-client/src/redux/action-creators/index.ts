import { ActionType } from '../action-types'
import { Dispatch } from 'redux'
import {
  MoveUnitAction,
  DeleteUnitAction,
  UpdateUnitAction,
  InsertUnitAfterAction,
  Direction,
  Action,
} from '../actions'
import { UnitTypes, Unit } from '../unit'
import bundleCode from '../../bundler'
import axios from 'axios'
import { RootState } from '../reducers'

export const updateUnit = (id: string, content: string): UpdateUnitAction => {
  return {
    type: ActionType.UPDATE_UNIT,
    payload: {
      id,
      content,
    },
  }
}

export const deleteUnit = (id: string): DeleteUnitAction => {
  return {
    type: ActionType.DELETE_UNIT,
    payload: id,
  }
}

export const moveUnit = (id: string, direction: Direction): MoveUnitAction => {
  return {
    type: ActionType.MOVE_UNIT,
    payload: {
      id,
      direction,
    },
  }
}

export const insertUnitAfter = (
  id: string | null,
  unitType: UnitTypes
): InsertUnitAfterAction => {
  return {
    type: ActionType.INSERT_UNIT_AFTER,
    payload: {
      id,
      type: unitType,
    },
  }
}

export const createBundle = (id: string, content: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id,
      },
    })

    const response = await bundleCode(content)

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: response,
      },
    })
  }
}

export const fetchUnits = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_UNITS })

    try {
      const { data }: { data: Unit[] } = await axios.get('/units')

      dispatch({
        type: ActionType.FETCH_UNITS_COMPLETE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ActionType.FETCH_UNITS_ERROR,
        payload: error.message,
      })
    }
  }
}

export const saveUnits = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      units: { data, order },
    } = getState()

    const units = order.map((id) => data[id])

    try {
      await axios.post('/units', { units })
    } catch (error) {
      dispatch({
        type: ActionType.SAVE_UNITS_ERROR,
        payload: error.message,
      })
    }
  }
}
