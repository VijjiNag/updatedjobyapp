import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt=""
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-desc">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
