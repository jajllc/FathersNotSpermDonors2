import React, { useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink, Search, Filter, Users, Gavel, Heart } from 'lucide-react';

interface StateResource {
  state: string;
  abbreviation: string;
  custodyLaws: string;
  supportCalculator: string;
  legalAid: {
    name: string;
    phone: string;
    website: string;
  }[];
  supportGroups: {
    name: string;
    location: string;
    contact: string;
  }[];
  keyStatistics: {
    custodyRate: string;
    averageSupport: string;
    medianIncome: string;
  };
  importantNotes: string[];
}

export const StateResources: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'legal' | 'support' | 'statistics'>('all');

  // Sample data for a few states - in a real app, this would come from an API
  const stateResources: StateResource[] = [
    {
      state: 'California',
      abbreviation: 'CA',
      custodyLaws: 'California follows the "best interest of the child" standard with a preference for joint custody when both parents are fit.',
      supportCalculator: 'https://www.childsup.ca.gov/resources/calculate-child-support',
      legalAid: [
        {
          name: 'California Legal Aid',
          phone: '1-800-222-1753',
          website: 'https://www.calegaladvocates.org'
        },
        {
          name: 'Fathers Rights Movement',
          phone: '1-818-789-0291',
          website: 'https://www.fathersrights.org'
        }
      ],
      supportGroups: [
        {
          name: 'Los Angeles Fathers Group',
          location: 'Los Angeles, CA',
          contact: 'lafathers@gmail.com'
        },
        {
          name: 'Bay Area Dads',
          location: 'San Francisco, CA',
          contact: '415-555-0123'
        }
      ],
      keyStatistics: {
        custodyRate: '22%',
        averageSupport: '$1,200/month',
        medianIncome: '$75,000'
      },
      importantNotes: [
        'California has a strong presumption for joint custody',
        'Mediation is required before court hearings',
        'Move-away cases require court approval'
      ]
    },
    {
      state: 'Texas',
      abbreviation: 'TX',
      custodyLaws: 'Texas uses "conservatorship" instead of custody, with a preference for joint managing conservatorship.',
      supportCalculator: 'https://www.texasattorneygeneral.gov/child-support/calculate-child-support',
      legalAid: [
        {
          name: 'Texas Legal Aid',
          phone: '1-800-369-9270',
          website: 'https://www.texaslawhelp.org'
        },
        {
          name: 'Lone Star Legal Aid',
          phone: '1-800-733-8394',
          website: 'https://www.lonestarlegal.org'
        }
      ],
      supportGroups: [
        {
          name: 'Dallas Fathers Rights',
          location: 'Dallas, TX',
          contact: 'info@dallasfathers.org'
        },
        {
          name: 'Houston Dad Network',
          location: 'Houston, TX',
          contact: '713-555-0456'
        }
      ],
      keyStatistics: {
        custodyRate: '18%',
        averageSupport: '$900/month',
        medianIncome: '$65,000'
      },
      importantNotes: [
        'Standard Possession Order provides specific visitation schedule',
        'Geographic restrictions may apply to relocations',
        'Parenting classes may be required'
      ]
    },
    {
      state: 'Florida',
      abbreviation: 'FL',
      custodyLaws: 'Florida has a strong presumption for shared parental responsibility and time-sharing.',
      supportCalculator: 'https://www.floridasupremecourt.org/content/download/219900/file/Child_Support_Guidelines_Worksheet.pdf',
      legalAid: [
        {
          name: 'Florida Legal Aid',
          phone: '1-800-405-1417',
          website: 'https://www.floridalegal.org'
        },
        {
          name: 'Bay Area Legal Services',
          phone: '1-800-625-8257',
          website: 'https://www.bals.org'
        }
      ],
      supportGroups: [
        {
          name: 'Florida Fathers Network',
          location: 'Tampa, FL',
          contact: 'contact@flfathers.org'
        },
        {
          name: 'Miami Dads United',
          location: 'Miami, FL',
          contact: '305-555-0789'
        }
      ],
      keyStatistics: {
        custodyRate: '25%',
        averageSupport: '$800/month',
        medianIncome: '$58,000'
      },
      importantNotes: [
        'Shared parenting is strongly favored',
        'Parenting plans must be detailed and specific',
        'Relocation requires 60-day notice'
      ]
    },
    {
      state: 'New York',
      abbreviation: 'NY',
      custodyLaws: 'New York follows the best interest standard with recent reforms favoring shared custody arrangements.',
      supportCalculator: 'https://www.nycourts.gov/divorce/forms_instructions/childsupportworksheets.shtml',
      legalAid: [
        {
          name: 'Legal Aid Society',
          phone: '1-212-577-3300',
          website: 'https://www.legalaidnyc.org'
        },
        {
          name: 'New York Legal Assistance Group',
          phone: '1-212-613-5000',
          website: 'https://www.nylag.org'
        }
      ],
      supportGroups: [
        {
          name: 'NYC Fathers Alliance',
          location: 'New York, NY',
          contact: 'info@nycfathers.org'
        },
        {
          name: 'Long Island Dads',
          location: 'Hempstead, NY',
          contact: '516-555-0321'
        }
      ],
      keyStatistics: {
        custodyRate: '20%',
        averageSupport: '$1,400/month',
        medianIncome: '$85,000'
      },
      importantNotes: [
        'Recent law changes favor shared custody',
        'Mandatory parent education programs',
        'Strong enforcement of support orders'
      ]
    }
  ];

  const allStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const filteredStates = allStates.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStateData = stateResources.find(state => state.state === selectedState);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              State by State <span className="text-blue-600">Resources</span>
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Find specific information, legal resources, and support groups for fathers' rights in your state.
            Each state has different laws and resources available to help you navigate custody and parental rights issues.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for your state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Resources</option>
                <option value="legal">Legal Aid</option>
                <option value="support">Support Groups</option>
                <option value="statistics">Statistics</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* State Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your State</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedState === state
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* State Information */}
          <div className="lg:col-span-2">
            {selectedStateData ? (
              <div className="space-y-8">
                {/* State Header */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {selectedStateData.abbreviation}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedStateData.state}</h2>
                      <p className="text-gray-600">Fathers' Rights Resources</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Custody Laws Overview</h3>
                    <p className="text-blue-800 leading-relaxed">{selectedStateData.custodyLaws}</p>
                  </div>
                </div>

                {/* Key Statistics */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="h-6 w-6 text-green-600 mr-3" />
                    Key Statistics
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {selectedStateData.keyStatistics.custodyRate}
                      </div>
                      <div className="text-gray-600">Father Custody Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {selectedStateData.keyStatistics.averageSupport}
                      </div>
                      <div className="text-gray-600">Average Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {selectedStateData.keyStatistics.medianIncome}
                      </div>
                      <div className="text-gray-600">Median Income</div>
                    </div>
                  </div>
                </div>

                {/* Legal Aid */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Gavel className="h-6 w-6 text-blue-600 mr-3" />
                    Legal Aid Organizations
                  </h3>
                  <div className="space-y-4">
                    {selectedStateData.legalAid.map((org, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{org.name}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {org.phone}
                          </div>
                          <a
                            href={org.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Child Support Calculator</h4>
                    <a
                      href={selectedStateData.supportCalculator}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:text-amber-900 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Calculate Child Support for {selectedStateData.state}
                    </a>
                  </div>
                </div>

                {/* Support Groups */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Heart className="h-6 w-6 text-red-600 mr-3" />
                    Support Groups
                  </h3>
                  <div className="space-y-4">
                    {selectedStateData.supportGroups.map((group, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{group.name}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {group.location}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {group.contact}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Notes</h3>
                  <ul className="space-y-3">
                    {selectedStateData.importantNotes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Select a State</h3>
                <p className="text-gray-600 text-lg">
                  Choose your state from the list to view specific resources, legal information, 
                  and support groups available to fathers in your area.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Disclaimer</h3>
          <p className="text-amber-700 leading-relaxed">
            The information provided here is for general guidance only and should not be considered legal advice. 
            Laws and resources vary by state and change frequently. Always consult with a qualified attorney 
            in your state for specific legal guidance regarding your situation.
          </p>
        </div>
      </div>
    </div>
  );
};