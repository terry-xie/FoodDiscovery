const bluebird = require("bluebird");
const redis = require("redis");
const Preference = require("../models/preference.js");
const Generator = require("../models/generator.js");
const YelpService = require("../services/yelpService.js");

bluebird.promisifyAll(redis);
const cache = redis.createClient(); // TODO: decouple redis from this file and maybe create connection somewhere else

function toResponseObj(obj) {
  return {
    id: obj._id,
    limit: obj.limit
  };
}

async function createGenerator(req, res, next) {
  try {
    let generator = await Generator.find({
      userId: req.params.userId || res.locals.userId
    });

    if (generator)
      res
        .status(403)
        .json({ error: "A generator already exists for the user" });

    generator = await Generator.create({
      limit: req.body.limit,
      userId: req.params.userId || res.locals.userId
    });
    return res.status(201).json(toResponseObj(generator));
  } catch (err) {
    return next(err);
  }
}

async function getGenerator(req, res, next) {
  try {
    let generators = await Generator.find({
      userId: req.params.userId || res.locals.userId
    });
    generators = generators.map(generator => {
      return toResponseObj(generator);
    });
    return res.status(200).json({ generators });
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
    const { radius, price, location } = (await Preference.findOne({
      userId: req.params.userId || res.locals.userId
    })) || { radius: 16000, price: 1, location: "San Francisco" };

    const { limit } = (await Generator.findOne({
      userId: req.params.userId
    })) || { limit: 1 };

    const pageKey = `user:${req.params.userId}:page`;
    const cachedPage = (await cache.getAsync(pageKey)) || 0;
    const offset = cachedPage * limit;

    // form query
    const query = {
      ...(radius && { radius }),
      ...(price && { price }),
      ...(location && { location }),
      ...(limit && { limit }),
      offset
    };

    const searchKey = `user:${req.params.userId}:query:${JSON.stringify(
      query
    )}`;
    const cachedSearchResult = JSON.parse(await cache.getAsync(searchKey));

    let results;
    // hit
    if (cachedSearchResult) results = cachedSearchResult;
    // miss
    else {
      const yelp = new YelpService();
      yelp.initialize();
      results = await yelp.businessSearch(query);
      // cache result and increment page #
      if (results) {
        await cache.setexAsync(searchKey, 900, JSON.stringify(results));
        await cache.incrbyAsync(pageKey, limit);
      }
    }
    return res.status(200).json({ results });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getNext,
  getGenerator,
  createGenerator
};
