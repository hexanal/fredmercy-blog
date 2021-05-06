import stater from '../tools/stater.js'
import debounce from '../tools/debounce.js'

async function getData(url = '', data = {}) {
  const params = new URLSearchParams(data)
  const urlWithParams = `${url}?${params}`
  const response = await fetch(urlWithParams, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'same-origin', // no-cors, *cors, same-origin
    cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })

  return response.json()
}

export default function({element, children}) {
  let searchterm = children['searchterm'].value
  let results = stater([])
    .onChange( newResults => {
      children['results'].innerHTML = ''

      newResults.map( r => {
        const resultContainer = document.createElement('div')
        const title = document.createElement('h2')
        const description = document.createElement('p')
        const url = document.createElement('a')

        title.textContent = r.meta.title
        description.textContent = `${r.meta.description} -> `
        url.textContent = r.meta.url
        url.setAttribute('href', r.meta.url)

        description.appendChild(url)

        resultContainer.classList.add('content')
        resultContainer.appendChild(title)
        resultContainer.appendChild(description)

        children['results'].appendChild( resultContainer )
      })
    })
  let loading = stater(false)
    .onChange( s => {
      if ( !s ) return children['searchterm'].removeAttribute('disabled')
      children['searchterm'].setAttribute('disabled', 'disabled')
    })

  const beginSearch = () => {
    getData('/api/search', { searchterm })
      .then( hits => results.set( hits.map( hit => hit._source ) ) )
  }

  const handleSearchOnInput = e => {
    searchterm = e.target.value
    debouncedSearch()
  }

  const handleSubmit = e => {
    e.preventDefault()
    beginSearch()
  }

  const debouncedSearch = debounce(beginSearch, 500)

  // event listeners
  element.addEventListener('submit', handleSubmit)
  children['searchterm'].addEventListener('input', handleSearchOnInput)

  if ( searchterm !== '' ) beginSearch()
}
