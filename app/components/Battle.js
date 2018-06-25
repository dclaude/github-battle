import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

class PlayerInput extends React.Component {
  state = {
    username: '',
  }
  handleChange = event => {
    const username = event.target.value
    this.setState({ username })
  }
  handleSubmit = event => {
    const { onSubmit, id } = this.props
    const { username } = this.state
    event.preventDefault()
    onSubmit(id, username)
  }
  render() {
    const { label } = this.props
    const { username } = this.state
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        {/* 'for' is a reserved keyword in JS so we need to use htmlFor in JSX: */}
        <label className='header' htmlFor='username'>{label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}
        >
          Submit
        </button>

      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  }
  // 'id' will be either 'playerOne' or 'playerTwo'
  handleSubmit = (id, username) => {
    this.setState({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`,
    })
  }
  handleReset = id => {
    this.setState({
      [id + 'Name']: '',
      [id + 'Image']: null,
    })
  }
  render() {
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state
    const { match } = this.props
    return (
      <div>
        <div className='row'>
          {!playerOneName && <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit} />}
          {playerOneName && 
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              {/*
              - PlayerPreview will render its props.children 
              so it will render the <button> below
              - qd on n'utilise pas de arrow function
              la technique pour arriver a capturer une valeur consiste a appeler bind() 
              comme cela les valeurs capturees par bind() seront passee en arg de la function (ici 'onReset')
              */}
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerOne')}
              >
                Reset
              </button>
            </PlayerPreview>
          }
          {!playerTwoName && <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit} />}
          {playerTwoName &&
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerTwo')}
              >
                Reset
              </button>
            </PlayerPreview>
          }
        </div>

        {/*
        - on va construire une query url '/battle/result?playerOneName=tylermcginnis&playerTwoName=mjackson'
        on va donc naviguer vers la <Route> /result de notre app
        et on va passer des arguments a cette route/view via des url parameters
        comme cela la view pourra recuperer ces arguments et les utiliser pour construire la battle result view
        - from react-router documentation:
        to: object
        An object that can have any of the following properties:
        pathname: A string representing the path to link to.
        search: A string represenation of query parameters.
        hash: A hash to put in the URL, e.g. #a-hash.
        state: State to persist to the location.
        */}
        {playerOneName && playerTwoName && 
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
            }}
          >
            Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle

