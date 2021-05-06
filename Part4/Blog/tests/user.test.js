const app = require("../app")
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

test("test for invalid users", async () => {
	const user = {
		username : "user",
		name: "bigE"
	}

	const response = await api
		.post("/api/users")
		.send(user)
		.expect("Content-Type",/json/)
		.expect(400)
	expect(response.body.error).toBe("username or password is missing")
})

afterAll(() => {
	mongoose.connection.close()
})