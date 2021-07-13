const shortenString = (targetString, maxLength, moreTextSymbol) => {
    let shortenedString = targetString;
    if(targetString.length > maxLength) {
        shortenedString = targetString.substr(0, maxLength) + moreTextSymbol;
    }
    return shortenedString;
}

export default {
    shortenString
}