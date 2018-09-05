import ReactMarkdown from 'react-markdown'

export default({ data }) => {
  return (
    <ReactMarkdown source={data.markdown} />
  )
}
