const ServerError = require('../../lib/error');
const uuidv4 = require('uuid/v4');
const {
  getScheduleItemsSync,
  addScheduleItem,
  getScheduleItems,
  getScheduleItem,
  deleteScheduleItem,
  updateScheduleItem
} = require('../../../dataManager');
/**
 * @param {Object} options
 * @param {Integer} options.limit How many items to return at one time (max 100)
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getScheduleItems = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: []
  };
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createScheduleItem = async (scheduleItem) => {
  const itm = await addScheduleItem(scheduleItem);
  return {
    status: 200,
    data: itm
  };
};

/**
 * @param {Object} options
 * @param {String} options.id The id of the ScheduleItem to retrieve
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getScheduleItem = async (id) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getScheduleItem ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.id The id of the ScheduleItem to delete
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteScheduleItem = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'deleteScheduleItem ok!'
  };
};

