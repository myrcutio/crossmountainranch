export default ({data}) => (
  <div className="header">
    <style>{`
      .header {
        text-align: center;
        font-family: Copperplate Gothic Bold;
        width: 100%;
        border-bottom: 2px solid #568497;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .header .title {
        font-size: 2.0em;
      }
      .header .subtitle {
        font-size: 1.5em;
      }
    `}</style>
    <div className="title">{data.title}</div>
    <div className="subtitle">{data.subtitle}</div>
  </div>
)