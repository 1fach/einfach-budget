import type { Prisma, AccountBalance } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountBalanceCreateArgs>({
  accountBalance: {
    one: {
      data: {
        account: {
          create: {
            nickname: 'String',
            payee: { create: { name: 'String' } },
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String4621832',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        account: {
          create: {
            nickname: 'String',
            payee: { create: { name: 'String' } },
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String2873320',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<AccountBalance, 'accountBalance'>