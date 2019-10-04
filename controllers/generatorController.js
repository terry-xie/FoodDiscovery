const bluebird = require("bluebird");
const redis = require("redis");
const Preference = require("../models/preference.js");
const Generator = require("../models/generator.js");
const YelpService = require("../services/yelpService.js");

bluebird.promisifyAll(redis);
const cache = redis.createClient(); // TODO: decouple redis from this file and maybe create connection somewhere else

async function createGenerator(req, res, next) {
  try {
    const generator = await Generator.create({
      limit: req.body.limit,
      offset: req.body.offset,
      userId: req.params.userId || res.locals.userId
    });
    return res.status(201).send(generator);
  } catch (err) {
    return next(err);
  }
}

async function getGenerator(req, res, next) {
  try {
    const generators = await Generator.find({
      userId: req.params.userId || res.locals.userId
    });
    return res.status(200).send(generators);
  } catch (err) {
    return next(err);
  }
}

// async function updateGenerator(req, res, next) {
//   try {
//     const generator = await Generator.findOneAndUpdate(
//       { userId: req.params.userId || res.locals.userId },
//       {
//         ...(req.params.limit && { limit: req.params.limit }),
//         ...(req.params.offset && { offset: req.params.offset })
//       },
//       { new: true }
//     );
//     return res.status(200).send(generator);
//   } catch (err) {
//     return next(err);
//   }
// }

async function getNext(req, res, next) {
  try {
    const { rating, distance, price, location } = await Preference.findOne({
      userId: req.params.userId || res.locals.userId
    });
    const { limit } = (await Generator.findOne({
      userId: req.params.userId
    })) || { limit: 1 };

    const pageKey = `user:${req.params.userId}:page`;
    const cachedPage = (await cache.getAsync(pageKey)) || 0;
    const offset = cachedPage * limit;

    // form query
    const query = {
      ...(rating && { rating }),
      ...(distance && { distance }),
      ...(price && { price }),
      ...(location && { location }),
      ...(limit && { limit }),
      offset
    };

    const searchKey = `user:${req.params.userId}:query:${JSON.stringify(
      query
    )}`;
    const cachedSearchResult = JSON.parse(await cache.getAsync(searchKey));

    let result;
    // hit
    if (cachedSearchResult) result = cachedSearchResult;
    // miss
    else {
      const yelp = new YelpService();
      yelp.initialize();
      result = await yelp.businessSearch(query);
      // cache result and increment page #
      if (result) {
        await cache.setAsync(searchKey, JSON.stringify(result)); // TODO: add expiration
        await cache.incrAsync(pageKey); // TODO: add expiration
      }
    }
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getNext,
  getGenerator,
  createGenerator
};
