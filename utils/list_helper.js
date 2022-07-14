const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // let total = 0
  // blogs.forEach((blog) => {
  //   total += blog.likes
  // })
  return blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((previousBlog, currentBlog) => {
    return previousBlog.likes > currentBlog.likes ? previousBlog : currentBlog
  }, {})
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
    url: favoriteBlog.url,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
