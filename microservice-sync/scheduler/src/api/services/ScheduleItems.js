const ServerError = require('../../lib/error');
const uuidv4 = require('uuid/v4');
const {
    getScheduleItemsSync,
    addScheduleItem,
    getScheduleItems,
    getScheduleItem,
    deleteScheduleItem,
    updateScheduleItem,
    loadScheduleItems
} = require('../../../dataManager');

module.exports.getScheduleItems = async (options) => {
    const itms = getScheduleItems();

    return {
        status: 200,
        data: itms
    };
};

module.exports.createScheduleItem = async (scheduleItem) => {
    const itm = await addScheduleItem(scheduleItem);
    await global.schedulerItems.push(itm);
    return {
        status: 200,
        data: itm
    };
};


module.exports.getScheduleItem = async (id) => {
    const itm = await getScheduleItem(id);
    return {
        status: 200,
        data: itm
    };
};


module.exports.deleteScheduleItem = async (options) => {
    throw new Error('deleteScheduleItem not Implemented');

    return {
        status: 200,
        data: 'deleteScheduleItem ok!'
    };
};

module.exports.getScheduleItems = async() =>{
    return await getScheduleItems();
};

module.exports.loadScheduleItems = async() =>{
    return await loadScheduleItems();
}




