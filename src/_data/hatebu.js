const fetch = require('node-fetch')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

const UTC_OFFSET_JST = 9

dayjs.extend(utc)

module.exports = async function () {
  const now = dayjs().utcOffset(UTC_OFFSET_JST)
  const fileName = `${now.format('YYYYMMDD')}.json`
  const endpoint = `https://nishinoshake-hatebu-tech.s3-ap-northeast-1.amazonaws.com/weekly/${fileName}`
  const res = await fetch(endpoint)
  const items = await res.json()
  const formattedItems = items.map((item, i) => ({
    ...item,
    index: (i + 1).toString().padStart(3, '0'),
    title: item.title.length > 128 ? `${item.title.slice(0, 128)}...` : item.title
  }))

  return {
    items: formattedItems,
    releasedAt: now.format('MM.DD'),
    endpoint
  }
}
