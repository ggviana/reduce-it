const expect = require('expect.js')
const reduce = require('../index')

describe('Utilities', function () {
  describe('Ordering', function () {
    it('should return boolean always', function () {
      expect(reduce.util.asc(1, 2)).to.be.a('boolean')
      expect(reduce.util.desc(1, 2)).to.be.a('boolean')
    })

    describe('asc()', function () {
      it('should return true if first argument is greater than second argument', function () {
        expect(reduce.util.asc(1, 2)).to.be(false)
        expect(reduce.util.asc(2, 1)).to.be(true)
        expect(reduce.util.asc(1, 1)).to.be(false)
      })
    })

    describe('desc()', function () {
      it('should return true if first argument is lesser than second argument', function () {
        expect(reduce.util.desc(1, 2)).to.be(true)
        expect(reduce.util.desc(2, 1)).to.be(false)
        expect(reduce.util.desc(1, 1)).to.be(false)
      })
    })
  })

  describe('truthy()', function () {
    it('should return boolean always', function () {
      expect(reduce.util.truthy(false)).to.be.a('boolean')
    })

    it('should return false for non-boolean inputs', function () {
      expect(reduce.util.truthy(1)).to.be(false)
    })

    it('should return true for true-valued inputs', function () {
      expect(reduce.util.truthy(true)).to.be(true)
      expect(reduce.util.truthy(false)).to.be(false)
    })
  })

  describe('firstOr()', function () {
    it('should return first element of a array', function () {
      expect(reduce.util.firstOr([1,2,3])).to.be(1)
    })

    it('should return second element when first argument is not a array or array-like', function () {
      expect(reduce.util.firstOr(0, 1)).to.be(1)
    })

    it('should return undefined by default', function () {
      expect(reduce.util.firstOr(0)).to.be(undefined)
    })
  })
})