export default({ data }) => {
  return (
    <div>
      { data.content ? (
        <p className="description">
          {data.content}
        </p>
      ): null}
      { data.disclosure ? (
        <p className="disclosure">
          {data.disclosure}
        </p>
      ): null}
    </div>
  )
}
