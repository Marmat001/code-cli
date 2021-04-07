import { combineReducers } from 'redux'
import unitsReducer from './unitsReducer'
import bundlesReducer from './bundlesReducer'

const reducers = combineReducers({
  units: unitsReducer,
  bundles: bundlesReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>
