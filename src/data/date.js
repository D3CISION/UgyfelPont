export const actualDate = new Date
export const Months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']
const Days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat']
const nextWeek = new Date

export var actualYear = actualDate.getFullYear()
export var actualMonth = Months[actualDate.getMonth()]
export var actualNumber = actualDate.getDate()
export var actualDay = Days[actualDate.getDay()]

function addDays(actual,d){
    var t = actual.getTime()
    t = t + (d * ((60480000 + 11600000)/2))
    return actual.setTime(t)
}

export function oneWeekFromNow() {    
    return addDays(nextWeek,4);
}



export function getMonthInNumbers(honap) {
    if (honap == 'Január') return '01'
    if (honap == 'Február') return '02'
    if (honap == 'Március') return '03'
    if (honap == 'Április') return '04'
    if (honap == 'Május') return '05'
    if (honap == 'Június') return '06'
    if (honap == 'Július') return '07'
    if (honap == 'Augusztus') return '08'
    if (honap == 'Szeptember') return '09'
    if (honap == 'Október') return '10'
    if (honap == 'November') return '11'
    if (honap == 'December') return '12'
}

