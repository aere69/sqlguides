const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

    // --- Option 1 : ES5 way ------
    //const sortOrder = {};
    //sortOrder[sortProperty] = 1;

    const query = Artist
        .find(buildQuery(criteria))
        // Option 1
        //.sort(sortOrder)
        // Option 2 - ES6
        .sort({ [sortProperty] : 1})
        .skip(offset)
        .limit(limit)
    
    return Promise.all([query, Artist.find(buildQuery(criteria)).countDocuments()])
        .then((result) => {
            return { 
                all: result[0], 
                count: result[1], 
                offset: offset, 
                limit: limit
            };
        });
};

const buildQuery = (criteria) => {
    const query = {};

    // Index on Name is required see README.md
    // Note : searches fro full word match!!!!
    if (criteria.name) {
        query.text = { $search: criteria.name }
    }

    if (criteria.age) {
        query.age = {
            $gte: criteria.age.min,
            $lte: criteria.age.max
        }
    }

    if (criteria.yearsActive) {
        query.yearsActive = {
            $gte: criteria.yearsActive.min,
            $lte: criteria.yearsActive.max
        }
    }

    return query;
};