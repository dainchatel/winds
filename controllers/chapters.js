const create = (req, res) => {
  res.json({ chapter: 'create' })
}

const update = (req, res) => {
  res.json({ chapter: 'update' })
}

const destroy = (req, res) => {
  res.json({ chapter: 'destroy' })
}

const get = (req, res) => {
  res.json({ chapter: 'get' })
}

const list = (req, res) => {
  res.json({ chapter: 'list' })
}

const listAvailable = (req, res) => {
  res.json({ chapter: 'listAvailable' })
}

module.exports = {
  create,
  update,
  destroy,
  listAvailable,
  list,
  get
}