const axios = require('axios');
const FormData = require('form-data');
const { getTitleFromUrl } = require('./url')

const FACEBOOK_API = 'https://graph.facebook.com/v11.0/361775957711957'
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN || ''

async function createFBContents (url) {
  if(FACEBOOK_ACCESS_TOKEN === '') {
    return 
  }
  
  const realURL = decodeURIComponent(url)

  // Get title from url
  const contentTitle = await getTitleFromUrl(realURL)

  const form = new FormData();
  form.append('message', contentTitle);
  form.append('link', realURL);

  const config = {
    method: 'post',
    url: `${FACEBOOK_API}/feed?access_token=${FACEBOOK_ACCESS_TOKEN}`,
    headers: { 
      ...form.getHeaders()
    },
    data : form
  };

  return await axios(config)
}

module.exports = { createFBContents };
