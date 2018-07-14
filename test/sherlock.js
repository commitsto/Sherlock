// var debug = true; FIXME where is this used?

// Run Sherlock from all of these reference dates in order to cover possible edge cases
var dates = [
  new Date("Dec 03, 2012 04:35:00"),
  new Date("Feb 02, 2013 04:01:00"),
  new Date("Jan 29, 2013 00:01:00"),
  new Date("June 30, 2013 14:01:00"),
  new Date("Jan 31, 2013 04:01:00"),
  new Date("Feb 27, 2013 04:01:00"),
  new Date("Feb 24, 2013 04:01:00"),
  new Date("Feb 24, 2013 15:01:00"),
  new Date("March 3, 2013 12:01:00"),
  new Date("March 3, 2013 14:01:00"),
  new Date("October 27, 2018 22:34:40"),
  (function() { var d = new Date(); d.setHours(0, 0, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(0, 1, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(2, 0, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(6, 0, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(12, 0, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(14, 0, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(15, 0, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(16, 10, 0); return d; })(),
  (function() { var d = new Date(); d.setHours(23, 30, 0); return d; })(),
  new Date()
], i = 0;

// Get the date that's currently being tested
function getNow() {
  if (i < dates.length)
    return new Date(dates[i].getTime());
  else
    return new Date();
}

// Sherlock's method for finding the number of months between 2 dates.
// Used for making assumptions about what a user means when year is ambiguous
function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth() + 1;
  return months <= 0 ? 0 : months;
}

// Run each test with each date from dates array
function runTestCases() {
  return [

    (function() {

      var now = getNow(),
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15);

      return test("Meeting today at 15", "Meeting", start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 1, 24, 15, 0),
        end   = new Date(now.getFullYear(), 2, 3, 14, 0);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("February 24 at 3pm - 2pm March 3", null, start, end, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 1, 24, 15),
        end   = new Date(now.getFullYear(), 2, 3, 14);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("February 24 at 3pm-2pm March 3", null, start, end, false);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 7*4);
      start.setHours(0, 0, 0, 0);

      return test("Vacation is in 4 weeks...", "Vacation", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 7*3 + 1);
      start.setHours(0, 0, 0, 0);

      return test("The exam is in three weeks from tomorrow.", "The exam", start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(getNow().getFullYear(), 11, 25);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("Christmas is on December 25th.", "Christmas", start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 1 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(15, 0, 0, 0);

      return test("Homework 5 due monday at 3pm", "Homework 5", start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 5 + 7 - start.getDay());
      start.setHours(15, 0, 0, 0);

      return test("Homework 5 due next fri@3pm", "Homework 5", start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = getNow();

      start.setDate(3);
      start.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (start < now)
        start.setMonth(start.getMonth() + 1);

      return test("Let's have lunch on the 3rd.", "Let's have lunch", start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 0, 12),
        end   = new Date(now.getFullYear(), 0, 29);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("The retreat is from Jan 12 - 29.", "The retreat", start, end, true);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      return test("Bake a cake tomorrow.", "Bake a cake", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      return test("Bake a cake tom.", "Bake a cake", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      return test("Bake a cake tmrw.", "Bake a cake", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);

      return test("Use Tabule today!", "Use Tabule", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);

      return test("Use Tabule tod!", "Use Tabule", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);

      return test("Eat more kale this week", "Eat more kale", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);

      return test("Eat more kale this month", "Eat more kale", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);

      return test("Eat more kale this year", "Eat more kale", start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 6, 4);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("fourth of jul", null, start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 6, 4, 14);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("fourth of july @ 2", null, start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 6, 4, 12);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("The koala will be set free on the fourth of july @noon", "The koala will be set free", start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 14)
        start.setDate(start.getDate() + 1);
      start.setHours(14, 0, 0, 0);

      return test("@2", null, start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = getNow();

      start.setDate(15);
      start.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (start < now)
        start.setMonth(start.getMonth() + 1);

      return test("the 15th.", null, start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 6, 4);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("fourth of july at midnight", null, start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 6, 1),
        end   = new Date(now.getFullYear(), 7, 5);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("first of july through 5th of aug", null, start, end, true);
    })(),

    (function() {
      var now = getNow(),
        start = getNow();

      start.setDate(27);
      start.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (start < now)
        start.setMonth(start.getMonth() + 1);

      return test("My mom's birthday is on the 27th", "My mom's birthday", start, null, true);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 1);
      start.setHours(15, 0, 0, 0);
      end.setHours(17, 0, 0, 0);

      return test("The party is tomorrow from 3pm to 5pm.", "The party", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setHours(14, 0, 0, 0);
      end.setHours(19, 0, 0, 0);

      return test("The exam is @ 2pm and lasts for five hours", "The exam", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setHours(14, 0, 0, 0);
      end.setHours(16, 0, 0, 0);

      return test("The exam is @ 2pm and goes until 4pm", "The exam", start, end, false);
    })(),

    (function() {
      var start = getNow(),
        diff = 0 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("sunday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 1 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("monday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 2 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("tuesday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
          diff1 = 4 + 7 - start.getDay();
      if (diff1 > 7) diff1 -= 7;
      start.setDate(start.getDate() + diff1);
      start.setHours(0, 0, 0, 0);

      var end   = new Date(start),
          diff2 = 6 + 7 - end.getDay();
      end.setDate(end.getDate() + diff2);

      return test("thurs - next sat", null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
          diff1 = 4 + 7 - start.getDay();
      if (diff1 > 7) diff1 -= 7;
      start.setDate(start.getDate() + diff1);
      start.setHours(0, 0, 0, 0);

      var end   = new Date(start),
          diff2 = 6 + 7 - end.getDay();
      end.setDate(end.getDate() + diff2);

      return test("thu - next sat", null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
          diff1 = 4 + 7 - start.getDay();
      if (diff1 > 7) diff1 -= 7;
      start.setDate(start.getDate() + diff1);
      start.setHours(0, 0, 0, 0);

      var end   = new Date(start),
          diff2 = 6 + 7 - end.getDay();
      end.setDate(end.getDate() + diff2);

      return test("thur - next sat", null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 3 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("wednesday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 3 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("wed", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 4 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("thursday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 6 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("saturday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 3 + 7 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("next wednesday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 0 + 7 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(16, 0, 0, 0);

      return test("next week on sunday at 4", null, start, null, false);
    })(),

    (function() {
      var start = getNow(),
        diff = 5 + 7 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("next week friday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 3 + 14 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("oxt wednesday", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 4 + 14 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("thu week", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        diff = 6 + 14 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      return test("week next sat", null, start, null, true);
    })(),

    (function() {
      var now   = getNow(),
          start = getNow(),
          end   = getNow();

      start.setDate(5);
      end.setDate(9);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (end < now) {
        end.setMonth(end.getMonth() + 1);
        start.setMonth(start.getMonth() + 1);
      }

      return test("on the 5th to the ninth, we shall eat.", "we shall eat.", start, end, true);
    })(),

    (function() {
      var now   = getNow(),
          start = new Date(now.getFullYear(), 1, 12),
          end   = new Date(now.getFullYear(), 1, 15);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("The conference is from Feb 12 to 15th.", "The conference", start, end, true);
    })(),

    (function() {
      var now   = getNow(),
          start = new Date(now.getFullYear(), 1, 12, 15),
          end   = new Date(now.getFullYear(), 1, 15, 15);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("The conference is from Feb 12 at 3pm to the 15th.", "The conference", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setHours(1, 0, 0, 0);
      end.setHours(18, 0, 0, 0);

      return test("I work from 1am - 6pm.", "I work", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setHours(18, 0, 0, 0);
      end.setHours(1, 0, 0, 0);

      if (end < getNow())
        end.setDate(end.getDate() + 1);
      else
        start.setDate(start.getDate() - 1);

      return test("I work from 6pm - 1am.", "I work", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setDate(start.getDate() - 1);
      start.setHours(23, 0, 0, 0);
      end.setHours(22, 0, 0, 0);

      if (end < getNow()) {
        end.setDate(end.getDate() + 1);
        start.setDate(start.getDate() + 1);
      }

      return test("I work from 11pm - 10pm today.", "I work", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setDate(start.getDate() - 1);
      start.setHours(18, 0, 0, 0);
      end.setHours(1, 0, 0, 0);

      if (end < getNow()) {
        end.setDate(end.getDate() + 1);
        start.setDate(start.getDate() + 1);
      }

      return test("I work from 6pm - 1am today.", "I work", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setHours(18, 0, 0, 0);
      end.setHours(1, 0, 0, 0);
      end.setDate(end.getDate() + 1);

      return test("I work from 6pm - 1am tomorrow.", "I work", start, end, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      start.setHours(18, 0, 0, 0);
      end.setHours(6, 0, 0, 0);
      end.setDate(end.getDate() + 1);

      return test("I work from 6pm - 6am tomorrow.", "I work", start, end, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 3);

      now.setHours(0, 0, 0, 0);
      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("12/3", null, start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 3, 15);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("12/3 @ 3", null, start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 3, 15);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("12/3 @3pm", null, start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 3, 15);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("12/3@3pm", null, start, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 3);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("12/03", null, start, null, true);
    })(),

    (function() {
      return test("12.03", "12.03", null, null, false);
    })(),

    (function() {
      return test("12.3", "12.3", null, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 23);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("12/23", null, start, null, true);
    })(),

    (function() {
      return test("12.12", "12.12", null, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 8, 1);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("9/1", null, start, null, true);
    })(),

    (function() {
      return test("9/0", "9/0", null, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 8, 19);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("9/19", null, start, null, true);
    })(),

    (function() {
      return test("10/90", "10/90", null, null, false);
    })(),

    (function() {
      return test("10/9/14", null, new Date(2014, 9, 9), null, true);
    })(),

    (function() {
      return test("10/9/12", null, new Date(2012, 9, 9), null, true);
    })(),

    (function() {
      return test("March 3 2014", null, new Date(2014, 2, 3), null, true);
    })(),

    (function() {
      return test("7 feb 2012", null, new Date(2012, 1, 7), null, true);
    })(),

    (function() {
      return test("6 jan 2017", null, new Date(2017, 0, 6), null, true);
    })(),

    (function() {
      return test("6 jan 1990", null, new Date(1990, 0, 6), null, true);
    })(),

    (function() {
      var now = getNow(),
        start = getNow();

      start.setMonth(0, 6);
      start.setHours(19, 30, 0, 0);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("6 jan 1930", null, start, null, false);
    })(),

    (function() {
      var now = getNow();
      return test("in 3 years", null, new Date(now.getFullYear() + 3, now.getMonth(), now.getDate()), null, true);
    })(),

    (function() {
      var now = getNow();
      return test("10 years from now", null, new Date(now.getFullYear() + 10, now.getMonth(), now.getDate()), null, true);
    })(),

    (function() {
      var now = getNow();
      return test("next year", null, new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()), null, true);
    })(),

    (function() {
      var now = getNow();
      return test("last year", null, new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()), null, true);
    })(),

    (function() {
      var now = getNow(),
        start = getNow(),
        end = getNow();

      start.setHours(15, 0, 0, 0);
      end.setHours(17, 0, 0, 0);

      return test("today 3-5", null, start, end, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 9, 9);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("10/9/0", "0", start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 9, 1);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("10/1", null, start, null, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 9, 1);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      return test("10/01", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(10, 0, 0, 0);

      if (start.getHours() <= getNow().getHours()) {
        if (getNow().getHours() < 22)
          start.setHours(22);
        else
          start.setDate(start.getDate() + 1);
      }

      return test("10-01", "01", start, null, false);
    })(),

    (function() {
      var start = getNow(),
          end   = getNow();

      end.setHours(13, 0, 0, 0);
      if (end < getNow()) {
        start.setHours(22, 0, 0, 0);
        end.setDate(end.getDate() + 1);
      } else
        start.setHours(10, 0, 0, 0);

      return test("10-1", null, start, end, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 2),
        end   = new Date(now.getFullYear(), 11, 5);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("dec 2 - 5", null, start, end, true);
    })(),

    (function() {
      return test("dec 0 - 11", "dec 0 - 11", null, null, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 1, 9),
        end   = new Date(now.getFullYear(), 11, 5, 20);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("dec 1st at 9am through dec fifth 8pm", null, start, end, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 1),
        end = new Date(now.getFullYear(), 11, 11);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("dec 1 - 11", null, start, end, true);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 1, 15),
        end = new Date(now.getFullYear(), 11, 1, 23);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("dec 1 at 3pm - 11", null, start, end, false);
    })(),

    (function() {
      var now = getNow(),
        start = new Date(now.getFullYear(), 11, 1, 15),
        end = new Date(now.getFullYear(), 11, 11, 15);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      return test("dec 1 at 3pm - dec 11", null, start, end, false);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() - 3);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " - " + (end.getMonth() + 1) + "/" + end.getDate(), null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 1);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " - " + (end.getMonth() + 1) + "/" + end.getDate(),
            null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 1);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " - tomorrow",
            null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 1);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " -tom",
            null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 2);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " - day after tom",
            null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 2);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " -day after tomorrow",
            null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 2);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " -" + (end.getMonth() + 1) + "/" + end.getDate(),
            null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " - " + (end.getMonth() + 1) + "/" + end.getDate(),
            null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " - today", null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setDate(start.getDate() - 5);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return test((start.getMonth() + 1) + "/" + start.getDate() + " -tod", null, start, end, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      return test("12:00am", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      return test("12:00 am", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      return test("12:00 A.M.", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      return test("12:00a.M.", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      return test("00:00", null, start, null, false);
    })(),

    (function() {
      return test("0:00", "0:00", null, null, false);
    })(),

    (function() {
      return test("12:0 A.M.", "12:0 A.M.", null, null, false);
    })(),

    (function() {
      return test("02:0 A.M.", "02:0 A.M.", null, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 2)
        start.setDate(start.getDate() + 1);
      start.setHours(2, 0, 0, 0);

      return test("02:00", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 17)
        start.setDate(start.getDate() + 1);
      start.setHours(17, 0, 0, 0);

      return test("17:00", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(9, 0, 0, 0);
      if (start.getHours() <= getNow().getHours()) {
        if (getNow().getHours() < 21)
          start.setHours(21);
        else
          start.setDate(start.getDate() + 1);
      }

      return test("nine o'clock", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() < 21)
        start.setHours(21, 0, 0, 0);

      return test("The party is tonight", "The party", start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 5)
        start.setDate(start.getDate() + 1);
      start.setHours(5, 0, 0, 0);

      return test("Wake up at dawn", "Wake up", start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 8)
        start.setDate(start.getDate() + 1);
      start.setHours(8, 0, 0, 0);

      return test("Eat breakfast in the morning", "Eat breakfast", start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 14)
        start.setDate(start.getDate() + 1);
      start.setHours(14, 0, 0, 0);

      return test("Eat lunch in the afternoon", "Eat lunch", start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 19)
        start.setDate(start.getDate() + 1);
      start.setHours(19, 0, 0, 0);

      return test("Eat dinner in the evening", "Eat dinner", start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 21)
        start.setDate(start.getDate() + 1);
      start.setHours(21, 0, 0, 0);

      return test("Go to sleep at night", "Go to sleep", start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      return test("in 3 hours", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours() + 1, start.getMinutes(), 0, 0);

      return test("in an hours", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      return test("in three hours", null , start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 8);
      start.setHours(0, 0, 0, 0);

      return test("in eight days", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      return test("in one days", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      return test("in a days", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      return test("three hours from now", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      return test("3 hours from now", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      return test("midnight", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      if (start.getHours() >= 12)
        start.setDate(start.getDate() + 1);
      start.setHours(12, 0, 0, 0);

      return test("noon", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);

      return test("today", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      return test("tom", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 2);

      return test("day after tomorrow", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 2);

      return test("day after tmrw", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 2);

      return test("day before yesterday", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 2);

      return test("day before yest", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setMonth(start.getMonth() + 1);

      return test("next month", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setMonth(start.getMonth() - 1);

      return test("last month", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 7);

      return test("next week", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 7);

      return test("last week", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 1;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting last mon at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 2;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting last tues at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 3;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting last wed at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 4;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting last thurs at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 5;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting last fri at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 6;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting last sat at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 0;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting last sunday at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 1;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting next mon at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 2;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting next tues at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 3;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting next wed at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 4;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting next thurs at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 5;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting next fri at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 6;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting next sat at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      var diff = 7 - start.getDay() + 0;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      return test("Meeting next sunday at 3pm", "Meeting", start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setFullYear(start.getFullYear() - 5);

      return test("5 years ago", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 10);

      return test("10 days ago", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 435);

      return test("435 days ago", null, start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 43);

      return test("43 days ago", null, start, null, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 3);
      end.setHours(0, 0, 0, 0);

      return test("3 days ago to now", null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();
      start.setHours(start.getHours() - 3, start.getMinutes(), start.getSeconds(), 0);

      return test("3 hours ago to now", null, start, end, false);
    })(),

    (function() {
      var start = getNow();

      return test("now", null, start, null, false);
    })(),

    (function() {
      var start = getNow();

      return test("The exam is right now", "The exam", start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() - 1);

      return test("Homework due yesterday at 3pm", "Homework", start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() - 1);

      return test("Homework due yest at 3pm", "Homework", start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(0, 0, 0, 0);
      start.setMonth(0, 2);

      return test("Homework was on Jan 2", "Homework", start, null, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours() - 56, start.getMinutes(), 0, 0);

      return test("56 hours ago", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setMonth(9, 5);
      start.setHours(0, 0, 0, 0);
      if (monthDiff(start, getNow()) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      var date1 = new Date(1900, 0, 1, 0, 0, 0, 0), date2 = start;
      if (start >= getNow()) {
        date1 = start;
        date2 = new Date(3000, 0, 1, 0, 0, 0, 0);
      }

      return test("more than oct 5", null, date1, date2, true);
    })(),

    (function() {
      var start = getNow(),
        end = new Date(3000, 0, 1, 0, 0, 0, 0);

      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      return test("after tomorrow", null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = new Date(3000, 0, 1, 0, 0, 0, 0);

      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);

      return test("after yesterday", null, start, end, true);
    })(),

    (function() {
      var end = getNow(),
        start = new Date(1900, 0, 1, 0, 0, 0, 0);

      end.setDate(end.getDate() + 5);
      end.setHours(0, 0, 0, 0);

      return test("before 5 days", null, start, end, true);
    })(),

    (function() {
      var end = getNow(),
        start = new Date(1900, 0, 1, 0, 0, 0, 0);

      end.setDate(end.getDate() - 1);
      end.setHours(0, 0, 0, 0);

      return test("before yesterday", null, start, end, true);
    })(),

    (function() {
      var start = new Date(1900, 0, 1, 0, 0, 0, 0),
        end = getNow();
      end.setHours(0, 0, 0, 0);

      return test("less than today", null, start, end, true);
    })(),

    (function() {
      var end = new Date(3000, 0, 1, 0, 0, 0, 0),
        start = getNow();
      start.setHours(0, 0, 0, 0);

      return test("more than today", null, start, end, true);
    })(),

    (function() {
      var start = new Date(1900, 0, 1, 0, 0, 0, 0),
        end = getNow();
      end.setMonth(end.getMonth() + 2);
      end.setHours(0, 0, 0, 0);

      return test("older than 2 months from now", null, start, end, true);
    })(),

    (function() {
      var end = new Date(3000, 0, 1, 0, 0, 0, 0),
        start = getNow();
      start.setDate(start.getDate() + 14);
      start.setHours(0, 0, 0, 0);

      return test("more than 2 weeks from now", null, start, end, true);
    })(),

    (function() {
      var start = new Date(1900, 0, 1, 0, 0, 0, 0),
        end = getNow();

      return test("less than now", null, start, end, false);
    })(),

    (function() {
      var end = new Date(3000, 0, 1, 0, 0, 0, 0),
        start = getNow();

      return test("more than now", null, start, end, false);
    })(),

    (function() {
      var start = new Date(1900, 0, 1, 0, 0, 0, 0),
        end = getNow();
      end.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 5);

      return test("more than 5 days ago", null, start, end, true);
    })(),

    (function() {
      var start = new Date(1900, 0, 1, 0, 0, 0, 0),
        end = getNow();
      end.setHours(end.getHours() - 1);

      return test("more than an hour ago", null, start, end, false);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      start.setMonth(start.getMonth() - 3);
      start.setHours(0, 0, 0, 0);

      return test("less than 3 months ago", null, start, end, true);
    })(),

    (function() {
      var start = getNow(),
        end = getNow();

      end.setHours(end.getHours() + 5);

      return test("fewer than 5 hours from now", null, start, end, false);
    })(),

    (function() {
      var start = getNow();
      start.setMonth(9, 5);
      start.setHours(0, 0, 0, 0);
      if (monthDiff(start, getNow()) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      var date1 = start, date2 = getNow();
      if (start >= getNow()) {
        date1 = getNow();
        date2 = start;
      }

      return test("less than oct 5 ago", "ago", date1, date2, true);
    })(),

    (function() {
      var start = new Date(1900, 0, 1, 0, 0, 0, 0),
        end = getNow();

      end.setHours(0, 0, 0, 0);
      end.setFullYear(end.getFullYear() - 4);

      return test("this computer is more than 4 years old", "this computer", start, end, true);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours(), start.getMinutes() + 5, 0, 0);

      return test("in 5 minutes", null, start, null, false);
    })(),

    (function() {
      var start = getNow();
      start.setHours(start.getHours() + 7, start.getMinutes(), 0, 0);

      return test("in seven hours", null, start, null, false);
    })(),

    (function() {
      var start = getNow(),
          end = getNow();

      start.setHours(0, 0, 0, 0);
      end.setHours(12, 0, 0, 0);

      return test("the party goes from midnight to noon", "the party goes", start, end, false);
    })(),

    (function() {
      return test("ahskjhdsfkhasd .", "ahskjhdsfkhasd", null, null, false);
    })(),

    (function() {
      var start = getNow(),
          end = getNow();

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      end.setDate(start.getDate() + 2);
      return test("Event starts today ends within two days.", "Event", start, end, true);
    })(),

    (function() {
      return test("-", null, null, null, false);
    })(),

    (function() {
      return test("", null, null, null, false);
    })(),

    (function() {
      return test(" ", null, null, null, false);
    })(),

    (function() {
      return test(null, null, null, null, false);
    })()
  ];
}

// Listen for text in the text field at the top
function useSherlock(e, str) {
  var key = e.keyCode || e.which;
  if (key == 13) {
    var sherlocked = Sherlock.parse(str);
    document.getElementById('response').innerHTML = objToString(sherlocked);
  }
}

// Format results to query in text field
function objToString(Sherlocked) {
  var out = "<ul>";
  out += "<li><b>Title:</b> " + Sherlocked.eventTitle + "</li>";
  out += "<li><b>Starts:</b> " + Sherlocked.startDate + "</li>";
  out += "<li><b>Ends:</b> " + Sherlocked.endDate + "</li>";
  out += "<li><b>All day:</b> " + Sherlocked.isAllDay + "</li>";
  out += "</ul>";
  return out;
}

// Run all tests on page load
function onLoad(Sherlocked) {
  var t0 = new Date().getTime(),
    tests = document.getElementById('tests'),
    fails = 0,
    testCases = null;

  while(i < dates.length) {
    // set a fake time for Sherlock
    Sherlock._setNow(getNow());
    // run the test cases using this time
    var cases = runTestCases();
    // merge with existing results
    if (testCases === null)
      testCases = cases;
    else
      for (var k = 0; k < cases.length; k++) {
        testCases[k][1] = (testCases[k][1] && cases[k][1]);
      }
    i++;
  }

  // clear the fake Sherlock time
  Sherlock._setNow(null);

  // Run all tests and mark them as pass/fail
  for (var j = 0; j < testCases.length; j++) {
    var t = testCases[j],
      p = document.createElement('p'),
      status = document.createElement('span');

    if (t[0] === null)
      t[0] = "<code>null</code>";
    else if (t[0].trim() == "")
      t[0] = "<code>'" + t[0] + "'</code>";
    p.innerHTML = t[0];

    if (t[1]) {
      status.innerHTML = 'success';
      status.className = 'pass';
    } else {
      fails++;
      status.innerHTML = 'fail';
      status.className = 'fail';
    }
    p.appendChild(status);
    tests.appendChild(p);
  }

  // stop benchmarking
  var t1 = new Date().getTime();

  // summarize results
  var results = document.getElementById('results');
  results.className = fails > 0 ? "fail" : "pass";
  results.innerHTML = '<b>' + fails + '</b>/' + testCases.length + ' failed';

  var runTime = document.getElementById('runTime');
  runTime.innerHTML = testCases.length*dates.length + ' tests ran in ' + (t1 - t0) + ' ms';
}

// Perform the actual test comparison.
// str is passed to Sherlock, and the result is compared against the other 4 params of test
function test(str, title, startDate, endDate, isAllDay) {
  var Sherlocked = Sherlock.parse(str);

  if (startDate) {
    startDate.setSeconds(0, 0);
    startDate = startDate.getTime();
  }
  if (endDate) {
    endDate.setSeconds(0, 0);
    endDate = endDate.getTime();
  }
  if (Sherlocked.startDate !== null)  {
    Sherlocked.startDate.setSeconds(0, 0);
    Sherlocked.startDate = Sherlocked.startDate.getTime();
  }
  if (Sherlocked.endDate !== null) {
    Sherlocked.endDate.setSeconds(0, 0);
    Sherlocked.endDate = Sherlocked.endDate.getTime();
  }

  // compare properties
  var result = (Sherlocked.eventTitle === title &&
        Sherlocked.startDate === startDate &&
        Sherlocked.endDate === endDate &&
        Sherlocked.isAllDay == isAllDay);

  // Log any tests that fail in console
  if (debug && !result) {
    console.log("parsing on " + getNow() + "... " + str);
    Sherlocked.startDate = Sherlocked.startDate ? new Date(Sherlocked.startDate) : null;
    Sherlocked.endDate = Sherlocked.endDate ? new Date(Sherlocked.endDate) : null;
    console.log("-- what Sherlock returned:");
    console.log(Sherlocked);
    console.log("-- what we expected:");
    console.log({
      eventTitle: title,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      isAllDay: isAllDay
    });
  }

  return [str, result];
}