import Menu from '../components/Menu'

const Home = ({ contentModel }) => (
      <div className="main">
        <Menu links={contentModel.sitemap} footer={contentModel.contactBlock}/>
        <div className="mainContent">
          <div>
            <style>{
              `.alerts {
          color: red;
          font-size: 1.6em;
        }`
            }</style>
            <p className="alerts">{contentModel.alert}</p>
            <p className="description">{contentModel.homepage.description}</p>
            <p className="disclosure">{contentModel.homepage.disclosure}</p>
          </div>
        </div>
      </div>
    )

Home.getInitialProps = async () => {
  const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
  return { contentModel }
}

export default Home