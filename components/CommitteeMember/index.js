export default({ data }) => {
  return (
    <div className="board-member-list">
      { data.committeeName ? <h2>{data.committeeName}</h2> : null }
      <li>{data.fullName}{data.committeePosition ? ', ' + data.committeePosition : ''}</li>
    </div>
  )
}
