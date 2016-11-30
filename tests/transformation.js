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

})