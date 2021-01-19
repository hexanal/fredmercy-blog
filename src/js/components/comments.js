import ago from 's-ago'
// import Mousetrap from 'mousetrap';

export default function({element, ui, control}) {
  const fetchComments = function() {
    const url = ui['grid'].dataset.url

    element.classList.add('state-loading')

    fetch('/api/comments/byUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
      .then(response => response.json())
      .then( comments => {
        ui['grid'].innerHTML = '' // FLUSH!!

        element.classList.remove('state-loading');

        comments.map( ({comment, author, timestamp}) => {
          const $container = document.createElement('div')
          const $author = document.createElement('div')
          const $timestamp = document.createElement('div')
          const $content = document.createElement('div')

          $author.textContent = author
          $timestamp.textContent = ago( new Date( timestamp ) )
          $content.textContent = comment

          $container.appendChild($timestamp)
          $container.appendChild($author)
          $container.appendChild($content)
          ui['grid'].appendChild($container)
        })
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const submitComment = e => {
    e.preventDefault();

    const author = control['author'].value.trim() !== ''
      ? control['author'].value
      : 'Anonymous';
    const comment = control['content'].value.trim() !== ''
      ? control['content'].value
      : false;
    const url = ui['grid'].dataset.url

    if (!content) {
      control['content'].focus();
      return alert('Be sure to leave a comment before submitting.');
    }

    const data = {
      author,
      comment,
      timestamp: Date.now(),
      url
    };

    fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( data )
    })
      .then( res => res.json() )
      .then( res => {
        control['content'].value = '';

        fetchComments()
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  fetchComments()

  control['comment-form'].addEventListener('submit', submitComment)
  control['content'].addEventListener('keyup', e => {
    if ( e.key !== 'Enter' || e.shiftKey ) return
    submitComment(e)
  })
}
