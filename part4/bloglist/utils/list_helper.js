const dummy = (blogs) => {
  console.log(blogs)
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

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}