import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link className="jobs-list" to={`/jobs/${id}`}>
      <div className="card-header-container">
        <img className="company-logo" src={companyLogoUrl} alt="company logo" />
        <div className="title-container">
          <h1 className="title-head">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="package-container">
        <div className="location-container">
          <MdLocationOn className="location-icon" />
          <p className="location">{location}</p>
          <BsFillBriefcaseFill className="location-icon" />
          <p className="employment-type">{employmentType}</p>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
      <hr className="divider-line" />
      <h1 className="desc">Description</h1>
      <p className="job-desc">{jobDescription}</p>
    </Link>
  )
}
export default JobCard
