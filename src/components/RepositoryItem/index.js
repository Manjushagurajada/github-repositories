import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {id, name, avatarUrl, starsCount, forksCount, issuesCount} =
    repositoryDetails
  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={id} className="repo-item-img" />
      <h1 className="repo-item-name">{name}</h1>
      <div className="items-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-img"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="items-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="forks-img"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="items-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issues-img"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
