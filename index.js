;(function (global) {
  'use strict'

  // This is the hero who's going to save the day!
  var reduce = Array.prototype.reduce

  // This is his helper, consider it the Robin.
  var copier = Array.prototype.slice

  // This is a ordinary butler. :P
  var toString = Object.prototype.toString

  var _ = {
    // Here are some utility functions.
    // Alone they look like they don't perform anything complex,
    // but combined as predicates they do a lot.
    // 
    // Just so you know
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
      first: function (collection) {
        return collection[0]
      },
      last: function (collection) {
        return collection[collection.length - 1]
      },

    },

    chain: function (collection) {
      function chainer(collection) {
        var self = {
          get: function () {
            return collection
          }
        }

        var prototype = _.keys(_)

        _.each(prototype, function (prop) {
          if (typeof _[prop] === 'function') {
            self[prop] = function () {
              var args = _.toArray(arguments)
              args.unshift(collection)

              return chainer(_[prop].apply(null, args))
            }
          } else {
            self[prop] = _[prop]
          }
        })

        return self
      }

      return chainer(collection)
    },

    isArray: function (value) {
      return toString.call(value) === '[object Array]'
    },

    count: function (collection) {
      return _.toArray(collection).length
    },

    contains: function (collection, value) {
      return Boolean(~collection.indexOf(value))
    },

    reduce: function (collection, predicate, initialValue) {
      return arguments.length > 2
        ? reduce.call(collection, predicate, initialValue)
        : reduce.call(collection, predicate)
    },

    each: function (collection, predicate) {
      return _.reduce(collection, function (collection, value, index) {
        predicate(value, index, collection)
      }, undefined)
    },

    map: function (collection, predicate) {
      return _.reduce(collection, function (collection, value, index) {
        collection.push(predicate(value, index, collection))

        return collection
      }, [])
    },

    filter: function (collection, predicate) {
      return _.reduce(collection, function (collection, value, index) {

        if (_.util.truthy(predicate(value, index, collection)))
          collection.push(value)

        return collection
      }, [])
    },

    some: function (collection, predicate) {
      return _.chain(collection)
        .map(predicate)
        .filter(_.util.truthy)
        .get()
        .length > 0
    },

    every: function (collection, predicate) {
      return _.chain(collection)
        .map(predicate)
        .filter(_.util.truthy)
        .get()
        .length === collection.length
    },

    none: function (collection, predicate) {
      return _.chain(collection)
        .map(predicate)
        .filter(_.util.falsy)
        .get()
        .length === collection.length
    },

    flatten: function (collection) {
      return _.reduce(collection, function (collection, value) {
        return collection.concat(value)
      }, [])
    },

    unique: function (collection) {
      return _.reduce(collection, function (collection, value) {

        if (!_.contains(collection, value))
          collection.push(value)

        return collection
      }, [])
    },

    toArray: function (arraylike) {
      return copier.call(arraylike)
    },

    groupBy: function (collection, key) {
      return _.chain(collection)
        .extract(key)
        .unique()
        .map(function (group) {
          return _.filter(collection, function (item) {
            return item[key] === group
          })
        })
        .get()
    },

    extract: function (collection, key) {
      return _.map(collection, function (item) {
        return item[key]
      })
    },

    head: function (collection) {
      return _.util.first(collection)
    },

    tail: function (collection) {
      return _.filter(collection, function (_, i) {
        return i > 0
      })
    },

    take: function (collection, until) {
      return _.filter(collection, function (_, i) {
        return i < until
      })
    },

    takeAt: function (collection, indexes) {
      indexes = _.isArray(indexes) ? indexes : [indexes]

      return _.filter(collection, function (value, i) {
        return _.contains(indexes, i)
      })
    },

    intersection: function (collection1 /*, collection2, collectionN */) {
      const collections = _.toArray(arguments)

      return _.reduce(collections, function (intersecting, collection) {
          return _.filter(intersecting, function (item) {
            return _.contains(collection, item)
          })
      }, collections[0] || [])
    },

    find: function (collection, predicate) {
      return _.chain(collection)
        .filter(predicate)
        .head()
        .get()
    },

    fill: function (collection, target) {
      return _.map(collection, function (value, index, collection) {
        return typeof target === 'function'
          ? target(value, index, collection)
          : target
      })
    },

    reverse: function (collection) {
      return _.chain(collection)
        .keys()
        .sort(_.util.desc)
        .map(function (index) {
          return collection[index]
        })
        .get()
    },

    sort: function (collection, predicate) {
      return collection.sort(predicate)
    },

    max: function (collection) {
      return _.reduce(collection, function (current, value) {
        return current < value
          ? value
          : current
      }, _.util.first(collection) || Infinity)
    },

    min: function (collection) {
      return _.reduce(collection, function (current, value) {
        return current > value
          ? value
          : current
      }, _.util.first(collection) || -Infinity)
    },

    keys: function (collection) {
      var hasOwnProp = Object.prototype.hasOwnProperty
      var keys = []

      for (var key in collection) {
        if (hasOwnProp.call(collection, key)) {
          keys.push(key)
        }
      }

      return keys
    },
  }

  // If it's a nodejs enviroment, export it. Otherwise assume enviroment is a browser.
  if (module && module.exports) {
    module.exports = _
  } else {
    global._ = global.reduceIt = _
  }

}(this));