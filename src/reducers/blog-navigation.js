export const BlogNavigation = (state = { page: 'sources' }, action) => {
  switch (action.type) {
    case 'go_to_page':
      return { page: action.page }

    default:
      return state
  }
}

export default BlogNavigation
