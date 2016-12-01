const expect = require('expect.js')
const reduce = require('../index')

describe('Testing', function () {
  
  describe('contains()', function () {
    it('should return true when element is in array', function () {
      expect(reduce.contains([1,2,3], 1)).to.be.a('boolean')
      expect(reduce.contains([1,2,3], 1)).to.be(true)
    })

    it('should return false when element is not in array', function () {
      expect(reduce.contains([1,2,3], 4)).to.be.a('boolean')
      expect(reduce.contains([1,2,3], 4)).to.be(false)
    })
  })

  describe('isArray()', function () {
    it('should always return a boolean', function () {
      expect(reduce.isArray([1,2,3])).to.be.a('boolean')
      expect(reduce.isArray("text")).to.be.a('boolean')
    })

    it('should return true if is an array', function () {
      expect(reduce.isArray([1,2,3])).to.be(true)
    })

    it('should return false if is not an array', function () {
      expect(reduce.isArray(1)).to.be(false)
      expect(reduce.isArray(/abc/)).to.be(false)
      expect(reduce.isArray("text")).to.be(false)
      expect(reduce.isArray({})).to.be(false)
    })
  })

  describe('some()', function () {
    it('should return a boolean', function () {
      expect(reduce.some([1,2,3], x => x === 3)).to.be.a('boolean')
      expect(reduce.some([1,2,3], x => x === 4)).to.be.a('boolean')
    })

    it('should return true if any element passes the test', function () {
      expect(reduce.some([1,2,3], x => x === 3)).to.be(true)
    })

    it('should return true if all elements passes the test', function () {
      expect(reduce.some([3,3,3], x => x === 3)).to.be(true)
    })
  })

  describe('every()', function () {
    it('should return a boolean', function () {
      expect(reduce.every([1,2,3], x => x === 3)).to.be.a('boolean')
      expect(reduce.every([1,2,3], x => x === 4)).to.be.a('boolean')
    })

    it('should return false if any element doesn\'t passes the test', function () {
      expect(reduce.every([1,2,3], x => x === 3)).to.be(false)
    })

    it('should return true if all elements passes the test', function () {
      expect(reduce.every([3,3,3], x => x === 3)).to.be(true)
    })
  })

  describe('none()', function () {
    it('should return a boolean', function () {
      expect(reduce.none([3,3,3], x => x === 4)).to.be.a('boolean')
      expect(reduce.none([1,2,3], x => x === 3)).to.be.a('boolean')
      expect(reduce.none([3,3,3], x => x === 3)).to.be.a('boolean')
    })

    it('should return true if all elements fails the test', function () {
      expect(reduce.none([3,3,3], x => x === 4)).to.be(true)
    })

    it('should return false if any element passes the test', function () {
      expect(reduce.none([1,2,3], x => x === 3)).to.be(false)
    })

    it('should return false if all element passes the test', function () {
      expect(reduce.none([3,3,3], x => x === 3)).to.be(false)
    })
  })
})