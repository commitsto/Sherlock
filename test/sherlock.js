import { expect } from 'chai';

// import Sherlock from '../src/sherlock'
const Sherlock = require('../es5/sherlock');

// Run Sherlock from all of these reference dates in order to cover possible edge cases
const dates = [
  new Date('Dec 03, 2012 04:35:00'),
  new Date('Feb 02, 2013 04:01:00'),
  new Date('Jan 29, 2013 00:01:00'),
  new Date('June 30, 2013 14:01:00'),
  new Date('Jan 31, 2013 04:01:00'),
  new Date('Feb 27, 2013 04:01:00'),
  new Date('Feb 24, 2013 04:01:00'),
  new Date('Feb 24, 2013 15:01:00'),
  new Date('March 3, 2013 12:01:00'),
  new Date('March 3, 2013 14:01:00'),
  new Date('October 27, 2018 22:34:40'),
  (() => { const d = new Date(); d.setHours(0, 0, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(0, 1, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(2, 0, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(6, 0, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(12, 0, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(14, 0, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(15, 0, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(16, 10, 0); return d; })(),
  (() => { const d = new Date(); d.setHours(23, 30, 0); return d; })(),
  new Date(),
];

// Get the date that's currently being tested
const getNow = (i) => {
  if (i < dates.length) {
    return new Date(dates[i].getTime());
  }
  return new Date();
};

// Sherlock's method for finding the number of months between 2 dates.
// Used for making assumptions about what a user means when year is ambiguous
const monthDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth() + 1;
  return months <= 0 ? 0 : months;
};

sharedExamplesFor('Sherlock', () => {
  it('parses the title if given', () =>
    expect($subject.eventTitle).to.eq($title)
  );

  if ($startDate) {
    it('parses the start date if given', () =>
      expect($subject.startDate).to.equalDate($startDate)
    );
  }

  if ($endDate) {
    it('parses the end date if given', () =>
      expect($subject.endDate).to.equalDate($endDate)
    );
  }

  it('parses the date as "all day" if no time is given', () =>
    expect($subject.isAllDay).to.eq($isAllDay)
  );
});

describe('Sherlock', () => {
  subject('sherlock', () => {
    Sherlock._setNow($currentTime);
    return Sherlock.parse($input);
  });

  context('when a date range is given', () => {
    def('input', 'dec 1st at 9am through dec fifth 8pm');
    def('currentTime', () => getNow(0));

    def('title', null);
    def('isAllDay', false);
    def('startDate', () => new Date($currentTime.getFullYear(), 11, 1, 9));
    def('endDate', () => new Date($currentTime.getFullYear(), 11, 5, 20));

    if ($endDate < $currentTime && monthDiff($endDate, $currentTime) >= 3) {
      $endDate.setFullYear($endDate.getFullYear() + 1);
      $startDate.setFullYear($startDate.getFullYear() + 1);
    }

    includeExamplesFor('Sherlock');
  });

  context('when the input is "Meeting today at 15"', () => {
    def('input', 'Meeting today at 15');

    const now = getNow(0);
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15);

    def('currentTime', now);
    def('title', 'Meeting');
    def('startDate', () => start);
    def('endDate', () => null);
    def('isAllDay', false);

    includeExamplesFor('Sherlock');
  });

  context('when the input is "February 24 at 3pm - 2pm March 3"', () => {
    def('input', 'February 24 at 3pm - 2pm March 3');

    const now = getNow(0);
    const start = new Date(now.getFullYear(), 1, 24, 15, 0);
    const end = new Date(now.getFullYear(), 2, 3, 14, 0);

    if (end < now && monthDiff(end, now) >= 3) {
      end.setFullYear(end.getFullYear() + 1);
      start.setFullYear(start.getFullYear() + 1);
    }

    def('currentTime', now);
    def('title', null);
    def('startDate', () => start);
    def('endDate', () => end);
    def('isAllDay', false);

    includeExamplesFor('Sherlock');
  });

  context('when the input is "February 24 at 3pm-2pm March 3"', () => {
    def('input', 'February 24 at 3pm-2pm March 3');

    var now = getNow(0),
      start = new Date(now.getFullYear(), 1, 24, 15),
      end   = new Date(now.getFullYear(), 2, 3, 14);

    if (end < now && monthDiff(end, now) >= 3) {
      end.setFullYear(end.getFullYear() + 1);
      start.setFullYear(start.getFullYear() + 1);
    }

    def('currentTime', now);
    def('title', null);
    def('startDate', () => start);
    def('endDate', () => end);
    def('isAllDay', false);

    includeExamplesFor('Sherlock');
  });
  //
  // context('when the input is "Vacation is in 4 weeks..."', () => {
  //   def('input', 'Vacation is in 4 weeks...');
  //
  //   var start = getNow(0);
  //   start.setDate(start.getDate() + 7*4);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Vacation');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "The exam is in three weeks from tomorrow."', () => {
  //   def('input', 'The exam is in three weeks from tomorrow.');
  //
  //   var start = getNow(0);
  //   start.setDate(start.getDate() + 7*3 + 1);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'The exam');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Christmas is on December 25th."', () => {
  //   def('input', 'Christmas is on December 25th.');
  //
  //   var now = getNow(0),
  //     start = new Date(getNow().getFullYear(), 11, 25);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', 'Christmas');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Homework 5 due monday at 3pm"', () => {
  //   def('input', 'Homework 5 due monday at 3pm');
  //
  //   var start = getNow(0),
  //     diff = 1 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(15, 0, 0, 0);
  //
  //   def('title', 'Homework 5');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "Homework 5 due next fri@3pm"', () => {
  //   def('input', 'Homework 5 due next fri@3pm');
  //
  //   var start = getNow(0);
  //   start.setDate(start.getDate() + 5 + 7 - start.getDay());
  //   start.setHours(15, 0, 0, 0);
  //
  //   def('title', 'Homework 5');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "Let\'s have lunch on the 3rd."', () => {
  //   def('input', 'Let\'s have lunch on the 3rd.');
  //
  //   var now = getNow(0),
  //     start = getNow(0);
  //
  //   start.setDate(3);
  //   start.setHours(0, 0, 0, 0);
  //   now.setHours(0, 0, 0, 0);
  //   if (start < now)
  //     start.setMonth(start.getMonth() + 1);
  //
  //   def('title', 'Let\'s have lunch');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "The retreat is from Jan 12 - 29."', () => {
  //   def('input', 'The retreat is from Jan 12 - 29.');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 0, 12),
  //     end   = new Date(now.getFullYear(), 0, 29);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', 'The retreat');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Bake a cake tomorrow."', () => {
  //   def('input', 'Bake a cake tomorrow.');
  //
  //   var start = getNow(0);
  //   start.setDate(start.getDate() + 1);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Bake a cake');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Bake a cake tom."', () => {
  //   def('input', 'Bake a cake tom.');
  //
  //   var start = getNow(0);
  //   start.setDate(start.getDate() + 1);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Bake a cake');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Bake a cake tmrw."', () => {
  //   def('input', 'Bake a cake tmrw.');
  //
  //   var start = getNow(0);
  //   start.setDate(start.getDate() + 1);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Bake a cake');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Use Tabule today!"', () => {
  //   def('input', 'Use Tabule today!');
  //
  //   var start = getNow(0);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Use Tabule');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Use Tabule tod!"', () => {
  //   def('input', 'Use Tabule tod!');
  //
  //   var start = getNow(0);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Use Tabule');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Eat more kale this week"', () => {
  //   def('input', 'Eat more kale this week');
  //
  //   var start = getNow(0);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Eat more kale');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Eat more kale this month"', () => {
  //   def('input', 'Eat more kale this month');
  //
  //   var start = getNow(0);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Eat more kale');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "Eat more kale this year"', () => {
  //   def('input', 'Eat more kale this year');
  //
  //   var start = getNow(0);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', 'Eat more kale');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "fourth of jul"', () => {
  //   def('input', 'fourth of jul');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 6, 4);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "fourth of july @ 2"', () => {
  //   def('input', 'fourth of july @ 2');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 6, 4, 14);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "The koala will be set free on the fourth of july @noon"', () => {
  //   def('input', 'The koala will be set free on the fourth of july @noon');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 6, 4, 12);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', 'The koala will be set free');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "@2"', () => {
  //   def('input', '@2');
  //
  //   var start = getNow(0);
  //   if (start.getHours() >= 14)
  //     start.setDate(start.getDate() + 1);
  //   start.setHours(14, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "the 15th."', () => {
  //   def('input', 'the 15th.');
  //
  //   var now = getNow(0),
  //     start = getNow(0);
  //
  //   start.setDate(15);
  //   start.setHours(0, 0, 0, 0);
  //   now.setHours(0, 0, 0, 0);
  //   if (start < now)
  //     start.setMonth(start.getMonth() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "fourth of july at midnight"', () => {
  //   def('input', 'fourth of july at midnight');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 6, 4);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "first of july through 5th of aug"', () => {
  //   def('input', 'first of july through 5th of aug');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 6, 1),
  //     end   = new Date(now.getFullYear(), 7, 5);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "My mom\'s birthday is on the 27th"', () => {
  //   def('input', 'My mom\'s birthday is on the 27th');
  //
  //   var now = getNow(0),
  //     start = getNow(0);
  //
  //   start.setDate(27);
  //   start.setHours(0, 0, 0, 0);
  //   now.setHours(0, 0, 0, 0);
  //   if (start < now)
  //     start.setMonth(start.getMonth() + 1);
  //
  //   def('title', 'My mom\'s birthday');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "The party is tomorrow from 3pm to 5pm."', () => {
  //   def('input', 'The party is tomorrow from 3pm to 5pm.');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setDate(start.getDate() + 1);
  //   end.setDate(end.getDate() + 1);
  //   start.setHours(15, 0, 0, 0);
  //   end.setHours(17, 0, 0, 0);
  //
  //   def('title', 'The party');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "The exam is @ 2pm and lasts for five hours"', () => {
  //   def('input', 'The exam is @ 2pm and lasts for five hours');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setHours(14, 0, 0, 0);
  //   end.setHours(19, 0, 0, 0);
  //
  //   def('title', 'The exam');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "The exam is @ 2pm and goes until 4pm"', () => {
  //   def('input', 'The exam is @ 2pm and goes until 4pm');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setHours(14, 0, 0, 0);
  //   end.setHours(16, 0, 0, 0);
  //
  //   def('title', 'The exam');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "sunday"', () => {
  //   def('input', 'sunday');
  //
  //   var start = getNow(0),
  //     diff = 0 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "monday"', () => {
  //   def('input', 'monday');
  //
  //   var start = getNow(0),
  //     diff = 1 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "tuesday"', () => {
  //   def('input', 'tuesday');
  //
  //   var start = getNow(0),
  //     diff = 2 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "thurs - next sat"', () => {
  //   def('input', 'thurs - next sat');
  //
  //   var start = getNow(0),
  //       diff1 = 4 + 7 - start.getDay();
  //   if (diff1 > 7) diff1 -= 7;
  //   start.setDate(start.getDate() + diff1);
  //   start.setHours(0, 0, 0, 0);
  //
  //   var end   = new Date(start),
  //       diff2 = 6 + 7 - end.getDay();
  //   end.setDate(end.getDate() + diff2);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "thu - next sat"', () => {
  //   def('input', 'thu - next sat');
  //
  //   var start = getNow(0),
  //       diff1 = 4 + 7 - start.getDay();
  //   if (diff1 > 7) diff1 -= 7;
  //   start.setDate(start.getDate() + diff1);
  //   start.setHours(0, 0, 0, 0);
  //
  //   var end   = new Date(start),
  //       diff2 = 6 + 7 - end.getDay();
  //   end.setDate(end.getDate() + diff2);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "thur - next sat"', () => {
  //   def('input', 'thur - next sat');
  //
  //   var start = getNow(0),
  //       diff1 = 4 + 7 - start.getDay();
  //   if (diff1 > 7) diff1 -= 7;
  //   start.setDate(start.getDate() + diff1);
  //   start.setHours(0, 0, 0, 0);
  //
  //   var end   = new Date(start),
  //       diff2 = 6 + 7 - end.getDay();
  //   end.setDate(end.getDate() + diff2);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "wednesday"', () => {
  //   def('input', 'wednesday');
  //
  //   var start = getNow(0),
  //     diff = 3 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "wed"', () => {
  //   def('input', 'wed');
  //
  //   var start = getNow(0),
  //     diff = 3 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "thursday"', () => {
  //   def('input', 'thursday');
  //
  //   var start = getNow(0),
  //     diff = 4 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "saturday"', () => {
  //   def('input', 'saturday');
  //
  //   var start = getNow(0),
  //     diff = 6 + 7 - start.getDay();
  //
  //   if (diff > 7) diff -= 7;
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "next wednesday"', () => {
  //   def('input', 'next wednesday');
  //
  //   var start = getNow(0),
  //     diff = 3 + 7 - start.getDay();
  //
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "next week on sunday at 4"', () => {
  //   def('input', 'next week on sunday at 4');
  //
  //   var start = getNow(0),
  //     diff = 0 + 7 - start.getDay();
  //
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(16, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "next week friday"', () => {
  //   def('input', 'next week friday');
  //
  //   var start = getNow(0),
  //     diff = 5 + 7 - start.getDay();
  //
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "oxt wednesday"', () => {
  //   def('input', 'oxt wednesday');
  //
  //   var start = getNow(0),
  //     diff = 3 + 14 - start.getDay();
  //
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "thu week"', () => {
  //   def('input', 'thu week');
  //
  //   var start = getNow(0),
  //     diff = 4 + 14 - start.getDay();
  //
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "week next sat"', () => {
  //   def('input', 'week next sat');
  //
  //   var start = getNow(0),
  //     diff = 6 + 14 - start.getDay();
  //
  //   start.setDate(start.getDate() + diff);
  //   start.setHours(0, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "The conference is from Feb 12 to 15th."', () => {
  //   def('input', 'The conference is from Feb 12 to 15th.');
  //
  //   var now   = getNow(0),
  //       start = new Date(now.getFullYear(), 1, 12),
  //       end   = new Date(now.getFullYear(), 1, 15);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', 'The conference');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "The conference is from Feb 12 at 3pm to the 15th."', () => {
  //   def('input', 'The conference is from Feb 12 at 3pm to the 15th.');
  //
  //   var now   = getNow(0),
  //       start = new Date(now.getFullYear(), 1, 12, 15),
  //       end   = new Date(now.getFullYear(), 1, 15, 15);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', 'The conference');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "I work from 1am - 6pm."', () => {
  //   def('input', 'I work from 1am - 6pm.');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setHours(1, 0, 0, 0);
  //   end.setHours(18, 0, 0, 0);
  //
  //   def('title', 'I work');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "I work from 6pm - 1am."', () => {
  //   def('input', 'I work from 6pm - 1am.');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setHours(18, 0, 0, 0);
  //   end.setHours(1, 0, 0, 0);
  //
  //   if (end < getNow())
  //     end.setDate(end.getDate() + 1);
  //   else
  //     start.setDate(start.getDate() - 1);
  //
  //   def('title', 'I work');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "I work from 11pm - 10pm today."', () => {
  //   def('input', 'I work from 11pm - 10pm today.');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setDate(start.getDate() - 1);
  //   start.setHours(23, 0, 0, 0);
  //   end.setHours(22, 0, 0, 0);
  //
  //   if (end < getNow()) {
  //     end.setDate(end.getDate() + 1);
  //     start.setDate(start.getDate() + 1);
  //   }
  //
  //   def('title', 'I work');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "I work from 6pm - 1am today."', () => {
  //   def('input', 'I work from 6pm - 1am today.');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setDate(start.getDate() - 1);
  //   start.setHours(18, 0, 0, 0);
  //   end.setHours(1, 0, 0, 0);
  //
  //   if (end < getNow()) {
  //     end.setDate(end.getDate() + 1);
  //     start.setDate(start.getDate() + 1);
  //   }
  //
  //   def('title', 'I work');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "I work from 6pm - 1am tomorrow."', () => {
  //   def('input', 'I work from 6pm - 1am tomorrow.');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setHours(18, 0, 0, 0);
  //   end.setHours(1, 0, 0, 0);
  //   end.setDate(end.getDate() + 1);
  //
  //   def('title', 'I work');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "I work from 6pm - 6am tomorrow."', () => {
  //   def('input', 'I work from 6pm - 6am tomorrow.');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   start.setHours(18, 0, 0, 0);
  //   end.setHours(6, 0, 0, 0);
  //   end.setDate(end.getDate() + 1);
  //
  //   def('title', 'I work');
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "12/3"', () => {
  //   def('input', '12/3');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 3);
  //
  //   now.setHours(0, 0, 0, 0);
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "12/3 @ 3"', () => {
  //   def('input', '12/3 @ 3');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 3, 15);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "12/3 @3pm"', () => {
  //   def('input', '12/3 @3pm');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 3, 15);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "12/3@3pm"', () => {
  //   def('input', '12/3@3pm');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 3, 15);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "12/03"', () => {
  //   def('input', '12/03');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 3);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "12.03"', () => {
  //   def('input', '12.03');
  //
  //   def('title', '12.03');
  //   def('startDate', () => null);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "12.3"', () => {
  //   def('input', '12.3');
  //
  //   def('title', '12.3');
  //   def('startDate', () => null);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "12/23"', () => {
  //   def('input', '12/23');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 23);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "12.12"', () => {
  //   def('input', '12.12');
  //
  //   def('title', '12.12');
  //   def('startDate', () => null);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "9/1"', () => {
  //   def('input', '9/1');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 8, 1);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "9/0"', () => {
  //   def('input', '9/0');
  //
  //   def('title', '9/0');
  //   def('startDate', () => null);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "9/19"', () => {
  //   def('input', '9/19');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 8, 19);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "10/90"', () => {
  //   def('input', '10/90');
  //
  //   def('title', '10/90');
  //   def('startDate', () => null);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "10/9/14"', () => {
  //   def('input', '10/9/14');
  //
  //   def('title', null);
  //   def('startDate', () => new Date(2014, 9, 9));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "10/9/12"', () => {
  //   def('input', '10/9/12');
  //
  //   def('title', null);
  //   def('startDate', () => new Date(2012, 9, 9));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "March 3 2014"', () => {
  //   def('input', 'March 3 2014');
  //
  //   def('title', null);
  //   def('startDate', () => new Date(2014, 2, 3));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "7 feb 2012"', () => {
  //   def('input', '7 feb 2012');
  //
  //   def('title', null);
  //   def('startDate', () => new Date(2012, 1, 7));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "6 jan 2017"', () => {
  //   def('input', '6 jan 2017');
  //
  //   def('title', null);
  //   def('startDate', () => new Date(2017, 0, 6));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "6 jan 1990"', () => {
  //   def('input', '6 jan 1990');
  //
  //   def('title', null);
  //   def('startDate', () => new Date(1990, 0, 6));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "6 jan 1930"', () => {
  //   def('input', '6 jan 1930');
  //
  //   var now = getNow(0),
  //     start = getNow(0);
  //
  //   start.setMonth(0, 6);
  //   start.setHours(19, 30, 0, 0);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "in 3 years"', () => {
  //   def('input', 'in 3 years');
  //
  //   var now = getNow(0);
  //   def('title', null);
  //   def('startDate', () => new Date(now.getFullYear() + 3, now.getMonth(), now.getDate()));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "10 years from now"', () => {
  //   def('input', '10 years from now');
  //
  //   var now = getNow(0);
  //   def('title', null);
  //   def('startDate', () => new Date(now.getFullYear() + 10, now.getMonth(), now.getDate()));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "next year"', () => {
  //   def('input', 'next year');
  //
  //   var now = getNow(0);
  //   def('title', null);
  //   def('startDate', () => new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "last year"', () => {
  //   def('input', 'last year');
  //
  //   var now = getNow(0);
  //   def('title', null);
  //   def('startDate', () => new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()));
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "today 3-5"', () => {
  //   def('input', 'today 3-5');
  //
  //   var now = getNow(0),
  //     start = getNow(0),
  //     end = getNow(0);
  //
  //   start.setHours(15, 0, 0, 0);
  //   end.setHours(17, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "10/9/0"', () => {
  //   def('input', '10/9/0');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 9, 9);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', '0');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "10/1"', () => {
  //   def('input', '10/1');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 9, 1);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "10/01"', () => {
  //   def('input', '10/01');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 9, 1);
  //
  //   if (start < now && monthDiff(start, now) >= 3)
  //     start.setFullYear(start.getFullYear() + 1);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "10-01"', () => {
  //   def('input', '10-01');
  //
  //   var start = getNow(0);
  //   start.setHours(10, 0, 0, 0);
  //
  //   if (start.getHours() <= getNow(0).getHours()) {
  //     if (getNow().getHours() < 22)
  //       start.setHours(22);
  //     else
  //       start.setDate(start.getDate() + 1);
  //   }
  //
  //   def('title', '01');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "10-1"', () => {
  //   def('input', '10-1');
  //
  //   var start = getNow(0),
  //       end   = getNow(0);
  //
  //   end.setHours(13, 0, 0, 0);
  //   if (end < getNow()) {
  //     start.setHours(22, 0, 0, 0);
  //     end.setDate(end.getDate() + 1);
  //   } else
  //     start.setHours(10, 0, 0, 0);
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "dec 2 - 5"', () => {
  //   def('input', 'dec 2 - 5');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 2),
  //     end   = new Date(now.getFullYear(), 11, 5);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "dec 0 - 11"', () => {
  //   def('input', 'dec 0 - 11');
  //
  //   def('title', 'dec 0 - 11');
  //   def('startDate', () => null);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "dec 1st at 9am through dec fifth 8pm"', () => {
  //   def('input', 'dec 1st at 9am through dec fifth 8pm');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 1, 9),
  //     end   = new Date(now.getFullYear(), 11, 5, 20);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
  //
  // context('when the input is "dec 1 - 11"', () => {
  //   def('input', 'dec 1 - 11');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 1),
  //     end = new Date(now.getFullYear(), 11, 11);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', true);
  // });
  //
  // context('when the input is "dec 1 at 3pm - 11"', () => {
  //   def('input', 'dec 1 at 3pm - 11');
  //
  //   var now = getNow(0),
  //     start = new Date(now.getFullYear(), 11, 1, 15),
  //     end = new Date(now.getFullYear(), 11, 1, 23);
  //
  //   if (end < now && monthDiff(end, now) >= 3) {
  //     end.setFullYear(end.getFullYear() + 1);
  //     start.setFullYear(start.getFullYear() + 1);
  //   }
  //
  //   def('title', null);
  //   def('startDate', () => start);
  //   def('endDate', () => end);
  //   def('isAllDay', false);
  // });
});

//
// (function() {
//   var now   = getNow(0),
//       start = getNow(0),
//       end   = getNow(0);
//
//   start.setDate(5);
//   end.setDate(9);
//   start.setHours(0, 0, 0, 0);
//   end.setHours(0, 0, 0, 0);
//   now.setHours(0, 0, 0, 0);
//   if (end < now) {
//     end.setMonth(end.getMonth() + 1);
//     start.setMonth(start.getMonth() + 1);
//   }
//
//   return test('on the 5th to the ninth, we shall eat.', 'we shall eat.', start, end, true);
// });
//     (function() {
//       var now = getNow(0),
//         start = new Date(now.getFullYear(), 11, 1, 15),
//         end = new Date(now.getFullYear(), 11, 11, 15);
//
//       if (end < now && monthDiff(end, now) >= 3) {
//         end.setFullYear(end.getFullYear() + 1);
//         start.setFullYear(start.getFullYear() + 1);
//       }
//
//       return test('dec 1 at 3pm - dec 11', null, start, end, false);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//       end.setDate(end.getDate() - 3);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' - ' + (end.getMonth() + 1) + '/' + end.getDate(), null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//       end.setDate(end.getDate() + 1);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' - ' + (end.getMonth() + 1) + '/' + end.getDate(),
//             null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//       end.setDate(end.getDate() + 1);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' - tomorrow',
//             null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//       end.setDate(end.getDate() + 1);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' -tom',
//             null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//       end.setDate(end.getDate() + 2);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' - day after tom',
//             null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//       end.setDate(end.getDate() + 2);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' -day after tomorrow',
//             null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//       end.setDate(end.getDate() + 2);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' -' + (end.getMonth() + 1) + '/' + end.getDate(),
//             null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' - ' + (end.getMonth() + 1) + '/' + end.getDate(),
//             null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' - today', null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setDate(start.getDate() - 5);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//
//       return test((start.getMonth() + 1) + '/' + start.getDate() + ' -tod', null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 1);
//
//       return test('12:00am', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 1);
//
//       return test('12:00 am', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 1);
//
//       return test('12:00 A.M.', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 1);
//
//       return test('12:00a.M.', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 1);
//
//       return test('00:00', null, start, null, false);
//     });
//
//     (function() {
//       return test('0:00', '0:00', null, null, false);
//     });
//
//     (function() {
//       return test('12:0 A.M.', '12:0 A.M.', null, null, false);
//     });
//
//     (function() {
//       return test('02:0 A.M.', '02:0 A.M.', null, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 2)
//         start.setDate(start.getDate() + 1);
//       start.setHours(2, 0, 0, 0);
//
//       return test('02:00', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 17)
//         start.setDate(start.getDate() + 1);
//       start.setHours(17, 0, 0, 0);
//
//       return test('17:00', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(9, 0, 0, 0);
//       if (start.getHours() <= getNow(0).getHours()) {
//         if (getNow().getHours() < 21)
//           start.setHours(21);
//         else
//           start.setDate(start.getDate() + 1);
//       }
//
//       return test('nine o\'clock', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() < 21)
//         start.setHours(21, 0, 0, 0);
//
//       return test('The party is tonight', 'The party', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 5)
//         start.setDate(start.getDate() + 1);
//       start.setHours(5, 0, 0, 0);
//
//       return test('Wake up at dawn', 'Wake up', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 8)
//         start.setDate(start.getDate() + 1);
//       start.setHours(8, 0, 0, 0);
//
//       return test('Eat breakfast in the morning', 'Eat breakfast', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 14)
//         start.setDate(start.getDate() + 1);
//       start.setHours(14, 0, 0, 0);
//
//       return test('Eat lunch in the afternoon', 'Eat lunch', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 19)
//         start.setDate(start.getDate() + 1);
//       start.setHours(19, 0, 0, 0);
//
//       return test('Eat dinner in the evening', 'Eat dinner', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 21)
//         start.setDate(start.getDate() + 1);
//       start.setHours(21, 0, 0, 0);
//
//       return test('Go to sleep at night', 'Go to sleep', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);
//
//       return test('in 3 hours', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours() + 1, start.getMinutes(), 0, 0);
//
//       return test('in an hours', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);
//
//       return test('in three hours', null , start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setDate(start.getDate() + 8);
//       start.setHours(0, 0, 0, 0);
//
//       return test('in eight days', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setDate(start.getDate() + 1);
//       start.setHours(0, 0, 0, 0);
//
//       return test('in one days', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setDate(start.getDate() + 1);
//       start.setHours(0, 0, 0, 0);
//
//       return test('in a days', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);
//
//       return test('three hours from now', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);
//
//       return test('3 hours from now', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 1);
//
//       return test('midnight', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       if (start.getHours() >= 12)
//         start.setDate(start.getDate() + 1);
//       start.setHours(12, 0, 0, 0);
//
//       return test('noon', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//
//       return test('today', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 1);
//
//       return test('tom', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 2);
//
//       return test('day after tomorrow', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 2);
//
//       return test('day after tmrw', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - 2);
//
//       return test('day before yesterday', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - 2);
//
//       return test('day before yest', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setMonth(start.getMonth() + 1);
//
//       return test('next month', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setMonth(start.getMonth() - 1);
//
//       return test('last month', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() + 7);
//
//       return test('next week', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - 7);
//
//       return test('last week', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 1;
//       diff -= 7;
//       if (diff >= 0)
//         diff -= 7
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting last mon at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 2;
//       diff -= 7;
//       if (diff >= 0)
//         diff -= 7
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting last tues at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 3;
//       diff -= 7;
//       if (diff >= 0)
//         diff -= 7
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting last wed at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 4;
//       diff -= 7;
//       if (diff >= 0)
//         diff -= 7
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting last thurs at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 5;
//       diff -= 7;
//       if (diff >= 0)
//         diff -= 7
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting last fri at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 6;
//       diff -= 7;
//       if (diff >= 0)
//         diff -= 7
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting last sat at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 0;
//       diff -= 7;
//       if (diff >= 0)
//         diff -= 7
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting last sunday at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 1;
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting next mon at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 2;
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting next tues at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 3;
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting next wed at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 4;
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting next thurs at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 5;
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting next fri at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 6;
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting next sat at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       var diff = 7 - start.getDay() + 0;
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() + diff);
//
//       return test('Meeting next sunday at 3pm', 'Meeting', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setFullYear(start.getFullYear() - 5);
//
//       return test('5 years ago', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - 10);
//
//       return test('10 days ago', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - 435);
//
//       return test('435 days ago', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - 43);
//
//       return test('43 days ago', null, start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - 3);
//       end.setHours(0, 0, 0, 0);
//
//       return test('3 days ago to now', null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//       start.setHours(start.getHours() - 3, start.getMinutes(), start.getSeconds(), 0);
//
//       return test('3 hours ago to now', null, start, end, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//
//       return test('now', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//
//       return test('The exam is right now', 'The exam', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() - 1);
//
//       return test('Homework due yesterday at 3pm', 'Homework', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(15, 0, 0, 0);
//       start.setDate(start.getDate() - 1);
//
//       return test('Homework due yest at 3pm', 'Homework', start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//       start.setMonth(0, 2);
//
//       return test('Homework was on Jan 2', 'Homework', start, null, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours() - 56, start.getMinutes(), 0, 0);
//
//       return test('56 hours ago', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setMonth(9, 5);
//       start.setHours(0, 0, 0, 0);
//       if (monthDiff(start, getNow()) >= 3)
//         start.setFullYear(start.getFullYear() + 1);
//
//       var date1 = new Date(1900, 0, 1, 0, 0, 0, 0), date2 = start;
//       if (start >= getNow(0)) {
//         date1 = start;
//         date2 = new Date(3000, 0, 1, 0, 0, 0, 0);
//       }
//
//       return test('more than oct 5', null, date1, date2, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = new Date(3000, 0, 1, 0, 0, 0, 0);
//
//       start.setDate(start.getDate() + 1);
//       start.setHours(0, 0, 0, 0);
//
//       return test('after tomorrow', null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = new Date(3000, 0, 1, 0, 0, 0, 0);
//
//       start.setDate(start.getDate() - 1);
//       start.setHours(0, 0, 0, 0);
//
//       return test('after yesterday', null, start, end, true);
//     });
//
//     (function() {
//       var end = getNow(0),
//         start = new Date(1900, 0, 1, 0, 0, 0, 0);
//
//       end.setDate(end.getDate() + 5);
//       end.setHours(0, 0, 0, 0);
//
//       return test('before 5 days', null, start, end, true);
//     });
//
//     (function() {
//       var end = getNow(0),
//         start = new Date(1900, 0, 1, 0, 0, 0, 0);
//
//       end.setDate(end.getDate() - 1);
//       end.setHours(0, 0, 0, 0);
//
//       return test('before yesterday', null, start, end, true);
//     });
//
//     (function() {
//       var start = new Date(1900, 0, 1, 0, 0, 0, 0),
//         end = getNow(0);
//       end.setHours(0, 0, 0, 0);
//
//       return test('less than today', null, start, end, true);
//     });
//
//     (function() {
//       var end = new Date(3000, 0, 1, 0, 0, 0, 0),
//         start = getNow(0);
//       start.setHours(0, 0, 0, 0);
//
//       return test('more than today', null, start, end, true);
//     });
//
//     (function() {
//       var start = new Date(1900, 0, 1, 0, 0, 0, 0),
//         end = getNow(0);
//       end.setMonth(end.getMonth() + 2);
//       end.setHours(0, 0, 0, 0);
//
//       return test('older than 2 months from now', null, start, end, true);
//     });
//
//     (function() {
//       var end = new Date(3000, 0, 1, 0, 0, 0, 0),
//         start = getNow(0);
//       start.setDate(start.getDate() + 14);
//       start.setHours(0, 0, 0, 0);
//
//       return test('more than 2 weeks from now', null, start, end, true);
//     });
//
//     (function() {
//       var start = new Date(1900, 0, 1, 0, 0, 0, 0),
//         end = getNow(0);
//
//       return test('less than now', null, start, end, false);
//     });
//
//     (function() {
//       var end = new Date(3000, 0, 1, 0, 0, 0, 0),
//         start = getNow(0);
//
//       return test('more than now', null, start, end, false);
//     });
//
//     (function() {
//       var start = new Date(1900, 0, 1, 0, 0, 0, 0),
//         end = getNow(0);
//       end.setHours(0, 0, 0, 0);
//       end.setDate(end.getDate() - 5);
//
//       return test('more than 5 days ago', null, start, end, true);
//     });
//
//     (function() {
//       var start = new Date(1900, 0, 1, 0, 0, 0, 0),
//         end = getNow(0);
//       end.setHours(end.getHours() - 1);
//
//       return test('more than an hour ago', null, start, end, false);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       start.setMonth(start.getMonth() - 3);
//       start.setHours(0, 0, 0, 0);
//
//       return test('less than 3 months ago', null, start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0),
//         end = getNow(0);
//
//       end.setHours(end.getHours() + 5);
//
//       return test('fewer than 5 hours from now', null, start, end, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setMonth(9, 5);
//       start.setHours(0, 0, 0, 0);
//       if (monthDiff(start, getNow()) >= 3)
//         start.setFullYear(start.getFullYear() + 1);
//
//       var date1 = start, date2 = getNow(0);
//       if (start >= getNow(0)) {
//         date1 = getNow(0);
//         date2 = start;
//       }
//
//       return test('less than oct 5 ago', 'ago', date1, date2, true);
//     });
//
//     (function() {
//       var start = new Date(1900, 0, 1, 0, 0, 0, 0),
//         end = getNow(0);
//
//       end.setHours(0, 0, 0, 0);
//       end.setFullYear(end.getFullYear() - 4);
//
//       return test('this computer is more than 4 years old', 'this computer', start, end, true);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours(), start.getMinutes() + 5, 0, 0);
//
//       return test('in 5 minutes', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0);
//       start.setHours(start.getHours() + 7, start.getMinutes(), 0, 0);
//
//       return test('in seven hours', null, start, null, false);
//     });
//
//     (function() {
//       var start = getNow(0),
//           end = getNow(0);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(12, 0, 0, 0);
//
//       return test('the party goes from midnight to noon', 'the party goes', start, end, false);
//     });
//
//     (function() {
//       return test('ahskjhdsfkhasd .', 'ahskjhdsfkhasd', null, null, false);
//     });
//
//     (function() {
//       var start = getNow(0),
//           end = getNow(0);
//
//       start.setHours(0, 0, 0, 0);
//       end.setHours(0, 0, 0, 0);
//       end.setDate(start.getDate() + 2);
//       return test('Event starts today ends within two days.', 'Event', start, end, true);
//     });
//
//     (function() {
//       return test('-', null, null, null, false);
//     });
//
//     (function() {
//       return test('', null, null, null, false);
//     });
//
//     (function() {
//       return test(' ', null, null, null, false);
//     });
//
//     (function() {
//       return test(null, null, null, null, false);
//     })()
