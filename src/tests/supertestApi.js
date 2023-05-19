const {request} =  require("supertest")
const {app} = require("../index")


describe("Router", () => {
    it('GET/ ', async () => {
        const res = await request(app)
            .get('/products')
            .set('Accept', 'aplication/json')
        expect(res.status).toEqual(200)
        expect(res.body.products.length)
            .toBeGreaterThan(0)
    })
    it("GET/_id ", async () => {
        const res = await request(app)
            .get('/products/646374ecf083f52f997c24bb')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(200)
        expect(res.body.products.length)
            .toBeGreaterThan(0)
    })
    it("POST/", async () => {
        let res = await request(app)
            .get('/products')
            .send({
                "id": 31,
                "title": "Docker",
                "description": "to connect coputer to many thinks",
                "price": 512,
                "discountPercentage": 13,
                "rating": 16.01,
                "stock": 55,
                "brand": "Dell",
                "category": "Computer",
                "thunbnail": "-",
                "images": "-"

            })
            .set('Accept', 'application/json')
        expect(res.status).toEqual(201);

        res = await request(app)
            .get('/products')
            .set('Accept', 'application/json')

        expect(res.body.products.length)
            .toBeGreaterThan(0);

    })
    it("put/_id", async () => {
        let res = await request(app)
            .get('/products/646374ecf083f52f997c24d5')
            .send({
                "title": "check one!"
            })
            .set('Accept', 'application/json')
        expect(res.status).toEqual(201);

        res = await request(app)
            .get('/products/646374ecf083f52f997c24d5')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(200)
        expect(res.body).toStrictEqual({
            "_id": "646374ecf083f52f997c24d5",
            "id": 27,
            "title": "check one!",
            "description": "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
            "price": 51,
            "discountPercentage": 15.58,
            "rating": 4.41,
            "stock": 17,
            "brand": "Flying Wooden",
            "category": "home-decoration",
            "thumbnail": "https://i.dummyjson.com/data/products/27/thumbnail.webp",
            "images": "-"

        })
    })
    it('DELETE/_id', async () => {
        let res = await request(app)
            .del('/products/645cd4c985318b80023666b5')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(200);

        res = await request(app)
            .get('/products/646374ecf083f52f997c24d8')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(404)
    })
});