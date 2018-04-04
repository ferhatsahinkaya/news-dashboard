export const ArticleFilters = (state = [ { type: 'keyword', filterValue: '' },
                                         { type: 'level', filterValue: 'top-headlines' },
                                         { type: 'fromDate', filterValue: '' },
                                         { type: 'toDate', filterValue: '' } ], action) => {
  switch (action.type) {
    case 'filter_article':
      return state.map(item => (item.type === action.attribute) ? { ...item, filterValue: action.value } : item )

    default:
      return state
  }
}

export default ArticleFilters
