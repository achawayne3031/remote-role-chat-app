export const getLastMessage = (email, data) => {
  var lastMessage = "";

  for (let index = data.length; index > 1; index--) {
    const element = data[index - 1];
    if (element.to == email) {
      lastMessage = element?.message?.substring(0, 21) + "...";
      break;
    }
  }

  return lastMessage;
};

export const getFirstLetter = (name) => {
  if (name != undefined && name != "") {
    let separatedName = name.split(" ");
    let firstLetter = separatedName[0].charAt(0);
    let secondeLetter =
      separatedName[1] != undefined ? separatedName[1].charAt(0) : "";
    let abb = firstLetter + secondeLetter;
    return abb.toUpperCase();
  }
};

export const filterArray = (expression, data) => {
  var regex = convertWildcardStringToRegExp(expression);

  return data.filter(function (item) {
    return regex.test(item.email) || regex.test(item.phone);
  });
};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function convertWildcardStringToRegExp(expression) {
  var terms = expression.split("*");

  var trailingWildcard = false;

  var expr = "";
  for (var i = 0; i < terms.length; i++) {
    if (terms[i]) {
      if (i > 0 && terms[i - 1]) {
        expr += ".*";
      }
      trailingWildcard = false;
      expr += escapeRegExp(terms[i]);
    } else {
      trailingWildcard = true;
      expr += ".*";
    }
  }

  if (!trailingWildcard) {
    expr += ".*";
  }

  return new RegExp("^" + expr + "$", "i");
}
