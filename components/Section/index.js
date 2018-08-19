export default({ data }) => {
  return (
    <div>
      { data.title ? (
        <h2 className="title">
          {data.title}
        </h2>
      ): null}
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
