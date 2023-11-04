import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill, BsBoxArrowInUpRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobDetails from '../SimilarJobDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobDetails: [],
    skills: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.job_details.id,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: fetchedData.job_details.title,
        similarJobs: fetchedData.similar_jobs.map(eachSimilarJob => ({
          id: eachSimilarJob.id,
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        })),
      }
      this.setState({
        jobItemDetails: updatedData,
        similarJobDetails: updatedData.similarJobs,
        skills: updatedData.skills,
        lifeAtCompany: updatedData.lifeAtCompany,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSimilarJobDetails = () => {
    const {similarJobDetails} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs-head">Similar Jobs</h1>
        <ul className="similar-list-container">
          {similarJobDetails.map(eachSimilar => (
            <SimilarJobDetails similarJob={eachSimilar} key={eachSimilar.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {jobItemDetails, skills, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemDetails
    return (
      <>
        <div className="job-item-card-container">
          <div className="company-logo-container">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="title-container">
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-rating-container">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-package-container">
            <div className="job-item-location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
              <BsFillBriefcaseFill className="location-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="desc-head-container">
            <h1 className="desc-head">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="__blank"
              type="button"
              className="visit-container"
            >
              Visit
              <BsBoxArrowInUpRight className="arrow-icon" />
            </a>
          </div>
          <p className="job-desc">{jobDescription}</p>
          <h1 className="skills-head">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <li className="skill-list" key={eachSkill.name}>
                <div className="skill-container">
                  <img
                    className="skill-logo"
                    src={eachSkill.imageUrl}
                    alt="company-logo"
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-head">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-desc">{lifeAtCompany.description}</p>
            <img className="life-image" src={lifeAtCompany.imageUrl} alt="" />
          </div>
        </div>
        {this.renderSimilarJobDetails()}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.onClickRetryJobs}
        className="retry-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderAllJobItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-item-bg-container">{this.renderAllJobItems()}</div>
      </div>
    )
  }
}
export default JobItemDetails
