// format data string to format "MMM DD"
export default function formatDate(date: string) {
    const customDate = new Date(date); 
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    };
    const formattedDate: string = customDate.toLocaleDateString(undefined, options);
    return formattedDate;
}