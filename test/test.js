const chai = require('chai');
const { expect } = require('chai');
const chai_http = require('chai-http');
const url = 'http://localhost:3000';
const receipt_one = require('../process_receipt_example_payloads/example1.json');
const receipt_one_error = require('../process_receipt_example_payloads/example1Error.json')

chai.use(chai_http);
chai.should();

let testId = '';
const correctPointTotal = 28;
const invalidId = 'abcd';

describe('Fetch APIs', () => {
    describe("POST /receipts/process", () => {
        it("Should POST a receipt", (done) => {
            chai.request(url)
                .post("/receipts/process")
                .send(receipt_one)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    testId = res.body.id;
                    done();
                });
        });

        it("Should NOT POST a receipt", (done) => {
            chai.request(url)
                .post("/receipts/process")
                .send(receipt_one_error)
                .end((error, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("GET /receipts/:id/points", () => {
        it("Should GET the correct point total for the given Id", (done) => {
            chai.request(url)
                .get(`/receipts/${testId}/points`)
                .end((error, res) => {
                    res.should.have.status(200);
                    expect(res.body.points).to.deep.equal(correctPointTotal);
                    done();
                })
        });

        it("Should NOT GET the correct point total for the given Id", (done) => {
            chai.request(url)
                .get(`/receipts/${invalidId}/points`)
                .end((error, res) => {
                    res.should.have.status(404);
                    done();
                })
        });
    })
})
