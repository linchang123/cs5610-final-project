export default function formatDate(date: string) {
    const dateTime = date + " 12:00:00";
    const customDate = new Date(dateTime); 
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric'
    };
    const formattedDate: string = customDate.toLocaleDateString(undefined, options);
    return formattedDate;
}