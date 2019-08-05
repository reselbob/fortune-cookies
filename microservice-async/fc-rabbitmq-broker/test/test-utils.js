const wait =  (timeInMs) => {
    return new Promise(function(resolve) {
        return setTimeout(resolve, timeInMs);
    });
};

module.exports ={wait};