export let lang = document.documentElement.getAttribute('lang')

export const t = strings => strings[lang] || '[translation is missing]'

export const months = [
  t({en: 'jan', fr: 'jan' }),
  t({en: 'feb', fr: 'fév' }),
  t({en: 'mar', fr: 'mar' }),
  t({en: 'apr', fr: 'avr' }),
  t({en: 'may', fr: 'mai' }),
  t({en: 'jun', fr: 'juin' }),
  t({en: 'jul', fr: 'juil' }),
  t({en: 'aug', fr: 'aoû' }),
  t({en: 'sep', fr: 'sep' }),
  t({en: 'oct', fr: 'oct' }),
  t({en: 'nov', fr: 'nov' }),
  t({en: 'dec', fr: 'déc' }),
]

export default function({ messaging }) {
  messaging.subscribe('PAGE_CHANGED', ({next}) => {
    lang = next.container.dataset.lang
    document.documentElement.setAttribute('lang', lang)
  })
}
