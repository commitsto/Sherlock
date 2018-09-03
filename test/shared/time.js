import { monthDiff } from './utils';

export default (currentTime) => {
  describe('times', () => {
    context('when the input is "Homework 5 due monday at 3pm"', () => {
      def('input', 'Homework 5 due monday at 3pm');

      const start = new Date(currentTime);
      let diff = 1 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(15, 0, 0, 0);

      def('title', 'Homework 5');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Homework 5 due next fri@3pm"', () => {
      def('input', 'Homework 5 due next fri@3pm');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 5 + 7 - start.getDay());
      start.setHours(15, 0, 0, 0);

      def('title', 'Homework 5');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "fourth of july @ 2"', () => {
      def('input', 'fourth of july @ 2');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 6, 4, 14);

      if (start < now && monthDiff(start, now) >= 3) {
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The koala will be set free on the fourth of july @noon"', () => {
      def('input', 'The koala will be set free on the fourth of july @noon');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 6, 4, 12);

      if (start < now && monthDiff(start, now) >= 3) {
        start.setFullYear(start.getFullYear() + 1);
      }

      def('title', 'The koala will be set free');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "@2"', () => {
      def('input', '@2');

      const start = new Date(currentTime);
      if (start.getHours() >= 14) {
        start.setDate(start.getDate() + 1);
      }
      start.setHours(14, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "fourth of july at midnight"', () => {
      def('input', 'fourth of july at midnight');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), 6, 4);

      if (start < now && monthDiff(start, now) >= 3)
        start.setFullYear(start.getFullYear() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });
  });
};
