import './index.css'

const SalaryRangeItem = props => {
  const {salaryRangeDetails, setSalaryRangeId, isClicked} = props
  const {salaryRangeId, label} = salaryRangeDetails
  const onChangeSalaryRange = () => {
    setSalaryRangeId(salaryRangeId)
  }
  return (
    <li className="salary-range-list">
      <input
        onChange={onChangeSalaryRange}
        type="radio"
        id="salary-range"
        value={label}
        checked={isClicked && label}
        name="salary-range"
      />
      <label htmlFor="salary-range" className="salary-range-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
