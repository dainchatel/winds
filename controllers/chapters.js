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
      chapter_text: body.chapter_text,
      necessary_views: body.necessary_views
    })
    res.send({ message: `New chapter ${createRes.chapter_name}, with id ${createRes.id} has been created.`})
  } catch (e) {
    res.send({ message: e.message })
  }
}

const createView = async (req, res) => {
  console.log('attempting to create a chapter view')
  try {
    const { params: { id: chapter_id }, ipAddress: ip_address } = req
    if (!ip_address) throw new Error('No IP address found, not creating chapter view')
    const view = { ip_address, chapter_id }
    const preExistingChapterView = await db.View.findOne({
      where: view,
      attributes: ['id']
    })
    if (!!preExistingChapterView) throw new Error(`IP ${ip_address} already viewed chapter ${chapter_id}`)
    const createRes = await db.View.create(view)
    res.send({ message: `New view of ${createRes.chapter_id} by ${createRes.ip_address}, with id ${createRes.id} has been created.`})
  } catch (e) {
    res.send({ message: e.message })
  }
}

const update = async (req, res) => {
  console.log(`attempting to update chapter ${req.params.id}`)
  try {
    const { params: { id } } = req
    const { body } = req
    const [x, [{ dataValues }]] = await db.Chapter.update(body, {
      where: { id },
      returning: true
    })
    res.json({ chapters: [dataValues] })
  } catch (e) {
    res.send({ message: e.message })
  }
}

const destroy = async (req, res) => {
  console.log(`attempting to destroy chapter ${req.params.id}`)
  try {
    const { params: { id } } = req
    const destroyRes = await db.Chapter.destroy({
      where: { id }
    })
    res.send({ message: `${destroyRes === 1 ? 'Success' : 'Chapter not found'}` })
  } catch (e) {
    res.send({ message: e.message })
  }
}

const get = async (req, res) => {
  console.log(`attempting to get chapter ${req.params.id}`)
  try {
    const { params: { id } } = req
    const getResult = await db.Chapter.findOne({ where: { id } })
    if (!getResult) throw new Error(`Chapter with id ${id} not found`)
    res.send({ chapters: [getResult] })
  } catch (e) {
    res.send({ message: e.message })
  }
}

const list = async (req, res) => {
  console.log('attempting to find all chapters')
  try {
    const listResult = await db.Chapter.findAll({
      attributes: ['chapter_name', 'chapter_number', 'necessary_views']
    })
    res.send({ chapters: listResult })
  } catch (e) {
    res.send({ message: e.message })
  }
}

const listAvailable = async (req, res) => {
  console.log('attempting to find all available chapters')
  try {
    const listResult = await db.Chapter.findAll()
    const viewIds = await db.View.findAll({
      attributes: ['id']
    })
    const totalViews = _.size(viewIds)
    const availableChaptersWithViews = await Promise.reduce(listResult, async (acc, chapter) => {
      const chapterViews = await db.View.findAll({
        where: { chapter_id: chapter.id },
        attributes: ['id']
      })
      const chap = {
        id: chapter.id,
        name: chapter.chapter_name,
        number: chapter.chapter_number,
        text: chapter.chapter_text,
        necessary_views: chapter.necessary_views,
        chapter_views: _.size(chapterViews)
      }
      if (totalViews >= chapter.necessary_views) acc.push(chap)
      return acc
    }, [])
    res.send({ chapters: availableChaptersWithViews })
  } catch (e) {
    res.send({ message: e.message })
  }
}

module.exports = {
  create,
  createView,
  update,
  destroy,
  listAvailable,
  list,
  get
}