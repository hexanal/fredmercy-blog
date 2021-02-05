import ago from 's-ago'
import marked from 'marked'
import orderBy from 'lodash.orderby'

export default function({element, ui, control, messaging }) {
  const state = {
    show: false
  }

  const getCommentsFromDB = function() {
    const url = element.dataset.url

    messaging.dispatch({ id: 'SET_LOADING', payload: true })

    return fetch('/api/comments/byUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
      .then( r => {
        messaging.dispatch({ id: 'SET_LOADING', payload: false })
        return r.json()
      })
  }

  const insertCommentIntoDB = function( comment ) {
    messaging.dispatch({ id: 'SET_LOADING', payload: true })

    return fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( comment )
    })
      .then( r => {
        messaging.dispatch({ id: 'SET_LOADING', payload: false })
        return r.json()
      })
  }

  const getFormattedTimestamp = timestamp => {
    const date = new Date( timestamp )
    const day = date.getUTCDate()
    const monthIndex = date.getUTCMonth()
    const month = months[monthIndex]
    const year = date.getUTCFullYear()

    const time = getAmPmTime( date )
    const timeAgo = ago( new Date( timestamp ) )

    return `${timeAgo} (${time}, ${day} ${month} ${year})`
  }

  /**
   * refresh the "convo" screen :)
   */
  const displayConversation = comments => {
    ui['convo'].innerHTML = '' // FLUSH!!

    element.classList.remove('state-loading')

    document.getElementById('comments-count').textContent = `(${comments.length})`

    const withChronologicalOrder = orderBy(comments, 'timestamp', 'desc')

    withChronologicalOrder.map( ({comment, author, timestamp}) => {
      const $commentLine = document.createElement('div')
        const $timestamp = document.createElement('time')
        const $author = document.createElement('span')
        const $content = document.createElement('span')

      $commentLine.classList.add('comment-line')
        $author.classList.add('comment-line__author')
        $content.classList.add('comment-line__message')
        $timestamp.classList.add('comment-line__time')

      $author.textContent = `${ author }`
      $content.innerHTML = marked(comment)
      $timestamp.innerHTML = getFormattedTimestamp(timestamp)

      $commentLine.appendChild($author)
      $commentLine.appendChild($content)
      $commentLine.appendChild($timestamp)

      ui['convo'].appendChild($commentLine)
    })
  }

  const getMessageDataFromUI = function() {
    const author = control['author'].value.trim() !== '' ? control['author'].value : '(anonymous)'
    const comment = control['message'].value.trim() !== '' ? control['message'].value : false
    const url = element.dataset.url
    const timestamp= Date.now()

    return { author, comment, url, timestamp }
  }

  const fetchComments = function() {
    element.classList.add('state-loading')

    getCommentsFromDB()
      .then( displayConversation )
      .catch(function (error) {
        console.error(error);
      });
  }

  const submitComment = e => {
    e.preventDefault();

    const data = getMessageDataFromUI()

    if ( !data.comment ) {
      control['message'].focus();
      return alert('Be sure to leave a comment before submitting.'); // TODO better error handling
    }

    insertCommentIntoDB( data )
      .then( () => {
        clearMessage()
        fetchComments()
      })
      .catch(function (error) {
        console.error(error);
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

      if ( e.key === 'Enter' && !e.shiftKey ) submitComment(e)
    })
  }

  const setupMessaging = function() {
    state.messages = [
      messaging.subscribe('SHOW_COMMENTS', () => {
        state.show = true
        element.classList.toggle('state-show-comments', state.show)
      }),
      messaging.subscribe('HIDE_COMMENTS', () => {
        state.show = false
        element.classList.toggle('state-show-comments', state.show)
      }),
      messaging.subscribe('TOGGLE_COMMENTS', () => {
        state.show = !state.show
        element.classList.toggle('state-show-comments', state.show)
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

const months = [
  'jan', 'feb', 'mar',
  'apr', 'may', 'jun',
  'jul', 'aug', 'sep',
  'oct', 'nov', 'dec'
]
