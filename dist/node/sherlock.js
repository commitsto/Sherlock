"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _watson = _interopRequireDefault(require("./watson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sherlock =
/*#__PURE__*/
function () {
  function Sherlock() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$config = _ref.config,
        config = _ref$config === void 0 ? {} : _ref$config;

    _classCallCheck(this, Sherlock);

    this.config(config);
    this.logger.debug('new Sherlock!', this);
  }

  _createClass(Sherlock, [{
    key: "config",
    value: function config(newConfig) {
      if (_typeof(newConfig) === 'object') {
        var _newConfig$currentTim = newConfig.currentTime,
            currentTime = _newConfig$currentTim === void 0 ? new Date() : _newConfig$currentTim,
            _newConfig$debug = newConfig.debug,
            debug = _newConfig$debug === void 0 ? false : _newConfig$debug,
            _newConfig$disableRan = newConfig.disableRanges,
            disableRanges = _newConfig$disableRan === void 0 ? false : _newConfig$disableRan,
            _newConfig$patterns = newConfig.patterns,
            patterns = _newConfig$patterns === void 0 ? {} : _newConfig$patterns;
        this._config = _objectSpread({}, this._config, {
          currentTime: currentTime,
          debug: debug,
          disableRanges: disableRanges,
          // FIXME implement this
          logger: _watson.default.log(debug),
          patterns: Object.keys(patterns).length !== 0 ? patterns : _watson.default.patterns
        });
        this.logger = this._config.logger; // FIXME
      }

      this.logger.debug('Sherlock config', this._config);
      return this._config;
    } // Shortcut to sets what time Sherlock thinks it is right now,
    // regardless of system time. Useful for debugging different times.
    // Pass a Date object to set 'now' to a time of your choosing.
    // Don't pass in anything to reset 'now' to the real time.

  }, {
    key: "_setNow",
    value: function _setNow(newDate) {
      this._config.currentTime = newDate;
    }
  }, {
    key: "getNow",
    value: function getNow() {
      return new Date(this._config.currentTime.getTime());
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
      var patterns = this._config.patterns;

      if (match = str.match(new RegExp(patterns.explicitTime.source, 'g'))) {
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
          match = match.match(patterns.explicitTime);
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
        if (match = str.match(patterns.inRelativeTime)) {
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
        } else if (match = str.match(patterns.inMilliTime)) {
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
        } else if (match = str.match(patterns.midtime)) {
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
        } else if (match = str.match(patterns.internationalTime)) {
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
      var patterns = this._config.patterns;
      var match;

      if (match = str.match(patterns.monthDay)) {
        if (match[3]) {
          time.setFullYear(match[3], _watson.default.changeMonth(match[1]), match[2]);
          time.hasYear = true;
        } else {
          time.setMonth(_watson.default.changeMonth(match[1]), match[2]);
        }

        return match[0];
      } else if (match = str.match(patterns.dayMonth)) {
        if (match[3]) {
          time.setFullYear(match[3], _watson.default.changeMonth(match[2]), match[1]);
          time.hasYear = true;
        } else {
          time.setMonth(_watson.default.changeMonth(match[2]), match[1]);
        }

        return match[0];
      } else if (match = str.match(patterns.shortForm)) {
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
      } else if (match = str.match(patterns.oxtDays) || str.match(patterns.oxtDaysUK)) {
        this.logger.debug('HERE!', patterns.oxtDays, time, match);

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
      } else if (match = str.match(patterns.weekdays)) {
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
      } else if (match = str.match(patterns.inRelativeDateFromRelativeDate)) {
        if (_watson.default.relativeDateMatcher(match[4], time, this.getNow()) && _watson.default.inRelativeDateMatcher(match[1], match[2], match[3], time)) {
          return match[0];
        }

        return false;
      } else if (match = str.match(patterns.relativeDate)) {
        if (_watson.default.relativeDateMatcher(match[1], time, this.getNow())) {
          return match[0];
        }

        return false;
      } else if (match = str.match(patterns.inRelativeDate)) {
        if (_watson.default.inRelativeDateMatcher(match[1], match[2], match[3], time)) {
          return match[0];
        }

        return false;
      } else if (match = str.match(new RegExp(patterns.days, 'g'))) {
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

        match = match.match(patterns.daysOnly);
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
      var patterns = this._config.patterns;

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


        if (ret.eventTitle.match(patterns.more_than_comparator)) {
          if (start <= now && (!_watson.default.isSameDay(start, now) || str.match(/ago|old\b/)) && !ret.eventTitle.match(/after|newer/i) || ret.eventTitle.match(/older|before/i)) {
            ret.endDate = new Date(start.getTime());
            ret.startDate = new Date(1900, 0, 1, 0, 0, 0, 0);
          } else {
            ret.endDate = new Date(3000, 0, 1, 0, 0, 0, 0);
          }

          ret.eventTitle = ret.eventTitle.replace(patterns.more_than_comparator, '');
        } // check for closed ranges (less than...)
        else if (ret.eventTitle.match(patterns.less_than_comparator)) {
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

            ret.eventTitle = ret.eventTitle.replace(patterns.less_than_comparator, '');
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
      var patterns = this._config.patterns;
      this.logger.debug('parse', input, opts); // check for null input

      if (input === null) input = '';
      var date = this.getNow(); // Check if Watson is around. If not, pretend like he is to keep Sherlock company.

      var result; // = (typeof Watson !== 'undefined') ? Watson.preprocess(str) : [str, {}],
      // FIXME
      // const str = input || '';

      var str = input; // result[0]

      var ret = {}; // result[1]
      // token the string to start and stop times

      var tokens = opts.disableRanges ? [str.toLowerCase()] : str.toLowerCase().split(patterns.rangeSplitters);
      patterns.rangeSplitters.lastIndex = 0; // normalize all dates to 0 milliseconds

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
        var fillerWords = opts.disableRanges ? patterns.fillerWords2 : patterns.fillerWords;
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