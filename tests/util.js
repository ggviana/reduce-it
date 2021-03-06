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
      expect(reduce.util.truthy(true)).to.be.a('boolean')
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

  describe('falsy()', function () {
    it('should return boolean always', function () {
      expect(reduce.util.falsy(true)).to.be.a('boolean')
      expect(reduce.util.falsy(false)).to.be.a('boolean')
    })

    it('should return false for non-boolean inputs', function () {
      expect(reduce.util.falsy(1)).to.be(false)
    })

    it('should return true for false-valued inputs', function () {
      expect(reduce.util.falsy(true)).to.be(false)
      expect(reduce.util.falsy(false)).to.be(true)
    })
  })

  describe('first()', function () {
    it('should return first element of a array', function () {
      expect(reduce.util.first([1,2,3])).to.be(1)
    })

    it('should return undefined when first argument is not a array or array-like', function () {
      expect(reduce.util.first(0)).to.be(undefined)
    })

    it('should return undefined when the array is empty', function () {
      expect(reduce.util.first([])).to.be(undefined)
    })
  })

  describe('last()', function () {
    it('should return last element of a array', function () {
      expect(reduce.util.last([1,2,3])).to.be(3)
    })

    it('should return undefined when last argument is not a array or array-like', function () {
      expect(reduce.util.last(0)).to.be(undefined)
    })

    it('should return undefined when the array is empty', function () {
      expect(reduce.util.last([])).to.be(undefined)
    })
  })

  describe('identity()', function () {
    it('should return the same value that was used as its arguments', function () {
      const array = [1,2,3]
      const object = {}

      expect(reduce.util.identity(array)).to.be(array)
      expect(reduce.util.identity(object)).to.be(object)
      expect(reduce.util.identity(1)).to.be(1)
    })
  })
})