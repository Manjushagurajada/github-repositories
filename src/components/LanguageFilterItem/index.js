import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickLanguageTab, isActive} = props
  const {language, id} = languageDetails
  const onClickTab = () => {
    onClickLanguageTab(id)
  }

  const style = isActive ? 'button-styling' : ''

  return (
    <li className="language-button-container">
      <button
        type="button"
        className={`language-button ${style}`}
        onClick={onClickTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
