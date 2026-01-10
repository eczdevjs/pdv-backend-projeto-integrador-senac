module.exports = (obj) => {
    return Object.keys(obj).filter((key) => obj[key]  !== null).
    reduce((newObj, key) => {
        newObj[key] = obj[key];
        return newObj;

    },{});
}

