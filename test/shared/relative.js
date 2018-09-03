import { monthDiff } from './utils';

export default (currentTime) => {
  describe('relative dates', () => {
    context('when the input is "oxt wednesday"', () => {
      def('input', 'oxt wednesday');

      const start = new Date(currentTime);
      const diff = 3 + 14 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Vacation is in 4 weeks..."', () => {
      def('input', 'Vacation is in 4 weeks...');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 7 * 4);
      start.setHours(0, 0, 0, 0);

      def('title', 'Vacation');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "The exam is in three weeks from tomorrow."', () => {
      def('input', 'The exam is in three weeks from tomorrow.');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 7 * 3 + 1);
      start.setHours(0, 0, 0, 0);

      def('title', 'The exam');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Bake a cake tomorrow."', () => {
      def('input', 'Bake a cake tomorrow.');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      def('title', 'Bake a cake');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Bake a cake tom."', () => {
      def('input', 'Bake a cake tom.');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      def('title', 'Bake a cake');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Bake a cake tmrw."', () => {
      def('input', 'Bake a cake tmrw.');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      def('title', 'Bake a cake');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Use Tabule today!"', () => {
      def('input', 'Use Tabule today!');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);

      def('title', 'Use Tabule');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Use Tabule tod!"', () => {
      def('input', 'Use Tabule tod!');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);

      def('title', 'Use Tabule');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Eat more kale this week"', () => {
      def('input', 'Eat more kale this week');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);

      def('title', 'Eat more kale');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Eat more kale this month"', () => {
      def('input', 'Eat more kale this month');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);

      def('title', 'Eat more kale');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Eat more kale this year"', () => {
      def('input', 'Eat more kale this year');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);

      def('title', 'Eat more kale');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in 3 years"', () => {
      def('input', 'in 3 years');

      const now = new Date(currentTime);
      def('title', null);
      def('startDate', () => new Date(now.getFullYear() + 3, now.getMonth(), now.getDate()));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10 years from now"', () => {
      def('input', '10 years from now');

      const now = new Date(currentTime);
      def('title', null);
      def('startDate', () => new Date(now.getFullYear() + 10, now.getMonth(), now.getDate()));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "next year"', () => {
      def('input', 'next year');

      const now = new Date(currentTime);
      def('title', null);
      def('startDate', () => new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "last year"', () => {
      def('input', 'last year');

      const now = new Date(currentTime);
      def('title', null);
      def('startDate', () => new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()));
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "week next sat"', () => {
      def('input', 'week next sat');

      const start = new Date(currentTime);
      const diff = 6 + 14 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "next wednesday"', () => {
      def('input', 'next wednesday');

      const start = new Date(currentTime);
      const diff = 3 + 7 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "next week on sunday at 4"', () => {
      def('input', 'next week on sunday at 4');

      const start = new Date(currentTime);
      const diff = 0 + 7 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(16, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "next week friday"', () => {
      def('input', 'next week friday');

      const start = new Date(currentTime);
      const diff = 5 + 7 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in 3 hours"', () => {
      def('input', 'in 3 hours');

      const start = new Date(currentTime);
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in an hours"', () => {
      def('input', 'in an hours');

      const start = new Date(currentTime);
      start.setHours(start.getHours() + 1, start.getMinutes(), 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in three hours"', () => {
      def('input', 'in three hours');

      const start = new Date(currentTime);
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in eight days"', () => {
      def('input', 'in eight days');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 8);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in one days"', () => {
      def('input', 'in one days');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in a days"', () => {
      def('input', 'in a days');

      const start = new Date(currentTime);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "three hours from now"', () => {
      def('input', 'three hours from now');

      const start = new Date(currentTime);
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "3 hours from now"', () => {
      def('input', '3 hours from now');

      const start = new Date(currentTime);
      start.setHours(start.getHours() + 3, start.getMinutes(), 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "tom"', () => {
      def('input', 'tom');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "day after tomorrow"', () => {
      def('input', 'day after tomorrow');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 2);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "day after tmrw"', () => {
      def('input', 'day after tmrw');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 2);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "day before yesterday"', () => {
      def('input', 'day before yesterday');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 2);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "day before yest"', () => {
      def('input', 'day before yest');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 2);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "next month"', () => {
      def('input', 'next month');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setMonth(start.getMonth() + 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "last month"', () => {
      def('input', 'last month');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setMonth(start.getMonth() - 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "next week"', () => {
      def('input', 'next week');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() + 7);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "last week"', () => {
      def('input', 'last week');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 7);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting last mon at 3pm"', () => {
      def('input', 'Meeting last mon at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 1;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting last tues at 3pm"', () => {
      def('input', 'Meeting last tues at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 2;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting last wed at 3pm"', () => {
      def('input', 'Meeting last wed at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 3;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting last thurs at 3pm"', () => {
      def('input', 'Meeting last thurs at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 4;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting last fri at 3pm"', () => {
      def('input', 'Meeting last fri at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 5;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting last sat at 3pm"', () => {
      def('input', 'Meeting last sat at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 6;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting last sunday at 3pm"', () => {
      def('input', 'Meeting last sunday at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 0;
      diff -= 7;
      if (diff >= 0)
        diff -= 7
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting next mon at 3pm"', () => {
      def('input', 'Meeting next mon at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 1;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting next tues at 3pm"', () => {
      def('input', 'Meeting next tues at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 2;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting next wed at 3pm"', () => {
      def('input', 'Meeting next wed at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 3;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting next thurs at 3pm"', () => {
      def('input', 'Meeting next thurs at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 4;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting next fri at 3pm"', () => {
      def('input', 'Meeting next fri at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 5;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting next sat at 3pm"', () => {
      def('input', 'Meeting next sat at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 6;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting next sunday at 3pm"', () => {
      def('input', 'Meeting next sunday at 3pm');

      const start = new Date(currentTime);
      let diff = 7 - start.getDay() + 0;
      start.setHours(15, 0, 0, 0);
      start.setDate(start.getDate() + diff);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "5 years ago"', () => {
      def('input', '5 years ago');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setFullYear(start.getFullYear() - 5);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "10 days ago"', () => {
      def('input', '10 days ago');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 10);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "435 days ago"', () => {
      def('input', '435 days ago');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 435);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "43 days ago"', () => {
      def('input', '43 days ago');

      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 43);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "3 days ago to now"', () => {
      def('input', '3 days ago to now');

      const start = new Date(currentTime);
      const end = new Date(currentTime);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 3);
      end.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "3 hours ago to now"', () => {
      def('input', '3 hours ago to now');

      const start = new Date(currentTime);
      const end = new Date(currentTime);
      start.setHours(start.getHours() - 3, start.getMinutes(), start.getSeconds(), 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "56 hours ago"', () => {
      def('input', '56 hours ago');

      const start = new Date(currentTime);
      start.setHours(start.getHours() - 56, start.getMinutes(), 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in 5 minutes"', () => {
      def('input', 'in 5 minutes');

      const start = new Date(currentTime);
      start.setHours(start.getHours(), start.getMinutes() + 5, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "in seven hours"', () => {
      def('input', 'in seven hours');

      const start = new Date(currentTime);
      start.setHours(start.getHours() + 7, start.getMinutes(), 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "this computer is more than 4 years old"', () => {
      def('input', 'this computer is more than 4 years old');

      const start = new Date(1900, 0, 1, 0, 0, 0, 0);
      const end = new Date(currentTime);

      end.setHours(0, 0, 0, 0);
      end.setFullYear(end.getFullYear() - 4);

      def('title', 'this computer');
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "more than an hour ago"', () => {
      def('input', 'more than an hour ago');

      const start = new Date(1900, 0, 1, 0, 0, 0, 0);
      const end = new Date(currentTime);
      end.setHours(end.getHours() - 1);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "less than 3 months ago"', () => {
      def('input', 'less than 3 months ago');

      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setMonth(start.getMonth() - 3);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "fewer than 5 hours from now"', () => {
      def('input', 'fewer than 5 hours from now');

      const start = new Date(currentTime);
      const end = new Date(currentTime);
      end.setHours(end.getHours() + 5);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "less than oct 5 ago"', () => {
      def('input', 'less than oct 5 ago');

      const start = new Date(currentTime);
      start.setMonth(9, 5);
      start.setHours(0, 0, 0, 0);
      if (monthDiff(start, new Date(currentTime)) >= 3) {
        start.setFullYear(start.getFullYear() + 1);
      }

      let date1 = start;
      let date2 = new Date(currentTime);
      if (start >= new Date(currentTime)) {
        date1 = new Date(currentTime);
        date2 = start;
      }

      def('title', 'ago');
      def('startDate', () => date1);
      def('endDate', () => date2);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "more than today"', () => {
      def('input', 'more than today');

      const end = new Date(3000, 0, 1, 0, 0, 0, 0);
      const start = new Date(currentTime);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "older than 2 months from now"', () => {
      def('input', 'older than 2 months from now');

      const start = new Date(1900, 0, 1, 0, 0, 0, 0);
      const end = new Date(currentTime);
      end.setMonth(end.getMonth() + 2);
      end.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "more than 2 weeks from now"', () => {
      def('input', 'more than 2 weeks from now');

      const end = new Date(3000, 0, 1, 0, 0, 0, 0);
      const start = new Date(currentTime);
      start.setDate(start.getDate() + 14);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "less than now"', () => {
      def('input', 'less than now');

      const start = new Date(1900, 0, 1, 0, 0, 0, 0);
      const end = new Date(currentTime);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "more than now"', () => {
      def('input', 'more than now');

      const end = new Date(3000, 0, 1, 0, 0, 0, 0);
      const start = new Date(currentTime);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "more than 5 days ago"', () => {
      def('input', 'more than 5 days ago');

      const start = new Date(1900, 0, 1, 0, 0, 0, 0);
      const end = new Date(currentTime);
      end.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 5);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "more than oct 5"', () => {
      def('input', 'more than oct 5');

      const start = new Date(currentTime);
      start.setMonth(9, 5);
      start.setHours(0, 0, 0, 0);

      if (monthDiff(start, new Date(currentTime)) >= 3) {
        start.setFullYear(start.getFullYear() + 1);
      }

      let date1 = new Date(1900, 0, 1, 0, 0, 0, 0);
      let date2 = start;
      if (start >= new Date(currentTime)) {
        date1 = start;
        date2 = new Date(3000, 0, 1, 0, 0, 0, 0);
      }

      def('title', null);
      def('startDate', () => date1);
      def('endDate', () => date2);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "after tomorrow"', () => {
      def('input', 'after tomorrow');

      const start = new Date(currentTime);
      const end = new Date(3000, 0, 1, 0, 0, 0, 0);

      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "after yesterday"', () => {
      def('input', 'after yesterday');

      const start = new Date(currentTime);
      const end = new Date(3000, 0, 1, 0, 0, 0, 0);

      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "before 5 days"', () => {
      def('input', 'before 5 days');

      const end = new Date(currentTime);
      const start = new Date(1900, 0, 1, 0, 0, 0, 0);

      end.setDate(end.getDate() + 5);
      end.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "before yesterday"', () => {
      def('input', 'before yesterday');

      const end = new Date(currentTime);
      const start = new Date(1900, 0, 1, 0, 0, 0, 0);

      end.setDate(end.getDate() - 1);
      end.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "less than today"', () => {
      def('input', 'less than today');

      const start = new Date(1900, 0, 1, 0, 0, 0, 0);
      const end = new Date(currentTime);
      end.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });
  });
};
