import { monthDiff } from './utils';

export default (currentTime) => {
  describe('date ranges', () => {
    context('when the input is "Event starts today ends within two days."', () => {
      def('input', 'Event starts today ends within two days.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      end.setDate(start.getDate() + 2);

      def('title', 'Event');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when a date range is given', () => {
      def('input', 'dec 1st at 9am through dec fifth 8pm');

      def('title', null);
      def('isAllDay', false);
      def('startDate', () => new Date(currentTime.getFullYear(), 11, 1, 9));
      def('endDate', () => new Date(currentTime.getFullYear(), 11, 5, 20));

      if ($endDate < currentTime && monthDiff($endDate, currentTime) >= 3) {
        $endDate.setFullYear($endDate.getFullYear() + 1);
        $startDate.setFullYear($startDate.getFullYear() + 1);
      }

      itBehavesLike('a parsed entry');
    });

    context('when the input is "dec 1 at 3pm - dec 11"', () => {
      def('input', 'dec 1 at 3pm - dec 11');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 1, 15);
      const end = new Date(now.getFullYear(), 11, 11, 15);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "on the 5th to the ninth, we shall eat."', () => {
      def('input', 'on the 5th to the ninth, we shall eat.');

      const now = new Date(currentTime);
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(5);
      end.setDate(9);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);

      if (end < now || start < now) {
        end.setMonth(end.getMonth() + 1);
        start.setMonth(start.getMonth() + 1);
      }

      def('title', 'we shall eat.');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "February 24 at 3pm - 2pm March 3"', () => {
      def('input', 'February 24 at 3pm - 2pm March 3');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 1, 24, 15, 0);
      const end = new Date(now.getFullYear(), 2, 3, 14, 0);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "February 24 at 3pm-2pm March 3"', () => {
      def('input', 'February 24 at 3pm-2pm March 3');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 1, 24, 15);
      const end = new Date(now.getFullYear(), 2, 3, 14);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The retreat is from Jan 12 - 29."', () => {
      def('input', 'The retreat is from Jan 12 - 29.');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 0, 12);
      const end = new Date(now.getFullYear(), 0, 29);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', 'The retreat');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "dec 2 - 5"', () => {
      def('input', 'dec 2 - 5');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 2);
      const end = new Date(now.getFullYear(), 11, 5);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "dec 0 - 11"', () => {
      def('input', 'dec 0 - 11');

      def('title', 'dec 0 - 11');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "dec 1st at 9am through dec fifth 8pm"', () => {
      def('input', 'dec 1st at 9am through dec fifth 8pm');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 1, 9);
      const end = new Date(now.getFullYear(), 11, 5, 20);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "dec 1 - 11"', () => {
      def('input', 'dec 1 - 11');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 1);
      const end = new Date(now.getFullYear(), 11, 11);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10-1"', () => {
      def('input', '10-1');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      end.setHours(13, 0, 0, 0);
      if (end < new Date(currentTime)) {
        start.setHours(22, 0, 0, 0);
        end.setDate(end.getDate() + 1);
      } else {
        start.setHours(10, 0, 0, 0);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "today 3-5"', () => {
      def('input', 'today 3-5');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(15, 0, 0, 0);
      end.setHours(17, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });


    context('when the input is "The conference is from Feb 12 to 15th."', () => {
      def('input', 'The conference is from Feb 12 to 15th.');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 1, 12);
      const end = new Date(now.getFullYear(), 1, 15);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', 'The conference');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The conference is from Feb 12 at 3pm to the 15th."', () => {
      def('input', 'The conference is from Feb 12 at 3pm to the 15th.');

      var now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 1, 12, 15);
      const end = new Date(now.getFullYear(), 1, 15, 15);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', 'The conference');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "I work from 1am - 6pm."', () => {
      def('input', 'I work from 1am - 6pm.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(1, 0, 0, 0);
      end.setHours(18, 0, 0, 0);

      def('title', 'I work');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "I work from 6pm - 1am."', () => {
      def('input', 'I work from 6pm - 1am.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(18, 0, 0, 0);
      end.setHours(1, 0, 0, 0);

      if (end < new Date(currentTime)) {
        end.setDate(end.getDate() + 1);
      } else {
        start.setDate(start.getDate() - 1);
      }

      def('title', 'I work');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "I work from 11pm - 10pm today."', () => {
      def('input', 'I work from 11pm - 10pm today.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 1);
      start.setHours(23, 0, 0, 0);
      end.setHours(22, 0, 0, 0);

      if (end < new Date(currentTime)) {
        end.setDate(end.getDate() + 1);
        start.setDate(start.getDate() + 1);
      }

      def('title', 'I work');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "I work from 6pm - 1am today."', () => {
      def('input', 'I work from 6pm - 1am today.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 1);
      start.setHours(18, 0, 0, 0);
      end.setHours(1, 0, 0, 0);

      if (end < new Date(currentTime)) {
        end.setDate(end.getDate() + 1);
        start.setDate(start.getDate() + 1);
      }

      def('title', 'I work');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "I work from 6pm - 1am tomorrow."', () => {
      def('input', 'I work from 6pm - 1am tomorrow.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(18, 0, 0, 0);
      end.setHours(1, 0, 0, 0);
      end.setDate(end.getDate() + 1);

      def('title', 'I work');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "I work from 6pm - 6am tomorrow."', () => {
      def('input', 'I work from 6pm - 6am tomorrow.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(18, 0, 0, 0);
      end.setHours(6, 0, 0, 0);
      end.setDate(end.getDate() + 1);

      def('title', 'I work');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });


    context('when the input is "thurs - next sat"', () => {
      def('input', 'thurs - next sat');

      const start = new Date(currentTime);
      let diff1 = 4 + 7 - start.getDay();

      if (diff1 > 7) diff1 -= 7;
      start.setDate(start.getDate() + diff1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      const diff2 = 6 + 7 - end.getDay();
      end.setDate(end.getDate() + diff2);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "thu - next sat"', () => {
      def('input', 'thu - next sat');

      const start = new Date(currentTime);
      let diff1 = 4 + 7 - start.getDay();

      if (diff1 > 7) diff1 -= 7;
      start.setDate(start.getDate() + diff1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      const diff2 = 6 + 7 - end.getDay();
      end.setDate(end.getDate() + diff2);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "thur - next sat"', () => {
      def('input', 'thur - next sat');

      const start = new Date(currentTime);
      let diff1 = 4 + 7 - start.getDay();

      if (diff1 > 7) diff1 -= 7;
      start.setDate(start.getDate() + diff1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      const diff2 = 6 + 7 - end.getDay();
      end.setDate(end.getDate() + diff2);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The party is tomorrow from 3pm to 5pm."', () => {
      def('input', 'The party is tomorrow from 3pm to 5pm.');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 1);
      start.setHours(15, 0, 0, 0);
      end.setHours(17, 0, 0, 0);

      def('title', 'The party');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "first of july through 5th of aug"', () => {
      def('input', 'first of july through 5th of aug');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 6, 1);
      const end = new Date(now.getFullYear(), 7, 5);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The exam is @ 2pm and lasts for five hours"', () => {
      def('input', 'The exam is @ 2pm and lasts for five hours');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(14, 0, 0, 0);
      end.setHours(19, 0, 0, 0);

      def('title', 'The exam');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The exam is @ 2pm and goes until 4pm"', () => {
      def('input', 'The exam is @ 2pm and goes until 4pm');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(14, 0, 0, 0);
      end.setHours(16, 0, 0, 0);

      def('title', 'The exam');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "dec 1 at 3pm - 11"', () => {
      def('input', 'dec 1 at 3pm - 11');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 11, 1, 15);
      const end = new Date(now.getFullYear(), 11, 1, 23);

      if (end < now && monthDiff(end, now) >= 3) {
        end.setFullYear(end.getFullYear() + 1);
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "the party goes from midnight to noon"', () => {
      def('input', 'the party goes from midnight to noon');
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setHours(0, 0, 0, 0);
      end.setHours(12, 0, 0, 0);

      def('title', 'the party goes');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });
  });
};
