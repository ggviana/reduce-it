const expect = require('expect.js')
const reduce = require('../index')

describe('Filters', function () {
  describe('filter()', function () {
    it('should take only elements that match', function () {
      const data = [3,2,1,4,3,2,3]
      const predicate = number => number === 3

      expect(reduce.filter(data, predicate)).to.be.an(Array)
      expect(reduce.filter(data, predicate)).to.be.eql([3,3,3])
    })
  })

  describe('unique()', function () {
    it('should take only non-repeating items', function () {
      const data = [3,2,1,4,3,2,3]
      expect(reduce.unique(data)).to.be.an(Array)
      expect(reduce.unique(data)).to.be.eql([3,2,1,4])
    })
  })

  describe('take()', function () {
    it('should return a array with fewer items', function () {
      expect(reduce.take([1,2,3], 2)).to.be.eql([1,2])
      expect(reduce.take([1,2,3], 2).length).to.be.eql(2)
    })
  })

  describe('takeAt()', function () {
    it('should return a array with the items specified in the indexes', function () {
      expect(reduce.takeAt([1,2,3], 2)).to.be.eql([3])
      expect(reduce.takeAt([1,2,3], [1, 2])).to.be.eql([2,3])
      expect(reduce.takeAt([1,2,3], [1, 2, 3])).to.be.eql([2,3])
      expect(reduce.takeAt([1,2,3], [1, 2, 3]).length).to.be.eql(2)
    })
  })
})
