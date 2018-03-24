export const SourceFilters = (state = [ { type: 'name', filterValue: '', defaultValue: '', extractor: source => source.name},
                                        { type: 'category', filterValue: 'all', defaultValue: 'all', extractor: source => source.category },
                                        { type: 'language', filterValue: 'all', defaultValue: 'all', extractor: source => source.language } ], action) => {
  switch (action.type) {
    case 'filter_by_name':
      return state.map(item => (item.type === 'name') ? { ...item, filterValue: action.value } : item )

    case 'filter_by_category':
      return state.map(item => (item.type === 'category') ? { ...item, filterValue: action.value } : item )

    case 'filter_by_language':
      return state.map(item => (item.type === 'language') ? { ...item, filterValue: action.value } : item )

    default:
      return state
  }
}

export default SourceFilters
