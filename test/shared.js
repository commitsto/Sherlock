import Sherlock from '../src/sherlock';

import parsedEntry from './shared/parsed_entry';

import date from './shared/date';
import day from './shared/day';
import range from './shared/range';
import relative from './shared/relative';
import time from './shared/time';

sharedExamplesFor('a parsed entry', parsedEntry);

sharedExamplesFor('a date', date);
sharedExamplesFor('a day', day);
sharedExamplesFor('a range', range);
sharedExamplesFor('a relative date', relative);
sharedExamplesFor('a time', time);

export default (currentTime) => {
  subject('sherlock', () => {
    Sherlock._setNow(currentTime);
    return Sherlock.parse($input);
  });

  itBehavesLike('a date', currentTime);
  itBehavesLike('a day', currentTime);
  itBehavesLike('a range', currentTime);
  itBehavesLike('a relative date', currentTime);
  itBehavesLike('a time', currentTime);

  // TODO merge changes from https://github.com/neilgupta/Sherlock/commit/7d3468b053e0367d992b255aaef8dfa3d7f18dcf

  // context('when the input is "Send those four emails before leaving work today by 1800"', () => {
  //   def('input', 'Send those four emails before leaving work today by 1800');
  //
  //   const now = new Date(currentTime);
  //   const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15);
  //
  //   def('title', 'Send those four emails before leaving work');
  //   def('startDate', () => start);
  //   def('endDate', () => null);
  //   def('isAllDay', false);
  //
  //   itBehavesLike('a parsed entry');
  // });
};
