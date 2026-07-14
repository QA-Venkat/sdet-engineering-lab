const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`),
);

//Route handlers for Tours

/**
 * get Tours
 */
exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      requestedAT: req.requestTime,
      tours: tours,
    },
  });
};
/**
 * Get Tour by id
 */
exports.getToursByID = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((i) => i.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};
/**
 * Create Tour
 */
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};
/**
 * Update Tour
 */
exports.updateTour = (req, res) => {
  const tourIndex = tours.findIndex((t) => t.id === Number(req.params.id));
  const tour = tours[tourIndex];
  if (!tours[tourIndex]) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  tours[tourIndex] = {
    ...tour,
    ...req.body,
  };
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'Pass',
        data: {
          tours,
        },
      });
    },
  );
};
/**
 * Delete Tour
 */
exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex((t) => t.id === id);
  if (!tourIndex) {
    res.status(400).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  tours.splice(tourIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: 'Deleted',
      });
    },
  );
};
