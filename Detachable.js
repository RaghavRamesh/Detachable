/**
 * @typedef {Object} Detachable~returnObject
 * @property {Array<function>} handlers - list of the functions that are individually 
 * wrapped over the original handlers provided
 * @property {function} handler - function that wraps over the original function provided. Alias for handlers[0].
 * @property {function} detachAll - calling this prevents all the original hanlders from executing when they 
 * dispatch
 * @property {function} detach - calling this prevents the original handler from executing when it dispatches. 
 * Alias for detachAll().
 */

/**
 * This utility allows you to cancel the handling of a asynchronous/delayed callback, even after the 
 * invocation of the asynchronous function.
 * How it works: 
 * The utility accepts a handler/a list of handlers, and returns a thin wrapper around the original 
 * handler(s). If desired, these wrapped handlers can be detached by the handler creator, before they are 
 * dispatched. (Note: In JavaScript, handlers (callbacks) cannot be prevented from executing. This utility 
 * merely prevents the original handlers from executing when the detachable handlers dispatch).
 * Note: the simpler alternative would be to use a flag that can be set by the handler creator to indicate
 * that the handlers should prevent their default behaviour (if desired). Depending on the state of this flag, the 
 * handlers can perform their default behaviour or otherwise. 
 * The value provided by this utility class is that it aids in establishing a more elegant convention that improves
 * code readability. 
 * @param {function | Array<function>} actualHandlers - accepts a single handler or a list of handlers
 * @returns {Detachable~returnObject}
 * @constructor
 */
function Detachable(actualHandlers) {
  let _actualHandlers = [];
  
  console.assert(arguments.length === 1, 'Invalid parameter: Expected num of args: 1, Found: ['+arguments.length+']');
  console.assert(typeof actualHandlers === 'function' || Array.isArray(actualHandlers), 
                'Invalid parameter: Expected type: "function" or "Array"; Found: [' + typeof actualHandlers + ']');
  if (typeof actualHandlers === 'function') {
    _actualHandlers.push(actualHandlers);
  } else if (Array.isArray(actualHandlers)) {
    console.assert(actualHandlers.length > 0, 'Invalid parameter: Expected length of array is not > 0');
    if (actualHandlers.length > 0) {
      const isAllArrayContentsFunctions = actualHandlers.every(function(item) {
        return typeof item === 'function';
      });
      console.assert(isAllArrayContentsFunctions, 'Invalid parameter: All values of actualHandlers are not of type "function"');
      if (isAllArrayContentsFunctions) {
        _actualHandlers = actualHandlers;  
      } else {
        // log to file
        return;
      }
    } else {
      // log to file
      return;
    }
  } else {
    // log to file
    return;
  }
  
  const _wrappedHandlersBound = [];
  for (let i = 0; i < _actualHandlers.length; i++) {
    const _wrappedHandler = function() {
      if (_actualHandlers !== null) {
        _actualHandlers[i].apply(this, arguments);
      }
    }
    _wrappedHandlersBound.push(_wrappedHandler.bind(this));
  }
  
  const _detach = function() {
    _actualHandlers = null;
  }
  
  const returnObject = {};
  Object.defineProperties(returnObject, {
    'handlers': {
      get: function() {
        return _wrappedHandlersBound;
      }
    },
    'handler': {
      get: function() {
        return _wrappedHandlersBound[0];
      }
    },
    'detachAll': {
      value: _detach
    },
    'detach': {
      value: _detach
    }
  });
  return returnObject;
}

module.exports = Detachable
