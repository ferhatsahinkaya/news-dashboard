export const clickSource = id => ({
  type: "click_source",
  id
})

export const filterSource = (attribute, value) => ({
  type: "filter_source",
  attribute,
  value
})
