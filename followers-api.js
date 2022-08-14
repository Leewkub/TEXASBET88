const axios = require('axios')
const LINE_MESSAGING_API = "https://api.line.me/v2/bot"
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.CHANNEL_ACCESS_TOKEN}`
}

const getFollowerIds = async(next) => {
  try {
    const json = await axios({
      method: 'get',
      url: `${LINE_MESSAGING_API}/followers/ids?limit=1000` + (next ? `&start=${next}` : ``),
      headers: LINE_HEADER
    })
    return json.data
  } catch (e) {
    return null
  }
}
