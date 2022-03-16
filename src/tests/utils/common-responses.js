export const partyListBallot = {
  ballot_paper_id: 'gla.a.2020-05-07',
  election_id: 'gla.a.2020-05-07',
  voting_system: {
    slug: 'AMS',
    name: 'Additional Member System',
    uses_party_lists: true,
  },
  seats_contested: 2,
  candidates_verified: true,
  candidates: [
    {
      list_position: 1,
      party: {
        party_id: 'party:63',
        party_name: 'Green Party',
      },
      person: {
        ynr_id: 34835,
        name: 'Siân Berry',
        absolute_url: 'https://whocanivotefor.co.uk/person/34835',
      },
    },
    {
      list_position: 2,
      party: {
        party_id: 'party:63',
        party_name: 'Green Party',
      },
      person: {
        ynr_id: 4750,
        name: 'Caroline Russell',
        absolute_url: 'https://whocanivotefor.co.uk/person/4750',
      },
    },
    {
      list_position: 1,
      party: {
        party_id: 'party:90',
        party_name: 'Liberal Democrats',
      },
      person: {
        ynr_id: 7456,
        name: 'Caroline Pidgeon',
        absolute_url: 'https://whocanivotefor.co.uk/person/7456',
      },
    },
    {
      list_position: 2,
      party: {
        party_id: 'party:90',
        party_name: 'Liberal Democrats',
      },
      person: {
        ynr_id: 47398,
        name: 'Hina Bokhari',
        absolute_url: 'https://whocanivotefor.co.uk/person/47398',
      },
    },
  ],
};

export const candidateListBallot = {
  ballot_paper_id: 'local.westminster.lancaster-gate.by.2018-11-22',
  ballot_title: 'Westminster local election Lancaster Gate by-election',
  election_id: 'local.westminster.2018-11-22',
  election_name: 'Westminster local election',
  post_name: 'Lancaster Gate',
  candidates_verified: true,
  voting_system: {
    slug: 'FPTP',
    name: 'First-past-the-post',
    uses_party_lists: false,
  },
  seats_contested: 1,
  candidates: [
    {
      list_position: null,
      party: {
        party_id: 'party:90',
        party_name: 'Liberal Democrats',
      },
      person: {
        ynr_id: 42252,
        name: 'Sally Elizabeth Gray',
        absolute_url: 'https://whocanivotefor.co.uk/person/42252/sally-elizabeth-gray',
      },
    },
    {
      list_position: null,
      party: {
        party_id: 'party:63',
        party_name: 'Green Party',
      },
      person: {
        ynr_id: 7505,
        name: 'Zack Polanski',
        absolute_url: 'https://whocanivotefor.co.uk/person/7505/zack-polanski',
      },
    },
  ],
};

export const candidate = {
  list_position: null,
  party: { party_id: 'ynmp-party:2', party_name: 'Independent' },
  person: {
    ynr_id: 72363,
    name: 'Example Name',
    absolute_url: 'https://whocanivotefor.co.uk/person/72363/count-binface',
    email: null,
    photo_url:
      'https://static-candidates.democracyclub.org.uk/media/cache/18/eb/18eb26d2f07e4275ba247371e35d8eb5.jpg',
  },
};
