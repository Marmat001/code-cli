import { Dispatch } from 'redux'
import { Action } from '../actions'
import { ActionType } from '../action-types'
import { saveUnits } from '../action-creators'
import { RootState } from '../reducers'

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>
  getState: () => RootState
}) => {
  let timer: any

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action)

      if (
        [
          ActionType.MOVE_UNIT,
          ActionType.UPDATE_UNIT,
          ActionType.INSERT_UNIT_AFTER,
          ActionType.DELETE_UNIT,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          saveUnits()(dispatch, getState)
        }, 250)
      }
    }
  }
}
