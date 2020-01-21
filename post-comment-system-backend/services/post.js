module.exports = (app, db) => {
  app.get('/posts', (req, res) => {
    db.post.findAll({
      order: [
        ['id', 'DESC'],
      ],
      include: [{
        model: db.comment
      }]
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  })

  app.post('/post', (req, res) => {
    db.post.create({
      author: req.body.author,
      text: req.body.text,
      picture: req.body.picture
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => {
        console.error(error);
        res.status(400).json({ message: error.message })
      })
  })

  app.delete('/post/:id', (req, res) => {
    db.post.destroy({ where: req.params.id })
      .then(result => {
        res.status(204).json()
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  })

  app.put('/post/:id', (req, res) => {
    db.post.update({
      author: req.body.author,
      text: req.body.text,
      picture: req.body.picture
    }, { where: { id: req.params.id } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  })
}