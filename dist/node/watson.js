"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Watson = function Watson() {
  _classCallCheck(this, Watson);
};

exports.default = Watson;

_defineProperty(Watson, "log", function (_debug) {
  return {
    debug: function debug() {
      var _console;

      return _debug && (_console = console).log.apply(_console, arguments);
    },
    // eslint-disable-line no-console
    silly: function silly() {}
  };
});

_defineProperty(Watson, "patterns", {
  rangeSplitters: /(\bto\b|\-|\b(?:un)?till?\b|\bthrough\b|\bthru\b|\band\b|\bends?\b)/g,
  // oct, october
  months: '\\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\\b',
  // 3, 31, 31st, fifth
  days: '\\b(?:(?:(?:on )?the )(?=\\d\\d?(?:st|nd|rd|th)))?([1-2]\\d|3[0-1]|0?[1-9])(?:st|nd|rd|th)?(?:,|\\b)',
  // 2014, 1990
  // Does not recognize 1930 for example because that could be confused with a valid time.
  // Exceptions are made for years in 21st century.
  years: '\\b(20\\d{2}|\\d{2}[6-9]\\d)\\b',
  // 5/12/2014
  shortForm: /\b(0?[1-9]|1[0-2])\/([1-2]\d|3[0-1]|0?[1-9])\/?(\d{2,4})?\b/,
  // tue, tues, tuesday
  weekdaysStr: '\\b(sun|mon|tue(?:s)?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?\\b',
  relativeDateStr: '((?:next|last|this) (?:week|month|year)|tom(?:orrow)?|tmrw|tod(?:ay)?|(?:right )?now|tonight|day after (?:tom(?:orrow)?|tmrw)|yest(?:erday)?|day before yest(?:erday)?)',
  inRelativeDateStr: '(\\d{1,4}|a) (day|week|month|year)s? ?(ago|old)?',
  inRelativeTime: /\b(\d{1,2} ?|a |an )(h(?:our)?|m(?:in(?:ute)?)?)s? ?(ago|old)?\b/,
  inMilliTime: /\b(\d+) ?(s(?:ec(?:ond)?)?|ms|millisecond)s? ?(ago|old)?\b/,
  midtime: /(?:@ ?)?\b(?:at )?(dawn|morn(?:ing)?|noon|afternoon|evening|night|midnight)\b/,
  // 23:50, 0700, 1900
  internationalTime: /\b(?:(0[0-9]|1[3-9]|2[0-3]):?([0-5]\d))\b/,
  // 5, 12pm, 5:00, 5:00pm, at 5pm, @3a
  explicitTime: /(?:@ ?)?\b(?:at |from )?(1[0-2]|[1-2]?[1-9])(?::?([0-5]\d))? ?([ap]\.?m?\.?)?(?:o'clock)?\b/,
  more_than_comparator: /((?:more|greater|older|newer) than|after|before) \$(?:DATE|TIME)\$/i,
  less_than_comparator: /((?:less|fewer) than) \$(?:DATE|TIME)\$/i,
  // filler words must be preceded with a space to count
  fillerWords: / (from|is|was|at|on|for|in|due(?! date)|(?:un)?till?)\b/,
  // less aggressive filler words regex to use when rangeSplitters are disabled
  fillerWords2: / (was|is|due(?! date))\b/,

  /* eslint-enable max-len */
  // may 5, may 5th
  get monthDay() {
    var months = this.months,
        days = this.days,
        years = this.years;
    return RegExp("".concat(months, " ").concat(days, "(?: ").concat(years, ")?"));
  },

  // 5th may, 5 may
  get dayMonth() {
    var months = this.months,
        days = this.days,
        years = this.years;
    return RegExp("".concat(days, "(?: (?:day )?of)? ").concat(months, "(?: ").concat(years, ")?"));
  },

  // 5, 5th
  get daysOnly() {
    var days = this.days;
    return RegExp(days);
  },

  get digit() {
    return RegExp('\\b(' + Watson.intToWords.join('|') + ')\\b', 'g');
  },

  // today, tomorrow, day after tomorrow
  get relativeDate() {
    var relativeDateStr = this.relativeDateStr;
    return RegExp("\\b".concat(relativeDateStr, "\\b"));
  },

  // in 2 weeks
  get inRelativeDate() {
    var inRelativeDateStr = this.inRelativeDateStr;
    return RegExp("\\b".concat(inRelativeDateStr, "\\b"));
  },

  // 2 weeks from tomorrow
  get inRelativeDateFromRelativeDate() {
    var inRelativeDateStr = this.inRelativeDateStr,
        relativeDateStr = this.relativeDateStr;
    return RegExp("\\b".concat(inRelativeDateStr, " from ").concat(relativeDateStr, "\\b"));
  },

  // next Friday, thu
  get weekdays() {
    var weekdaysStr = this.weekdaysStr;
    return RegExp("(?:(next|last) (?:week (?:on )?)?)?".concat(weekdaysStr));
  },

  // oxt monday
  get oxtDays() {
    var weekdaysStr = this.weekdaysStr;
    return RegExp("(?:\\boxt|\\bweek next) ".concat(weekdaysStr));
  },

  // thursday week
  get oxtDaysUK() {
    var weekdaysStr = this.weekdaysStr;
    return RegExp("".concat(weekdaysStr, " week\\b"));
  }

});

_defineProperty(Watson, "relativeDateMatcher", function (match, time) {
  var now = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();

  switch (match) {
    case 'next week':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() + 7);
      time.hasYear = true;
      return true;

    case 'next month':
      time.setFullYear(now.getFullYear(), now.getMonth() + 1, now.getDate());
      time.hasYear = true;
      return true;

    case 'next year':
      time.setFullYear(now.getFullYear() + 1, now.getMonth(), now.getDate());
      time.hasYear = true;
      return true;

    case 'last week':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      time.hasYear = true;
      return true;

    case 'last month':
      time.setFullYear(now.getFullYear(), now.getMonth() - 1, now.getDate());
      time.hasYear = true;
      return true;

    case 'last year':
      time.setFullYear(now.getFullYear() - 1, now.getMonth(), now.getDate());
      time.hasYear = true;
      return true;

    case 'tom':
    case 'tmrw':
    case 'tomorrow':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      time.hasYear = true;
      return true;

    case 'day after tom':
    case 'day after tmrw':
    case 'day after tomorrow':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() + 2);
      time.hasYear = true;
      return true;

    case 'this week':
    case 'this month': // this week|month|year is pretty meaningless

    case 'this year': // but let's include it so that it parses as today

    case 'tod':
    case 'today':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
      time.hasYear = true;
      return true;

    case 'now':
    case 'right now':
    case 'tonight':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
      time.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0);

      if (match === 'tonight' && time.getHours() < 21) {
        time.setHours(21, 0, 0, 0); // Assume "tonight" starts at 9pm
      }

      time.hasMeridian = true;
      time.hasYear = true;
      return true;

    case 'yest':
    case 'yesterday':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      time.hasYear = true;
      return true;

    case 'day before yest':
    case 'day before yesterday':
      time.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() - 2);
      time.hasYear = true;
      return true;

    default:
      return false;
  }
});

_defineProperty(Watson, "inRelativeDateMatcher", function (num, scale, ago, time) {
  // if we matched 'a' or 'an', set the number to 1
  if (isNaN(num)) {
    num = 1;
  } else {
    num = parseInt(num, 10);
  }

  if (ago) {
    num = num * -1;
  }

  switch (scale) {
    case 'day':
      time.setDate(time.getDate() + num);
      time.hasYear = true;
      return true;

    case 'week':
      time.setDate(time.getDate() + num * 7);
      time.hasYear = true;
      return true;

    case 'month':
      time.setMonth(time.getMonth() + num);
      time.hasYear = true;
      return true;

    case 'year':
      time.setFullYear(time.getFullYear() + num);
      time.hasYear = true;
      return true;

    default:
      return false;
  }
});

_defineProperty(Watson, "changeMonth", function (month) {
  return this.monthToInt[month.substr(0, 3)];
});

_defineProperty(Watson, "changeDay", function (time, newDay, hasNext) {
  Watson.log().debug('changeDay', time, newDay, hasNext); // FIXME

  var diff = 7 - time.getDay() + newDay; // If entering "last saturday" on a Saturday, for example,
  // diff will be 0 when it should be -7

  if (diff > 7 && hasNext === undefined || hasNext === 'last') {
    diff -= 7;
  }

  if (diff >= 0 && hasNext === 'last') {
    diff -= 7;
  }

  if (hasNext === 'oxt') {
    diff += 7;
  }

  var newTime = time.getDate() + diff;
  Watson.log().debug('setDate', diff, newTime); // FIXME

  time.setDate(newTime);
});

_defineProperty(Watson, "monthDiff", function (d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth() + 1;
  return months <= 0 ? 0 : months;
});

_defineProperty(Watson, "escapeRegExp", function (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
});

_defineProperty(Watson, "isSameDay", function (date1, date2) {
  return date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getFullYear() === date2.getFullYear();
});

_defineProperty(Watson, "monthToInt", {
  'jan': 0,
  'feb': 1,
  'mar': 2,
  'apr': 3,
  'may': 4,
  'jun': 5,
  'jul': 6,
  'aug': 7,
  'sep': 8,
  'oct': 9,
  'nov': 10,
  'dec': 11 // mapping of words to numbers

});

_defineProperty(Watson, "wordsToInt", {
  'one': 1,
  'first': 1,
  'two': 2,
  'second': 2,
  'three': 3,
  'third': 3,
  'four': 4,
  'fourth': 4,
  'five': 5,
  'fifth': 5,
  'six': 6,
  'sixth': 6,
  'seven': 7,
  'seventh': 7,
  'eight': 8,
  'eighth': 8,
  'nine': 9,
  'ninth': 9,
  'ten': 10,
  'tenth': 10 // mapping of number to words

});

_defineProperty(Watson, "intToWords", ['one|first', 'two|second', 'three|third', 'four|fourth', 'five|fifth', 'six|sixth', 'seven|seventh', 'eight|eighth', 'nine|ninth', 'ten|tenth']);

_defineProperty(Watson, "strToNum", function (str) {
  return str.replace(Watson.patterns.digit, function (val) {
    var out = Watson.wordsToInt[val];

    if (val.indexOf('th', val.length - 2) !== -1) {
      out += 'th';
    } else if (val.indexOf('st', val.length - 2) !== -1) {
      out += 'st';
    } else if (val.indexOf('nd', val.length - 2) !== -1) {
      out += 'nd';
    } else if (val.indexOf('rd', val.length - 2) !== -1) {
      out += 'rd';
    }

    return out;
  });
});

_defineProperty(Watson, "numToStr", function (str) {
  return str.replace(/((?:[1-9]|10)(?:st|nd|rd|th)?)/g, function (val) {
    return '(?:' + val + '|' + Watson.intToWords[parseInt(val, 10) - 1] + ')';
  });
});