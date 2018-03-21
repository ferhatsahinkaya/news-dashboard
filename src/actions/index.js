export const selectSource = id => ({
  type: "select_source",
  id
});

export const deselectSource = id => ({
  type: "deselect_source",
  id
});
