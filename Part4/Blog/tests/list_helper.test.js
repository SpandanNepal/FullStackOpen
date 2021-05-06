const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')

blogs = [{"_id":"6090f372be64aa40511099f6","title":"Post 1","author":"Arthur Gunn","url":"http://localhost/api/blog/1","likes":1,"__v":0},{"_id":"6090f3b3710cbf412d266303","title":"Post 2","author":"VTEN","url":"http://localhost/api/blog/2","likes":2,"__v":0},{"_id":"6091004910e4f7516bc75505","title":"Post 3","author":"5:55","url":"http://localhost/api/blog/3","likes":3,"__v":0}]

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)

    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    test("empty blog",() => {
		const blogs = []
		expect(listHelper.totalLikes(blogs)).toEqual(0)
	})
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
})

describe("most liked", () => {
	test("the blog with maximum likes is",() => {
		expect(listHelper.favouriteBlog(blogs)).toEqual(	
            {"_id":"6091004910e4f7516bc75505","title":"Post 3","author":"5:55","url":"http://localhost/api/blog/3","likes":3,"__v":0}
        )
	})
})

afterAll(() => {
  mongoose.connection.close()
})
