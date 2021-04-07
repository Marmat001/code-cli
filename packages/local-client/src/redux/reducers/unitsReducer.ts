import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Unit } from '../unit'
import produce from 'immer'

interface UnitsState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Unit
  }
}

const initialState: UnitsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const unitsReducer = produce(
  (state: UnitsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.SAVE_UNITS_ERROR:
        state.error = action.payload

        return state

      case ActionType.FETCH_UNITS:
        state.loading = true
        state.error = null
        return state

      case ActionType.FETCH_UNITS_COMPLETE:
        state.order = action.payload.map((unit) => unit.id)
        state.data = action.payload.reduce((acc, unit) => {
          acc[unit.id] = unit
          return acc
        }, {} as UnitsState['data'])
        return state

      case ActionType.FETCH_UNITS_ERROR:
        state.loading = false
        state.error = action.payload
        return state

      case ActionType.UPDATE_UNIT:
        const { id, content } = action.payload

        state.data[id].content = content
        return state

      case ActionType.DELETE_UNIT:
        delete state.data[action.payload]

        state.order = state.order.filter((id) => id !== action.payload)
        return state

      case ActionType.MOVE_UNIT:
        const { direction } = action.payload
        const index = state.order.findIndex((id) => id === action.payload.id)
        const targetIndex = direction === 'up' ? index - 1 : index + 1

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state
        }

        state.order[index] = state.order[targetIndex]
        state.order[targetIndex] = action.payload.id

        return state
      case ActionType.INSERT_UNIT_AFTER:
        const unit: Unit = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        }

        state.data[unit.id] = unit

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        )

        if (foundIndex < 0) {
          state.order.unshift(unit.id)
        } else {
          state.order.splice(foundIndex + 1, 0, unit.id)
        }

        return state
      default:
        return state
    }
  }
)

const randomId = () => {
  return Math.random().toString(36).substr(2, 5)
}

export default unitsReducer
