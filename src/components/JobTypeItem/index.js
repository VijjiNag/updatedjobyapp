import './index.css'

const JobTypeItem = props => {
  const {typeList, setEmploymentTypeId} = props
  const {label, employmentTypeId} = typeList
  const onChangeEmploymentType = () => {
    setEmploymentTypeId(employmentTypeId)
  }
  return (
    <li className="type-list">
      <input
        onChange={onChangeEmploymentType}
        className="emp-type-input"
        id="emp-type"
        type="checkbox"
      />
      <label htmlFor="emp-type" className="emp-type-label">
        {label}
      </label>
    </li>
  )
}
export default JobTypeItem
