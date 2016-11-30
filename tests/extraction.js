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

  describe('indexes()', function () {
    it('should return a array with indexes', function () {
      expect(reduce.indexes([1,2,3])).to.be.eql([0,1,2])
    })
  })
})