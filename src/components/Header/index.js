import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill, BsBoxArrowRight} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <img
        className="nav-logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul className="nav-links-container">
        <li className="nav-link-list">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <button onClick={onClickLogout} type="button" className="logout-btn">
        Logout
      </button>
      <div className="mobile-view-container">
        <Link to="/" className="icon-button">
          <AiFillHome className="icon" />
        </Link>
        <Link to="/jobs" className="icon-button">
          <BsFillBriefcaseFill className="icon" />
        </Link>
        <button
          type="button"
          aria-label="Logout"
          onClick={onClickLogout}
          className="icon-button"
        >
          <BsBoxArrowRight className="icon" />
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
