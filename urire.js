/*jslint node: true, regexp: true, indent: 2 */

module.exports = {
  parse: function (string) {
    "use strict";
    var regex, i, urlparts = {};

    function countChars(string, split) {
      string = string.split(split);
      if (typeof string === 'object') {
        return string.length - 1;
      }
      return 0;
    }
    regex = /(([a-z]{3,}:\/\/\/?)?([\.:\/?&]+)?([^\.:\/?&]+)?)/gm;
    urlparts.regex = string.match(regex);
    urlparts.clean = {
      'protocol': '',
      'domain': '',
      'port': '',
      'path': '',
      'fileextension': '',
      'query': '',
      'fragment': ''
    };

    for (i = 0; i < urlparts.regex.length; i += 1) {
      if (countChars(urlparts.regex[i], '://') === 1) {
        urlparts.clean.protocol = urlparts.regex[i] === undefined ? false : urlparts.regex[i].split('://')[0];
        urlparts.clean.domain = urlparts.regex[i] === undefined ? false : urlparts.regex[i].split('://')[1];
      } else if ((countChars(urlparts.regex[i], '/') === 0) && (countChars(urlparts.regex[i], ':') === 0) && (urlparts.clean.path === '')) {
        urlparts.clean.domain += urlparts.regex[i] === undefined ? false : urlparts.regex[i];
      } else if ((countChars(urlparts.regex[i], ':') === 1) && (urlparts.clean.path === '')) {
        urlparts.clean.port = urlparts.regex[i] === undefined ? false : urlparts.regex[i].split(':')[1];
      } else if ((countChars(urlparts.regex[i], '?') === 0) && (countChars(urlparts.regex[i], '&') === 0) && (urlparts.clean.query === '')) {
        if (urlparts.regex[i].substr(0, 1) === ':') {
          urlparts.regex[i] = urlparts.regex[i].substr(1);
        }
        if (countChars(urlparts.regex[i], '#') === 0) {
          urlparts.clean.path += urlparts.regex[i] === undefined ? false : urlparts.regex[i];
        } else {
          urlparts.clean.path += urlparts.regex[i] === undefined ? false : urlparts.regex[i].split('#', 2)[0];
          urlparts.clean.fragment += urlparts.regex[i] === undefined ? false : urlparts.regex[i].split('#', 2)[1];
        }
      } else {
        if (countChars(urlparts.regex[i], '#') === 0) {
          urlparts.clean.query += urlparts.regex[i] === undefined ? false : urlparts.regex[i];
        } else {
          urlparts.clean.query += urlparts.regex[i] === undefined ? false : urlparts.regex[i].split('#', 2)[0];
          urlparts.clean.fragment += urlparts.regex[i] === undefined ? false : urlparts.regex[i].split('#', 2)[1];
        }
      }
    }

    if (urlparts.clean.path.indexOf(".") !== -1) {
      urlparts.clean.fileextension = urlparts.clean.path.split('.')[urlparts.clean.path.split('.').length - 1];
    }
    return urlparts.clean;
  }
};
