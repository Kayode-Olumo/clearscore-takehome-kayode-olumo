import { render, screen } from '@testing-library/react'
import InsightsSection from '../InsightsSection'
import type { Insight } from '../../lib/types'

// Mock the InsightCard component
jest.mock('../InsightCard', () => {
  return function MockInsightCard({ insight }: { insight: Insight }) {
    return (
      <div data-testid={`insight-card-${insight.id}`}>
        <h3>{insight.title}</h3>
        <p>{insight.body}</p>
        <span>{insight.status}</span>
      </div>
    )
  }
})

const mockInsights: Insight[] = [
  {
    id: 'publicInfo',
    title: 'Public information',
    body: 'Bankruptcies and individual voluntary arrangements can damage your score',
    impact: 'High Impact',
    status: 'On Track'
  },
  {
    id: 'creditUtil',
    title: 'Credit utilisation',
    body: 'Using more than 50% of your available credit can damage your score',
    impact: 'Medium Impact',
    status: 'Off Track'
  },
  {
    id: 'electoralRoll',
    title: 'Electoral roll',
    body: 'Being on the electoral roll can improve your score',
    impact: 'Medium Impact',
    status: 'On Track',
    canExpand: true
  }
]

describe('InsightsSection', () => {
  it('should render all insights', () => {
    render(<InsightsSection insights={mockInsights} />)

    // Each insight appears 4 times (mobile, small, medium, large breakpoints)
    expect(screen.getAllByTestId('insight-card-publicInfo')).toHaveLength(4)
    expect(screen.getAllByTestId('insight-card-creditUtil')).toHaveLength(4)
    expect(screen.getAllByTestId('insight-card-electoralRoll')).toHaveLength(4)
  })

  it('should render insight titles', () => {
    render(<InsightsSection insights={mockInsights} />)

    // Each title appears 4 times (mobile, small, medium, large breakpoints)
    expect(screen.getAllByText('Public information')).toHaveLength(4)
    expect(screen.getAllByText('Credit utilisation')).toHaveLength(4)
    expect(screen.getAllByText('Electoral roll')).toHaveLength(4)
  })

  it('should render insight bodies', () => {
    render(<InsightsSection insights={mockInsights} />)

    // Each body appears 4 times (mobile, small, medium, large breakpoints)
    expect(screen.getAllByText('Bankruptcies and individual voluntary arrangements can damage your score')).toHaveLength(4)
    expect(screen.getAllByText('Using more than 50% of your available credit can damage your score')).toHaveLength(4)
    expect(screen.getAllByText('Being on the electoral roll can improve your score')).toHaveLength(4)
  })

  it('should render insight statuses', () => {
    render(<InsightsSection insights={mockInsights} />)

    // Each status appears 4 times (mobile, small, medium, large breakpoints)
    // 2 insights with "On Track" status = 8 total
    expect(screen.getAllByText('On Track')).toHaveLength(8)
    expect(screen.getAllByText('Off Track')).toHaveLength(4)
  })

  it('should handle empty insights array', () => {
    render(<InsightsSection insights={[]} />)

    expect(screen.queryByTestId(/insight-card-/)).toBeNull()
  })
})
