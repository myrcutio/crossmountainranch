import Menu from '../../components/Menu'

import contentModel from '../../static/data/content.js'

const Board = ({ contentModel }) => (
  <div className="main">
    <Menu />

    <div className="main-content">
      {contentModel.board.committees.map((committee, ci) => (
        <div key={ci}>
          <h2>{committee.title}</h2>
          <ul className="board-member-list">
            {committee.members.map((m, i) => (
              <li key={i}>{m.fullName}{m.position ? ', ' + m.position : ''}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)

Board.getInitialProps = async () => {
  // const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
  return { contentModel }
}

export default Board
