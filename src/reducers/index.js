import SelectedSources from './selected-sources'
import SourceFilters from './source-filters'
import ArticleFilters from './article-filters'
import { combineReducers } from "redux"

export const reducers = combineReducers({
  SelectedSources,
  SourceFilters,
  ArticleFilters
})

export default reducers
