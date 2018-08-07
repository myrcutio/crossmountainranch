import contentModel from '../data/content'

export default () => (
  <div>
    <p className="alerts">{contentModel.alert}</p>
    <p className="description">{contentModel.homepage.description}</p>
    <p className="disclosure">{contentModel.homepage.disclosure}</p>
  </div>
)