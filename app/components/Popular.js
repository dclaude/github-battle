import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

function SelectLanguage({ selectedLanguage, onSelect }) {
  const languages = [ 'All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ]
  return (
    <ul className='languages'>
      {languages.map(lang => (
          <li
            style={lang === selectedLanguage ? { color: '#d0021b' } : null}
            key={lang}
            onClick={() => onSelect(lang)}
          >
            {lang}
          </li>
        )
      )}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function RepoGrid({ repos }) {
  return (
    <ul className='popular-list'>
      {repos && repos.map(function(repo, index) {
        return (
          <li key={repo.id} className='popular-item'>
            <div className='popular-rank'>
              #{index + 1}
            </div>
            <ul className='space-list-item'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt={`Avatar for ${repo.owner.login}`} />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null,
  }
  updateLanguage = async lang => {
    /*
    updateLanguage() is called both:
    when the componentDidMount()
    and when the user selects another language
    */
    this.setState({
      selectedLanguage: lang,
      repos: null, // clean previous repos
    })
    const repos = await fetchPopularRepos(lang) // use of async/await to get 'repos' asynchronously
    this.setState({ repos })
  }
  componentDidMount() {
    const { selectedLanguage } = this.state
    this.updateLanguage(selectedLanguage)
  }
  render() {
    const { selectedLanguage, repos } = this.state
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {repos ?
            <RepoGrid repos={repos} />
            : <Loading/>}
      </div>
    )
  }
}

export default Popular

