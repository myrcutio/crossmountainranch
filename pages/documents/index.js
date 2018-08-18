import Layout from '../../components/Layout'

const Documents = ({ contentModel }) => (
  <Layout regions={contentModel.regions} />
)

Documents.getInitialProps = async () => {
  const contentModel = await (await fetch('https://is0oiqxqh3.execute-api.us-west-2.amazonaws.com/prod/path/documents')).json()
  return { contentModel }
}

export default Documents
