export const SourceFilters = (state = [ { type: 'name', filterValue: '', defaultValue: '', extractor: source => source.name},
                                        { type: 'category', filterValue: 'all', defaultValue: 'all', extractor: source => source.category },
                                        { type: 'language', filterValue: 'all', defaultValue: 'all', extractor: source => source.language } ], action) => {
  switch (action.type) {
    case 'filter_source':
      return state.map(item => (item.type === action.attribute) ? { ...item, filterValue: action.value } : item )

    default:
      return state
  }
}

export default SourceFilters
