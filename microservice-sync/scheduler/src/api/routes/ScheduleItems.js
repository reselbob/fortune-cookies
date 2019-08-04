const express = require('express');
const scheduleItems = require('../services/ScheduleItems');

const router = new express.Router();


/**
 * Gets a list of all schedule items
 */
router.get('/', async (req, res, next) => {
  const options = {
    limit: req.query['limit']
  };

  try {
    const result = await scheduleItems.getScheduleItems(options);
    res.status(result.status || 200).send(result).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      error: err
    }).end();
  }
});

/**
 * Create a ScheduleItem
 */
router.post('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await scheduleItems.createScheduleItem(req.body);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      error: err.message
    });
  }
});

/**
 * Info for a specific ScheduleItem
 */
router.get('/:id', async (req, res, next) => {
  try {
    const result = await scheduleItems.getScheduleItem(req.params['id']);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    }).end();
  }
});

/**
 * deletes a specific ScheduleItem
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await scheduleItems.deleteScheduleItem(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    }).end();
  }
});

module.exports = router;
