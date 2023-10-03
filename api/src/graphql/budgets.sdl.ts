export const schema = gql`
  type Budget {
    id: String!
    name: String!
    user: User!
    userId: String!
    accounts: [Account]!
    budgetCategoryGroups: [BudgetCategoryGroup]!
  }

  type Query {
    budgetsByUser(userId: String!): [Budget!]! @requireAuth
    budget(id: String!): Budget @requireAuth
    budgetByMonth(id: String!, month: Int!, year: Int!): Budget @requireAuth
  }

  input CreateBudgetInput {
    name: String!
    userId: String!
  }

  input UpdateBudgetInput {
    name: String
    userId: String
  }

  type Mutation {
    createBudget(input: CreateBudgetInput!): Budget! @requireAuth
    updateBudget(id: String!, input: UpdateBudgetInput!): Budget! @requireAuth
    deleteBudget(id: String!): Budget! @requireAuth
  }
`
