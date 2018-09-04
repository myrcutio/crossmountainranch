export default({ data }) => {
  return (
    <div>
      { data.content ? (
        <p className="description">
          {data.content}
        </p>
      ): null}
    </div>
  )
}
