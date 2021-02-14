const { createNewContent } = require('./utils/update-readme.js')

module.exports.contents = async event => {

  if (!event.body){
    return {
      statusCode: 404,
      body: JSON.stringify(
        {
          message: 'We dont have body',
        },
        null,
        2
      ),
    };
  }

  const bodyObj = event.body.split('&').reduce((acc, item) => {
    const itemArr = item.split('=')
    return {
      ...acc,
      [itemArr[0]]: itemArr[1] 
    }
  }, {})

  await createNewContent(bodyObj)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'successfully!',
        url: event.body || '',
      },
      null,
      2
    ),
  };
};
