const _ = require('lodash')
const db = require('../models')

const create = async (req, res) => {
  console.log('attempting to create a chapter view')
  try {
  const { body: { chapter_id }, ipAddress: ip_address } = req
  if (!ip_address) throw new Error('No IP address found, not creating chapter view')
  const view = { ip_address, chapter_id }
  const preExistingChapterView = await db.View.findOne({
    where: view,
    attributes: ['id']
  })
  if (!!preExistingChapterView) throw new Error(`IP ${ip_address} already viewed chapter ${chapter_id}`)
    const createRes = await db.View.create(view)
    res.send(`New view of ${createRes.chapter_id} by ${createRes.ip_address}, with id ${createRes.id} has been created.`)
  } catch (e) {
    res.send(e.message)
  }
}

module.exports = {
  create,
}