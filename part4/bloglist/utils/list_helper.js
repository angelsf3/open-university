const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  return likes.reduce((a, b) => a + b, 0)
}

module.exports = {
  dummy, totalLikes
}