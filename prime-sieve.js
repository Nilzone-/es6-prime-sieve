// We'll start out with a generator that gives us an iterator
// on all integers starting with n.
var numbers = function* (n) {
  n = n || 0;
  while (true) {
    yield n++;
  }
};

// Generic filter for iterators.
// Takes an iterator, returns a filtered iterator
var filterIter = function* (iter, test) {
  for (var val of iter) {
    if (test(val)) {
      yield val;
    }
  }
};

// When we find a prime, we filter out multiples of that prime, so let's
// have a function that'll let us test whether x is a multiple of y and
// one that handles "not"
var multipleOf = function (x) {
  return function (n) {
    return n % x === 0;
  };
};

var not = function (fn) {
  return function () {
    return !fn.apply(this, arguments);
  };
};

// And finally, our sieve!
var primes = function* (nums) {
  nums = nums || numbers(2);
  var n = nums.next().value;
  yield n;
  yield* primes(filterIter(nums, not(multipleOf(n))));
};

// Get the nth value from an iterator. Or rather, get the value
// that is n places from wherever the iterator currently is (in
// case the iterator was enumerated before being passed to nth)
var nth = function (iter, n) {
  var i = 0;
  while (i++ < n) {
    iter.next();
  }
  return iter.next().value;
};


