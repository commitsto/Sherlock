import sherlock from '../src/sherlock';

import parsedEntry from './shared/parsed_entry';

import date from './shared/date';
import day from './shared/day';
import range from './shared/range';
import relative from './shared/relative';
import slashed from './shared/slashed';
import time from './shared/time';

sharedExamplesFor('a parsed entry', parsedEntry);

sharedExamplesFor('a date', date);
sharedExamplesFor('a day', day);
sharedExamplesFor('a range', range);
sharedExamplesFor('a relative date', relative);
sharedExamplesFor('a time', time);
sharedExamplesFor('a slashed date range', slashed);

export default (currentTime) => {
  subject('sherlock', () => {
    const Sherlock = new sherlock({
      config: {
        currentTime,
        // debug: true,
      },
    });
    return Sherlock.parse($input);
  });

  itBehavesLike('a date', currentTime);
  itBehavesLike('a day', currentTime);
  itBehavesLike('a range', currentTime);
  itBehavesLike('a relative date', currentTime);
  itBehavesLike('a time', currentTime);
  itBehavesLike('a slashed date range', currentTime);

  context('when the input is "Send those four emails before leaving work today by 1800"', () => {
    def('input', 'Send those four emails before leaving work today by 1800');

    const now = new Date(currentTime);
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15);

    def('title', 'Send those four emails before leaving work');
    def('startDate', () => start);
    def('endDate', () => null);
    def('isAllDay', false);

    itBehavesLike('a parsed entry');
  });

  context('when then input is invalid', () => {
    context('when the input is "0:00"', () => {
      def('input', '0:00');

      def('title', '0:00');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "12:0 A.M."', () => {
      def('input', '12:0 A.M.');

      def('title', '12:0 A.M.');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "02:0 A.M."', () => {
      def('input', '02:0 A.M.');

      def('title', '02:0 A.M.');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "ahskjhdsfkhasd."', () => {
      def('input', 'ahskjhdsfkhasd.');

      def('title', 'ahskjhdsfkhasd.');
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is "-"', () => {
      def('input', '-');

      def('title', null);
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is ""', () => {
      def('input', '');

      def('title', null);
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is " "', () => {
      def('input', ' ');

      def('title', null);
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });

    context('when the input is null', () => {
      def('input', null);

      def('title', null);
      def('startDate', () => null);
      def('endDate', () => null);
      def('isAllDay', false);

      itBehavesLike('a parsed entry');
    });
  });
};
