const expect = require('expect.js')
const reduce = require('../index')

describe('Features', function () {
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

  describe('toArray()', function () {
    it('should convert a array-like to array', function () {
      const data = {
        [0]: 1,
        [1]: 2,
        [2]: 3,
        length: 3
      }

      expect(reduce.toArray(data)).to.be.an(Array)
      expect(reduce.toArray(data)).to.be.eql([1,2,3])
    })
  })

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
})