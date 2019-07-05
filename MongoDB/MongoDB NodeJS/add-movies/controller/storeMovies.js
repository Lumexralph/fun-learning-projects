// Handles POST request to store movies

export default (req, res, next, db) => {
  const title = req.body.title;
  const year = req.body.year;
  const imdb = req.body.imdb;

    // if any of the field is empty
  if ((title === '') || (year === '') || (imdb === '')) {
    next('Please provide an entry for all fields');
  } else {
    db.collection('movies').insertOne(
      {
        title,
        year,
        imdb
      },
      (err, result) => {
        res.send(`Document inserted with _id: ${result.insertedId}`);
      }
    );
  }
};
