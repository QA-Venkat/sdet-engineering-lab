const express = require('express');
const tourController = require('../controllers/tourController');

//Tour Routes
const router = express.Router();

//PARAM MIDDLEWARE
router.param('/:id', (req, res, next, val) => {
  const id = Number(req.params.id);
  const tour = tours.find((i) => i.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
});

router.route('/').get(tourController.getTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getToursByID)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
