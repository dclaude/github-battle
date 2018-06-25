import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  }
}

class Loading extends React.Component {
  state = {
    text: this.props.text, // uses defaultProps if the user does not provide a 'text' prop
  }
  interval = 0
  componentDidMount() {
    const { text: initialText, speed } = this.props
    const stopper = `${initialText}...`
    this.interval = window.setInterval(() => {
      const { text } = this.state
      if (text === stopper) {
        this.setState({ text: initialText }) // reset the 'text' to its initial value
      }
      else {
        this.setState({
          text: `${text}.` // add a dot add the end of the 'text'
        })
      }
    }, speed)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval)
  }
  render() {
    const { text } = this.state
    return (
      <p style={styles.content}>
        {text}
      </p>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

export default Loading

