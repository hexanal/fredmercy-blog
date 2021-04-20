import orderBy from 'lodash.orderby'
import { t } from '../tools/i18n'
import reefer, { onReef } from '../tools/reefer'

export default function({element, ui, control, events }) {
  const state = {
    show: false,
    animation: {
      y: reefer(0),
      opacity: reefer(0)
    }
  }

  onReef( function() {
    ui['convo'].style.transform = `translateY(${ state.animation.y * 2 }rem)`
    ui['convo'].style.opacity = state.animation.opacity.get()
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

    ui['convo'].innerHTML = '' // FLUSH!!

    const getCommentsCount = `(${comments.length})`
    document.querySelectorAll('[data-comments-count]')
      .forEach( count => count.textContent = getCommentsCount )

    const withChronologicalOrder = orderBy(comments, 'timestamp', 'desc')

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

      ui['convo'].appendChild($commentLine)
    })
  }

  const handleSqliteError = function( err ) {
    document.querySelector('#show-comments-btn').style.display = 'none' // TODO bleh!

    return console.error( t({en: "Something went wrong while we were getting the comments", fr: "Une erreur est survenue losrqu'on était en train de récupèrer les commentaires"}) )
  }

  const getMessageDataFromUI = function() {
    const author = control['author'].value.trim() !== '' ? control['author'].value : t({en: '(anonymous)', fr: '(anonyme)'})
    const comment = control['message'].value.trim() !== '' ? control['message'].value : false
    const url = element.dataset.url
    const timestamp= Date.now()

    return { author, comment, url, timestamp }
  }

  const fetchComments = function() {
    getCommentsFromDB()
      .then( displayConversation )
      .catch(function (error) {
        console.error(error);
      });
  }

  const submitComment = e => {
    e.preventDefault();

    const data = getMessageDataFromUI()

    if ( !data.comment ) return control['message'].focus()

    insertCommentIntoDB( data )
      .then( () => {
        clearMessage()
        fetchComments()
      })
      .catch(function (error) {
        console.error(error)
      });
  };

  const clearMessage = function() {
    control['message'].value = '';
    window.localStorage.removeItem('comments_message')
  }

  const setupCommentBox = function() {
    const author = window.localStorage.getItem('comments_author')
    const message = window.localStorage.getItem('comments_message')

    if ( author ) control['author'].value = author
    if ( message ) control['message'].value = message
  }

  const setupEventListeners = function() {
    control['comment-box'].addEventListener('submit', submitComment)
    control['author'].addEventListener('keyup', e => {
      window.localStorage.setItem('comments_author', e.currentTarget.value)
    })
    control['message'].addEventListener('keyup', e => {
      window.localStorage.setItem('comments_message', e.currentTarget.value)
      if ( e.key === 'Escape' ) events.dispatch('CLOSE_BOX_DISCUSS')
    })
  }

  const setupMessaging = function() {
    state.messages = [
      events.on('SHOW_BOX_DISCUSS', () => {
        // focus the comment box on show
        setTimeout( () => control['message'].focus(), 50 )
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
