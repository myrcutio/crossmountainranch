const contentModel = {
  header: {
    title: "Cross Mountain Ranch",
    subtitle: "Homeowners Cooperative"
  },
  sitemap: [{
    url: '/',
    label: 'Home'
  }, {
    url: '/board',
    label: 'Board of Directors'
  }, {
    url: '/documents',
    label: 'Documents'
  }, {
    url: '/contact',
    label: 'Contact'
  }],
  boardEmail: "crossmtnranchsatx@gmail.com",
  contactEmail: "srsneed@aol.com",
  contactBlock: {
    position: `Association Manager`,
    name: `Suzanne M. Sneed`,
    title: `Professional Management Assist`,
    addressPO: `PO Box 5069`,
    addressOne: `5802 W IH 10`,
    addressTwo: `San Antonio, TX 78201`,
    officePhone: `(210) 733-8398`,
    fax: `(210) 733-0374`
  },
  alert: {
    title: `Meeting of the Board of Directors`,
    date: `Saturday, August 18, 2018 10:00am`,
    location: `Frost Bank in Leon Springs`,
    description: `Homeowners are welcome - Please email and let us know you're coming... Hope to see you there!`
  },
  homepage: {
    description: `Cross Mountain Ranch is a residential community established in 1980 at the northwest corner of Bexar County. With 2-3 acre lots and a relaxed, semi-rural atmosphere, the neighborhood offers privacy within a friendly setting close to Leon Springs, and a quiet place to live nestled at the foot of the beautiful Texas Hill Country. The historic town of Boerne is just 10 minutes to the north, and downtown San Antonio a quick 20 minute drive to the south.`,
    disclosure: `Cross Mountain Ranch Homeowners Cooperative is a mandatory membership HOA dedicated to protecting property values and maintaining communication about issues affecting the neighborhood. For more information about living in Cross Mountain Ranch, contact us through the links at the left.`
  },
  board: {
    committees: [{
      title: `Board of Directors 2018 - 2019`,
      members: [{
        fullName: "James (Jim) Balentine",
        position: "President"
      }, {
        fullName: "Phil Altmaier",
        position: "Vice-President"
      }, {
        fullName: "John Cairo",
        position: "Secretary"
      }, {
        fullName: "Yvonne McCormick",
        position: "Member at Large"
      }, {
        fullName: "Vacant Position",
        position: "Treasurer"
      }]
    }, {
      title: `Architectural Review Committee`,
      members: [{
        fullName: "Vacant Position",
        position: "Chair"
      }, {
        fullName: "Kip Gallion"
      }, {
        fullName: "Fred Behrenfield"
      }, {
        fullName: "Alan Voges"
      }, {
        fullName: "Vacant Position"
      }]
    }, {
      title: `Deed Restriction Committee`,
      members: [{
        fullName: "Vacant Position",
        position: "Chair"
      }, {
        fullName: "Ron Haygood"
      }, {
        fullName: "Kay Steidel"
      }, {
        fullName: "Matt McGlothlin"
      }, {
        fullName: "Vacant Position",
      }]
      }, {
      title: `Social Committee`,
      members: [{
        fullName: "Pat Marshall",
        position: "Chair"
      }]
       }, {
      title: `Newsletter Committee`,
      members: [{
        fullName: "Doris Miller",
        position: "Chair"
      }]
    }]
  },
  documents: [{
    section: "Proposed Revisions 2018",
    docs: [
      {url: "/static/documents/ProposedRevisions.pdf", label: "Proposed Document Revisions"}
    ]
  }, {
    section: "Articles of Incorporation",
    docs: [
      {url: "/static/documents/Articles.pdf", label: "Articles of Incorporation - 1980"}
    ]
  }, {
    section: "Deed Restrictions - CMR Units I-IV",
    docs: [
      {url: "/static/documents/SecondAmendDR.pdf", label: "Second Amended Deed Restrictions - 2015"}
    ]
  }, {
    section: "Bylaws of the Association",
    docs: [
      {url: "/static/documents/bylaws2012.pdf", label: "Bylaws - 2012"}
    ]
  }, {
    section: "Policies",
    docs: [
      {url: "/static/documents/Collections.pdf", label: "Assessment Collections and Payment Plan Policy"},
      {url: "/static/documents/Copying.pdf", label: "Records Copying policy"},
      {url: "/static/documents/Retention.pdf", label: "Records Retention Policy"},
      {url: "/static/documents/Restrictions.pdf", label: "Restrictions Enforcement Policy"}
    ]
  }, {
    section: "Architectural Review Information",
    docs: [
      {url: "/static/documents/ARCGuidelines.pdf", label: "Architectural Review Guidelines"},
      {url: "/static/documents/ARCForm.pdf", label: "Architectural Review Application Form"}
    ]
  }],
  news: [{
    title: "Neighbors Night Out",
    date: "Tuesday, October 2, 2018",
    content: "Neighbors Night Out is a national effort to promote community involvement. This year's event will be held at the cul-de-sac on Schoolhouse Rd. Drinks and light snacks will be provided. Bring lawn chairs, family and friends and come join in the festivities!"
  }, {
    title: "Cross Mountain Ranch Homeowners Association Annual Meeting",
    date: "Thursday, October 11, 2018",
    content: "The Annual meeting of CMRHC will be at Cross Mountain Church. Several items of importance will be discussed and voted on at this meeting. You should have received a notice of the meeting along with the documents we will be voting on. We will also elect two members to the Board of Directors. Light refreshments will be served."
  }]
}

export default contentModel
