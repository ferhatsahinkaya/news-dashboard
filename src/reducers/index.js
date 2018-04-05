import SelectedSources from './selected-sources'
import SourceFilters from './source-filters'
import ArticleFilters from './article-filters'
import BlogNavigation from './blog-navigation'
import { combineReducers } from "redux"

export const reducers = combineReducers({
  SelectedSources,
  SourceFilters,
  ArticleFilters,
  BlogNavigation
})

export default reducers
