const mysql = require('mysql');
const _get = require('lodash.get')
const dataSchema = require('../../data/componentFieldMapping')
const tableIds = require('../../data/tableIdMapping')
const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.pass,
  database : 'content'
})

const schemaMap = dataSchema

function httpGETTable(event, context, callback) {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
      return callback(null, 'Lambda is warm!')
  }

  const dbTable = _get(event, 'pathParameters.table', false)
  if (!dbTable) {
    context.succeed({
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: "table is required"
      })
    })
    return;
  }

  const tableGet = `
    SELECT * FROM content.${dbTable}
    `

  connection.query(tableGet, function (error, res, fields) {
    if (error) throw error;

    let response = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(res),
      statusCode: 200
    }
    context.succeed(response)
  })
}


// Basic CRUD functions
function httpPOST(event, context, callback) {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
      return callback(null, 'Lambda is warm!')
  }

  const eventBody = JSON.parse(_get(event, 'body', '{}'))
  const dbTable = _get(event, 'pathParameters.table', false)
  if (!eventBody || !dbTable) {
    context.succeed({
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: "body and table are required"
      })
    })
    return;
  }

  console.log('current event body: ', eventBody)

  const fields = schemaMap[dbTable].filter(f => eventBody[f])

  const tableOrderUpdate = `
    CALL bump_order_if_duplicate(${eventBody.orderWeight},${eventBody.pageId});
  `
  const tableInsert = `
    INSERT INTO content.${dbTable}
    ( ${fields.join(',')})
    VALUES
    ( ${fields.map(field => `"${eventBody[field]}"`).join(',')} );
  `

  const insertQuery = () => connection.query(tableInsert, function (error, res, fields) {
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

  if (dbTable === 'pageContentMaps' && typeof eventBody.orderWeight !== 'undefined') {
    connection.query(tableOrderUpdate, insertQuery)
  } else {
    insertQuery()
  }
}

function httpPUT(event, context, callback) {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
      return callback(null, 'Lambda is warm!')
  }

  const tableId = _get(event, 'pathParameters.id', false)
  const dbTable = _get(event, 'pathParameters.table', false)
  const eventBody = JSON.parse(_get(event, 'body', '{}'))
  if (!tableId || !dbTable || !eventBody) {
    context.succeed({
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: "ID, Table, and body are required"
      })
    })
    return;
  }

  const fields = schemaMap[dbTable].filter(field => eventBody[field])

  const tableUpdate = `
    UPDATE content.${dbTable}
    SET ${fields.map(field => `${field} = "${eventBody[field]}"`).join(", ") + "\n"}
    WHERE (id = ${tableId});
  `

  connection.query(tableUpdate, function (error, res, fields) {
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

function httpDELETE(event, context, callback) {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
      return callback(null, 'Lambda is warm!')
  }

  const tableId = _get(event, 'pathParameters.id', false)
  const dbTable = _get(event, 'pathParameters.table', false)

  if (!tableId || !dbTable) {
    context.succeed({
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: "ID and Table are required"
      })
    })
    return;
  }

  const tableDelete = `
    DELETE content.${dbTable}, content.pageContentMaps
    FROM content.${dbTable}, content.pageContentMaps
    WHERE content.pageContentMaps.${tableIds[dbTable]} = content.${dbTable}.id AND content.${dbTable}.id = ${tableId}
  `

  // TODO if deleting from the documents table, also delete the file from s3

  connection.query(tableDelete, function (error, res, fields) {
    if (error) throw error;

    let response = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(res),
      statusCode: 200
    }
    context.succeed(response)
  })
}

exports.httpGETTable = httpGETTable
exports.httpPOST = httpPOST
exports.httpPUT = httpPUT
exports.httpDELETE = httpDELETE

