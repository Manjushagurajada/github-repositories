import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  onClickLanguageTab = id => {
    this.setState({activeTabId: id}, this.getData)
  }

  getData = async () => {
    const {activeTabId} = this.state
    this.setState({apiStatus: apiConstants.inprogress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))

      this.setState({
        repositoryList: formattedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccesView = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repo-container">
        {repositoryList.map(eachItem => (
          <RepositoryItem repositoryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={60} type="ThreeDots" width={60} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccesView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="main-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="buttons-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              onClickLanguageTab={this.onClickLanguageTab}
              languageDetails={eachItem}
              key={eachItem.id}
              isActive={eachItem.id === activeTabId}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
