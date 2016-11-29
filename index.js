;(function (global) {
  'use strict'

  var _ = {

    util: {

      asc: function (a, b) {
        return a > b
      },
      desc: function (a, b) {
        return a < b
      },
      truthy: function (value) {
        return value === true
      },
      falsy: function (value) {
        return value === false
      },
      first: function (arr, value) {
        return arr[0]
      }

    },

    chain: function (arr) {
      function chainer(collection) {
        var self = {
          get: function () {
            return collection
          }
        }

        for (var method in _) {
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

    contains: function (arr, value) {
      return Boolean(~arr.indexOf(value))
    },

    reduce: function (arr, callback, initalValue) {
      return arguments.length > 2
        ? arr.reduce(callback, initalValue)
        : arr.reduce(callback)
    },

    each: function (arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {
        callback(value, index, arr)
      }, undefined)
    },

    map: function (arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {
        collection.push(callback(value, index, arr))

        return collection
      }, [])
    },

    filter: function (arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {

        if (_.util.truthy(callback(value, index, arr)))
          collection.push(value)

        return collection
      }, [])
    },

    some: function (arr, callback) {
      return _.chain(arr)
        .map(callback)
        .filter(_.util.truthy)
        .get()
        .length > 0
    },

    every: function (arr, callback) {
      return _.chain(arr)
        .map(callback)
        .filter(_.util.truthy)
        .get()
        .length === arr.length
    },

    none: function (arr, callback) {
      return _.chain(arr)
        .map(callback)
        .filter(_.util.falsy)
        .get()
        .length === arr.length
    },

    flatten: function (arr) {
      return _.reduce(arr, function (collection, value) {
        return collection.concat(value)
      }, [])
    },

    unique: function (arr) {
      return _.reduce(arr, function (collection, value) {

        if (!_.contains(collection, value))
          collection.push(value)

        return collection
      }, [])
    },

    toArray: function (arrlike) {
      return Array.prototype.slice.call(arrlike)
    },

    groupBy: function (arr, key) {
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

    indexes: function (arr) {
      return _.map(arr, function (_, index) {
        return index
      })
    },

    extract: function (arr, key) {
      return _.map(arr, function (item) {
        return item[key]
      })
    },

    head: function (arr) {
      return _.util.first(arr)
    },

    tail: function (arr) {
      return _.filter(arr, function (_, i) {
        return i > 0
      })
    },

    take: function (arr, until) {
      return _.filter(arr, function (_, i) {
        return i < until
      })
    },

    find: function (arr, callback) {
      return _.chain(arr)
        .filter(callback)
        .head()
        .get()
    },

    fill: function (arr, target) {
      return _.map(arr, function (value, index, arr) {
        return typeof target === 'function'
          ? target(value, index, arr)
          : target
      })
    },

    reverse: function (arr) {
      return _.chain(arr)
        .indexes()
        .sort(_.util.desc)
        .map(function (index) {
          return arr[index]
        })
        .get()
    },

    sort: function (arr, callback) {
      return arr.sort(callback)
    },

    max: function (arr) {
      return _.reduce(arr, function (current, value) {
        return current < value
          ? value
          : current
      }, _.util.first(arr) || Infinity)
    },

    min: function (arr) {
      return _.reduce(arr, function (current, value) {
        return current > value
          ? value
          : current
      }, _.util.first(arr) || -Infinity)
    },
  }

  // If it's a nodejs enviroment, export it. Othewise assume enviroment is a browser.
  if (module && module.exports) {
    module.exports = _
  } else {
    global._ = global.reduceIt = _
  }

}(this));