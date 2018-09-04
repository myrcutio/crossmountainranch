export default({ data }) => {
  return (
    <div className="titleBlock">
      { data.title ? (
        <h2 className="title">
          {data.title}
        </h2>
      ): null}
      { data.subtitle ? (
        <h4 className="subtitle">
          {data.subtitle}
        </h4>
      ): null}
    </div>
  )
}
