const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it('POST to /api/drivers creates a new driver', (done) => {
        Driver.countDocuments()
            .then((count) => {
                request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com'})
                .end(() => {
                    Driver.countDocuments()
                        .then((endCount) => {
                            assert(count + 1 === endCount);
                            done();
                        });
                });
            });
    });

    it('PUT to /api/drivers/{id} edit an existing driver', (done) => {
        const theDriver = new Driver({email: 'theEmail@mail.com', driving: false});

        theDriver.save()
            .then(() => {
                request(app)
                    //.put('api/drivers/' + Driver._id)
                    .put(`/api/drivers/${theDriver._id}`)
                    .send({ driving: true })
                    .end(() => {
                        Driver.findOne({ email: 'theEmail@mail.com' })
                            .then((driver) => {
                                assert(driver.driving === true);
                                done();
                            });
                    });
            });
    });

    it('DELETE to /api/driver/{id} can delete a driver', (done) => {
        const theDriver = new Driver({email: 'theEmail@mail.com', driving: false});

        theDriver.save()
            .then(() => {
                request(app)
                    //.delete('api/drivers/' + Driver._id)
                    .delete(`/api/drivers/${theDriver._id}`)
                    .end(() => {
                        Driver.findOne({ email: 'theEmail@mail.com' })
                            .then((driver) => {
                                assert(driver === null);
                                done();
                            });
                    });
            });

    });

    it('GET to /api/drivers finds drivers in a location', (done) => {
        const driver1 = new Driver({ email: 'driver1@mymail.com', location: { coordinates: [-122.4759902, 47.6147628] } });
        const driver2 = new Driver({ email: 'driver2@mymail.com', location: { coordinates: [-80.2534507, 25.791581] } });

        Promise.all([driver1.save(), driver2.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err, response) => {
                        assert(response.body.length === 1);
                        assert(response.body[0].email === 'driver2@mymail.com');
                        done();
                    })
            })
    });
});
