import Document, { Head, Main, NextScript } from 'next/document'

import "../styles/styles.sass"
import Logo from '../components/Logo'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    return { ...page }
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
          <meta charSet="utf-8"/>
          <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
          <title>Cross Mountain Ranch Homeowners Cooperative</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Forum|PT+Sans+Narrow:700|PT+Serif|Tinos:700" />
        </Head>
        <body>
          <div className="content-wrapper">
            <Logo />
            <Main />
            {/*<div className="footer">
              Copyright 2018 &copy; Cross Mountain Ranch Homeowners Cooperative
            </div>*/}
          </div>
          <NextScript/>
        </body>
      </html>
    )
  }
}
