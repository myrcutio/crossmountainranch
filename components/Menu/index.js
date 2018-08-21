const Menu = ({ siteMap }) => {
  return (
    <div className="menu">
      {siteMap && Object.keys(siteMap).length ? Object.keys(siteMap).map((l, i) => {
        return siteMap[l].menu !== false ? (
          <div key={i} className="menu-item">
            <a href={l}>{siteMap[l].label}</a>
          </div>
        ) : null
      }) : null}
    </div>
  )
}

export default Menu