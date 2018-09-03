import Sherlock from './shared';

const timeToday = (hours, minutes) => {
  const d = new Date();
  d.setHours(hours, minutes, 0);
  return d;
};

describe('Sherlock', () => {
  sharedExamplesFor('Sherlock', Sherlock);

  context('when the current time is "Dec 03, 2012 04:35:00"', () => {
    itBehavesLike('Sherlock', new Date('Dec 03, 2012 04:35:00'));
  });

  context('when the current time is "Feb 02, 2013 04:01:00"', () => {
    itBehavesLike('Sherlock', new Date('Feb 02, 2013 04:01:00'));
  });

  context('when the current time is "Jan 29, 2013 00:01:00"', () => {
    itBehavesLike('Sherlock', new Date('Jan 29, 2013 00:01:00'));
  });

  context('when the current time is "June 30, 2013 14:01:00"', () => {
    itBehavesLike('Sherlock', new Date('June 30, 2013 14:01:00'));
  });

  context('when the current time is "Jan 31, 2013 04:01:00"', () => {
    itBehavesLike('Sherlock', new Date('Jan 31, 2013 04:01:00'));
  });

  context('when the current time is "Feb 27, 2013 04:01:00"', () => {
    itBehavesLike('Sherlock', new Date('Feb 27, 2013 04:01:00'));
  });

  context('when the current time is "Feb 24, 2013 04:01:00"', () => {
    itBehavesLike('Sherlock', new Date('Feb 24, 2013 04:01:00'));
  });

  context('when the current time is "Feb 24, 2013 15:01:00"', () => {
    itBehavesLike('Sherlock', new Date('Feb 24, 2013 15:01:00'));
  });

  context('when the current time is "March 3, 2013 12:01:00"', () => {
    itBehavesLike('Sherlock', new Date('March 3, 2013 12:01:00'));
  });

  context('when the current time is "March 3, 2013 14:01:00"', () => {
    itBehavesLike('Sherlock', new Date('March 3, 2013 14:01:00'));
  });

  context('when the current time is "October 27, 2018 22:34:40"', () => {
    itBehavesLike('Sherlock', new Date('October 27, 2018 22:34:40'));
  });

  context('when the current date is today', () => {
    context('and the current time is now', () => {
      itBehavesLike('Sherlock', new Date());
    });

    context('and the current time is 00:00', () => {
      itBehavesLike('Sherlock', timeToday(0, 0));
    });

    context('and the current time is 00:01', () => {
      itBehavesLike('Sherlock', timeToday(0, 1));
    });

    context('and the current time is 02:00', () => {
      itBehavesLike('Sherlock', timeToday(2, 0));
    });

    context('and the current time is 06:00', () => {
      itBehavesLike('Sherlock', timeToday(6, 0));
    });

    context('and the current time is 12:00', () => {
      itBehavesLike('Sherlock', timeToday(12, 0));
    });

    context('and the current time is 14:00', () => {
      itBehavesLike('Sherlock', timeToday(14, 0));
    });

    context('and the current time is 15:00', () => {
      itBehavesLike('Sherlock', timeToday(15, 0));
    });

    context('and the current time is 16:10', () => {
      itBehavesLike('Sherlock', timeToday(16, 10));
    });

    context('and the current time is 23:30', () => {
      itBehavesLike('Sherlock', timeToday(23, 30));
    });
  });
});
