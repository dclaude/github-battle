/*
an 'api key' is not mandatory to use github api 
but there is a 'rate limit', if we need to workaround it we need to create an account to get a clientId/secretId
*/
const id = 'YOUR_CLIENT_ID'
const sec = 'YOUR_SECRET_ID'
const params = `?client_id=${id}&client_secret=${sec}`

async function getProfile(username) {
  const response = await fetch(`https://api.github.com/users/${username}${params}`) // use of async await
  return response.json() // getProfile() returns a Promise for a profile (the caller of getProfile() can chain a then() on the returned value)
}

async function getRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
  return response.json()
}

function getStarCount(repos) {
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
}

function calculateScore({ followers }, repos) {
  return (followers * 3) + getStarCount(repos)
}

function handleError(error) {
  console.warn('handleError', error)
  return null
} 

async function getUserData(player) {
  const [ profile, repos ] = await Promise.all([ // use of await on the Promise returned by Promise.all()
    getProfile(player),
    getRepos(player)
  ])
  return {
    profile,
    score: calculateScore(profile, repos),
  }
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score)
}

/*
battle() will always return a promise
if the promise comes from the catch it will be resolved in the value 'null' (because this is what is returned by handleError())
*/
export async function battle(players) {
  try {
    const results = await Promise.all(players.map(getUserData))
    return sortPlayers(results)
  }
  catch (error) {
    return handleError(error)
  }
}

export async function fetchPopularRepos(language) {
  /*
  on va faire une query (q=)a la github api
  on veut les repo (type=Repositories) qui ont plus de 1 start
  qui sont du language passe en arg
  on veut les repos sorted by star en descending order
  */
  const uriStart = 'https://api.github.com/search/repositories?q=stars:>1+language:' 
  const uriEnd = '&sort=stars&order=desc&type=Repositories'
  /* 
  The encodeURIComponent() function encodes a Uniform Resource Identifier (URI) component 
  by replacing each instance of certain characters by one, two, three, or four escape sequences 
  representing the UTF-8 encoding of the character 
  */
  const encodedURI = window.encodeURI(`${uriStart}${language}${uriEnd}`)
  try {
    const response = await fetch(encodedURI) // use of async await
    const repos = await response.json() // IMPORTANT the .json() method is asynchronous so we need to call it with an 'await'
    return repos.items
  }
  catch (error) {
    return handleError(error)
  }
}

