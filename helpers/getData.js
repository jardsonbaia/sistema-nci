const date = new Date()

//Treat Month
function formatMonth(month) {
    month = month + 1

    if(month < 10) {
        month = '0' + month
    }

    return month
}

const day = date.getUTCDate()
const month = formatMonth(date.getUTCMonth())
const year = date.getUTCFullYear()


const getDateNow = day + '/' + month + '/' + year


//Output DD/MM/YYYY
module.exports = getDateNow