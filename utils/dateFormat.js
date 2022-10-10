const current_time = require('time-stamp')
const dayFormatter = current_time('DDMMYYYY')

const timeFormatter = current_time('HH:mm')

const formatter = dayFormatter + timeFormatter



// Attempt with date-fns

// const dateFns = require('date-fns');


// const dateFormatter = (date) => {

    
//     date.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS")
// }
// dateFormatter(dateFns)

module.exports = formatter;