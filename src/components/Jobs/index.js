import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobTypeItem from '../JobTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantsProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const emp = []

class Jobs extends Component {
  state = {
    jobsListDetails: [],
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
    apiStatusProfile: apiStatusConstantsProfile.initial,
    isClicked: false,
    salaryRangeId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
    this.getProfileDetails()
  }

  getJobDetails = async () => {
    const {salaryRangeId, searchInput} = this.state
    const joined = emp.join()
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${joined}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsListDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({apiStatusProfile: apiStatusConstantsProfile.initial})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
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
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatusProfile: apiStatusConstantsProfile.success,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstantsProfile.failure})
    }
  }

  onClickSearchIcon = () => {
    const {searchInput, jobsListDetails} = this.state
    const searchResults = jobsListDetails.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({jobsListDetails: searchResults}, this.getJobDetails)
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-card-container">
        <img
          className="profile-image"
          src={profileDetails.profileImageUrl}
          alt="profile"
        />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="profile-short-bio">{profileDetails.shortBio}</p>
      </div>
    )
  }

  onClickRetryProfile = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStatusConstantsProfile.success:
        return this.getProfileDetails()
      case apiStatusConstantsProfile.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderProfileFailureView = () => (
    <div className="btn-container">
      <button
        onClick={this.onClickRetryProfile}
        type="button"
        className="retry-profile-btn"
      >
        Retry
      </button>
    </div>
  )

  renderProfileStatusView = () => {
    const {apiStatusProfile} = this.state

    switch (apiStatusProfile) {
      case apiStatusConstantsProfile.success:
        return this.renderProfileDetails()
      case apiStatusConstantsProfile.failure:
        return this.renderProfileFailureView()
      case apiStatusConstantsProfile.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setEmploymentTypeId = id => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
    emp.push(id)
  }

  setSalaryRangeId = id => {
    const {isClicked} = this.state
    this.setState({isClicked: true})
    if (isClicked === true) {
      this.setState({salaryRangeId: id}, this.getJobDetails)
    } else {
      this.setState({salaryRangeId: ''})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderFilterItems = () => {
    const {isClicked, searchInput} = this.state
    return (
      <>
        <div className="filter-container">
          <div className="search-container">
            <input
              onChange={this.onChangeSearchInput}
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
            />
            <button
              onClick={this.onClickSearchIcon}
              type="button"
              aria-label="Search"
              className="search-icon-container"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderProfileStatusView()}
          <hr className="line" />
          <p className="emp-type">Type of Employment</p>
          <ul className="emp-type-list-container">
            {employmentTypesList.map(eachType => (
              <JobTypeItem
                typeList={eachType}
                key={eachType.employmentTypeId}
                setEmploymentTypeId={this.setEmploymentTypeId}
                isClicked={isClicked}
              />
            ))}
          </ul>
          <hr className="line" />
          <p className="salary-range">Salary Range</p>
          <ul className="salary-range-list-container">
            {salaryRangesList.map(eachSalary => (
              <SalaryRangeItem
                salaryRangeDetails={eachSalary}
                key={eachSalary.salaryRangeId}
                setSalaryRangeId={this.setSalaryRangeId}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobsListView = () => {
    const {jobsListDetails, searchInput} = this.state
    const isJobsEmpty = jobsListDetails.length === 0
    return (
      <>
        <div className="job-details-container">
          <div className="search-container-desktop">
            <input
              onChange={this.onChangeSearchInput}
              value={searchInput}
              type="search"
              className="search-input-desktop"
              placeholder="Search"
            />
            <button
              onClick={this.onClickSearchIcon}
              type="button"
              aria-label="Search"
              className="search-icon-container-desktop"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {isJobsEmpty ? (
            <div className="no-jobs-container hello">
              <img
                className="no-jobs-image"
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1 className="no-jobs-head">No Jobs Found</h1>
              <p className="no-jobs-desc">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          ) : (
            <ul className="jobs-list-container">
              {jobsListDetails.map(eachJob => (
                <JobCard jobDetails={eachJob} key={eachJob.id} />
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  onClickRetryJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

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

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
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
      <div className="jobs-route-container">
        <Header />
        <div className="jobs-container">
          {this.renderFilterItems()}
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}
export default Jobs
