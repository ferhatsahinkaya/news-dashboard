export const ArticleFilters = (state = [ { type: 'keyword', filterValue: '', defaultValue: '' },
                                         { type: 'level', filterValue: 'top-headlines', defaultValue: 'top-headlines' } ], action) => {
  switch (action.type) {
    case 'filter_article':
      return state.map(item => (item.type === action.attribute) ? { ...item, filterValue: action.value } : item )

    default:
      return state
  }
}

export default ArticleFilters
