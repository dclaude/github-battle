import React from 'react'
import queryString from 'query-string'
import { battle } from '../utils/api'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

function Profile({ info }) {
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player({ label, score, profile }) {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  }
  async componentDidMount() {
    /*
    si l'url est http://localhost:8080/battle/results?playerOneName=tylermcginnis&playerTwoName=ryanflorence
    queryString.parse() nous retourne un JS object:
    {
      playerOneName: "tylermcginnis",
      playerTwoName: "ryanflorence",
    }
    */
    const { location } = this.props
    const players = queryString.parse(location.search)
    const { playerOneName, playerTwoName } = players
    const results = await battle([ playerOneName, playerTwoName ]) // use of async/await to get 'results' asynchronously
    /*
    battle() will always return a promise
    if the promise comes from the catch it will be resolved in the value 'null' (because this is what is returned by handleError())
    */
    if (results === null) {
      this.setState({
        error: 'Looks like there was an error. Check that both users exist on Github',
        loading: false,
      })
    }
    const [ winner, loser ] = results
    this.setState({
      error: null,
      winner, 
      loser,
      loading: false,
    })
  }
  render() {
    const { winner, loser, error, loading } = this.state
    const { location } = this.props
    if (loading) {
      return <Loading />
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/batle'>Reset</Link>
        </div>
      )
    }
    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results

