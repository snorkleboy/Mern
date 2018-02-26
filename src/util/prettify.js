function precTrim(string, num) {
    const ind = string.indexOf('.')
    if (ind !== -1) {
        return string.slice(0, ind + num + 1);
    }
    return string
}
export default function prettify(entry) {
    const temp = entry
    if (typeof entry == "number") {
        let units = ''
        if (entry > 1000000) {

            entry = entry / 1000
            units = 'K'
        }
        if (entry > 1000000) {
            entry = entry / 1000
            units = 'M'
        }
        if (entry > 1000000) {
            entry = entry / 1000
            units = 'B'
        }
        return precTrim(entry.toString(), 3) + units
    } else if (typeof entry == "string") {
        return entry
    }

}
