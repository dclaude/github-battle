import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <ul className='nav'>
      <li>
        {/*
        - we use NavLink instead of Link to highlight the currently selected <a>
        - activeClassName
        the CSS class given in the 'activeClassName' prop will only be applied when the url matches the url in the 'to' prop
        - exact
        IMPORTANT
        we must add the exact property on the <NavLink to='/'> car l'url dans 'to' va matcher ttes les url
        */}
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>Battle</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>Popular</NavLink>
      </li>
    </ul>
  )
}

export default Nav

