const mysql = require('mysql');
const _get = require('lodash.get')
const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.pass,
  database : 'content'
})

// Basic CRUD functions
function httpPOST(event, context) {
  const eventBody = _get(event, 'body', false)
  if (!eventBody) {
    context.succeed({
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: "POST body is required (noticeTitle, noticeDate, noticeLocation, noticeContent)"
      })
    })
    return;
  }

  const {
    noticeTitle,
    noticeDate,
    noticeLocation,
    noticeContent
  } = eventBody

  const noticeInsert = `
    INSERT INTO content.notices
    ( noticeTitle,
      noticeDate,
      noticeLocation,
      noticeContent)
    VALUES
    ( "${noticeTitle}",
      "${noticeDate}",
      "${noticeLocation}",
      "${noticeContent}");
    `

  connection.query(noticeInsert, function (error, res, fields) {
    if (error) throw error;

    let response = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: res
      }),
      statusCode: 200
    }
    context.succeed(response)
  })
}

function httpPUT(event, context) {
  const noticeId = _get(event, 'pathParameters.noticeId', false)
  const eventBody = _get(event, 'body', false)
  if (!noticeId || !eventBody) {
    context.succeed({
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: "notice ID and body are required"
      })
    })
    return;
  }

  const {
    noticeTitle,
    noticeDate,
    noticeLocation,
    noticeContent
  } = eventBody

  const noticeUpdate = `
    UPDATE content.notices
    SET noticeTitle = "${noticeTitle}"
    SET noticeDate = "${noticeDate}"
    SET noticeLocation = "${noticeLocation}"
    SET noticeContent = "${noticeContent}"
    WHERE (id = ${noticeId});
    `

  connection.query(noticeUpdate, function (error, res, fields) {
    if (error) throw error;

    let response = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: res
      }),
      statusCode: 200
    }
    context.succeed(response)
  })
}

exports.httpPOST = httpPOST
exports.httpPUT = httpPUT

