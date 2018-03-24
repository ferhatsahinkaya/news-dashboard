import SelectedSources from './selected-sources'
import SourceFilters from './source-filters'
import { combineReducers } from "redux"

export const reducers = combineReducers({
  SelectedSources,
  SourceFilters
})

export default reducers
