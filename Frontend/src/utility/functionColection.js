export function formatDate(inputDate) {
    const options = { month: "short", day: "numeric", year: "numeric" }
    const date = new Date(inputDate)
    const formattedDate = date.toLocaleDateString("en-US", options)
    return formattedDate
}
