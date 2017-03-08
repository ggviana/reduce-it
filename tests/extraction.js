const expect = require('expect.js')
const reduce = require('../index')

describe('Extraction', function () {

  describe('max()', function () {
    it('should return the greater number in array', function () {
      expect(reduce.max([1,2,3])).to.be(3)
    })

    it('should return Infinity if array is empty', function () {
      expect(reduce.max([])).to.be(Infinity)
    })
  })

  describe('min()', function () {
    it('should return the lesser number in array', function () {
      expect(reduce.min([1,2,3])).to.be(1)
    })

    it('should return -Infinity if array is empty', function () {
      expect(reduce.min([])).to.be(-Infinity)
    })
  })

  describe('keys()', function () {
    it('should return a array with the object keys', function () {
      expect(reduce.keys([1,2,3])).to.be.eql([0,1,2])
      expect(reduce.keys({a: 1, b: 2})).to.be.eql(['a', 'b'])
    })

    it('should return a empty array when the object is null, undefined or empty', function () {
      expect(reduce.keys({})).to.be.eql([])
      expect(reduce.keys(null)).to.be.eql([])
      expect(reduce.keys(undefined)).to.be.eql([])
    })
  })
})