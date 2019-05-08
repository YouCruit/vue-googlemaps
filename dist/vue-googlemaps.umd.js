(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.VueGoogleMaps = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  var runtime = function (exports) {

	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.

	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.

	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }

	    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.

	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.

	    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.

	    function Generator() {}

	    function GeneratorFunction() {}

	    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.


	    var IteratorPrototype = {};

	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };

	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.

	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    exports.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    exports.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;

	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }

	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    }; // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.


	    exports.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };

	    function AsyncIterator(generator) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);

	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;

	          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	            return Promise.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return Promise.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration.
	            result.value = unwrapped;
	            resolve(result);
	          }, function (error) {
	            // If a rejected Promise was yielded, throw the rejection back
	            // into the async generator function so it can be handled there.
	            return invoke("throw", error, resolve, reject);
	          });
	        }
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new Promise(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise = // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      } // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).


	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };

	    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.

	    exports.async = function (innerFn, outerFn, self, tryLocsList) {
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          } // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	          return doneResult();
	        }

	        context.method = method;
	        context.arg = arg;

	        while (true) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }

	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }

	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);

	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            if (record.arg === ContinueSentinel) {
	              continue;
	            }

	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted; // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.

	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    } // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.


	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];

	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;

	        if (context.method === "throw") {
	          // Note: ["return"] must be used for ES3 parsing compatibility.
	          if (delegate.iterator["return"]) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);

	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }

	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }

	        return ContinueSentinel;
	      }

	      var record = tryCatch(method, delegate.iterator, context.arg);

	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      var info = record.arg;

	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.

	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      } // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.


	      context.delegate = null;
	      return ContinueSentinel;
	    } // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.


	    defineIteratorMethods(Gp);
	    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    exports.keys = function (object) {
	      var keys = [];

	      for (var key in object) {
	        keys.push(key);
	      }

	      keys.reverse(); // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.

	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();

	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        } // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.


	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];

	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined$1;
	            next.done = true;
	            return next;
	          };

	          return next.next = next;
	        }
	      } // Return an iterator with no values.


	      return {
	        next: doneResult
	      };
	    }

	    exports.values = values;

	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }

	    Context.prototype = {
	      constructor: Context,
	      reset: function (skipTempReset) {
	        this.prev = 0;
	        this.next = 0; // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.

	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function () {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;

	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },
	      dispatchException: function (exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;

	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;

	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }

	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function (type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }

	        return this.complete(record);
	      },
	      complete: function (record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }

	        return ContinueSentinel;
	      },
	      finish: function (finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function (tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;

	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }

	            return thrown;
	          }
	        } // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.


	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function (iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }

	        return ContinueSentinel;
	      }
	    }; // Regardless of whether this script is executing as a CommonJS module
	    // or not, return the runtime object so that we can declare the variable
	    // regeneratorRuntime in the outer scope, which allows this module to be
	    // injected easily by `bin/regenerator --include-runtime script.js`.

	    return exports;
	  }( // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports);

	  try {
	    regeneratorRuntime = runtime;
	  } catch (accidentalStrictMode) {
	    // This module should not be running in strict mode, so the above
	    // assignment should always work unless something is misconfigured. Just
	    // in case runtime.js accidentally runs in strict mode, we can escape
	    // strict mode using a global Function call. This could conceivably fail
	    // if a Content Security Policy forbids using Function, but in that case
	    // the proper solution is to fix the accidental strict mode problem. If
	    // you've misconfigured your bundler to force strict mode and applied a
	    // CSP to forbid Function, and you're not willing to fix either of those
	    // problems, please detail your unique predicament in a GitHub issue.
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	});

	const ASSERT_DELAY = 50;
	const ASSERT_TIMEOUT = 30000;
	const loader = {
	  loaded: false,
	  readyPromises: [],
	  assertRetries: Math.floor(ASSERT_TIMEOUT / ASSERT_DELAY),

	  /**
	   * @param apiKey    API Key, or object with the URL parameters. For example
	   *                  to use Google Maps Premium API, pass
	   *                    `{ client: <YOUR-CLIENT-ID> }`.
	   *                  You may pass the libraries and/or version (as `v`) parameter into
	   *                  this parameter and skip the next two parameters
	   * @param version   Google for Maps version
	   * @param libraries Libraries to load (@see
	   *                  https://developers.google.com/maps/documentation/javascript/libraries)
	   * @param loadCn    Boolean. If set to true, the map will be loaded form goole maps China
	   *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
	   */
	  load(options = {
	    externalGoogleMaps: true
	  }) {
	    if (typeof window === 'undefined') {
	      // Do nothing if run from server-side
	      return Promise.resolve();
	    }

	    if (!this.loaded && (!window.google || !window.google.maps)) {
	      if (options.externalGoogleMaps) {
	        this._assertGoogleMapsLoaded();
	      } else {
	        const {
	          apiKey,
	          version,
	          libraries,
	          loadCn
	        } = options;
	        const useNewFeatures = options.useNewFeatures || true;

	        this._loadScript(apiKey, version, libraries, loadCn, useNewFeatures);
	      }
	    } else {
	      console.info('The Google Maps library is already loaded');

	      this._setLoaded();
	    }
	  },

	  _assertGoogleMapsLoaded() {
	    if (window.google && window.google.maps) {
	      this._setLoaded();
	    } else if (this.assertRetries > 0) {
	      this.assertRetries--;
	      window.setTimeout(this._assertGoogleMapsLoaded.bind(this), ASSERT_DELAY);
	    } else {
	      this._assertFailed();
	    }
	  },

	  _loadScript(apiKey, version, libraries, loadCn, useNewFeatures) {
	    const googleMapScript = document.createElement('SCRIPT'); // Allow apiKey to be an object.
	    // This is to support more esoteric means of loading Google Maps,
	    // such as Google for business
	    // https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth

	    var options = {};

	    if (typeof apiKey === 'string') {
	      options.key = apiKey;
	    } else if (typeof apiKey === 'object') {
	      for (let k in apiKey) {
	        // transfer values in apiKey to options
	        options[k] = apiKey[k];
	      }
	    } else {
	      throw new Error('`apiKey` should either be a string or an object');
	    } // libraries


	    let librariesPath = '';

	    if (libraries && libraries.length > 0) {
	      librariesPath = libraries.join(',');
	      options['libraries'] = librariesPath;
	    } else if (Array.prototype.isPrototypeOf(options.libraries)) {
	      options.libraries = options.libraries.join(',');
	    }

	    options['callback'] = 'VueGoogleMapsLoaded';
	    const baseUrl = typeof loadCn === 'boolean' && loadCn === true ? 'http://maps.google.cn' : 'https://maps.googleapis.com';
	    const urlParams = Object.keys(options).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`).join('&');
	    let url = `${baseUrl}/maps/api/js?${urlParams}`; // Override version if they do not want to use the new renderer/base map

	    if (!useNewFeatures) {
	      version = '3.31';
	    }

	    if (version) {
	      url = `${url}&v=${version}`;
	    }

	    googleMapScript.setAttribute('src', url);
	    googleMapScript.setAttribute('async', '');
	    googleMapScript.setAttribute('defer', '');
	    document.body.appendChild(googleMapScript);
	    window.VueGoogleMapsLoaded = this._setLoaded.bind(this);
	  },

	  ensureReady() {
	    if (this.loaded) {
	      return Promise.resolve();
	    } else {
	      const promise = new Promise(resolve => {
	        this.readyPromises.push(resolve);
	      });
	      return promise;
	    }
	  },

	  _setLoaded() {
	    this.loaded = true;

	    for (const resolve of this.readyPromises) {
	      resolve();
	    }

	    this.readyPromises = [];
	  },

	  _assertFailed() {
	    this.loaded = true;

	    for (const reject of this.readyPromises) {
	      reject();
	    }

	    this.readyPromises = [];
	  }

	};

	function optionMergeStrategies(Vue) {
	  const strats = Vue.config.optionMergeStrategies;
	  strats.googleMapsReady = strats.created;
	  strats.googleMapsPrepare = strats.created;
	}

	let config;
	function initErrorHandling(Vue) {
	  config = Vue.config;
	}
	function handleError(e, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler(e, vm, info);
	  } else {
	    if (typeof console !== 'undefined') {
	      console.error(e);
	    } else {
	      throw e;
	    }
	  }
	}

	function autoCall(value) {
	  return typeof value === 'function' ? value() : value;
	}
	function capitalize(text) {
	  return text.charAt(0).toUpperCase() + text.slice(1);
	}

	function bindProp({
	  vm,
	  name,
	  targetPropName,
	  target,
	  watcher,
	  identity,
	  applier,
	  retriever,
	  readOnly,
	  event,
	  changeEvent
	}) {
	  if (!targetPropName) {
	    targetPropName = name;
	  }

	  if (!changeEvent) {
	    changeEvent = `${targetPropName.toLowerCase()}_changed`;
	  }

	  let setValue;
	  const capitalizedName = capitalize(name);

	  const getter = () => target && target[`get${capitalizedName}`]();

	  const setter = value => {
	    setValue = value;
	    target && target[`set${capitalizedName}`](value);
	  };

	  if (!watcher) {
	    watcher = value => value;
	  }

	  if (!identity) {
	    identity = (a, b) => a === b;
	  }

	  if (!applier) {
	    applier = (value, oldValue, set) => {
	      if (!identity(value, oldValue)) {
	        set(value);
	      }
	    };
	  }

	  if (!retriever) {
	    retriever = value => value;
	  }

	  if (!event) {
	    event = `update:${name}`;
	  }

	  vm.$watch(() => watcher(vm[name]), (value, oldValue) => {
	    if (!identity(value, setValue)) {
	      applier(value, oldValue, setter);
	    }

	    setValue = value;
	  });
	  const listener = target.addListener(changeEvent, () => {
	    const value = retriever(getter());

	    if (!identity(value, setValue)) {
	      vm.$emit(event, value);
	      setValue = value;
	    }
	  });
	  return () => {
	    listener.remove();
	  };
	}

	var BoundProps = {
	  beforeDestroy() {
	    this.unbindProps();
	  },

	  methods: {
	    bindProps(target, props) {
	      this.unbindProps();
	      this.$_boundsProps = [];

	      for (const prop of props) {
	        let options = {
	          vm: this,
	          target: target
	        };

	        if (typeof prop === 'string') {
	          options.name = prop;
	        } else {
	          Object.assign(options, prop);
	        }

	        this.$_boundsProps.push(bindProp(options));
	      }
	    },

	    unbindProps() {
	      if (this.$_boundsProps) {
	        this.$_boundsProps.forEach(unbind => unbind());
	      }
	    }

	  }
	};

	var Events = {
	  beforeCreate() {
	    this.$_googleListeners = [];
	  },

	  beforeDestroy() {
	    for (const listener of this.$_googleListeners) {
	      listener.remove();
	    }
	  },

	  methods: {
	    listen(target, event, handler) {
	      this.$_googleListeners.push(target.addListener(event, handler));
	    },

	    redirectEvents(target, events) {
	      for (const e of events) {
	        this.listen(target, e, (...args) => {
	          this.$emit(e, ...args);
	        });
	      }
	    }

	  }
	};

	var Ready = {
	  data() {
	    return {
	      googleMapsReady: false
	    };
	  },

	  async mounted() {
	    await loader.ensureReady(); // Prepare

	    {
	      const handlers = this.$options.googleMapsPrepare;

	      if (handlers) {
	        const promises = [];

	        for (let i = 0; i < handlers.length; i++) {
	          try {
	            const result = handlers[i].call(this);

	            if (typeof result.then === 'function') {
	              promises.push(result);
	            }
	          } catch (e) {
	            handleError(e, this, `googleMapsPrepare hook`);
	          }
	        }

	        await Promise.all(promises);
	      }
	    } // Ready

	    this.googleMapsReady = true;
	    {
	      const handlers = this.$options.googleMapsReady;

	      if (handlers) {
	        for (let i = 0; i < handlers.length; i++) {
	          try {
	            handlers[i].call(this);
	          } catch (e) {
	            handleError(e, this, `googleMapsReady hook`);
	          }
	        }
	      }
	    }
	    this.$emit('ready');
	  }

	};

	var FindAncestor = {
	  methods: {
	    $_findAncestor(condition) {
	      let search = this.$parent;

	      while (search) {
	        if (condition(search)) {
	          return search;
	        }

	        search = search.$parent;
	      }

	      return null;
	    }

	  }
	};

	var MapElement = {
	  mixins: [BoundProps, Events, FindAncestor, Ready],

	  created() {
	    const mapAncestor = this.$_findAncestor(a => a.$options.name === 'GoogleMapsMap');

	    if (!mapAncestor) {
	      throw new Error(`${this.constructor.name} component must be used within a <google-map> component.`);
	    }

	    this.$_mapAncestor = mapAncestor;
	  },

	  async googleMapsPrepare() {
	    const mapComp = this.$_mapAncestor;
	    this.$_map = await mapComp.$_getMap();
	  }

	};

	const boundProps = ['center', 'draggable', 'editable', 'radius', 'visible', 'options'];
	const redirectedEvents = ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'];
	var Circle = {
	  name: 'GoogleMapsCircle',
	  mixins: [MapElement],
	  props: {
	    center: {
	      type: Object,
	      required: true
	    },
	    clickable: {
	      type: Boolean,
	      default: true
	    },
	    draggable: {
	      type: Boolean,
	      default: false
	    },
	    editable: {
	      type: Boolean,
	      default: false
	    },
	    options: {
	      type: Object,
	      default: () => ({})
	    },
	    radius: {
	      type: Number,
	      required: true
	    },
	    visible: {
	      default: true
	    },
	    zIndex: {
	      type: Number
	    }
	  },
	  watch: {
	    options: 'updateOptions',
	    clickable: 'updateOptions',
	    zIndex: 'updateOptions'
	  },
	  methods: {
	    updateOptions(options) {
	      this.$_circle && this.$_circle.setOptions(options || this.$props);
	    }

	  },

	  render(h) {
	    return '';
	  },

	  googleMapsReady() {
	    const options = Object.assign({}, this.$props);
	    options.map = this.$_map;
	    this.$_circle = new window.google.maps.Circle(options);
	    this.bindProps(this.$_circle, boundProps);
	    this.redirectEvents(this.$_circle, redirectedEvents);
	  },

	  beforeDestroy() {
	    if (this.$_circle) {
	      this.$_circle.setMap(null);
	    }
	  }

	};

	var Service = {
	  mixins: [Ready],
	  props: {
	    filter: {
	      type: Function,
	      default: null
	    },
	    request: {
	      type: Object,
	      default: null
	    },
	    tag: {
	      type: String,
	      default: 'div'
	    }
	  },

	  data() {
	    return {
	      loading: false,
	      results: null,
	      status: null
	    };
	  },

	  computed: {
	    filteredResults() {
	      if (this.results && this.filter) {
	        return this.results.filter(this.filter);
	      } else {
	        return this.results;
	      }
	    },

	    finalResults() {
	      const results = this.filteredResults;
	      return results && (!Array.isArray(results) || results.length) ? results : null;
	    }

	  },
	  watch: {
	    request: {
	      handler(value) {
	        value && this.update();
	      },

	      deep: true
	    },

	    finalResults(value) {
	      this.$emit('results', value);
	    }

	  },
	  methods: {
	    createServices() {// Override this in components
	    },

	    getScope() {
	      // Override this in components
	      return {
	        loading: this.loading,
	        results: this.finalResults,
	        status: this.status
	      };
	    },

	    setResults(results, status) {
	      this.results = results;
	      this.status = status;
	    },

	    update() {// Override this in components
	    }

	  },

	  googleMapsReady() {
	    this.createServices();
	    this.request && this.update();
	  },

	  render(h) {
	    return h(this.tag, [this.$scopedSlots.default && this.$scopedSlots.default(this.getScope()), h('span', {
	      ref: 'attributions'
	    })]);
	  }

	};

	var Geocoder = {
	  name: 'GoogleMapsGeocoder',
	  mixins: [Service],
	  props: {
	    disablePlaceDetails: {
	      type: Boolean,
	      default: false
	    }
	  },
	  methods: {
	    createServices() {
	      this.$_geocoder = new window.google.maps.Geocoder();
	      this.$_placeService = new window.google.maps.places.PlacesService(this.$refs.attributions);
	    },

	    getPlaceDetails(result) {
	      result.placeDetails = {};

	      if (result.place_id) {
	        result.placeDetails.loading = true;
	        this.$_placeService.getDetails({
	          placeId: result.place_id
	        }, (details, status) => {
	          result.placeDetails = details;
	        });
	      }
	    },

	    update() {
	      if (this.googleMapsReady) {
	        this.loading = true;
	        this.$_geocoder.geocode(this.request, (results, status) => {
	          if (results) {
	            !this.disablePlaceDetails && results.forEach(this.getPlaceDetails);
	          }

	          this.setResults(results, status);
	          this.loading = false;
	        });
	      }
	    }

	  }
	};

	var vueResize_umd = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	    factory(exports);
	  })(commonjsGlobal, function (exports) {

	    function getInternetExplorerVersion() {
	      var ua = window.navigator.userAgent;
	      var msie = ua.indexOf('MSIE ');

	      if (msie > 0) {
	        // IE 10 or older => return version number
	        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	      }

	      var trident = ua.indexOf('Trident/');

	      if (trident > 0) {
	        // IE 11 => return version number
	        var rv = ua.indexOf('rv:');
	        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	      }

	      var edge = ua.indexOf('Edge/');

	      if (edge > 0) {
	        // Edge (IE 12+) => return version number
	        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	      } // other browser


	      return -1;
	    }

	    var isIE = void 0;

	    function initCompat() {
	      if (!initCompat.init) {
	        initCompat.init = true;
	        isIE = getInternetExplorerVersion() !== -1;
	      }
	    }

	    var ResizeObserver = {
	      render: function render() {
	        var _vm = this;

	        var _h = _vm.$createElement;

	        var _c = _vm._self._c || _h;

	        return _c('div', {
	          staticClass: "resize-observer",
	          attrs: {
	            "tabindex": "-1"
	          }
	        });
	      },
	      staticRenderFns: [],
	      _scopeId: 'data-v-b329ee4c',
	      name: 'resize-observer',
	      methods: {
	        compareAndNotify: function compareAndNotify() {
	          if (this._w !== this.$el.offsetWidth || this._h !== this.$el.offsetHeight) {
	            this._w = this.$el.offsetWidth;
	            this._h = this.$el.offsetHeight;
	            this.$emit('notify');
	          }
	        },
	        addResizeHandlers: function addResizeHandlers() {
	          this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);

	          this.compareAndNotify();
	        },
	        removeResizeHandlers: function removeResizeHandlers() {
	          if (this._resizeObject && this._resizeObject.onload) {
	            if (!isIE && this._resizeObject.contentDocument) {
	              this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify);
	            }

	            delete this._resizeObject.onload;
	          }
	        }
	      },
	      mounted: function mounted() {
	        var _this = this;

	        initCompat();
	        this.$nextTick(function () {
	          _this._w = _this.$el.offsetWidth;
	          _this._h = _this.$el.offsetHeight;
	        });
	        var object = document.createElement('object');
	        this._resizeObject = object;
	        object.setAttribute('aria-hidden', 'true');
	        object.setAttribute('tabindex', -1);
	        object.onload = this.addResizeHandlers;
	        object.type = 'text/html';

	        if (isIE) {
	          this.$el.appendChild(object);
	        }

	        object.data = 'about:blank';

	        if (!isIE) {
	          this.$el.appendChild(object);
	        }
	      },
	      beforeDestroy: function beforeDestroy() {
	        this.removeResizeHandlers();
	      }
	    }; // Install the components

	    function install(Vue) {
	      Vue.component('resize-observer', ResizeObserver);
	      Vue.component('ResizeObserver', ResizeObserver);
	    } // Plugin


	    var plugin = {
	      // eslint-disable-next-line no-undef
	      version: "0.4.5",
	      install: install
	    }; // Auto-install

	    var GlobalVue = null;

	    if (typeof window !== 'undefined') {
	      GlobalVue = window.Vue;
	    } else if (typeof commonjsGlobal !== 'undefined') {
	      GlobalVue = commonjsGlobal.Vue;
	    }

	    if (GlobalVue) {
	      GlobalVue.use(plugin);
	    }

	    exports.install = install;
	    exports.ResizeObserver = ResizeObserver;
	    exports['default'] = plugin;
	    Object.defineProperty(exports, '__esModule', {
	      value: true
	    });
	  });
	});
	unwrapExports(vueResize_umd);
	var vueResize_umd_1 = vueResize_umd.ResizeObserver;

	var vueObserveVisibility_umd = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	    factory(exports);
	  })(commonjsGlobal, function (exports) {

	    function _typeof(obj) {
	      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	        _typeof = function (obj) {
	          return typeof obj;
	        };
	      } else {
	        _typeof = function (obj) {
	          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	        };
	      }

	      return _typeof(obj);
	    }

	    function _classCallCheck(instance, Constructor) {
	      if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	      }
	    }

	    function _defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    function _createClass(Constructor, protoProps, staticProps) {
	      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) _defineProperties(Constructor, staticProps);
	      return Constructor;
	    }

	    function _toConsumableArray(arr) {
	      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	    }

	    function _arrayWithoutHoles(arr) {
	      if (Array.isArray(arr)) {
	        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	        return arr2;
	      }
	    }

	    function _iterableToArray(iter) {
	      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	    }

	    function _nonIterableSpread() {
	      throw new TypeError("Invalid attempt to spread non-iterable instance");
	    }

	    function processOptions(value) {
	      var options;

	      if (typeof value === 'function') {
	        // Simple options (callback-only)
	        options = {
	          callback: value
	        };
	      } else {
	        // Options object
	        options = value;
	      }

	      return options;
	    }

	    function throttle(callback, delay) {
	      var timeout;
	      var lastState;
	      var currentArgs;

	      var throttled = function throttled(state) {
	        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        currentArgs = args;
	        if (timeout && state === lastState) return;
	        lastState = state;
	        clearTimeout(timeout);
	        timeout = setTimeout(function () {
	          callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
	          timeout = 0;
	        }, delay);
	      };

	      throttled._clear = function () {
	        clearTimeout(timeout);
	      };

	      return throttled;
	    }

	    function deepEqual(val1, val2) {
	      if (val1 === val2) return true;

	      if (_typeof(val1) === 'object') {
	        for (var key in val1) {
	          if (!deepEqual(val1[key], val2[key])) {
	            return false;
	          }
	        }

	        return true;
	      }

	      return false;
	    }

	    var VisibilityState =
	    /*#__PURE__*/
	    function () {
	      function VisibilityState(el, options, vnode) {
	        _classCallCheck(this, VisibilityState);

	        this.el = el;
	        this.observer = null;
	        this.frozen = false;
	        this.createObserver(options, vnode);
	      }

	      _createClass(VisibilityState, [{
	        key: "createObserver",
	        value: function createObserver(options, vnode) {
	          var _this = this;

	          if (this.observer) {
	            this.destroyObserver();
	          }

	          if (this.frozen) return;
	          this.options = processOptions(options);

	          this.callback = function (result, entry) {
	            _this.options.callback(result, entry);

	            if (result && _this.options.once) {
	              _this.frozen = true;

	              _this.destroyObserver();
	            }
	          }; // Throttle


	          if (this.callback && this.options.throttle) {
	            this.callback = throttle(this.callback, this.options.throttle);
	          }

	          this.oldResult = undefined;
	          this.observer = new IntersectionObserver(function (entries) {
	            var entry = entries[0];

	            if (_this.callback) {
	              // Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
	              var result = entry.isIntersecting && entry.intersectionRatio >= _this.threshold;
	              if (result === _this.oldResult) return;
	              _this.oldResult = result;

	              _this.callback(result, entry);
	            }
	          }, this.options.intersection); // Wait for the element to be in document

	          vnode.context.$nextTick(function () {
	            if (_this.observer) {
	              _this.observer.observe(_this.el);
	            }
	          });
	        }
	      }, {
	        key: "destroyObserver",
	        value: function destroyObserver() {
	          if (this.observer) {
	            this.observer.disconnect();
	            this.observer = null;
	          } // Cancel throttled call


	          if (this.callback && this.callback._clear) {
	            this.callback._clear();

	            this.callback = null;
	          }
	        }
	      }, {
	        key: "threshold",
	        get: function get() {
	          return this.options.intersection && this.options.intersection.threshold || 0;
	        }
	      }]);

	      return VisibilityState;
	    }();

	    function bind(el, _ref, vnode) {
	      var value = _ref.value;
	      if (!value) return;

	      if (typeof IntersectionObserver === 'undefined') {
	        console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill');
	      } else {
	        var state = new VisibilityState(el, value, vnode);
	        el._vue_visibilityState = state;
	      }
	    }

	    function update(el, _ref2, vnode) {
	      var value = _ref2.value,
	          oldValue = _ref2.oldValue;
	      if (deepEqual(value, oldValue)) return;
	      var state = el._vue_visibilityState;

	      if (!value) {
	        unbind(el);
	        return;
	      }

	      if (state) {
	        state.createObserver(value, vnode);
	      } else {
	        bind(el, {
	          value: value
	        }, vnode);
	      }
	    }

	    function unbind(el) {
	      var state = el._vue_visibilityState;

	      if (state) {
	        state.destroyObserver();
	        delete el._vue_visibilityState;
	      }
	    }

	    var ObserveVisibility = {
	      bind: bind,
	      update: update,
	      unbind: unbind
	    };

	    function install(Vue) {
	      Vue.directive('observe-visibility', ObserveVisibility);
	      /* -- Add more components here -- */
	    }
	    /* -- Plugin definition & Auto-install -- */

	    /* You shouldn't have to modify the code below */
	    // Plugin


	    var plugin = {
	      // eslint-disable-next-line no-undef
	      version: "0.4.4",
	      install: install
	    };
	    var GlobalVue = null;

	    if (typeof window !== 'undefined') {
	      GlobalVue = window.Vue;
	    } else if (typeof commonjsGlobal !== 'undefined') {
	      GlobalVue = commonjsGlobal.Vue;
	    }

	    if (GlobalVue) {
	      GlobalVue.use(plugin);
	    }

	    exports.ObserveVisibility = ObserveVisibility;
	    exports.default = plugin;
	    exports.install = install;
	    Object.defineProperty(exports, '__esModule', {
	      value: true
	    });
	  });
	});
	unwrapExports(vueObserveVisibility_umd);
	var vueObserveVisibility_umd_1 = vueObserveVisibility_umd.ObserveVisibility;

	function redirectMethods({
	  target,
	  names
	}) {
	  return names.reduce((obj, name) => {
	    obj[name] = function (...args) {
	      const t = target.call(this);

	      if (t) {
	        return t[name].apply(t, args);
	      }
	    };

	    return obj;
	  }, {});
	}

	//
	const boundProps$1 = [{
	  name: 'center',
	  watcher: value => ({
	    lat: autoCall(value.lat),
	    lng: autoCall(value.lng)
	  }),
	  identity: (a, b) => {
	    if (a && b) {
	      if (typeof a.equals !== 'function') {
	        a = new window.google.maps.LatLng(a);
	      }

	      if (typeof b.equals !== 'function') {
	        b = new window.google.maps.LatLng(b);
	      }

	      return a.equals(b);
	    }
	  },
	  retriever: value => ({
	    lat: value.lat(),
	    lng: value.lng()
	  })
	}, 'heading', 'mapTypeId', 'tilt', 'zoom', 'options'];
	const redirectedMethods = ['panBy', 'panTo', 'panToBounds', 'fitBounds', 'getBounds'];
	const redirectedEvents$1 = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseup', 'mousemove', 'mouseout', 'mouseover', 'resize', 'rightclick', 'tilesloaded'];
	var script = {
	  name: 'GoogleMapsMap',
	  mixins: [Ready, BoundProps, Events],
	  components: {
	    ResizeObserver: vueResize_umd_1
	  },
	  directives: {
	    ObserveVisibility: vueObserveVisibility_umd_1
	  },
	  props: {
	    center: {
	      required: true,
	      type: Object
	    },
	    heading: {
	      type: Number
	    },
	    mapTypeId: {
	      type: String
	    },
	    options: {
	      type: Object,
	      default: () => ({})
	    },
	    tilt: {
	      type: Number
	    },
	    zoom: {
	      required: true,
	      type: Number
	    }
	  },

	  beforeCreate() {
	    this.$_mapPromises = [];
	  },

	  googleMapsReady() {
	    const element = this.$refs.map;
	    const options = {
	      center: this.center,
	      heading: this.heading,
	      mapTypeId: this.mapTypeId,
	      tilt: this.tilt,
	      zoom: this.zoom,
	      ...this.options
	    };
	    this.$_map = new window.google.maps.Map(element, options);
	    this.bindProps(this.$_map, boundProps$1);
	    this.listen(this.$_map, 'bounds_changed', () => {
	      this.$emit('update:bounds', this.$_map.getBounds());
	    });
	    this.listen(this.$_map, 'idle', () => {
	      this.$emit('idle', this);
	      this.lastCenter = this.$_map.getCenter();
	    });
	    this.lastCenter = this.$_map.getCenter();
	    this.redirectEvents(this.$_map, redirectedEvents$1); // Code that awaits `$_getMap()`

	    this.$_mapPromises.forEach(resolve => resolve(this.$_map));
	  },

	  watch: {
	    options: {
	      handler: 'updateOptions',
	      deep: true
	    }
	  },
	  methods: { ...redirectMethods({
	      target() {
	        return this.$_map;
	      },

	      names: redirectedMethods
	    }),

	    resize(preserveCenter = true) {
	      if (this.$_map) {
	        // let center
	        // preserveCenter && (center = this.$_map.getCenter())
	        window.google.maps.event.trigger(this.$_map, 'resize');
	        preserveCenter && this.$_map.setCenter(this.lastCenter);
	      }
	    },

	    visibilityChanged(isVisible) {
	      if (isVisible) {
	        this.$nextTick(this.resize);
	      }
	    },

	    $_getMap() {
	      if (this.$_map) {
	        return Promise.resolve(this.$_map);
	      } else {
	        return new Promise(resolve => {
	          this.$_mapPromises.push(resolve);
	        });
	      }
	    },

	    updateOptions(options) {
	      this.$_map && this.$_map.setOptions(options || this.$props);
	    }

	  }
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function () {
	      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

	function createInjector(context) {
	  return function (id, style) {
	    return addStyle(id, style);
	  };
	}

	var HEAD = document.head || document.getElementsByTagName('head')[0];
	var styles = {};

	function addStyle(id, css) {
	  var group = isOldIE ? css.media || 'default' : id;
	  var style = styles[group] || (styles[group] = {
	    ids: new Set(),
	    styles: []
	  });

	  if (!style.ids.has(id)) {
	    style.ids.add(id);
	    var code = css.source;

	    if (css.map) {
	      // https://developer.chrome.com/devtools/docs/javascript-debugging
	      // this makes source maps inside style tags work properly in Chrome
	      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

	      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
	    }

	    if (!style.element) {
	      style.element = document.createElement('style');
	      style.element.type = 'text/css';
	      if (css.media) style.element.setAttribute('media', css.media);
	      HEAD.appendChild(style.element);
	    }

	    if ('styleSheet' in style.element) {
	      style.styles.push(code);
	      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
	    } else {
	      var index = style.ids.size - 1;
	      var textNode = document.createTextNode(code);
	      var nodes = style.element.childNodes;
	      if (nodes[index]) style.element.removeChild(nodes[index]);
	      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
	    }
	  }
	}

	var browser = createInjector;

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      directives: [
	        {
	          name: "observe-visibility",
	          rawName: "v-observe-visibility",
	          value: _vm.visibilityChanged,
	          expression: "visibilityChanged"
	        }
	      ],
	      staticClass: "vue-google-map"
	    },
	    [
	      _c("div", { ref: "map", staticClass: "map-view" }),
	      _vm._v(" "),
	      _c("div", { staticClass: "hidden-content" }, [_vm._t("default")], 2),
	      _vm._v(" "),
	      _vm._t("visible"),
	      _vm._v(" "),
	      _c("resize-observer", { on: { notify: _vm.resize } })
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = function (inject) {
	    if (!inject) return
	    inject("data-v-0a9f7876_0", { source: ".resize-observer[data-v-b329ee4c] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  border: none;\n  background-color: transparent;\n  pointer-events: none;\n  display: block;\n  overflow: hidden;\n  opacity: 0;\n}\n.resize-observer[data-v-b329ee4c] object {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: -1;\n}\n", map: undefined, media: undefined })
	,inject("data-v-0a9f7876_1", { source: ".vue-google-map {\n  position: relative;\n}\n.vue-google-map .map-view {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n}\n.vue-google-map .hidden-content {\n  display: none;\n}\n", map: {"version":3,"sources":["/Users/affeman/repos/vue-googlemaps/src/components/Map.vue","Map.vue"],"names":[],"mappings":"AA0MA;EACA,kBAAA;ACzMA;AD2MA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,kBAAA;ACzMA;AD4MA;EACA,aAAA;AC1MA","file":"Map.vue","sourcesContent":["<template>\n\t<div class=\"vue-google-map\" v-observe-visibility=\"visibilityChanged\">\n\t\t<div ref=\"map\" class=\"map-view\"></div>\n\t\t<div class=\"hidden-content\">\n\t\t\t<slot></slot>\n\t\t</div>\n\t\t<slot name=\"visible\"></slot>\n\t\t<resize-observer @notify=\"resize\" />\n\t</div>\n</template>\n\n<script>\nimport { ResizeObserver } from 'vue-resize'\nimport { ObserveVisibility } from 'vue-observe-visibility'\nimport Ready from '../mixins/Ready'\nimport BoundProps from '../mixins/BoundProps'\nimport Events from '../mixins/Events'\nimport { autoCall } from '../utils/misc'\nimport { redirectMethods } from '../utils/redirect-methods'\n\nconst boundProps = [\n\t{\n\t\tname: 'center',\n\t\twatcher: value => ({\n\t\t\tlat: autoCall(value.lat),\n\t\t\tlng: autoCall(value.lng),\n\t\t}),\n\t\tidentity: (a, b) => {\n\t\t\tif (a && b) {\n\t\t\t\tif (typeof a.equals !== 'function') {\n\t\t\t\t\ta = new window.google.maps.LatLng(a)\n\t\t\t\t}\n\t\t\t\tif (typeof b.equals !== 'function') {\n\t\t\t\t\tb = new window.google.maps.LatLng(b)\n\t\t\t\t}\n\t\t\t\treturn a.equals(b)\n\t\t\t}\n\t\t},\n\t\tretriever: (value) => ({\n\t\t\tlat: value.lat(),\n\t\t\tlng: value.lng(),\n\t\t}),\n\t},\n\t'heading',\n\t'mapTypeId',\n\t'tilt',\n\t'zoom',\n\t'options',\n]\n\nconst redirectedMethods = [\n\t'panBy',\n\t'panTo',\n\t'panToBounds',\n\t'fitBounds',\n\t'getBounds',\n]\n\nconst redirectedEvents = [\n\t'click',\n\t'dblclick',\n\t'drag',\n\t'dragend',\n\t'dragstart',\n\t'mousedown',\n\t'mouseup',\n\t'mousemove',\n\t'mouseout',\n\t'mouseover',\n\t'resize',\n\t'rightclick',\n\t'tilesloaded',\n]\n\nexport default {\n\tname: 'GoogleMapsMap',\n\n\tmixins: [\n\t\tReady,\n\t\tBoundProps,\n\t\tEvents,\n\t],\n\n\tcomponents: {\n\t\tResizeObserver,\n\t},\n\n\tdirectives: {\n\t\tObserveVisibility,\n\t},\n\n\tprops: {\n\t\tcenter: {\n\t\t\trequired: true,\n\t\t\ttype: Object,\n\t\t},\n\t\theading: {\n\t\t\ttype: Number,\n\t\t},\n\t\tmapTypeId: {\n\t\t\ttype: String,\n\t\t},\n\t\toptions: {\n\t\t\ttype: Object,\n\t\t\tdefault: () => ({}),\n\t\t},\n\t\ttilt: {\n\t\t\ttype: Number,\n\t\t},\n\t\tzoom: {\n\t\t\trequired: true,\n\t\t\ttype: Number,\n\t\t},\n\t},\n\n\tbeforeCreate () {\n\t\tthis.$_mapPromises = []\n\t},\n\n\tgoogleMapsReady () {\n\t\tconst element = this.$refs.map\n\n\t\tconst options = {\n\t\t\tcenter: this.center,\n\t\t\theading: this.heading,\n\t\t\tmapTypeId: this.mapTypeId,\n\t\t\ttilt: this.tilt,\n\t\t\tzoom: this.zoom,\n\t\t\t...this.options,\n\t\t}\n\n\t\tthis.$_map = new window.google.maps.Map(element, options)\n\n\t\tthis.bindProps(this.$_map, boundProps)\n\n\t\tthis.listen(this.$_map, 'bounds_changed', () => {\n\t\t\tthis.$emit('update:bounds', this.$_map.getBounds())\n\t\t})\n\n\t\tthis.listen(this.$_map, 'idle', () => {\n\t\t\tthis.$emit('idle', this)\n\t\t\tthis.lastCenter = this.$_map.getCenter()\n\t\t})\n\n\t\tthis.lastCenter = this.$_map.getCenter()\n\n\t\tthis.redirectEvents(this.$_map, redirectedEvents)\n\n\t\t// Code that awaits `$_getMap()`\n\t\tthis.$_mapPromises.forEach(resolve => resolve(this.$_map))\n\t},\n\n\twatch: {\n\t\toptions: {\n\t\t\thandler: 'updateOptions',\n\t\t\tdeep: true,\n\t\t},\n\t},\n\n\tmethods: {\n\t\t...redirectMethods({\n\t\t\ttarget () {\n\t\t\t\treturn this.$_map\n\t\t\t},\n\t\t\tnames: redirectedMethods,\n\t\t}),\n\n\t\tresize (preserveCenter = true) {\n\t\t\tif (this.$_map) {\n\t\t\t\t// let center\n\t\t\t\t// preserveCenter && (center = this.$_map.getCenter())\n\t\t\t\twindow.google.maps.event.trigger(this.$_map, 'resize')\n\t\t\t\tpreserveCenter && this.$_map.setCenter(this.lastCenter)\n\t\t\t}\n\t\t},\n\n\t\tvisibilityChanged (isVisible) {\n\t\t\tif (isVisible) {\n\t\t\t\tthis.$nextTick(this.resize)\n\t\t\t}\n\t\t},\n\n\t\t$_getMap () {\n\t\t\tif (this.$_map) {\n\t\t\t\treturn Promise.resolve(this.$_map)\n\t\t\t} else {\n\t\t\t\treturn new Promise(resolve => {\n\t\t\t\t\tthis.$_mapPromises.push(resolve)\n\t\t\t\t})\n\t\t\t}\n\t\t},\n\n\t\tupdateOptions (options) {\n\t\t\tthis.$_map && this.$_map.setOptions(options || this.$props)\n\t\t},\n\t},\n}\n</script>\n\n<style lang=\"stylus\" src=\"../../node_modules/vue-resize/dist/vue-resize.css\"></style>\n\n<style lang=\"stylus\">\n.vue-google-map {\n\tposition: relative;\n\n\t.map-view {\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\tposition: absolute;\n\t}\n\n\t.hidden-content {\n\t\tdisplay: none;\n\t}\n}\n</style>\n",".vue-google-map {\n  position: relative;\n}\n.vue-google-map .map-view {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n}\n.vue-google-map .hidden-content {\n  display: none;\n}\n"]}, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject SSR */
	  

	  
	  var Map = normalizeComponent_1(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    browser,
	    undefined
	  );

	const boundProps$2 = ['animation', 'clickable', 'cursor', 'draggable', 'icon', 'label', 'opacity', 'place', 'position', 'shape', 'title', 'visible', 'zIndex'];
	const redirectedEvents$2 = ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'];
	var Marker = {
	  name: 'GoogleMapsMarker',
	  mixins: [MapElement],
	  props: {
	    animation: {
	      type: Number
	    },
	    clickable: {
	      type: Boolean,
	      default: true
	    },
	    cursor: {
	      type: String
	    },
	    draggable: {
	      type: Boolean,
	      default: false
	    },
	    icon: {},
	    label: {},
	    opacity: {
	      type: Number,
	      default: 1
	    },
	    place: {
	      type: Object
	    },
	    position: {
	      type: Object
	    },
	    shape: {
	      type: Object
	    },
	    title: {
	      type: String
	    },
	    visible: {
	      default: true
	    },
	    zIndex: {
	      type: Number
	    }
	  },

	  render(h) {
	    if (!this.$slots.default || this.$slots.default.length === 0) {
	      return '';
	    } else if (this.$slots.default.length === 1) {
	      // So that infowindows can have a marker parent
	      return this.$slots.default[0];
	    } else {
	      return h('div', this.$slots.default);
	    }
	  },

	  googleMapsReady() {
	    const options = Object.assign({}, this.$props);
	    options.map = this.$_map;
	    this.$_marker = new window.google.maps.Marker(options);
	    this.bindProps(this.$_marker, boundProps$2);
	    this.redirectEvents(this.$_marker, redirectedEvents$2);
	  },

	  beforeDestroy() {
	    if (this.$_marker) {
	      this.$_marker.setMap(null);
	    }
	  }

	};

	var NearbyPlaces = {
	  name: 'GoogleMapsNearbyPlaces',
	  mixins: [Service],
	  methods: {
	    createServices() {
	      this.$_placeService = new window.google.maps.places.PlacesService(this.$refs.attributions);
	    },

	    update() {
	      this.loading = true;
	      this.$_placeService.nearbySearch(this.request, (results, status) => {
	        this.setResults(results, status);
	        this.loading = false;
	      });
	    }

	  }
	};

	var PlaceDetails = {
	  name: 'GoogleMapsPlaceDetails',
	  mixins: [Service],
	  methods: {
	    createServices() {
	      this.$_placeService = new window.google.maps.places.PlacesService(this.$refs.attributions);
	    },

	    update() {
	      this.loading = true;
	      this.$_placeService.getDetails(this.request, (results, status) => {
	        this.setResults(results, status);
	        this.loading = false;
	      });
	    }

	  }
	};

	let defaultPositionStyle;
	const defaultAccuracyStyle = {
	  strokeColor: '#4285F4',
	  strokeOpacity: 0.25,
	  fillColor: '#4285F4',
	  fillOpacity: 0.2,
	  strokeWeight: 1
	};
	var UserPosition = {
	  name: 'GoogleMapsUserPosition',
	  mixins: [Ready],
	  props: {
	    accuracy: {
	      default: 0
	    },
	    accuracyStyle: {
	      type: Object,
	      default: null
	    },
	    disableWatch: {
	      type: Boolean,
	      default: false
	    },
	    hideAccuracy: {
	      type: Boolean,
	      default: false
	    },
	    minimumAccuracy: {
	      default: 1000
	    },
	    position: {
	      type: Object
	    },
	    positionStyle: {
	      type: Object,
	      default: null
	    },
	    positionOptions: {
	      type: Object,
	      default: () => ({
	        enableHighAccuracy: true,
	        maximumAge: 1000
	      })
	    }
	  },

	  data() {
	    return {
	      currentPosition: null,
	      currentAccuracy: null
	    };
	  },

	  watch: {
	    position(value) {
	      this.currentPosition = value;
	    },

	    accuracy(value) {
	      this.currentAccuracy = value;
	    },

	    disableWatch(value, oldValue) {
	      if (value !== oldValue) {
	        if (value) {
	          this.stopWatch();
	        } else {
	          this.startWatch();
	        }
	      }
	    },

	    positionOptions(value) {
	      if (!this.disableWatch) {
	        this.stopWatch();
	        this.startWatch();
	      }
	    }

	  },
	  methods: {
	    startWatch() {
	      if (navigator.geolocation) {
	        this.$_watchId = navigator.geolocation.watchPosition(this.updatePosition, this.onWatchError, this.positionOptions);
	      } else {
	        console.warn('GoogleMapsUserPosition: navigator.geolocation not supported');
	        this.$emit('error', new Error('unsupported'));
	      }
	    },

	    stopWatch() {
	      if (navigator.geolocation) {
	        navigator.geolocation.clearWatch(this.$_watchId);
	      }
	    },

	    updatePosition(position) {
	      this.currentPosition = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
	      this.$emit('update:position', this.currentPosition);
	      this.currentAccuracy = position.coords.accuracy;
	      this.$emit('update:accuracy', this.currentAccuracy);
	    },

	    onWatchError(e) {
	      this.$emit('error', e);
	    }

	  },

	  render(h) {
	    const markers = [];

	    if (this.googleMapsReady && this.currentPosition && (this.minimumAccuracy === null || this.currentAccuracy <= this.minimumAccuracy)) {
	      markers.push(h(Marker, {
	        props: {
	          clickable: false,
	          icon: this.positionStyle || defaultPositionStyle,
	          optimized: false,
	          position: this.currentPosition,
	          zIndex: 3
	        }
	      }));

	      if (!this.hideAccuracy) {
	        markers.push(h(Circle, {
	          props: {
	            clickable: false,
	            radius: this.currentAccuracy,
	            options: this.accuracyStyle || defaultAccuracyStyle,
	            center: this.currentPosition,
	            zIndex: 1
	          }
	        }));
	      }
	    }

	    return h('div', markers);
	  },

	  googleMapsReady() {
	    defaultPositionStyle = {
	      path: window.google.maps.SymbolPath.CIRCLE,
	      fillColor: '#4285F4',
	      fillOpacity: 1,
	      scale: 6,
	      strokeColor: 'white',
	      strokeWeight: 2
	    };

	    if (!this.disableWatch) {
	      this.startWatch();
	    }
	  },

	  beforeDestroy() {
	    this.stopWatch();
	  }

	};

	const boundProps$3 = ['draggable', 'editable', 'options', 'path'];
	const redirectedEvents$3 = ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'];
	var Polyline = {
	  name: 'GoogleMapsPolyline',
	  mixins: [MapElement],
	  props: {
	    editable: {
	      type: Boolean,
	      default: false
	    },
	    draggable: {
	      type: Boolean,
	      default: false
	    },
	    options: {
	      type: Object,
	      default: () => ({})
	    },
	    path: {
	      type: Array
	    }
	  },
	  watch: {
	    options: 'updateOptions'
	  },
	  methods: {
	    updateOptions(options) {
	      this.$_polyline && this.$_polyline.setOptions(options || this.$props);
	    }

	  },

	  render(h) {
	    return '';
	  },

	  googleMapsReady() {
	    const options = Object.assign({}, this.$props);
	    options.map = this.$_map;
	    this.$_polyline = new window.google.maps.Polyline(options);
	    this.bindProps(this.$_polyline, boundProps$3);
	    this.redirectEvents(this.$_polyline, redirectedEvents$3);
	    this.listen(this.$_polyline, 'drag', () => {
	      this.$emit('path_changed', this.$_polyline.getPath());
	    });
	  },

	  beforeDestroy() {
	    if (this.$_polyline) {
	      this.$_polyline.setMap(null);
	    }
	  }

	};

	const boundProps$4 = ['bounds', 'draggable', 'editable', 'visible', 'options'];
	const redirectedEvents$4 = ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'];
	var Rectangle = {
	  name: 'GoogleMapsRectangle',
	  mixins: [MapElement],
	  props: {
	    bounds: {
	      type: Object,
	      required: true
	    },
	    clickable: {
	      type: Boolean,
	      default: true
	    },
	    draggable: {
	      type: Boolean,
	      default: false
	    },
	    editable: {
	      type: Boolean,
	      default: false
	    },
	    options: {
	      type: Object,
	      default: () => ({})
	    },
	    visible: {
	      default: true
	    },
	    zIndex: {
	      type: Number
	    }
	  },
	  watch: {
	    bounds: 'updateBounds',
	    options: 'updateOptions',
	    clickable: 'updateOptions',
	    zIndex: 'updateOptions'
	  },
	  methods: {
	    updateOptions(options) {
	      this.$_rectangle && this.$_rectangle.setOptions(options || this.$props);
	    },

	    updateBounds(bounds) {
	      this.$_rectangle && this.$_rectangle.setBounds(bounds);
	    }

	  },

	  render(h) {
	    return '';
	  },

	  googleMapsReady() {
	    const options = Object.assign({}, this.$props);
	    options.map = this.$_map;
	    this.$_rectangle = new window.google.maps.Rectangle(options);
	    this.bindProps(this.$_rectangle, boundProps$4);
	    this.redirectEvents(this.$_rectangle, redirectedEvents$4);
	  },

	  beforeDestroy() {
	    if (this.$_rectangle) {
	      this.$_rectangle.setMap(null);
	    }
	  }

	};

	const boundProps$5 = ["draggable", "editable", "options", "paths"];
	const redirectedEvents$5 = ["click", "rightclick", "dblclick", "drag", "dragstart", "dragend", "mouseup", "mousedown", "mouseover", "mouseout"];
	const redirectedPathEvents = ["set_at", "insert_at", "remove_at"];
	var Polygon = {
	  name: "GoogleMapsPolygon",
	  mixins: [MapElement],
	  props: {
	    id: {
	      type: String
	    },
	    editable: {
	      type: Boolean,
	      default: false
	    },
	    draggable: {
	      type: Boolean,
	      default: false
	    },
	    options: {
	      type: Object,
	      default: () => ({})
	    },
	    paths: {
	      type: Array
	    }
	  },

	  data() {
	    return {
	      dragging: false
	    };
	  },

	  watch: {
	    paths: "updateOptions",
	    options: "updateOptions"
	  },

	  beforeCreate() {
	    this.$_googlePathListeners = [];
	  },

	  beforeDestroy() {
	    if (this.$_polygon) {
	      this.$_polygon.setMap(null);
	    }

	    this.removePathEventListeners();
	  },

	  methods: {
	    updateOptions(options) {
	      this.$_polygon && this.$_polygon.setOptions(options || this.$props);
	      this.$_polygon && this.$_polygon.setMap(this.$_map);
	    },

	    // Override redirectEvents to supply polygon
	    redirectEvents(target, events) {
	      for (const e of events) {
	        this.listen(target, e, args => {
	          if (e === "dragstart") {
	            this.dragging = true;
	          } else if (e === "dragend") {
	            this.dragging = false;
	          } else if (e === "mouseover") {
	            // TODO find a way to set path handlers correctly
	            this.redirectPathEvents(target);
	          }

	          this.$emit(e, {
	            event: args,
	            polygon: target,
	            id: this.id
	          });
	        });
	      }
	    },

	    listenToPath(target, event, handler) {
	      this.$_googlePathListeners.push(target.addListener(event, handler));
	    },

	    removePathEventListeners() {
	      for (const listener of this.$_googlePathListeners) {
	        listener.remove();
	      }

	      this.$_googlePathListeners = [];
	    },

	    redirectPathEvents(target) {
	      this.removePathEventListeners();

	      for (const e of redirectedPathEvents) {
	        this.listenToPath(target.getPath(), e, args => {
	          if (this.dragging && e === "set_at") {
	            return;
	          }

	          this.$emit(e, {
	            event: args,
	            polygon: this.$_polygon,
	            id: this.id
	          });
	        });
	      }
	    }

	  },

	  render(h) {
	    return "";
	  },

	  googleMapsReady() {
	    const options = Object.assign({}, this.$props);
	    options.map = this.$_map;
	    this.$_polygon = new window.google.maps.Polygon(options);
	    this.bindProps(this.$_polygon, boundProps$5);
	    this.redirectEvents(this.$_polygon, redirectedEvents$5);
	  }

	};

	const boundProps$6 = ['options'];
	const redirectedEvents$6 = ['closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'];
	var InfoWindow = {
	  name: 'GoogleMapsInfoWindow',
	  mixins: [MapElement],
	  props: {
	    options: {
	      type: Object,
	      default: () => ({})
	    },
	    show: {
	      type: Boolean,
	      default: () => false
	    }
	  },
	  watch: {
	    options: 'updateOptions',
	    show: 'updateShow'
	  },
	  methods: {
	    updateShow(show) {
	      if (this.$_infoWindow) {
	        if (show) {
	          this.$_infoWindow.open(this.$_map);
	        } else {
	          this.$_infoWindow.close();
	        }
	      }
	    },

	    updateOptions(options) {
	      this.$_infoWindow && this.$_infoWindow.setOptions(options || this.$props);
	    }

	  },

	  render(h) {
	    return '';
	  },

	  googleMapsReady() {
	    const options = Object.assign({}, this.$props);
	    options.map = this.$_map;
	    this.$_infoWindow = new google.maps.InfoWindow(options);
	    this.bindProps(this.$_infoWindow, boundProps$6);
	    this.redirectEvents(this.$_infoWindow, redirectedEvents$6);
	  },

	  beforeDestroy() {
	    if (this.$_infoWindow) {
	      this.$_infoWindow.setMap(null);
	    }
	  }

	};

	const boundProps$7 = ['options'];
	const redirectedEvents$7 = ['circlecomplete', 'markercomplete', 'overlaycomplete', 'polygoncomplete', 'polylinecomplete', 'rectanglecomplete'];
	var DrawingManager = {
	  name: 'GoogleMapsDrawingManager',
	  mixins: [MapElement],
	  props: {
	    drawingControl: {
	      type: Boolean,
	      default: () => true
	    },
	    drawingControlOptions: {
	      type: Object,
	      default: () => {}
	    },
	    drawingMode: {
	      type: String,
	      default: () => null
	    }
	  },
	  watch: {
	    drawingControl: 'updateOptions',
	    drawingControlOptions: 'updateOptions',
	    drawingMode: 'updateOptions'
	  },
	  methods: {
	    updateOptions() {
	      const options = {
	        drawingMode: this.drawingMode,
	        drawingControlOptions: this.drawingControlOptions
	      };
	      this.$_drawingManager && this.$_drawingManager.setOptions(options);
	    }

	  },

	  render(h) {
	    return '';
	  },

	  googleMapsReady() {
	    const options = Object.assign({}, this.$props);
	    options.map = this.$_map;
	    this.$_drawingManager = new google.maps.drawing.DrawingManager(options);
	    this.bindProps(this.$_drawingManager, boundProps$7);
	    this.redirectEvents(this.$_drawingManager, redirectedEvents$7);
	  },

	  beforeDestroy() {
	    if (this.$_drawingManager) {
	      this.$_drawingManager.setMap(null);
	    }
	  }

	};

	function registerComponents(Vue, prefix) {
	  Vue.component(`${prefix}circle`, Circle);
	  Vue.component(`${prefix}rectangle`, Rectangle);
	  Vue.component(`${prefix}geocoder`, Geocoder);
	  Vue.component(`${prefix}map`, Map);
	  Vue.component(`${prefix}marker`, Marker);
	  Vue.component(`${prefix}nearby-places`, NearbyPlaces);
	  Vue.component(`${prefix}place-details`, PlaceDetails);
	  Vue.component(`${prefix}user-position`, UserPosition);
	  Vue.component(`${prefix}polyline`, Polyline);
	  Vue.component(`${prefix}polygon`, Polygon);
	}

	const plugin = {
	  // eslint-disable-next-line no-undef
	  version: "0.1.2",

	  install(Vue, options) {
	    const finalOptions = Object.assign({}, {
	      installComponents: true,
	      componentsPrefix: 'googlemaps-'
	    }, options);
	    optionMergeStrategies(Vue);
	    initErrorHandling(Vue);

	    if (finalOptions.installComponents) {
	      registerComponents(Vue, finalOptions.componentsPrefix);
	    }

	    loader.load(finalOptions.load);
	  }

	};

	exports.Circle = Circle;
	exports.DrawingManager = DrawingManager;
	exports.Geocoder = Geocoder;
	exports.InfoWindow = InfoWindow;
	exports.Map = Map;
	exports.MapElement = MapElement;
	exports.Marker = Marker;
	exports.NearbyPlaces = NearbyPlaces;
	exports.PlaceDetails = PlaceDetails;
	exports.Polygon = Polygon;
	exports.Polyline = Polyline;
	exports.Rectangle = Rectangle;
	exports.UserPosition = UserPosition;
	exports.default = plugin;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
