const axios = require("axios");

class YelpService {
  constructor() {
    this._baseURL = "https://api.yelp.com/v3/";
    this._apiKey = process.env.YELP_APIKEY;
    this._yelpInstance;
  }

  initialize() {
    this._yelpInstance = axios.create({
      baseURL: this._baseURL,
      // timeout: 1000,
      headers: {
        Authorization: `Bearer ${this._apiKey}`
      }
    });
  }

  async businessSearch(query) {
    // TODO: validate query

    const { rating, radius, price, location, limit, offset } = query;

    try {
      const result = await this._yelpInstance.get("businesses/search", {
        params: {
          rating,
          radius,
          price,
          location,
          limit,
          offset,
          categories: "restaurants"
        }
      });

      return result.data.businesses.map(x => {
        return {
          rating: x.rating,
          price: x.price && x.price.length,
          name: x.name,
          location: x.location,
          categories: x.categories
        };
      });
    } catch (err) {} // TODO: handle error
  }
}

module.exports = YelpService;
