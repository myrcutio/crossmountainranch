import Document, { Head, Main, NextScript } from 'next/document'

import "../styles/styles.sass"

import contentModel from '../static/data/content.js'

import Logo from '../components/Logo'
// import fetch from 'isomorphic-fetch'
// import Header from '../components/Header'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    // const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
    return { ...page, contentModel }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="description" content="Cross Mountain Ranch Homeowners Cooperative" />
          <meta property="og:title" content="Cross Mountain Ranch" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta content="text/html; charset=ISO-8859-1" httpEquiv="content-type" />
          <title>Cross Mountain Ranch Homeowners Cooperative</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Forum|PT+Sans+Narrow:700|PT+Serif|Tinos:700" />
        </Head>
        <body>
          <NextScript/>
          <div className="content-wrapper">
            <Logo />
            <Main />

            {/*<div className="footer">
              Copyright 2018 &copy; Cross Mountain Ranch Homeowners Cooperative
            </div>*/}
          </div>
        </body>
      </html>
    )
  }
}
