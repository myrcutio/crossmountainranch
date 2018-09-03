const Menu = ({ siteMap, adminMode }) => {
  return (
    <div className="menu">
      {siteMap && Object.keys(siteMap).length ? Object.keys(siteMap).map((l, i) => {
        const menuLink = `${adminMode ? '/admin/#' : ''}${l}`
        return siteMap[l].menu !== false ? (
          <div key={i} className="menu-item">
            <a href={menuLink}>{siteMap[l].label}</a>
          </div>
        ) : null
      }) : null}
    </div>
  )
}

export default Menu