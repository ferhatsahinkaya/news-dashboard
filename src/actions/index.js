export const clickSource = id => ({
  type: "click_source",
  id
})

export const filterByName = value => ({
  type: "filter_by_name",
  value
})

export const filterByCategory = value => ({
  type: "filter_by_category",
  value
})

export const filterByLanguage = value => ({
  type: "filter_by_language",
  value
})
