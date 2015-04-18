// We'll start out with an iterator on all integers starting with n.
var numbers = function* (n) {
  n = n || 0;
  while (true) {
    yield n++;
  }
};

var filterIter = function* (iter, test) {
  for (var val of iter) { // do an already existing iterator??
    if (test(val)) {
      yield val;
    }
  }
};

// When we find a prime, we filter out multiples of that prime, so let's
// have a function that'll let us test whether x is a multiple of y.
var multipleOf = function (x) {
  return function (n) {
    return n % x === 0;
  }
};

// Useful in composing filters
var not = function (fn) {
  return function () {
    return !fn.apply(this, arguments);
  };
};

// Ah, Scheme, how I miss you...
var consStream = function* (first, rest) {
  yield first;
  for (var x of rest) {
    yield x;
  }
};

var primes = function* (nums) {
  nums = nums || numbers(2)
  var n = nums.next().value;
  for (var x of consStream(n, primes(filterIter(nums, not(multipleOf(n))))))
  {
    yield x;
  }
};
