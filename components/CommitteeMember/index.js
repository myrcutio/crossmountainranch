export default({ data }) => {
  return (
    <div className={ data.committeeName ? 'committee-section' : '' }>
      { data.committeeName ? <h2 className="committee-section-label">{data.committeeName}</h2> : null }
      <div className="committee-member">{data.fullName}{data.committeePosition ? ', ' + data.committeePosition : ''}</div>
    </div>
  )
}
