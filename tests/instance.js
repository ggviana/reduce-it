const expect = require('expect.js')
const reduce = require('../index')

describe('Instance call', function () {
  it('should expose a object', function () {
     expect(reduce).to.be.an('object')
   })

  it('should have util', function () {
     expect(reduce.util).to.be.an('object')
   })
})