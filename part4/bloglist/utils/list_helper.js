// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  return likes.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const maxBlogLikes = Math.max(...likes)
  return (maxBlogLikes >= 0) ? blogs.find(b => b.likes === maxBlogLikes): {}
}

const mostBlogs = (blogs) => {
  const authors = [...new Set(blogs.map(b => b.author))]
  const authorsBlogs = []

  authors.forEach(author => authorsBlogs.push({
    author,
    blogs: (blogs.filter(b => b.author === author)).length
  }))

  const mostBlogsValue = Math.max(...(authorsBlogs.map(ab => ab.blogs)))
  const authorWithMostBlogs = authorsBlogs
    .find(authorBlog => authorBlog.blogs === mostBlogsValue)
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authors = [...new Set(blogs.map(b => b.author))]
  const authorsBlogs = []

  authors.forEach(author => {
    const ab = blogs.filter(b => b.author === author)
    const totalLikes = ab.map(a => a.likes).reduce((a, b) => a + b, 0)

    authorsBlogs.push({
      author,
      likes: totalLikes
    })
  })

  const mostLikesValue = Math.max(...(authorsBlogs.map(ab => ab.likes)))
  const authorWithMostLikes = authorsBlogs
    .find(authorBlog => authorBlog.likes === mostLikesValue)
  return authorWithMostLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}