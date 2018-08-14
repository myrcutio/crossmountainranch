const mysql = require('mysql')
const _get = require('lodash.get')
const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.pass,
  database : 'content'
})

// Basic CRUD functions
function httpGET(event, context) {
  let slug, pages
  if (event && event.pathParameters && event.pathParameters.slug) {
    slug = event.pathParameters.slug
  } else {
    context.succeed({
      statusCode: 400,
      body: JSON.stringify({
        error: "url slug is required"
      })
    })
  }

  const pageQuery = `
SELECT * from content.pageContentMaps as pcm 
LEFT JOIN content.sections on pcm.sectionId = content.sections.id
LEFT JOIN content.committees on pcm.committeeId = content.committees.id
LEFT JOIN content.documents on pcm.documentId = content.documents.id
LEFT JOIN content.news on pcm.newsId = content.news.id
LEFT JOIN content.notices on pcm.alertId = content.notices.id
LEFT JOIN content.pages on pcm.pageId = content.pages.id
WHERE content.pages.slug = ${JSON.stringify(slug)}
`

  connection.query(pageQuery, function (error, res, fields) {
    if (error) throw error;
    console.log('returned data: ', res)

    let regions = {
      sections: [],
      news: [],
      alerts: [],
      committees: [],
      documents: []
    }

    res.map((region, i) => {
      if (region.alertId !== null) {
        regions.alerts.push(region)
      }
      if (region.sectionId !== null) {
        regions.sections.push(region)
      }
      if (region.newsId !== null) {
        regions.news.push(region)
      }
      if (region.committeeId !== null) {
        regions.committees.push(region)
      }
      if (region.documentId !== null) {
        regions.documents.push(region)
      }
    })

    let response = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        slug,
        regions
      }),
      statusCode: 200
    }
    context.succeed(response)
  })
}

function httpPOST(event, context) {
  const eventBody = _get(event, 'body', false)
  if (!eventBody) {
    context.succeed({
      statusCode: 400,
      body: JSON.stringify({
        error: "POST body is required (slug, label)"
      })
    })
    return;
  }

  const {
    slug,
    label
  } = eventBody

  const noticeInsert = `
    INSERT INTO content.pages
    ( slug,
      label)
    VALUES
    ( "${slug}",
      "${label}");
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
  const pageId = _get(event, 'pathParameters.pageId', false)
  const eventBody = _get(event, 'body', false)
  if (!pageId || !eventBody) {
    context.succeed({
      statusCode: 400,
      body: JSON.stringify({
        error: "page ID and body are required"
      })
    })
    return;
  }

  const {
    slug,
    label
  } = eventBody

  const pageUpdate = `
    UPDATE content.pages
    SET slug = "${slug}"
    SET label = "${label}"
    WHERE (id = ${pageId});
    `

  connection.query(pageUpdate, function (error, res, fields) {
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

exports.httpGET = httpGET
exports.httpPOST = httpPOST
exports.httpPUT = httpPUT
