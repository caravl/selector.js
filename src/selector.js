var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // YOUR CODE HERE

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  if (selector[0] == '#') {
    return 'id';
  } else if (selector[0] === '.') {
    return 'class';
  } else if (selector.indexOf('.', 1) !== -1) {
    return 'tag.class';
  } else {
    return 'tag';
  }
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function(element) {
      if (element.id === selector.slice(1)) {
        return true;
      } else {
        return false;
      }
    }

  } else if (selectorType === "class") {
    matchFunction = function(element) {
      var arr = element.className.split(' ');
      var found = false;
      arr.forEach(function(el) {
        if (el === selector.slice(1)) {
          found = true;
        }
      })
      return found;

    }

  } else if (selectorType === "tag.class") {
    matchFunction = function(element) {
      var arr = element.className.split(' ');
      var found = false;
      var first = selector.split('.')[0] // img
      var second = selector.split('.')[1] // thumbnail
      arr.forEach(function(el) {
        if (el === second) {
          found = true;
        }
      });
      if ((element.tagName.toLowerCase() === first) && (found === true)) {
        return true;
      } else {
        return false;
      }
    }

  } else if (selectorType === "tag") {
    matchFunction = function(element) {
      if (element.tagName.toLowerCase() == selector) {

        return true;
      } else {
        return false;
      }
    }

  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
