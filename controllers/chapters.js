const _ = require('lodash')
const db = require('../models')
const Promise = require('bluebird')

const create = async (req, res) => {
  console.log('attempting to create a chapter')
  const { body } = req
  try {
    if (!_.size(body)) throw new Error('Body required')
    const createRes = await db.Chapter.create({
      chapter_name: body.chapter_name,
      chapter_number: body.chapter_number,
      chapter_text: body.chapter_text
    })
    res.send(`New chapter ${createRes.chapter_name}, with id ${createRes.id} has been created.`)
  } catch (e) {
    res.send(e.message)
  }
}

const update = async (req, res) => {
  console.log(`attempting to update chapter ${req.params.id}`)
  try {
    const { params: { id } } = req
    const { body } = req
    const [ x, [ { dataValues } ] ] = await db.Chapter.update(body, {
      where: { id },
      returning: true
    })
    res.json(dataValues)
  } catch (e) {
    res.send(e.message)
  }
}

const destroy = async (req, res) => {
  console.log(`attempting to destroy chapter ${req.params.id}`)
  try {
    const { params: { id } } = req
    const destroyRes = await db.Chapter.destroy({
      where: { id }
    })
    res.send(`${destroyRes === 1 ? 'Success' : 'Chapter not found' }`)
  } catch (e) {
    res.send(e.message)
  }
}

const get = async (req, res) => {
  console.log(`attempting to get chapter ${req.params.id}`)
  try {
    const { params: { id } } = req
    const getResult = await db.Chapter.findOne({ where: { id } })
    if (!getResult) throw new Error(`Chapter with id ${id} not found`)
    res.send(getResult)
  } catch (e) {
    res.send(e.message)
  }
}

const list = async (req, res) => {
  console.log('attempting to find all chapters')
  try {
    const listResult = await db.Chapter.findAll({
      attributes: ['id', 'chapter_name', 'chapter_number']
    })
    res.send(listResult)
  } catch (e) {
    res.send(e.message)
  }
}

const listAvailable = async (req, res) => {
  console.log('attempting to find all available chapters')
  try {
    const listResult = await db.Chapter.findAll()
    const filteredList = await Promise.filter(listResult, async chapter => {
      const views = await db.View.findAll({ 
        where: { chapter_id: chapter.id },
        attributes: ['id']
      })
      return chapter.necessary_views <= _.size(views)
    })
    res.send(filteredList)
  } catch (e) {
    res.send(e.message)
  }}

module.exports = {
  create,
  update,
  destroy,
  listAvailable,
  list,
  get
}