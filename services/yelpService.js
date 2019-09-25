const axios = require("axios");

class YelpService {
    constructor(){
        this._baseURL = "https://api.yelp.com/v3/";
        this._apiKey = process.env.YELP_APIKEY;
        this._yelpInstance;
    };

    initialize(){
        this._yelpInstance = axios.create({
            baseURL: this._baseURL,
            //timeout: 1000,
            headers: { 
                Authorization: `Bearer ${this._apiKey}`
            }
        });
    };

    async businessSearch(query){
        // TODO: validate query

        const { rating, distance, price, location, limit, offset } = query;

        try {
            const result = await this._yelpInstance.get("businesses/search", {
                params: {
                    rating: rating,
                    distance: distance,
                    price: price,
                    location: location,
                    limit: limit,
                    offset: offset
                }
            });
            return result.data;
        }
        catch(err)
        {
    
        }
    };
}

module.exports = YelpService;

