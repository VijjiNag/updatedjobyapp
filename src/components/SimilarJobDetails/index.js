import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobDetails = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <li className="similar-list-card-container">
      <div className="head-container">
        <img className="similar-logo" src={companyLogoUrl} alt="company logo" />
        <div className="similar-title-container">
          <p className="similar-title">{title}</p>
          <div className="similar-rating-container">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description">Description</h1>
      <p className="similar-desc">{jobDescription}</p>
      <div className="similar-location-container">
        <MdLocationOn className="location-icon" />
        <p className="location">{location}</p>
        <BsFillBriefcaseFill className="location-icon" />
        <p className="employment-type">{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobDetails
