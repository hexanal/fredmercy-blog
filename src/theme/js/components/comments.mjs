import { t } from '../tools/i18n.js'
import reefer, { onReef } from '../tools/reefer.js'

export default function({element, children, events }) {
  const state = {
    show: false,
    animation: {
      y: reefer(0),
      opacity: reefer(0)
    }
  }

  onReef( function() {
    children['convo'].style.transform = `translateY(${ state.animation.y * 2 }rem)`
    children['convo'].style.opacity = state.animation.opacity.get()
  })

  const getCommentsFromDB = function() {
    const url = element.dataset.url

    events.dispatch('SET_LOADING', true) // FIXME this is not the way to handle loading, bro...
    state.animation.y.set( 1, { stiffness: 250, damping: 15 })
    state.animation.opacity.set( 0.25, { stiffness: 250, damping: 15 })

    return fetch('/api/comments/byUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
      .then( r => {
        events.dispatch('SET_LOADING', false)
        state.animation.y.set( 0, { stiffness: 350, damping: 13 })
        state.animation.opacity.set( 1, { stiffness: 200, damping: 18 })
        return r.json()
      })
  }

  const insertCommentIntoDB = function( comment ) {
    events.dispatch('SET_LOADING', true)
    state.animation.y.set( 1, { stiffness: 250, damping: 15 })
    state.animation.opacity.set( 0.25, { stiffness: 250, damping: 15 })

    return fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( comment )
    })
      .then( r => {
        events.dispatch('SET_LOADING', false)
        state.animation.y.set( 0, { stiffness: 350, damping: 13 })
        state.animation.opacity.set( 1, { stiffness: 200, damping: 18 })

        return r.json()
      })
  }

  const getFormattedTimestamp = timestamp => {
    if ( typeof timestamp === 'string' ) return ''

    const date = new Date( timestamp )
    const day = withLeadingZero( date.getUTCDate() )
    const month = withLeadingZero( date.getUTCMonth() )
    const year = date.getUTCFullYear()
    const time = getAmPmTime( date )

    return `✷ ${year}-${month}-${day} @ ${time}`
  }

  /**
   * refresh the "convo" screen :)
   */
  const displayConversation = comments => {
    if ( comments.code && comments.code === 'SQLITE_ERROR' ) return handleSqliteError( comments )

    children['convo'].innerHTML = '' // FLUSH!!

    const getCommentsCount = `(${comments.length})`
    document.querySelectorAll('[data-comments-count]')
      .forEach( count => count.textContent = getCommentsCount )

    const withChronologicalOrder = comments.sort( (a,b) => a.timestamp < b.timestamp )

    withChronologicalOrder.map( ({comment, author, timestamp}) => {
      const $commentLine = document.createElement('div')
        const $timestamp = document.createElement('time')
        const $author = document.createElement('div')
        const $content = document.createElement('div')

      $commentLine.classList.add('comment-line')
        $author.classList.add('comment-line__author')
        $timestamp.classList.add('comment-line__time')
        $content.classList.add('comment-line__message', 'content')

      $author.textContent = author
      $timestamp.innerHTML = getFormattedTimestamp(timestamp)
      $content.innerHTML = `${comment}`

      $commentLine.appendChild($author)
      $commentLine.appendChild($timestamp)
      $commentLine.appendChild($content)

      children['convo'].appendChild($commentLine)
    })
  }

  const handleSqliteError = function( err ) {
    document.querySelector('#show-comments-btn').style.display = 'none' // TODO bleh!

    return console.error( t({en: "Something went wrong while we were getting the comments", fr: "Une erreur est survenue losrqu'on était en train de récupèrer les commentaires"}) )
  }

  const getMessageDataFromUI = function() {
    const author = children['author'].value.trim() !== '' ? children['author'].value : t({en: '(anonymous)', fr: '(anonyme)'})
    const comment = children['message'].value.trim() !== '' ? children['message'].value : false
    const url = element.dataset.url
    const timestamp= Date.now()

    return { author, comment, url, timestamp }
  }

  const fetchComments = function() {
    getCommentsFromDB()
      .then( displayConversation )
      .catch(function (error) {
        console.error(error)
      });
  }

  const submitComment = e => {
    e.preventDefault();

    const data = getMessageDataFromUI()

    if ( !data.comment ) return children['message'].focus()

    insertCommentIntoDB( data )
      .then( () => {
        clearMessage()
        fetchComments()
      })
      .catch( console.error )
  }

  const clearMessage = function() {
    children['message'].value = ''
    window.localStorage.removeItem('comments_message')
  }

  const setupCommentBox = function() {
    const author = window.localStorage.getItem('comments_author')
    const message = window.localStorage.getItem('comments_message')

    if ( author ) children['author'].value = author
    if ( message ) children['message'].value = message
  }

  const setupEventListeners = function() {
    children['comment-box'].addEventListener('submit', submitComment)
    children['author'].addEventListener('keyup', e => {
      window.localStorage.setItem('comments_author', e.currentTarget.value)
    })
    children['message'].addEventListener('keyup', e => {
      window.localStorage.setItem('comments_message', e.currentTarget.value)
      if ( e.key === 'Escape' ) events.dispatch('CLOSE_BOX_DISCUSS')
    })
  }

  const setupMessaging = function() {
    state.messages = [
      events.on('SHOW_BOX_DISCUSS', () => {
        // focus the comment box on show
        setTimeout( () => children['message'].focus(), 50 )
      })
    ]
  }

  const init = function() {
    fetchComments()
    setupCommentBox()
    setupEventListeners()
    setupMessaging()
  }

  init()

  return function onUnmount() {
    state.messages.map( m => m.call() )
  }
}

/**
 * Utility functions
 */
const withLeadingZero = number => {
  const n = number.toString()

  return n.length < 2 // single digit number
    ? '0' + n
    : n
}

const getAmPmTime = date => {
  const originalHours = date.getHours()
  const hoursIn12format = originalHours > 12 ? originalHours - 12 : originalHours

  const hours = hoursIn12format === 0 ? 12 : hoursIn12format
  const minutes = withLeadingZero( date.getMinutes() )
  const suffix = originalHours >= 12 ? 'pm' : 'am'

  return `${hours}:${minutes}${suffix}`
}
