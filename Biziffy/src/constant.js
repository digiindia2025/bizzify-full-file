export const primaryColor = "#1e6e8a"
export const primaryColorHover = '#0e5670'
export const createButtonBg = "#1e6e8a"


export const formatPrice = (value) => {
    value = parseInt(value)
    const formatted_price = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value || 0);
    return formatted_price
}


export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    const outputDate = day + '-' + month + '-' + year;
    return outputDate || '-';
}

export const formatTime = (inputDate) => {
    const date = new Date(inputDate);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const outputTime = `${hours}:${minutes}:${seconds}`;

    return outputTime;
}
