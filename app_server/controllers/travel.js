const apiOptions = {
  server: 'http://localhost:3000'
};

const renderTravelPage = (req, res, responseBody) => {
  let message = null;
  let trips = responseBody;

  if (!(trips instanceof Array)) {
    message = 'API lookup error';
    trips = [];
  } else if (!trips.length) {
    message = 'No trips exist in the database';
  }

  res.render('travel', {
    title: 'Travlr Getaways',
    trips,
    message
  });
};

const travel = async (req, res) => {
  const path = '/api/trips';
  const url = `${apiOptions.server}${path}`;

  try {
    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();

    renderTravelPage(req, res, json);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  travel
};
