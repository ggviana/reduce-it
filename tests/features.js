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

  describe('indexes()', function () {
    it('should return a array with indexes', function () {
      expect(reduce.indexes([1,2,3])).to.be.eql([0,1,2])
    })
  })

  describe('take()', function () {
    it('should return a array with fewer items', function () {
      expect(reduce.take([1,2,3], 2)).to.be.eql([1,2])
    })
  })
})