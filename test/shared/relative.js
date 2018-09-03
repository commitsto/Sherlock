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
  });
};
