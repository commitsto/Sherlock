export default (currentTime) => {
  describe('slashed date range', () => {
    context('when then input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() - 3);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' - ' + (end.getMonth() + 1) + '/' + end.getDate());

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when then input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 1);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' - ' + (end.getMonth() + 1) + '/' + end.getDate());

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when then input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 1);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' - tomorrow');

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when then input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 1);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' -tom');

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when then input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 2);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' - day after tom');

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when then input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 2);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' -day after tomorrow');

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when then input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);
      end.setDate(end.getDate() + 2);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' -' + (end.getMonth() + 1) + '/' + end.getDate());

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' - ' + (end.getMonth() + 1) + '/' + end.getDate());

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' - today');

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });

    context('when the input is a slashed date range', () => {
      const start = new Date(currentTime);
      const end = new Date(currentTime);

      start.setDate(start.getDate() - 5);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      def('input', start.getMonth() + 1 + '/' + start.getDate() + ' -tod');

      def('title', null);
      def('startDate', start);
      def('endDate', end);
      def('isAllDay', true);

      itBehavesLike('a parsed entry');
    });
  });
};
