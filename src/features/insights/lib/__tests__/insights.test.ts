import { generateInsights, loadInsightDetails } from '../insights'
import type { CreditReport } from '../types'

jest.mock('@/lib/api', () => ({
  fetchInsightDetails: jest.fn()
}))

describe('generateInsights', () => {
  it('should generate insights for a credit report with no issues', () => {
    const creditReport: CreditReport = {
      accounts: [],
      personal: {
        publicInfo: {
          courtAndInsolvencies: []
        },
        electoralRoll: [
          { current: true }
        ]
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights).toHaveLength(3)
    expect(insights[0]).toEqual({
      id: 'publicInfo',
      title: 'Public information',
      body: 'Bankruptcies and individual voluntary arrangements can damage your score',
      impact: 'High Impact',
      status: 'On Track'
    })
    expect(insights[1]).toEqual({
      id: 'creditUtil',
      title: 'Credit utilisation',
      body: 'Using more than 50% of your available credit can damage your score',
      impact: 'Medium Impact',
      status: 'On Track'
    })
    expect(insights[2]).toEqual({
      id: 'electoralRoll',
      title: 'Electoral roll',
      body: 'Being on the electoral roll can improve your score',
      impact: 'Medium Impact',
      status: 'On Track',
      canExpand: true
    })
  })

  it('should mark public info as off track when there are court and insolvencies', () => {
    const creditReport: CreditReport = {
      accounts: [],
      personal: {
        publicInfo: {
          courtAndInsolvencies: [{ some: 'data' }]
        },
        electoralRoll: [
          { current: true }
        ]
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights[0].status).toBe('Off Track')
    expect(insights[1].status).toBe('On Track')
    expect(insights[2].status).toBe('On Track')
  })

  it('should mark credit utilisation as off track when credit cards exceed 50% limit', () => {
    const creditReport: CreditReport = {
      accounts: [
        {
          accountCategory: 'credit_cards',
          overview: {
            balance: { amount: 600 },
            limit: { amount: 1000 }
          }
        }
      ],
      personal: {
        publicInfo: {
          courtAndInsolvencies: []
        },
        electoralRoll: [
          { current: true }
        ]
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights[0].status).toBe('On Track')
    expect(insights[1].status).toBe('Off Track')
    expect(insights[2].status).toBe('On Track')
  })

  it('should mark electoral roll as off track when not on current roll', () => {
    const creditReport: CreditReport = {
      accounts: [],
      personal: {
        publicInfo: {
          courtAndInsolvencies: []
        },
        electoralRoll: [
          { current: false }
        ]
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights[0].status).toBe('On Track')
    expect(insights[1].status).toBe('On Track')
    expect(insights[2].status).toBe('Off Track')
  })

  it('should handle credit utilisation with zero limit', () => {
    const creditReport: CreditReport = {
      accounts: [
        {
          accountCategory: 'credit_cards',
          overview: {
            balance: { amount: 100 },
            limit: { amount: 0 }
          }
        }
      ],
      personal: {
        publicInfo: {
          courtAndInsolvencies: []
        },
        electoralRoll: [
          { current: true }
        ]
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights[1].status).toBe('On Track')
  })

  it('should handle non-credit card accounts', () => {
    const creditReport: CreditReport = {
      accounts: [
        {
          accountCategory: 'mortgage',
          overview: {
            balance: { amount: 100000 },
            limit: { amount: 200000 }
          }
        }
      ],
      personal: {
        publicInfo: {
          courtAndInsolvencies: []
        },
        electoralRoll: [
          { current: true }
        ]
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights[1].status).toBe('On Track')
  })

  it('should handle missing account data gracefully', () => {
    const creditReport: CreditReport = {
      accounts: [
        {
          accountCategory: 'credit_cards'
        }
      ],
      personal: {
        publicInfo: {
          courtAndInsolvencies: []
        },
        electoralRoll: [
          { current: true }
        ]
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights[1].status).toBe('On Track')
  })

  it('should handle empty electoral roll array', () => {
    const creditReport: CreditReport = {
      accounts: [],
      personal: {
        publicInfo: {
          courtAndInsolvencies: []
        },
        electoralRoll: []
      }
    }

    const insights = generateInsights(creditReport)

    expect(insights[2].status).toBe('Off Track')
  })
})

describe('loadInsightDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw error for non-electoral roll insights', async () => {
    await expect(loadInsightDetails('publicInfo')).rejects.toThrow(
      'Only electoral roll insights can be expanded'
    )
  })

  it('should load details for electoral roll insight', async () => {
    const mockDetails = {
      title: 'Electoral Roll Details',
      onTrackDescription: 'You are on the electoral roll',
      offTrackDescription: 'You are not on the electoral roll',
      details: [
        { title: 'Current Status', description: 'Registered' }
      ]
    }

    const { fetchInsightDetails } = require('@/lib/api')
    fetchInsightDetails.mockResolvedValue(mockDetails)

    const details = await loadInsightDetails('electoralRoll')
    
    expect(fetchInsightDetails).toHaveBeenCalledTimes(1)
    expect(details).toEqual(mockDetails)
  })
})
