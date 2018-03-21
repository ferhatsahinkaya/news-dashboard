export const sourceSelection = (state = {}, action) => {
  switch (action.type) {
    case 'click_source':
      return { id: action.id, selected: action.selected };
    default:
      return state;
  }
};

export default sourceSelection;
