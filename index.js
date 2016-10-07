;(function (root) {
  'use strict'

  var _ = {

    util: {

      asc  (a, b) { return a > b },
      desc (a, b) { return a < b },
      truthy (value) { return value === true },
      firstOr (arr, value) { return arr.length ? arr[0] : value }

    },

    chain (arr) {
      function chainer (collection) {
        var self = {
          get () {
            return collection
          }
        }

        for( var method in _ ) {
          if (typeof _[method] === 'function') {
            (function (oldMethod) {
              self[method] = function () {
                var args = _.toArray(arguments)
                args.unshift(collection)

                return chainer(oldMethod.apply(null, args))
              }
            })(_[method])
          } else {
            self[method] = _[method]
          }

        }

        return self
      }

      return chainer(arr)
    },

    contains (arr, item) {
      return Boolean(~arr.indexOf(value))
    },

    reduce (arr, callback, initalValue) {
      var args = _.toArray(arguments)

      if (args.length === 2)
        return arr.reduce(callback)

      return arr.reduce(callback, initalValue)
    },
    
    each (arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {
        callback(value, index, arr)
      }, undefined)
    },

    map (arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {
        collection.push(callback(value, index, arr))

        return collection
      }, [])
    },

    filter (arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {

        if (_.util.truthy(callback(value, index, arr)))
          collection.push(value)

        return collection
      }, [])
    },

    some (arr, callback) {
      return _.chain(arr)
        .map(callback)
        .filter(_.util.truthy)
        .get()
        .length > 0
    },

    every (arr, callback) {
      return _.chain(arr)
        .map(callback)
        .filter(_.util.truthy)
        .get()
        .length === arr.length
    },

    flatten (arr) {
      return _.reduce(arr, function (collection, value) {
        return collection.concat(value)
      }, [])
    },

    unique (arr) {
      return _.reduce(arr, function (collection, value) {

        if (!_.contains(collection, value))
          collection.push(value)

        return collection
      }, [])
    },

    toArray (arrlike) {
      return Array.prototype.slice.call(arrlike)
    },

    groupBy (arr, key) {
      return _.chain(arr)
        .extract(key)
        .unique()
        .map(function (group) {
          return _.filter(arr, function (item) {
            return item[key] === group
          })
        })
        .get()
    },

    indexes (arr) {
      return _.map(arr, function (_, index) { 
        return index 
      })
    },

    extract (arr, key) {
      return _.map(arr, function (item) {
        return item[key]
      })
    },

    head (arr) {
      return _.filter(arr, function (_, i) {
        return i < 0
      })
    },

    tail (arr) {
      return _.filter(arr, function (_, i) {
        return i > 0
      })
    },

    fill (arr, target) {
      return _.map(arr, function (value, index, arr) {
        if (typeof target === 'function') return target(value, index, arr)
        return target
      })
    },

    reverse (arr) {
      return _.chain(arr)
        .indexes()
        .sort(_.util.desc)
        .map(function (index) {
          return arr[index]
        })
        .get()
    },

    sort (arr, callback) {
      return arr.sort(callback)
    },

    max (arr) {
      return _.reduce(arr, function (current, value) {
        if (current < value) return value
        return current
      }, _.util.firstOr(arr, -Infinity))
    },

    min (arr) {
      return _.reduce(arr, function (current, value) {
        if (current > value) return value
        return current
      }, _.util.firstOr(arr, Infinity))
    },

  }

  // If it's a nodejs enviroment, export it. Othewise assume enviroment is a browser.
  if (module && module.exports) {
    module.exports = _
  } else {
    root._ = root.reduceIt = _
  }

}(this));