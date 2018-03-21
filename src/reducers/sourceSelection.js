export const sourceSelection = (state = {}, action) => {
  switch (action.type) {
    case 'toggle_source':
      return {id: action.id};
    default:
      return state;
  }
};

export default sourceSelection;
