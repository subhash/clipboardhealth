const request = require('supertest');
const assert = require('assert');
const url = "http://localhost:3000/api"


describe('GET /jobs', () => {
    it('should get all jobs', async () => {
        const res = await request(url)
            .get(`/jobs`)
        assert.equal(res.statusCode, 200)
        const { hospitals, search } = res.body
        assert.equal(hospitals.length, 20)
        assert.equal(hospitals[0].items.length, 8)
        assert.equal(search, "")
    });
})

describe('GET /jobs?search=stanislaus', () => {
    it('should search by hospital, preserve search str', async () => {
        const res = await request(url)
            .get(`/jobs?search=stanislaus`)
        assert.equal(res.statusCode, 200)
        const { hospitals, search } = res.body
        assert.equal(hospitals.length, 1)
        assert.equal(hospitals[0].name, "Stanislaus Surgical Hospital")
        assert.equal(hospitals[0].items.length, 6)
        assert.equal(search, "stanislaus")
    });
})

describe('GET /jobs?search=lpn', () => {
    it('should search by job type', async () => {
        const res = await request(url)
            .get(`/jobs?search=lpn`)
        assert.equal(res.statusCode, 200)
        const { hospitals } = res.body
        const jobs = hospitals.flatMap(h => h.items)
        assert.equal(jobs.length, 8)
        assert.match(jobs[0].job_title, new RegExp("LPN.*"))
    });
})

describe('GET /jobs?search=lpn&location=1', () => {
    it('should search and sort', async () => {
        const res = await request(url)
            .get(`/jobs?search=lpn&location=1`)
        assert.equal(res.statusCode, 200)
        const { hospitals, sort } = res.body
        const jobs = hospitals.flatMap(h => h.items)
        assert.match(jobs[0].city, new RegExp("Conyers.*"))
        assert.equal(sort.location, 1)
    });
})

describe('GET /jobs?location=2&role=1', () => {
    it('should sort location DESC role ASC', async () => {
        const res = await request(url)
            .get(`/jobs?location=2&role=1`)
        assert.equal(res.statusCode, 200)
        const { hospitals, sort } = res.body
        const jobs = hospitals.flatMap(h => h.items)
        assert.match(jobs[0].city, new RegExp("Warm.*"))
        assert.match(jobs[0].job_title, new RegExp("Bone.*"))
    });
})
