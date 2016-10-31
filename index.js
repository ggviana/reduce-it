;(function (root) {
  'use strict'

  var _ = {

    util: {

      asc: function asc(a, b) {
        return a > b
      },
      desc: function desc(a, b) {
        return a < b
      },
      truthy: function truthy(value) {
        return value === true
      },
      firstOr: function firstOr(arr, value) {
        return arr.length ? arr[0] : value
      }

    },

    chain: function chain(arr) {
      function chainer(collection) {
        var self = {
          get: function get() {
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

    contains: function contains(arr, value) {
      return Boolean(~arr.indexOf(value))
    },

    reduce: function reduce(arr, callback, initalValue) {
      return arguments.length > 2
        ? arr.reduce(callback, initalValue)
        : arr.reduce(callback)
    },

    each: function each(arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {
        callback(value, index, arr)
      }, undefined)
    },

    map: function map(arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {
        collection.push(callback(value, index, arr))

        return collection
      }, [])
    },

    filter: function filter(arr, callback) {
      return _.reduce(arr, function (collection, value, index, arr) {

        if (_.util.truthy(callback(value, index, arr)))
          collection.push(value)

        return collection
      }, [])
    },

    some: function some(arr, callback) {
      return _.chain(arr)
        .map(callback)
        .filter(_.util.truthy)
        .get()
        .length > 0
    },

    every: function every(arr, callback) {
      return _.chain(arr)
        .map(callback)
        .filter(_.util.truthy)
        .get()
        .length === arr.length
    },

    flatten: function flatten(arr) {
      return _.reduce(arr, function (collection, value) {
        return collection.concat(value)
      }, [])
    },

    unique: function unique(arr) {
      return _.reduce(arr, function (collection, value) {

        if (!_.contains(collection, value))
          collection.push(value)

        return collection
      }, [])
    },

    toArray: function toArray(arrlike) {
      return Array.prototype.slice.call(arrlike)
    },

    groupBy: function groupBy(arr, key) {
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

    indexes: function indexes(arr) {
      return _.map(arr, function (_, index) {
        return index
      })
    },

    extract: function extract(arr, key) {
      return _.map(arr, function (item) {
        return item[key]
      })
    },

    head: function head(arr) {
      return _.util.firstOr(arr, undefined)
    },

    tail: function tail(arr) {
      return _.filter(arr, function (_, i) {
        return i > 0
      })
    },

    take: function take(arr, until) {
      return _.filter(arr, function (_, i) {
        return i < until
      })
    },

    find: function find(arr, callback) {
      return _.chain(arr)
        .filter(callback)
        .head()
        .get()
    },

    fill: function fill(arr, target) {
      return _.map(arr, function (value, index, arr) {
        return typeof target === 'function'
          ? target(value, index, arr)
          : target
      })
    },

    reverse: function reverse(arr) {
      return _.chain(arr)
        .indexes()
        .sort(_.util.desc)
        .map(function (index) {
          return arr[index]
        })
        .get()
    },

    sort: function sort(arr, callback) {
      return arr.sort(callback)
    },

    max: function max(arr) {
      return _.reduce(arr, function (current, value) {
        return current < value
          ? value
          : current
      }, _.util.firstOr(arr, Infinity))
    },

    min: function min(arr) {
      return _.reduce(arr, function (current, value) {
        return current > value
          ? value
          : current
      }, _.util.firstOr(arr, -Infinity))
    },
  }

  // If it's a nodejs enviroment, export it. Othewise assume enviroment is a browser.
  if (module && module.exports) {
    module.exports = _
  } else {
    root._ = root.reduceIt = _
  }

}(this));