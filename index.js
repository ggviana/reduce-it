;(function (root) {

	var _ = {

		util: {

			asc  (a, b) { return a > b },
			desc (a, b) { return a < b },
			truthy (value) { return value === true },
			firstOr (arr, value) { return arr.length ? arr[0] : value },
			inArray (arr, value) { return ~arr.indexOf(value) }

		},

		reduce (arr, callback, initalValue) {
			var args = arguments.slice()

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
				arr.push(callback(value, index, arr))

				return arr
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
			return _.filter(
				_.map(arr, callback),
				_.util.truthy
			).length > 0
		},

		every (arr, callback) {
			return _.filter(
				_.map(arr, callback),
				_.util.truthy
			).length === arr.length
		},

		flatten (arr) {
			return _.reduce(arr, function (collection, value) {
				return collection.concat(value)
			}, [])
		},

		unique (arr) {
			return _.reduce(arr, function (collection, value) {

				if (!_.util.inArray(collection, value))
					collection.push(value)

				return collection
			}, [])
		},

		groupBy (arr, key) {
			return _.map(
				_.unique( _.extract(arr, key) ),
				function (item) {
					return _.filter(arr, function (group) {
						return item[key] === group
					})
				})
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
			return _.map( 
				_.indexes(arr).sort(_.util.desc),
				function (index) {
					return arr[index]
				}
		},

		max (arr) {
			return _.reduce(arr, function (current, value) {
				if (current < value) return value
				return current
			}, firstOr(arr, -Infinity))
		},

		min (arr) {
			return _.reduce(arr, function (current, value) {
				if (current > value) return value
				return current
			}, firstOr(arr, Infinity))
		},

	}

	root._ = root.reduceIt = _

}(this));