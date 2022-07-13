const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach((blog) => {
    total += blog.likes
  })
  return total
}

const mostLikes = (blogs) => {
  const mostLikes = blogs.reduce((previousBlog, currentBlog) => {
    return previousBlog.likes > currentBlog.likes ? previousBlog : currentBlog
  }, {})
  return {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes,
    url: mostLikes.url,
  }
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}
