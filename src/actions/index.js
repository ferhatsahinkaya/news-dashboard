export const goToPage = page => ({
  type: 'go_to_page',
  page
})

export const clickSource = id => ({
  type: "click_source",
  id
})

export const filterSource = (attribute, value) => ({
  type: "filter_source",
  attribute,
  value
})

export const filterArticle = (attribute, value) => ({
  type: "filter_article",
  attribute,
  value
})
