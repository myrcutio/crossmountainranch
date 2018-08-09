import Document, { Head, Main, NextScript } from 'next/document'
import fetch from 'isomorphic-fetch'
import Header from '../components/Header'
import Logo from '../components/Logo'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
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
        </Head>
        <body>
          <div className="contentWrapper">
            <style>{`
              body {
                margin: 0;
              }
              .contentWrapper {
                max-width: 960px;
                margin: auto;          
                background-color: rgba(154, 229, 229, 0.6);
                background: center no-repeat url(/static/images/greenishcopy.jpg);
                min-height: 100vh;
              }
              .top, .main {
                display: flex;
              }

              .mainContent {
                padding: 36px;
                width: 100%;
              }
            `}</style>
            <div className="top">
              <Logo />
              <Header data={this.props.contentModel.header} />
            </div>
            <Main />
            <NextScript/>
          </div>
        </body>
      </html>
    )
  }
}
