export default({ data }) => {
  return (
    <div className="committee-member">{data.fullName}{data.committeePosition ? ', ' + data.committeePosition : ''}</div>
  )
}
