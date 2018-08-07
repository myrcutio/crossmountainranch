import contentModel from '../../data/content'

export default () => (
  <div className="boardWrapper">
    <style>
      {`
        .boardWrapper {
          padding-left: 30%;
        }
        `}
    </style>
    {contentModel.board.committees.map((committee, ci) => (
      <div key={ci}>
        <div>{committee.title}</div>
        <ul className="boardMemberList">
          {committee.members.map((m, i) => (
            <li key={i}>{m.fullName}{m.position ? ', ' + m.position : ''}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)