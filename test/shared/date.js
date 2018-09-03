import { monthDiff } from './utils';

export default (currentTime) => {
  describe('date formatting', () => {
    context('when the input is "12/3"', () => {
      def('input', '12/3');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 3);

      now.setHours(0, 0, 0, 0);
      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12/3 @ 3"', () => {
      def('input', '12/3 @ 3');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 3, 15);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12/3 @3pm"', () => {
      def('input', '12/3 @3pm');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 3, 15);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12/3@3pm"', () => {
      def('input', '12/3@3pm');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 3, 15);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12/03"', () => {
      def('input', '12/03');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 3);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12.03"', () => {
      def('input', '12.03');

      def('title', '12.03');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12.3"', () => {
      def('input', '12.3');

      def('title', '12.3');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12/23"', () => {
      def('input', '12/23');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 23);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12.12"', () => {
      def('input', '12.12');

      def('title', '12.12');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "9/1"', () => {
      def('input', '9/1');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 8, 1);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "9/0"', () => {
      def('input', '9/0');

      def('title', '9/0');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "9/19"', () => {
      def('input', '9/19');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 8, 19);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10/90"', () => {
      def('input', '10/90');

      def('title', '10/90');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10/9/14"', () => {
      def('input', '10/9/14');

      def('title', null);
      def('startDate', () => new Date(2014, 9, 9));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10/9/12"', () => {
      def('input', '10/9/12');

      def('title', null);
      def('startDate', () => new Date(2012, 9, 9));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "March 3 2014"', () => {
      def('input', 'March 3 2014');

      def('title', null);
      def('startDate', () => new Date(2014, 2, 3));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "7 feb 2012"', () => {
      def('input', '7 feb 2012');

      def('title', null);
      def('startDate', () => new Date(2012, 1, 7));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "6 jan 2017"', () => {
      def('input', '6 jan 2017');

      def('title', null);
      def('startDate', () => new Date(2017, 0, 6));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "6 jan 1990"', () => {
      def('input', '6 jan 1990');

      def('title', null);
      def('startDate', () => new Date(1990, 0, 6));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "6 jan 1930"', () => {
      def('input', '6 jan 1930');

      const now = new Date(currentTime);
      const start = new Date(currentTime);

      start.setMonth(0, 6);
      start.setHours(19, 30, 0, 0);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10/9/0"', () => {
      def('input', '10/9/0');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 9, 9);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', '0');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10/1"', () => {
      def('input', '10/1');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 9, 1);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10/01"', () => {
      def('input', '10/01');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 9, 1);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10-01"', () => {
      def('input', '10-01');

      const start = new Date(currentTime);
      const now = new Date(currentTime);
      start.setHours(10, 0, 0, 0);

      if (start.getHours() <= now.getHours()) {
        if (now.getHours() < 22)
          start.setHours(22);
        else
          start.setDate(start.getDate() + 1);
      }

      def('title', '01');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "the 15th."', () => {
      def('input', 'the 15th.');

      const now = new Date(currentTime);
      const start = new Date(currentTime);

      start.setDate(15);
      start.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (start < now)
        start.setMonth(start.getMonth() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Christmas is on December 25th."', () => {
      def('input', 'Christmas is on December 25th.');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 25);

      if (start < now && monthDiff(start, now) >= 3) {
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', 'Christmas');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Let\'s have lunch on the 3rd."', () => {
      def('input', 'Let\'s have lunch on the 3rd.');

      const now = new Date(currentTime);
      const start = new Date(currentTime);

      start.setDate(3);
      start.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (start < now) {
        start.setMonth(start.getMonth() + 1);
      }

      def('title', 'Let\'s have lunch');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "fourth of jul"', () => {
      def('input', 'fourth of jul');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 6, 4);

      if (start < now && monthDiff(start, now) >= 3) {
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "My mom\'s birthday is on the 27th"', () => {
      def('input', 'My mom\'s birthday is on the 27th');

      const now = new Date(currentTime);
      const start = new Date(currentTime);

      start.setDate(27);
      start.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      if (start < now)
        start.setMonth(start.getMonth() + 1);

      def('title', 'My mom\'s birthday');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Homework was on Jan 2"', () => {
      def('input', 'Homework was on Jan 2');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setMonth(0, 2);

      def('title', 'Homework');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });
  });
};
