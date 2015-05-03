// TODO: memoize! Also

// We'll start out with an iterator on all integers starting with n.
var numbers = function* (n) {
  n = n || 0;
  while (true) {
    yield n++;
  }
};

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

// add a value to the front of a stream
var consStream = function* (first, rest) {
  yield first;
  yield* consStream(rest.next().value, rest);
};

// And finally, our sieve!
var primes = function* (nums) {
  nums = nums || numbers(2);
  var n = nums.next().value;
  yield* consStream(n, primes(filterIter(nums, not(multipleOf(n)))));
};



