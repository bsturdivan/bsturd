import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

export const ga = Analytics({
  app: 'bsturd.com',
  plugins: [
    googleAnalytics({
      measurementIds: ['G-44PDK1F0BB']
    })
  ]
})