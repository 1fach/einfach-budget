import type { Account } from '@prisma/client'

import {
  accounts,
  account,
  createAccount,
  updateAccount,
  deleteAccount,
} from './accounts'
import type { StandardScenario } from './accounts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('accounts', () => {
  scenario('returns all accounts', async (scenario: StandardScenario) => {
    const result = await accounts()

    expect(result.length).toEqual(Object.keys(scenario.account).length)
  })

  scenario('returns a single account', async (scenario: StandardScenario) => {
    const result = await account({ id: scenario.account.one.id })

    expect(result).toEqual(scenario.account.one)
  })

  scenario('creates a account', async (scenario: StandardScenario) => {
    const result = await createAccount({
      input: {
        nickname: 'String9696107',
        payeeId: scenario.account.two.payeeId,
      },
    })

    expect(result.nickname).toEqual('String9696107')
    expect(result.payeeId).toEqual(scenario.account.two.payeeId)
  })

  scenario('updates a account', async (scenario: StandardScenario) => {
    const original = (await account({ id: scenario.account.one.id })) as Account
    const result = await updateAccount({
      id: original.id,
      input: { nickname: 'String7746812' },
    })

    expect(result.nickname).toEqual('String7746812')
  })

  scenario('deletes a account', async (scenario: StandardScenario) => {
    const original = (await deleteAccount({
      id: scenario.account.one.id,
    })) as Account
    const result = await account({ id: original.id })

    expect(result).toEqual(null)
  })
})
