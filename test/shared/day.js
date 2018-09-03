export default (currentTime) => {
  describe('days', () => {
    context('when the input is "sunday"', () => {
      def('input', 'sunday');

      const start = new Date(currentTime);
      const diff = 0 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "monday"', () => {
      def('input', 'monday');

      const start = new Date(currentTime);
      let diff = 1 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "tuesday"', () => {
      def('input', 'tuesday');

      const start = new Date(currentTime);
      let diff = 2 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "wednesday"', () => {
      def('input', 'wednesday');

      const start = new Date(currentTime);
      let diff = 3 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "wed"', () => {
      def('input', 'wed');

      const start = new Date(currentTime);
      let diff = 3 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "thursday"', () => {
      def('input', 'thursday');

      const start = new Date(currentTime);
      let diff = 4 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "saturday"', () => {
      def('input', 'saturday');

      const start = new Date(currentTime);
      let diff = 6 + 7 - start.getDay();

      if (diff > 7) diff -= 7;
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "thu week"', () => {
      def('input', 'thu week');

      const start = new Date(currentTime);
      const diff = 4 + 14 - start.getDay();

      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);

      def('title', null);
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "Meeting today at 15"', () => {
      def('input', 'Meeting today at 15');

      const now = new Date(currentTime);
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15);

      def('title', 'Meeting');
      def('startDate', () => start);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });
  });
};
