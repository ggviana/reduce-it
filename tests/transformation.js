const expect = require('expect.js')
const reduce = require('../index')

describe('Transformation', function () {

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

  describe('count()', function () {
    it('should return the number of item in a collection', function () {
      const objWithLength = {
        [0]: 1,
        [1]: 2,
        [2]: 3,
        length: 3
      }

      expect(reduce.count(objWithLength)).to.be.eql(3)
      expect(reduce.count([1,2,3,4,5])).to.be.eql(5)
    })
  })

  describe('union()', function () {
    it('should return a array with the union between the colections', function () {
      expect(reduce.union([1,2,3], [1,2])).to.be.eql([1,2,3,1,2])
      expect(reduce.union([1,2,3], [1,2], [1,3])).to.be.eql([1,2,3,1,2,1,3])
      expect(reduce.union([1,2,3], 1)).to.be.eql([1,2,3,1])
    })
  })

  describe('difference()', function () {
    it('should return a array with the difference between the colections', function () {
      expect(reduce.difference([1,2,3], [1,2,4])).to.be.eql([3,4])
      expect(reduce.difference([1,2], [1,2])).to.be.eql([])
      expect(reduce.difference([1,2,3], [1])).to.be.eql([2,3])
    })
  })
})
