(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _sherlock = _interopRequireDefault(require("../src/sherlock"));

var _watson = _interopRequireDefault(require("../src/watson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Sherlock = new _sherlock.default();
window.Watson = _watson.default;

},{"../src/sherlock":2,"../src/watson":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _watson = _interopRequireDefault(require("./watson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sherlock =
/*#__PURE__*/
function () {
  function Sherlock() {
    _classCallCheck(this, Sherlock);

    _defineProperty(this, "nowDate", new Date());

    _defineProperty(this, "patterns", _watson.default.patterns);

    _defineProperty(this, "_config", {
      disableRanges: false,
      // FIXME
      debug: false
    });

    _defineProperty(this, "logger", _watson.default.logger(this._config.debug));
  }

  _createClass(Sherlock, [{
    key: "config",
    value: function config(newConfig) {
      console.log('Sherlock config', this._config, newConfig);

      if (_typeof(newConfig) === 'object') {
        this._config = newConfig; // FIXME

        this.logger = _watson.default.logger(this._config.debug); // FIXME
      }

      return null;
    } // Sets what time Sherlock thinks it is right now, regardless of system time.
    // Useful for debugging different times.
    // Pass a Date object to set 'now' to a time of your choosing.
    // Don't pass in anything to reset 'now' to the real time.

  }, {
    key: "_setNow",
    value: function _setNow(newDate) {
      this.nowDate = newDate;
    }
  }, {
    key: "getNow",
    value: function getNow() {
      return new Date(this.nowDate.getTime());
    }
  }, {
    key: "matchTime",
    value: function matchTime(str, time, startTime) {
      var match,
          matchConfidence = 0,
          matchedString = false,
          matchedHour,
          matchedMin,
          matchedHasMeridian;

      if (match = str.match(new RegExp(this.patterns.explicitTime.source, 'g'))) {
        // if multiple matches found, pick the best one
        match = match.sort(function (a, b) {
          var aScore = a.trim().length,
              bScore = b.trim().length; // Weight matches that include full meridian

          if (a.match(/(?:a|p).?m.?/)) {
            aScore += 20;
          }

          if (b.match(/(?:a|p).?m.?/)) {
            bScore += 20;
          }

          return bScore - aScore;
        })[0].trim();

        if (match.length <= 2 && str.trim().length > 2) {
          matchConfidence = 0;
        } else {
          matchConfidence = match.length;
          match = match.match(this.patterns.explicitTime);
          var hour = parseInt(match[1]),
              min = match[2] || 0,
              meridian = match[3];

          if (meridian) {
            // meridian is included, adjust hours accordingly
            if (meridian.indexOf('p') === 0 && hour != 12) {
              hour += 12;
            } else if (meridian.indexOf('a') === 0 && hour == 12) {
              hour = 0;
            }

            matchConfidence += 20;
          } else if (hour < 12 && (hour < 7 || hour <= time.getHours())) // meridian is not included, adjust any ambiguous times
            // if you type 3, it will default to 3pm
            // if you type 11 at 5am, it will default to am,
            // but if you type it at 2pm, it will default to pm
            {
              hour += 12;
            }

          matchedHour = hour;
          matchedMin = min;
          matchedHasMeridian = !!meridian;
          matchedString = match[0];
        }
      }

      var useLowConfidenceMatchedTime = function useLowConfidenceMatchedTime() {
        if (matchedString) {
          time.setHours(matchedHour, matchedMin, 0);
          time.hasMeridian = matchedHasMeridian;
        }

        return matchedString;
      };

      if (matchConfidence < 4) {
        if (match = str.match(this.patterns.inRelativeTime)) {
          // if we matched 'a' or 'an', set the number to 1
          if (isNaN(match[1])) {
            match[1] = 1;
          }

          if (match[3]) {
            match[1] = parseInt(match[1]) * -1;
          }

          switch (match[2].substring(0, 1)) {
            case 'h':
              time.setHours(time.getHours() + parseInt(match[1]));
              return match[0];

            case 'm':
              time.setMinutes(time.getMinutes() + parseInt(match[1]));
              return match[0];

            default:
              return useLowConfidenceMatchedTime();
          }
        } else if (match = str.match(this.patterns.inMilliTime)) {
          if (match[3]) {
            match[1] = parseInt(match[1]) * -1;
          }

          switch (match[2].substring(0, 1)) {
            case 's':
              time.setSeconds(time.getSeconds() + parseInt(match[1]));
              return match[0];

            case 'm':
              time.setMilliseconds(time.getMilliseconds() + parseInt(match[1]));
              return match[0];

            default:
              return useLowConfidenceMatchedTime();
          }
        } else if (match = str.match(this.patterns.midtime)) {
          switch (match[1]) {
            case 'dawn':
              time.setHours(5, 0, 0);
              time.hasMeridian = true;
              return match[0];

            case 'morn':
            case 'morning':
              time.setHours(8, 0, 0);
              time.hasMeridian = true;
              return match[0];

            case 'noon':
              time.setHours(12, 0, 0);
              time.hasMeridian = true;
              return match[0];

            case 'afternoon':
              time.setHours(14, 0, 0);
              time.hasMeridian = true;
              return match[0];

            case 'evening':
              time.setHours(19, 0, 0);
              time.hasMeridian = true;
              return match[0];

            case 'night':
              time.setHours(21, 0, 0);
              time.hasMeridian = true;
              return match[0];

            case 'midnight':
              time.setHours(0, 0, 0);
              time.hasMeridian = true;
              return match[0];

            default:
              return useLowConfidenceMatchedTime();
          }
        } else if (match = str.match(this.patterns.internationalTime)) {
          time.setHours(match[1], match[2], 0);
          time.hasMeridian = true;
          return match[0];
        } else {
          return useLowConfidenceMatchedTime();
        }
      } else {
        return useLowConfidenceMatchedTime();
      }
    }
  }, {
    key: "matchDate",
    value: function matchDate(str, time, startTime) {
      this.logger.debug('matchDate', time, str);
      var match;

      if (match = str.match(this.patterns.monthDay)) {
        if (match[3]) {
          time.setFullYear(match[3], _watson.default.changeMonth(match[1]), match[2]);
          time.hasYear = true;
        } else {
          time.setMonth(_watson.default.changeMonth(match[1]), match[2]);
        }

        return match[0];
      } else if (match = str.match(this.patterns.dayMonth)) {
        if (match[3]) {
          time.setFullYear(match[3], _watson.default.changeMonth(match[2]), match[1]);
          time.hasYear = true;
        } else {
          time.setMonth(_watson.default.changeMonth(match[2]), match[1]);
        }

        return match[0];
      } else if (match = str.match(this.patterns.shortForm)) {
        var yearStr = match[3],
            year = null;

        if (yearStr) {
          year = parseInt(yearStr);
        }

        if (year && yearStr.length < 4) // if only 2 digits are given, assume years above 50 are in the 20th century, otherwise 21st century
          {
            year += year > 50 ? 1900 : 2000;
          }

        if (year) {
          time.setFullYear(year, match[1] - 1, match[2]);
          time.hasYear = true;
        } else {
          time.setMonth(match[1] - 1, match[2]);
        }

        return match[0];
      } else if (match = str.match(this.patterns.oxtDays) || str.match(this.patterns.oxtDaysUK)) {
        this.logger.debug('HERE!', this.patterns.oxtDays, time, match);

        switch (match[1].substr(0, 3)) {
          case 'sun':
            _watson.default.changeDay(time, 0, 'oxt');

            return match[0];

          case 'mon':
            _watson.default.changeDay(time, 1, 'oxt');

            return match[0];

          case 'tue':
            _watson.default.changeDay(time, 2, 'oxt');

            return match[0];

          case 'wed':
            _watson.default.changeDay(time, 3, 'oxt');

            return match[0];

          case 'thu':
            _watson.default.changeDay(time, 4, 'oxt');

            return match[0];

          case 'fri':
            _watson.default.changeDay(time, 5, 'oxt');

            return match[0];

          case 'sat':
            _watson.default.changeDay(time, 6, 'oxt');

            return match[0];

          default:
            return false;
        }
      } else if (match = str.match(this.patterns.weekdays)) {
        switch (match[2].substr(0, 3)) {
          case 'sun':
            _watson.default.changeDay(time, 0, match[1]);

            return match[0];

          case 'mon':
            _watson.default.changeDay(time, 1, match[1]);

            return match[0];

          case 'tue':
            _watson.default.changeDay(time, 2, match[1]);

            return match[0];

          case 'wed':
            _watson.default.changeDay(time, 3, match[1]);

            return match[0];

          case 'thu':
            _watson.default.changeDay(time, 4, match[1]);

            return match[0];

          case 'fri':
            _watson.default.changeDay(time, 5, match[1]);

            return match[0];

          case 'sat':
            _watson.default.changeDay(time, 6, match[1]);

            return match[0];

          default:
            return false;
        }
      } else if (match = str.match(this.patterns.inRelativeDateFromRelativeDate)) {
        if (_watson.default.relativeDateMatcher(match[4], time, this.getNow()) && _watson.default.inRelativeDateMatcher(match[1], match[2], match[3], time)) {
          return match[0];
        }

        return false;
      } else if (match = str.match(this.patterns.relativeDate)) {
        if (_watson.default.relativeDateMatcher(match[1], time, this.getNow())) {
          return match[0];
        }

        return false;
      } else if (match = str.match(this.patterns.inRelativeDate)) {
        if (_watson.default.inRelativeDateMatcher(match[1], match[2], match[3], time)) {
          return match[0];
        }

        return false;
      } else if (match = str.match(new RegExp(this.patterns.days, 'g'))) {
        // if multiple matches found, pick the best one
        match = match.sort(function (a, b) {
          return b.trim().length - a.trim().length;
        })[0].trim(); // check if the possible date match meets our reasonable assumptions...
        // if the match doesn't start with 'on',

        if (match.indexOf('on') !== 0 && // and if the match doesn't start with 'the' and end with a comma,
        !(match.indexOf('the') === 0 && match.indexOf(',', match.length - 1) !== -1) && // and if the match isn't at the end of the overall input, then drop it.
        str.indexOf(match, str.length - match.length - 1) === -1 || // But if one of those is true, make sure it passes these other checks too...
        // if this is an end date and the start date isn't an all day value,
        !(startTime && startTime.isAllDay) && // and if this match is too short to mean something,
        match.length <= 2) // then drop it.
          {
            return false;
          }

        match = match.match(this.patterns.daysOnly);
        var month = time.getMonth(),
            day = match[1]; // if this date is in the past, move it to next month

        if (day < time.getDate()) {
          month++;
        }

        time.setMonth(month, day);
        return match[0];
      } else {
        return false;
      }
    } // Make some intelligent assumptions of what was meant, even when given incomplete information

  }, {
    key: "makeAdjustments",
    value: function makeAdjustments(start, end, isAllDay, str, ret) {
      var now = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.getNow();

      if (end) {
        if (start > end && end > now && _watson.default.isSameDay(start, end) && _watson.default.isSameDay(start, now)) {
          if (start.hasMeridian) // we explicitly set the meridian, so don't mess with the hours
            {
              start.setDate(start.getDate() - 1);
            } else {
            // we are dealing with a time range that is today with start > end
            // (ie. 9pm - 5pm when we want 9am - 5pm), roll back 12 hours.
            start.setHours(start.getHours() - 12); // if start is still higher than end, that means we probably have
            // 9am - 5am, so roll back another 12 hours to get 9pm yesterday - 5am today

            if (start > end) {
              start.setHours(start.getHours() - 12);
            }
          }
        } else if (start > end) {
          end.setDate(start.getDate() + 1);
        } else if (end < now && str.indexOf(' was ') === -1 && _watson.default.monthDiff(end, now) >= 3 && !end.hasYear && !start.hasYear) {
          end.setFullYear(end.getFullYear() + 1);
          start.setFullYear(start.getFullYear() + 1);
        }
      } else if (start) {
        this.logger.debug('makeAdjustments to "start"', start, now);

        if (start <= now && !start.hasYear && !str.match(/was|ago|old\b/)) {
          if (_watson.default.isSameDay(start, now) && !isAllDay) {
            if (start.hasMeridian || start.getHours() < 19) // either we explicitly set the meridian or the time
              // is less than 7pm, so don't mess with the hours
              {
                start.setDate(start.getDate() + 1);
              } else {
              start.setHours(start.getHours() + 12); // if start is still older than now, roll forward a day instead

              if (start <= now) {
                start.setHours(start.getHours() - 12);
                start.setDate(start.getDate() + 1);
              }
            }
          } else if (_watson.default.monthDiff(start, now) >= 3) {
            start.setFullYear(start.getFullYear() + 1);
          }
        } // check for open ranges (more than...)


        if (ret.eventTitle.match(this.patterns.more_than_comparator)) {
          if (start <= now && (!_watson.default.isSameDay(start, now) || str.match(/ago|old\b/)) && !ret.eventTitle.match(/after|newer/i) || ret.eventTitle.match(/older|before/i)) {
            ret.endDate = new Date(start.getTime());
            ret.startDate = new Date(1900, 0, 1, 0, 0, 0, 0);
          } else {
            ret.endDate = new Date(3000, 0, 1, 0, 0, 0, 0);
          }

          ret.eventTitle = ret.eventTitle.replace(this.patterns.more_than_comparator, '');
        } // check for closed ranges (less than...)
        else if (ret.eventTitle.match(this.patterns.less_than_comparator)) {
            if (start <= now) {
              if (_watson.default.isSameDay(start, now) && !str.match(/ago|old\b/)) {
                // make an exception for "less than today" or "less than now"
                ret.endDate = new Date(start.getTime());
                ret.startDate = new Date(1900, 0, 1, 0, 0, 0, 0);
              } else {
                ret.endDate = new Date(now.getTime());
              }
            } else {
              ret.endDate = new Date(start.getTime());
              ret.startDate = new Date(now.getTime());
            }

            ret.eventTitle = ret.eventTitle.replace(this.patterns.less_than_comparator, '');
          }
      }

      this.logger.debug('end making adjustments', ret);
    }
  }, {
    key: "parser",
    value: function parser(str, time, startTime) {
      var ret = {},
          dateMatch = false,
          timeMatch = false,
          strNummed = _watson.default.strToNum(str);

      this.logger.debug('time before', time); // parse date

      if (dateMatch = this.matchDate(strNummed, time, startTime)) {
        strNummed = strNummed.replace(new RegExp(dateMatch), '');
        str = str.replace(new RegExp(_watson.default.numToStr(dateMatch)), '$DATE$');
      }

      this.logger.debug('time after', time); // parse time

      if (timeMatch = this.matchTime(strNummed, time, startTime)) {
        str = str.replace(new RegExp(_watson.default.numToStr(timeMatch)), '$TIME$');
      }

      ret.eventTitle = str; // if time data not given, then this is an all day event

      ret.isAllDay = !!(dateMatch && !timeMatch && !dateMatch.match(/^(?:right )?now$|^tonight$/)); // check if date was parsed

      ret.isValidDate = !!(dateMatch || timeMatch);
      return ret;
    } // parses a string and returns an object defining the basic event
    // with properties: eventTitle, startDate, endDate, isAllDay
    // plus anything Watson adds on...

  }, {
    key: "parse",
    value: function parse(input) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // FIXME config?
      this.logger.debug('parse', input, opts); // check for null input

      if (input === null) input = '';
      var date = this.getNow(); // Check if Watson is around. If not, pretend like he is to keep Sherlock company.

      var result; // = (typeof Watson !== 'undefined') ? Watson.preprocess(str) : [str, {}],
      // FIXME
      // const str = input || '';

      var str = input; // result[0]

      var ret = {}; // result[1]
      // token the string to start and stop times

      var tokens = opts.disableRanges ? [str.toLowerCase()] : str.toLowerCase().split(this.patterns.rangeSplitters);
      this.patterns.rangeSplitters.lastIndex = 0; // normalize all dates to 0 milliseconds

      date.setMilliseconds(0);

      while (!ret.startDate) {
        // parse the start date
        if ((result = this.parser(tokens[0], date, null)) !== null) {
          this.logger.debug('parser result', result, date);

          if (result.isAllDay) // set to midnight
            {
              date.setHours(0, 0, 0);
            }

          ret.isAllDay = result.isAllDay;
          ret.eventTitle = result.eventTitle;
          ret.startDate = result.isValidDate ? date : null;
        } // if no time


        if (!ret.startDate && tokens.length >= 3) {
          // join the next 2 tokens to the current one
          var tokensTmp = [tokens[0] + tokens[1] + tokens[2]];

          for (var k = 3; k < tokens.length; k++) {
            tokensTmp.push(tokens[k]);
          }

          tokens = tokensTmp;
        } else {
          break;
        }
      } // parse the 2nd half of the date range, if it exists


      while (!ret.endDate) {
        if (tokens.length > 1) {
          date = new Date(date.getTime()); // parse the end date

          if ((result = this.parser(tokens[2], date, ret)) !== null) {
            if (ret.isAllDay) // set to midnight
              {
                date.setHours(0, 0, 0);
              }

            if (result.eventTitle.replace(/\$(?:DATE|TIME)\$/g, '').length > ret.eventTitle.replace(/\$(?:DATE|TIME)\$/g, '').length) {
              ret.eventTitle = result.eventTitle;
            }

            ret.endDate = result.isValidDate ? date : null;
          }
        }

        if (!ret.endDate) {
          if (tokens.length >= 4) {
            // join the next 2 tokens to the current one
            var tokensTmp = [tokens[0], tokens[1], tokens[2] + tokens[3] + tokens[4]];

            for (var k = 5; k < tokens.length; k++) {
              tokensTmp.push(tokens[k]);
            }

            tokens = tokensTmp;
          } else {
            ret.endDate = null;
            break;
          }
        }
      }

      this.makeAdjustments(ret.startDate, ret.endDate, ret.isAllDay, str, ret); // get capitalized version of title

      if (ret.eventTitle) {
        ret.eventTitle = ret.eventTitle.replace(/\$(?:DATE|TIME)\$/g, '');
        var fillerWords = opts.disableRanges ? this.patterns.fillerWords2 : this.patterns.fillerWords;
        ret.eventTitle = ret.eventTitle.split(fillerWords)[0].trim();
        ret.eventTitle = ret.eventTitle.replace(/(?:^| )(?:\.|-$|by$|in$|at$|from$|on$|starts?$|for$|(?:un)?till?$|!|,|;)+/g, '').replace(/ +/g, ' ').trim();
        var match = str.match(new RegExp(_watson.default.escapeRegExp(ret.eventTitle), 'i'));

        if (match) {
          ret.eventTitle = match[0].replace(/ +/g, ' ').trim(); // replace multiple spaces

          if (ret.eventTitle == '') {
            ret.eventTitle = null;
          }
        }
      } else {
        ret.eventTitle = null;
      } // if (typeof Watson !== 'undefined') {Watson.postprocess(ret)}


      return ret;
    }
  }]);

  return Sherlock;
}();

exports.default = Sherlock;

},{"./watson":3}],3:[function(require,module,exports){
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

_defineProperty(Watson, "logger", function (_debug) {
  console.log('Watson logger', _debug);
  return {
    debug: function debug() {
      var _console;

      return _debug && (_console = console).log.apply(_console, arguments);
    } // eslint-disable-line no-console

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
  Watson.logger().debug('changeDay', time, newDay, hasNext); // FIXME

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
  Watson.logger().debug('setDate', diff, newTime); // FIXME

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

},{}]},{},[1]);
