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

    context('when the input is "Homework due yesterday at 3pm"', () => {
      def('input', 'Homework due yesterday at 3pm');

      const start = new Date(currentTime);
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() - 1);

      def('title', 'Homework');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Homework due yest at 3pm"', () => {
      def('input', 'Homework due yest at 3pm');

      const start = new Date(currentTime);
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() - 1);

      def('title', 'Homework');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12:00am"', () => {
      def('input', '12:00am');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12:00 am"', () => {
      def('input', '12:00 am');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12:00 A.M."', () => {
      def('input', '12:00 A.M.');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12:00a.M."', () => {
      def('input', '12:00a.M.');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "00:00"', () => {
      def('input', '00:00');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "02:00"', () => {
      def('input', '02:00');

      const start = new Date(currentTime);
      if (start.getHours() >= 2) {
        start.setDate(start.getDate() + 1);
      }
      start.setHours(2, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "17:00"', () => {
      def('input', '17:00');

      const start = new Date(currentTime);
      if (start.getHours() >= 17) {
        start.setDate(start.getDate() + 1);
      }
      start.setHours(17, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "nine o\'clock"', () => {
      def('input', 'nine o\'clock');

      const start = new Date(currentTime);
      start.setHours(9, 0, 0, 0);
      if (start.getHours() <= new Date(currentTime).getHours()) {
        if (new Date(currentTime).getHours() < 21)
          start.setHours(21);
        else
          start.setDate(start.getDate() + 1);
      }

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The party is tonight"', () => {
      def('input', 'The party is tonight');

      const start = new Date(currentTime);
      if (start.getHours() < 21)
        start.setHours(21, 0, 0, 0);

      def('title', 'The party');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Wake up at dawn"', () => {
      def('input', 'Wake up at dawn');

      const start = new Date(currentTime);
      if (start.getHours() >= 5)
        start.setDate(start.getDate() + 1);
      start.setHours(5, 0, 0, 0);

      def('title', 'Wake up');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Eat breakfast in the morning"', () => {
      def('input', 'Eat breakfast in the morning');

      const start = new Date(currentTime);
      if (start.getHours() >= 8)
        start.setDate(start.getDate() + 1);
      start.setHours(8, 0, 0, 0);

      def('title', 'Eat breakfast');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Eat lunch in the afternoon"', () => {
      def('input', 'Eat lunch in the afternoon');

      const start = new Date(currentTime);
      if (start.getHours() >= 14)
        start.setDate(start.getDate() + 1);
      start.setHours(14, 0, 0, 0);

      def('title', 'Eat lunch');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Eat dinner in the evening"', () => {
      def('input', 'Eat dinner in the evening');

      const start = new Date(currentTime);
      if (start.getHours() >= 19)
        start.setDate(start.getDate() + 1);
      start.setHours(19, 0, 0, 0);

      def('title', 'Eat dinner');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Go to sleep at night"', () => {
      def('input', 'Go to sleep at night');

      const start = new Date(currentTime);
      if (start.getHours() >= 21)
        start.setDate(start.getDate() + 1);
      start.setHours(21, 0, 0, 0);

      def('title', 'Go to sleep');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "midnight"', () => {
      def('input', 'midnight');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "noon"', () => {
      def('input', 'noon');

      const start = new Date(currentTime);
      if (start.getHours() >= 12)
        start.setDate(start.getDate() + 1);
      start.setHours(12, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The exam is right now"', () => {
      def('input', 'The exam is right now');

      const start = new Date(currentTime);

      def('title', 'The exam');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The exam"', () => {
      def('input', 'The exam');

      def('title', 'The exam');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });
  });
};
