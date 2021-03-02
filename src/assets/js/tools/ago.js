// "forked" from `s-ago`
import { t } from '../components/i18n'

const format = function(diff, divisor, unit, past, future, isInTheFuture) {
  const val = Math.round(Math.abs(diff) / divisor)

  if (isInTheFuture) return val <= 1
    ? future
    : t({en:'in ',fr:'dans '}) + val + ' ' + unit + 's'

  return t({
    en: val <= 1 ? past : val + ' ' + unit + 's ago',
    fr: val <= 1 ? past : 'il y a ' + val + ' ' + (unit === 'mois' ? unit : unit + 's')
  })
}

const getUnits = function() {
  return [
    { max: 2760000, value: 60000, name: t({en:'minute',fr:'minute'}), past: t({en:'a minute ago',fr:'il y a une minute'}), future: t({en:'in a minute',fr:'dans une minute'}) },
    { max: 72000000, value: 3600000, name: t({en:'hour',fr:'heure'}), past: t({en:'an hour ago',fr:'il y a une heure'}), future: t({en:'in an hour',fr:'dans une heure'}) },
    { max: 518400000, value: 86400000, name: t({en:'day',fr:'jour'}), past: t({en:'yesterday',fr:'hier'}), future: t({en:'tomorrow',fr:'demain'}) },
    { max: 2419200000, value: 604800000, name: t({en:'week',fr:'semaine'}), past: t({en:'last week',fr:'la semaine dernière'}), future: t({en:'in a week',fr:'dans une semaine'}) },
    { max: 28512000000, value: 2592000000, name: t({en:'month',fr:'mois'}), past: t({en:'last month',fr:'le mois dernier'}), future: t({en:'in a month',fr:'dans un mois'}) } // max: 11 months
  ]
}

module.exports = function ago(date) {
  const diff = Date.now() - date.getTime()
  const units = getUnits()

  // less than a minute
  if (Math.abs(diff) < 60000) return t({en:'just now',fr:'à l\'instant'})

  for (var i = 0; i < units.length; i++) {
    if (Math.abs(diff) < units[i].max) {
      return format(diff, units[i].value, units[i].name, units[i].past, units[i].future, diff < 0)
    }
  }

  // `year` is the final unit.
  // same as:
  //  {
  //    max: Infinity,
  //    value: 31536000000,
  //    name: 'year',
  //    past: 'last year'
  //  }
  return format(diff, 31536000000, 'year', t({en:'last year',fr:'l\'an dernier'}), t({en:'in a year',fr:'dans un an'}), diff < 0);
}
