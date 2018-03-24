export const SelectedSources = (state = [], action) => {
  switch (action.type) {
    case 'click_source':
      return state.includes(action.id)
              ? state.filter(source => source !== action.id)
              : state.concat(action.id)

    default:
      return state
  }
}

export default SelectedSources
