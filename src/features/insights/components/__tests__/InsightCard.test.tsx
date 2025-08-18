import { render, screen, fireEvent } from '@testing-library/react'
import InsightCard from '../InsightCard'
import type { Insight } from '../../lib/types'

jest.mock('../../lib/hooks', () => ({
  useInsightDetails: jest.fn()
}))

const mockInsight: Insight = {
  id: 'electoralRoll',
  title: 'Electoral roll',
  body: 'Being on the electoral roll can improve your score',
  impact: 'Medium Impact',
  status: 'On Track',
  canExpand: true
}

const mockUseInsightDetails = {
  details: null,
  loading: false,
  error: null,
  fetchDetails: jest.fn(),
  reset: jest.fn()
}

describe('InsightCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const { useInsightDetails } = require('../../lib/hooks')
    useInsightDetails.mockReturnValue(mockUseInsightDetails)
  })

  it('should render insight information correctly', () => {
    render(<InsightCard insight={mockInsight} />)

    expect(screen.getAllByText('Electoral roll')).toHaveLength(2)
    expect(screen.getAllByText('Being on the electoral roll can improve your score')).toHaveLength(2)
    expect(screen.getAllByText('On Track')).toHaveLength(2)
    expect(screen.getAllByText('Medium Impact')).toHaveLength(2)
  })

  it('should show "Learn more" button when insight can be expanded', () => {
    render(<InsightCard insight={mockInsight} />)

    expect(screen.getAllByText('Learn more')).toHaveLength(2)
  })

  it('should not show "Learn more" button when insight cannot be expanded', () => {
    const nonExpandableInsight: Insight = {
      ...mockInsight,
      canExpand: false
    }

    render(<InsightCard insight={nonExpandableInsight} />)

    expect(screen.queryByText('Learn more')).toBeNull()
  })

  it('should open drawer when "Learn more" is clicked', () => {
    render(<InsightCard insight={mockInsight} />)

    const learnMoreButtons = screen.getAllByText('Learn more')
    fireEvent.click(learnMoreButtons[0]) 

    expect(mockUseInsightDetails.fetchDetails).toHaveBeenCalledWith('electoralRoll')
  })

  it('should render "Off Track" status correctly', () => {
    const offTrackInsight: Insight = {
      ...mockInsight,
      status: 'Off Track'
    }

    render(<InsightCard insight={offTrackInsight} />)

    expect(screen.getAllByText('Off Track')).toHaveLength(2)
  })

  it('should show loading state in drawer', () => {
    const loadingMock = {
      ...mockUseInsightDetails,
      loading: true
    }
    const { useInsightDetails } = require('../../lib/hooks')
    useInsightDetails.mockReturnValue(loadingMock)

    render(<InsightCard insight={mockInsight} />)

    const learnMoreButtons = screen.getAllByText('Learn more')
    fireEvent.click(learnMoreButtons[0])

    expect(screen.getByText('Loading…')).toBeTruthy()
  })

  it('should show error state in drawer', () => {
    const errorMock = {
      ...mockUseInsightDetails,
      error: 'Failed to load details'
    }
    const { useInsightDetails } = require('../../lib/hooks')
    useInsightDetails.mockReturnValue(errorMock)

    render(<InsightCard insight={mockInsight} />)

    const learnMoreButtons = screen.getAllByText('Learn more')
    fireEvent.click(learnMoreButtons[0])

    expect(screen.getByText('Failed to load details')).toBeTruthy()
  })

  it('should show details in drawer when loaded', () => {
    const detailsMock = {
      ...mockUseInsightDetails,
      details: {
        title: 'Electoral Roll Details',
        onTrackDescription: 'You are on the electoral roll',
        offTrackDescription: 'You are not on the electoral roll',
        details: [
          { title: 'Current Status', description: 'Registered' }
        ]
      }
    }
    const { useInsightDetails } = require('../../lib/hooks')
    useInsightDetails.mockReturnValue(detailsMock)

    render(<InsightCard insight={mockInsight} />)

    const learnMoreButtons = screen.getAllByText('Learn more')
    fireEvent.click(learnMoreButtons[0])

    expect(screen.getByText('Electoral Roll Details')).toBeTruthy()
    expect(screen.getByText('You are on the electoral roll')).toBeTruthy()
    expect(screen.getByText('Current Status')).toBeTruthy()
  })
})
