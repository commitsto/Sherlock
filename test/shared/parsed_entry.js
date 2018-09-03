import { expect } from 'chai';

const parsedEntry = () => {
  it('parses the title if given', () =>
    expect($subject.eventTitle).to.eq($title)
  );

  it('parses the start date if given', () => {
    if ($startDate) {
      expect($subject.startDate).to.equalDate($startDate);
    }
  });

  it('parses the end date if given', () => {
    if ($endDate) {
      expect($subject.endDate).to.equalDate($endDate);
    }
  });

  it('parses the date as "all day" if no time is given', () =>
    expect($subject.isAllDay).to.eq($isAllDay)
  );
};

export default parsedEntry;
