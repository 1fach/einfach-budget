import { monthlyCategoryActivities } from './monthlyCategoryActivities'
import type { StandardScenario } from './monthlyCategoryActivities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('monthlyCategoryActivities', () => {
  scenario(
    'returns all monthlyCategoryActivities',
    async (scenario: StandardScenario) => {
      const result = await monthlyCategoryActivities()

      expect(result.length).toEqual(
        Object.keys(scenario.monthlyCategoryActivity).length
      )
    }
  )
})
