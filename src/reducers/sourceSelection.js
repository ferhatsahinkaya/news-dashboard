export const sourceSelection = (state = {}, action) => {
  switch (action.type) {
    case 'select_source':
      return {id: action.id, selected: true};
    case 'deselect_source':
      return {id: action.id, selected: false}
    default:
      return state;
  }
};

export default sourceSelection;
