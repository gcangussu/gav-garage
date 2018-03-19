import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Item implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  product(where: ProductWhereInput): Product!
  cost: Float!
  sale(where: SaleWhereInput): Sale
}

type Order implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  sales(where: SaleWhereInput, orderBy: SaleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sale!]
  seller(where: UserWhereInput): User!
}

type Product implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  picture: String!
  price: Float!
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Item!]
  sales(where: SaleWhereInput, orderBy: SaleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sale!]
}

type Sale implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  price: Float!
  seller(where: UserWhereInput): User!
  product(where: ProductWhereInput): Product!
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Item!]
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  name: String!
  role: UserRole!
  sales(where: SaleWhereInput, orderBy: SaleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sale!]
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order!]
  itemsReceived(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Item!]
}

type AggregateItem {
  count: Int!
}

type AggregateOrder {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateSale {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

scalar DateTime

"""
A connection to a list of items.
"""
type ItemConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ItemEdge]!
  aggregate: AggregateItem!
}

input ItemCreateInput {
  cost: Float!
  product: ProductCreateOneWithoutItemsInput!
  sale: SaleCreateOneWithoutItemsInput
}

input ItemCreateManyInput {
  create: [ItemCreateInput!]
  connect: [ItemWhereUniqueInput!]
}

input ItemCreateManyWithoutProductInput {
  create: [ItemCreateWithoutProductInput!]
  connect: [ItemWhereUniqueInput!]
}

input ItemCreateManyWithoutSaleInput {
  create: [ItemCreateWithoutSaleInput!]
  connect: [ItemWhereUniqueInput!]
}

input ItemCreateWithoutProductInput {
  cost: Float!
  sale: SaleCreateOneWithoutItemsInput
}

input ItemCreateWithoutSaleInput {
  cost: Float!
  product: ProductCreateOneWithoutItemsInput!
}

"""
An edge in a connection.
"""
type ItemEdge {
  """
  The item at the end of the edge.
  """
  node: Item!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ItemOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  cost_ASC
  cost_DESC
}

type ItemPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  cost: Float!
}

type ItemSubscriptionPayload {
  mutation: MutationType!
  node: Item
  updatedFields: [String!]
  previousValues: ItemPreviousValues
}

input ItemSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ItemSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ItemSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ItemWhereInput
}

input ItemUpdateDataInput {
  cost: Float
  product: ProductUpdateOneWithoutItemsInput
  sale: SaleUpdateOneWithoutItemsInput
}

input ItemUpdateInput {
  cost: Float
  product: ProductUpdateOneWithoutItemsInput
  sale: SaleUpdateOneWithoutItemsInput
}

input ItemUpdateManyInput {
  create: [ItemCreateInput!]
  connect: [ItemWhereUniqueInput!]
  disconnect: [ItemWhereUniqueInput!]
  delete: [ItemWhereUniqueInput!]
  update: [ItemUpdateNestedInput!]
  upsert: [ItemUpsertNestedInput!]
}

input ItemUpdateManyWithoutProductInput {
  create: [ItemCreateWithoutProductInput!]
  connect: [ItemWhereUniqueInput!]
  disconnect: [ItemWhereUniqueInput!]
  delete: [ItemWhereUniqueInput!]
  update: [ItemUpdateWithoutProductInput!]
  upsert: [ItemUpsertWithoutProductInput!]
}

input ItemUpdateManyWithoutSaleInput {
  create: [ItemCreateWithoutSaleInput!]
  connect: [ItemWhereUniqueInput!]
  disconnect: [ItemWhereUniqueInput!]
  delete: [ItemWhereUniqueInput!]
  update: [ItemUpdateWithoutSaleInput!]
  upsert: [ItemUpsertWithoutSaleInput!]
}

input ItemUpdateNestedInput {
  where: ItemWhereUniqueInput!
  data: ItemUpdateDataInput!
}

input ItemUpdateWithoutProductDataInput {
  cost: Float
  sale: SaleUpdateOneWithoutItemsInput
}

input ItemUpdateWithoutProductInput {
  where: ItemWhereUniqueInput!
  data: ItemUpdateWithoutProductDataInput!
}

input ItemUpdateWithoutSaleDataInput {
  cost: Float
  product: ProductUpdateOneWithoutItemsInput
}

input ItemUpdateWithoutSaleInput {
  where: ItemWhereUniqueInput!
  data: ItemUpdateWithoutSaleDataInput!
}

input ItemUpsertNestedInput {
  where: ItemWhereUniqueInput!
  update: ItemUpdateDataInput!
  create: ItemCreateInput!
}

input ItemUpsertWithoutProductInput {
  where: ItemWhereUniqueInput!
  update: ItemUpdateWithoutProductDataInput!
  create: ItemCreateWithoutProductInput!
}

input ItemUpsertWithoutSaleInput {
  where: ItemWhereUniqueInput!
  update: ItemUpdateWithoutSaleDataInput!
  create: ItemCreateWithoutSaleInput!
}

input ItemWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ItemWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ItemWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  cost: Float
  """
  All values that are not equal to given value.
  """
  cost_not: Float
  """
  All values that are contained in given list.
  """
  cost_in: [Float!]
  """
  All values that are not contained in given list.
  """
  cost_not_in: [Float!]
  """
  All values less than the given value.
  """
  cost_lt: Float
  """
  All values less than or equal the given value.
  """
  cost_lte: Float
  """
  All values greater than the given value.
  """
  cost_gt: Float
  """
  All values greater than or equal the given value.
  """
  cost_gte: Float
  product: ProductWhereInput
  sale: SaleWhereInput
}

input ItemWhereUniqueInput {
  id: ID
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
A connection to a list of items.
"""
type OrderConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  sales: SaleCreateManyInput
  seller: UserCreateOneWithoutOrdersInput!
}

input OrderCreateManyWithoutSellerInput {
  create: [OrderCreateWithoutSellerInput!]
  connect: [OrderWhereUniqueInput!]
}

input OrderCreateWithoutSellerInput {
  sales: SaleCreateManyInput
}

"""
An edge in a connection.
"""
type OrderEdge {
  """
  The item at the end of the edge.
  """
  node: Order!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OrderPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
}

input OrderUpdateInput {
  sales: SaleUpdateManyInput
  seller: UserUpdateOneWithoutOrdersInput
}

input OrderUpdateManyWithoutSellerInput {
  create: [OrderCreateWithoutSellerInput!]
  connect: [OrderWhereUniqueInput!]
  disconnect: [OrderWhereUniqueInput!]
  delete: [OrderWhereUniqueInput!]
  update: [OrderUpdateWithoutSellerInput!]
  upsert: [OrderUpsertWithoutSellerInput!]
}

input OrderUpdateWithoutSellerDataInput {
  sales: SaleUpdateManyInput
}

input OrderUpdateWithoutSellerInput {
  where: OrderWhereUniqueInput!
  data: OrderUpdateWithoutSellerDataInput!
}

input OrderUpsertWithoutSellerInput {
  where: OrderWhereUniqueInput!
  update: OrderUpdateWithoutSellerDataInput!
  create: OrderCreateWithoutSellerInput!
}

input OrderWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  sales_every: SaleWhereInput
  sales_some: SaleWhereInput
  sales_none: SaleWhereInput
  seller: UserWhereInput
}

input OrderWhereUniqueInput {
  id: ID
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

"""
A connection to a list of items.
"""
type ProductConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  description: String!
  picture: String!
  price: Float!
  items: ItemCreateManyWithoutProductInput
  sales: SaleCreateManyWithoutProductInput
}

input ProductCreateOneWithoutItemsInput {
  create: ProductCreateWithoutItemsInput
  connect: ProductWhereUniqueInput
}

input ProductCreateOneWithoutSalesInput {
  create: ProductCreateWithoutSalesInput
  connect: ProductWhereUniqueInput
}

input ProductCreateWithoutItemsInput {
  description: String!
  picture: String!
  price: Float!
  sales: SaleCreateManyWithoutProductInput
}

input ProductCreateWithoutSalesInput {
  description: String!
  picture: String!
  price: Float!
  items: ItemCreateManyWithoutProductInput
}

"""
An edge in a connection.
"""
type ProductEdge {
  """
  The item at the end of the edge.
  """
  node: Product!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  description_ASC
  description_DESC
  picture_ASC
  picture_DESC
  price_ASC
  price_DESC
}

type ProductPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  picture: String!
  price: Float!
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ProductSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProductSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
}

input ProductUpdateInput {
  description: String
  picture: String
  price: Float
  items: ItemUpdateManyWithoutProductInput
  sales: SaleUpdateManyWithoutProductInput
}

input ProductUpdateOneWithoutItemsInput {
  create: ProductCreateWithoutItemsInput
  connect: ProductWhereUniqueInput
  disconnect: ProductWhereUniqueInput
  delete: ProductWhereUniqueInput
  update: ProductUpdateWithoutItemsInput
  upsert: ProductUpsertWithoutItemsInput
}

input ProductUpdateOneWithoutSalesInput {
  create: ProductCreateWithoutSalesInput
  connect: ProductWhereUniqueInput
  disconnect: ProductWhereUniqueInput
  delete: ProductWhereUniqueInput
  update: ProductUpdateWithoutSalesInput
  upsert: ProductUpsertWithoutSalesInput
}

input ProductUpdateWithoutItemsDataInput {
  description: String
  picture: String
  price: Float
  sales: SaleUpdateManyWithoutProductInput
}

input ProductUpdateWithoutItemsInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutItemsDataInput!
}

input ProductUpdateWithoutSalesDataInput {
  description: String
  picture: String
  price: Float
  items: ItemUpdateManyWithoutProductInput
}

input ProductUpdateWithoutSalesInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutSalesDataInput!
}

input ProductUpsertWithoutItemsInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutItemsDataInput!
  create: ProductCreateWithoutItemsInput!
}

input ProductUpsertWithoutSalesInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutSalesDataInput!
  create: ProductCreateWithoutSalesInput!
}

input ProductWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ProductWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProductWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  picture: String
  """
  All values that are not equal to given value.
  """
  picture_not: String
  """
  All values that are contained in given list.
  """
  picture_in: [String!]
  """
  All values that are not contained in given list.
  """
  picture_not_in: [String!]
  """
  All values less than the given value.
  """
  picture_lt: String
  """
  All values less than or equal the given value.
  """
  picture_lte: String
  """
  All values greater than the given value.
  """
  picture_gt: String
  """
  All values greater than or equal the given value.
  """
  picture_gte: String
  """
  All values containing the given string.
  """
  picture_contains: String
  """
  All values not containing the given string.
  """
  picture_not_contains: String
  """
  All values starting with the given string.
  """
  picture_starts_with: String
  """
  All values not starting with the given string.
  """
  picture_not_starts_with: String
  """
  All values ending with the given string.
  """
  picture_ends_with: String
  """
  All values not ending with the given string.
  """
  picture_not_ends_with: String
  price: Float
  """
  All values that are not equal to given value.
  """
  price_not: Float
  """
  All values that are contained in given list.
  """
  price_in: [Float!]
  """
  All values that are not contained in given list.
  """
  price_not_in: [Float!]
  """
  All values less than the given value.
  """
  price_lt: Float
  """
  All values less than or equal the given value.
  """
  price_lte: Float
  """
  All values greater than the given value.
  """
  price_gt: Float
  """
  All values greater than or equal the given value.
  """
  price_gte: Float
  items_every: ItemWhereInput
  items_some: ItemWhereInput
  items_none: ItemWhereInput
  sales_every: SaleWhereInput
  sales_some: SaleWhereInput
  sales_none: SaleWhereInput
}

input ProductWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type SaleConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [SaleEdge]!
  aggregate: AggregateSale!
}

input SaleCreateInput {
  price: Float!
  seller: UserCreateOneWithoutSalesInput!
  product: ProductCreateOneWithoutSalesInput!
  items: ItemCreateManyWithoutSaleInput
}

input SaleCreateManyInput {
  create: [SaleCreateInput!]
  connect: [SaleWhereUniqueInput!]
}

input SaleCreateManyWithoutProductInput {
  create: [SaleCreateWithoutProductInput!]
  connect: [SaleWhereUniqueInput!]
}

input SaleCreateManyWithoutSellerInput {
  create: [SaleCreateWithoutSellerInput!]
  connect: [SaleWhereUniqueInput!]
}

input SaleCreateOneWithoutItemsInput {
  create: SaleCreateWithoutItemsInput
  connect: SaleWhereUniqueInput
}

input SaleCreateWithoutItemsInput {
  price: Float!
  seller: UserCreateOneWithoutSalesInput!
  product: ProductCreateOneWithoutSalesInput!
}

input SaleCreateWithoutProductInput {
  price: Float!
  seller: UserCreateOneWithoutSalesInput!
  items: ItemCreateManyWithoutSaleInput
}

input SaleCreateWithoutSellerInput {
  price: Float!
  product: ProductCreateOneWithoutSalesInput!
  items: ItemCreateManyWithoutSaleInput
}

"""
An edge in a connection.
"""
type SaleEdge {
  """
  The item at the end of the edge.
  """
  node: Sale!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum SaleOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  price_ASC
  price_DESC
}

type SalePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  price: Float!
}

type SaleSubscriptionPayload {
  mutation: MutationType!
  node: Sale
  updatedFields: [String!]
  previousValues: SalePreviousValues
}

input SaleSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [SaleSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [SaleSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SaleWhereInput
}

input SaleUpdateDataInput {
  price: Float
  seller: UserUpdateOneWithoutSalesInput
  product: ProductUpdateOneWithoutSalesInput
  items: ItemUpdateManyWithoutSaleInput
}

input SaleUpdateInput {
  price: Float
  seller: UserUpdateOneWithoutSalesInput
  product: ProductUpdateOneWithoutSalesInput
  items: ItemUpdateManyWithoutSaleInput
}

input SaleUpdateManyInput {
  create: [SaleCreateInput!]
  connect: [SaleWhereUniqueInput!]
  disconnect: [SaleWhereUniqueInput!]
  delete: [SaleWhereUniqueInput!]
  update: [SaleUpdateNestedInput!]
  upsert: [SaleUpsertNestedInput!]
}

input SaleUpdateManyWithoutProductInput {
  create: [SaleCreateWithoutProductInput!]
  connect: [SaleWhereUniqueInput!]
  disconnect: [SaleWhereUniqueInput!]
  delete: [SaleWhereUniqueInput!]
  update: [SaleUpdateWithoutProductInput!]
  upsert: [SaleUpsertWithoutProductInput!]
}

input SaleUpdateManyWithoutSellerInput {
  create: [SaleCreateWithoutSellerInput!]
  connect: [SaleWhereUniqueInput!]
  disconnect: [SaleWhereUniqueInput!]
  delete: [SaleWhereUniqueInput!]
  update: [SaleUpdateWithoutSellerInput!]
  upsert: [SaleUpsertWithoutSellerInput!]
}

input SaleUpdateNestedInput {
  where: SaleWhereUniqueInput!
  data: SaleUpdateDataInput!
}

input SaleUpdateOneWithoutItemsInput {
  create: SaleCreateWithoutItemsInput
  connect: SaleWhereUniqueInput
  disconnect: SaleWhereUniqueInput
  delete: SaleWhereUniqueInput
  update: SaleUpdateWithoutItemsInput
  upsert: SaleUpsertWithoutItemsInput
}

input SaleUpdateWithoutItemsDataInput {
  price: Float
  seller: UserUpdateOneWithoutSalesInput
  product: ProductUpdateOneWithoutSalesInput
}

input SaleUpdateWithoutItemsInput {
  where: SaleWhereUniqueInput!
  data: SaleUpdateWithoutItemsDataInput!
}

input SaleUpdateWithoutProductDataInput {
  price: Float
  seller: UserUpdateOneWithoutSalesInput
  items: ItemUpdateManyWithoutSaleInput
}

input SaleUpdateWithoutProductInput {
  where: SaleWhereUniqueInput!
  data: SaleUpdateWithoutProductDataInput!
}

input SaleUpdateWithoutSellerDataInput {
  price: Float
  product: ProductUpdateOneWithoutSalesInput
  items: ItemUpdateManyWithoutSaleInput
}

input SaleUpdateWithoutSellerInput {
  where: SaleWhereUniqueInput!
  data: SaleUpdateWithoutSellerDataInput!
}

input SaleUpsertNestedInput {
  where: SaleWhereUniqueInput!
  update: SaleUpdateDataInput!
  create: SaleCreateInput!
}

input SaleUpsertWithoutItemsInput {
  where: SaleWhereUniqueInput!
  update: SaleUpdateWithoutItemsDataInput!
  create: SaleCreateWithoutItemsInput!
}

input SaleUpsertWithoutProductInput {
  where: SaleWhereUniqueInput!
  update: SaleUpdateWithoutProductDataInput!
  create: SaleCreateWithoutProductInput!
}

input SaleUpsertWithoutSellerInput {
  where: SaleWhereUniqueInput!
  update: SaleUpdateWithoutSellerDataInput!
  create: SaleCreateWithoutSellerInput!
}

input SaleWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [SaleWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [SaleWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  price: Float
  """
  All values that are not equal to given value.
  """
  price_not: Float
  """
  All values that are contained in given list.
  """
  price_in: [Float!]
  """
  All values that are not contained in given list.
  """
  price_not_in: [Float!]
  """
  All values less than the given value.
  """
  price_lt: Float
  """
  All values less than or equal the given value.
  """
  price_lte: Float
  """
  All values greater than the given value.
  """
  price_gt: Float
  """
  All values greater than or equal the given value.
  """
  price_gte: Float
  seller: UserWhereInput
  product: ProductWhereInput
  items_every: ItemWhereInput
  items_some: ItemWhereInput
  items_none: ItemWhereInput
}

input SaleWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String!
  role: UserRole!
  sales: SaleCreateManyWithoutSellerInput
  orders: OrderCreateManyWithoutSellerInput
  itemsReceived: ItemCreateManyInput
}

input UserCreateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutSalesInput {
  create: UserCreateWithoutSalesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutOrdersInput {
  email: String!
  password: String!
  name: String!
  role: UserRole!
  sales: SaleCreateManyWithoutSellerInput
  itemsReceived: ItemCreateManyInput
}

input UserCreateWithoutSalesInput {
  email: String!
  password: String!
  name: String!
  role: UserRole!
  orders: OrderCreateManyWithoutSellerInput
  itemsReceived: ItemCreateManyInput
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  role_ASC
  role_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
  role: UserRole!
}

enum UserRole {
  SELLER
  INVENTORY_MANAGER
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  role: UserRole
  sales: SaleUpdateManyWithoutSellerInput
  orders: OrderUpdateManyWithoutSellerInput
  itemsReceived: ItemUpdateManyInput
}

input UserUpdateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  connect: UserWhereUniqueInput
  disconnect: UserWhereUniqueInput
  delete: UserWhereUniqueInput
  update: UserUpdateWithoutOrdersInput
  upsert: UserUpsertWithoutOrdersInput
}

input UserUpdateOneWithoutSalesInput {
  create: UserCreateWithoutSalesInput
  connect: UserWhereUniqueInput
  disconnect: UserWhereUniqueInput
  delete: UserWhereUniqueInput
  update: UserUpdateWithoutSalesInput
  upsert: UserUpsertWithoutSalesInput
}

input UserUpdateWithoutOrdersDataInput {
  email: String
  password: String
  name: String
  role: UserRole
  sales: SaleUpdateManyWithoutSellerInput
  itemsReceived: ItemUpdateManyInput
}

input UserUpdateWithoutOrdersInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutOrdersDataInput!
}

input UserUpdateWithoutSalesDataInput {
  email: String
  password: String
  name: String
  role: UserRole
  orders: OrderUpdateManyWithoutSellerInput
  itemsReceived: ItemUpdateManyInput
}

input UserUpdateWithoutSalesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutSalesDataInput!
}

input UserUpsertWithoutOrdersInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutOrdersDataInput!
  create: UserCreateWithoutOrdersInput!
}

input UserUpsertWithoutSalesInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutSalesDataInput!
  create: UserCreateWithoutSalesInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  role: UserRole
  """
  All values that are not equal to given value.
  """
  role_not: UserRole
  """
  All values that are contained in given list.
  """
  role_in: [UserRole!]
  """
  All values that are not contained in given list.
  """
  role_not_in: [UserRole!]
  sales_every: SaleWhereInput
  sales_some: SaleWhereInput
  sales_none: SaleWhereInput
  orders_every: OrderWhereInput
  orders_some: OrderWhereInput
  orders_none: OrderWhereInput
  itemsReceived_every: ItemWhereInput
  itemsReceived_some: ItemWhereInput
  itemsReceived_none: ItemWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Mutation {
  createProduct(data: ProductCreateInput!): Product!
  createItem(data: ItemCreateInput!): Item!
  createSale(data: SaleCreateInput!): Sale!
  createOrder(data: OrderCreateInput!): Order!
  createUser(data: UserCreateInput!): User!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateItem(data: ItemUpdateInput!, where: ItemWhereUniqueInput!): Item
  updateSale(data: SaleUpdateInput!, where: SaleWhereUniqueInput!): Sale
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteItem(where: ItemWhereUniqueInput!): Item
  deleteSale(where: SaleWhereUniqueInput!): Sale
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteUser(where: UserWhereUniqueInput!): User
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  upsertItem(where: ItemWhereUniqueInput!, create: ItemCreateInput!, update: ItemUpdateInput!): Item!
  upsertSale(where: SaleWhereUniqueInput!, create: SaleCreateInput!, update: SaleUpdateInput!): Sale!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyProducts(data: ProductUpdateInput!, where: ProductWhereInput!): BatchPayload!
  updateManyItems(data: ItemUpdateInput!, where: ItemWhereInput!): BatchPayload!
  updateManySales(data: SaleUpdateInput!, where: SaleWhereInput!): BatchPayload!
  updateManyOrders(data: OrderUpdateInput!, where: OrderWhereInput!): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput!): BatchPayload!
  deleteManyProducts(where: ProductWhereInput!): BatchPayload!
  deleteManyItems(where: ItemWhereInput!): BatchPayload!
  deleteManySales(where: SaleWhereInput!): BatchPayload!
  deleteManyOrders(where: OrderWhereInput!): BatchPayload!
  deleteManyUsers(where: UserWhereInput!): BatchPayload!
}

type Query {
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Item]!
  sales(where: SaleWhereInput, orderBy: SaleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sale]!
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  product(where: ProductWhereUniqueInput!): Product
  item(where: ItemWhereUniqueInput!): Item
  sale(where: SaleWhereUniqueInput!): Sale
  order(where: OrderWhereUniqueInput!): Order
  user(where: UserWhereUniqueInput!): User
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  itemsConnection(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ItemConnection!
  salesConnection(where: SaleWhereInput, orderBy: SaleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SaleConnection!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  item(where: ItemSubscriptionWhereInput): ItemSubscriptionPayload
  sale(where: SaleSubscriptionWhereInput): SaleSubscriptionPayload
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}
`

export type UserRole = 
  'SELLER' |
  'INVENTORY_MANAGER'

export type ProductOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'description_ASC' |
  'description_DESC' |
  'picture_ASC' |
  'picture_DESC' |
  'price_ASC' |
  'price_DESC'

export type ItemOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'cost_ASC' |
  'cost_DESC'

export type SaleOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'price_ASC' |
  'price_DESC'

export type OrderOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'name_ASC' |
  'name_DESC' |
  'role_ASC' |
  'role_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface ProductUpdateInput {
  description?: String
  picture?: String
  price?: Float
  items?: ItemUpdateManyWithoutProductInput
  sales?: SaleUpdateManyWithoutProductInput
}

export interface ProductWhereInput {
  AND?: ProductWhereInput[] | ProductWhereInput
  OR?: ProductWhereInput[] | ProductWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  picture?: String
  picture_not?: String
  picture_in?: String[] | String
  picture_not_in?: String[] | String
  picture_lt?: String
  picture_lte?: String
  picture_gt?: String
  picture_gte?: String
  picture_contains?: String
  picture_not_contains?: String
  picture_starts_with?: String
  picture_not_starts_with?: String
  picture_ends_with?: String
  picture_not_ends_with?: String
  price?: Float
  price_not?: Float
  price_in?: Float[] | Float
  price_not_in?: Float[] | Float
  price_lt?: Float
  price_lte?: Float
  price_gt?: Float
  price_gte?: Float
  items_every?: ItemWhereInput
  items_some?: ItemWhereInput
  items_none?: ItemWhereInput
  sales_every?: SaleWhereInput
  sales_some?: SaleWhereInput
  sales_none?: SaleWhereInput
}

export interface SaleUpdateOneWithoutItemsInput {
  create?: SaleCreateWithoutItemsInput
  connect?: SaleWhereUniqueInput
  disconnect?: SaleWhereUniqueInput
  delete?: SaleWhereUniqueInput
  update?: SaleUpdateWithoutItemsInput
  upsert?: SaleUpsertWithoutItemsInput
}

export interface OrderWhereInput {
  AND?: OrderWhereInput[] | OrderWhereInput
  OR?: OrderWhereInput[] | OrderWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  sales_every?: SaleWhereInput
  sales_some?: SaleWhereInput
  sales_none?: SaleWhereInput
  seller?: UserWhereInput
}

export interface ItemCreateWithoutSaleInput {
  cost: Float
  product: ProductCreateOneWithoutItemsInput
}

export interface SaleUpsertNestedInput {
  where: SaleWhereUniqueInput
  update: SaleUpdateDataInput
  create: SaleCreateInput
}

export interface ProductCreateOneWithoutItemsInput {
  create?: ProductCreateWithoutItemsInput
  connect?: ProductWhereUniqueInput
}

export interface SaleUpdateWithoutItemsInput {
  where: SaleWhereUniqueInput
  data: SaleUpdateWithoutItemsDataInput
}

export interface ProductCreateWithoutItemsInput {
  description: String
  picture: String
  price: Float
  sales?: SaleCreateManyWithoutProductInput
}

export interface SaleWhereInput {
  AND?: SaleWhereInput[] | SaleWhereInput
  OR?: SaleWhereInput[] | SaleWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  price?: Float
  price_not?: Float
  price_in?: Float[] | Float
  price_not_in?: Float[] | Float
  price_lt?: Float
  price_lte?: Float
  price_gt?: Float
  price_gte?: Float
  seller?: UserWhereInput
  product?: ProductWhereInput
  items_every?: ItemWhereInput
  items_some?: ItemWhereInput
  items_none?: ItemWhereInput
}

export interface SaleCreateManyWithoutProductInput {
  create?: SaleCreateWithoutProductInput[] | SaleCreateWithoutProductInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
}

export interface OrderSubscriptionWhereInput {
  AND?: OrderSubscriptionWhereInput[] | OrderSubscriptionWhereInput
  OR?: OrderSubscriptionWhereInput[] | OrderSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OrderWhereInput
}

export interface SaleCreateWithoutProductInput {
  price: Float
  seller: UserCreateOneWithoutSalesInput
  items?: ItemCreateManyWithoutSaleInput
}

export interface ItemWhereInput {
  AND?: ItemWhereInput[] | ItemWhereInput
  OR?: ItemWhereInput[] | ItemWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  cost?: Float
  cost_not?: Float
  cost_in?: Float[] | Float
  cost_not_in?: Float[] | Float
  cost_lt?: Float
  cost_lte?: Float
  cost_gt?: Float
  cost_gte?: Float
  product?: ProductWhereInput
  sale?: SaleWhereInput
}

export interface ItemCreateManyInput {
  create?: ItemCreateInput[] | ItemCreateInput
  connect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
}

export interface ProductSubscriptionWhereInput {
  AND?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  OR?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ProductWhereInput
}

export interface ItemCreateInput {
  cost: Float
  product: ProductCreateOneWithoutItemsInput
  sale?: SaleCreateOneWithoutItemsInput
}

export interface ProductWhereUniqueInput {
  id?: ID_Input
}

export interface OrderCreateInput {
  sales?: SaleCreateManyInput
  seller: UserCreateOneWithoutOrdersInput
}

export interface SaleWhereUniqueInput {
  id?: ID_Input
}

export interface UserCreateOneWithoutOrdersInput {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface UserCreateWithoutOrdersInput {
  email: String
  password: String
  name: String
  role: UserRole
  sales?: SaleCreateManyWithoutSellerInput
  itemsReceived?: ItemCreateManyInput
}

export interface SaleUpsertWithoutSellerInput {
  where: SaleWhereUniqueInput
  update: SaleUpdateWithoutSellerDataInput
  create: SaleCreateWithoutSellerInput
}

export interface SaleCreateManyWithoutSellerInput {
  create?: SaleCreateWithoutSellerInput[] | SaleCreateWithoutSellerInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
}

export interface SaleUpdateWithoutSellerInput {
  where: SaleWhereUniqueInput
  data: SaleUpdateWithoutSellerDataInput
}

export interface SaleCreateWithoutSellerInput {
  price: Float
  product: ProductCreateOneWithoutSalesInput
  items?: ItemCreateManyWithoutSaleInput
}

export interface UserUpdateWithoutOrdersDataInput {
  email?: String
  password?: String
  name?: String
  role?: UserRole
  sales?: SaleUpdateManyWithoutSellerInput
  itemsReceived?: ItemUpdateManyInput
}

export interface UserCreateInput {
  email: String
  password: String
  name: String
  role: UserRole
  sales?: SaleCreateManyWithoutSellerInput
  orders?: OrderCreateManyWithoutSellerInput
  itemsReceived?: ItemCreateManyInput
}

export interface UserUpdateOneWithoutOrdersInput {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput
  delete?: UserWhereUniqueInput
  update?: UserUpdateWithoutOrdersInput
  upsert?: UserUpsertWithoutOrdersInput
}

export interface ItemUpdateManyInput {
  create?: ItemCreateInput[] | ItemCreateInput
  connect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  disconnect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  delete?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  update?: ItemUpdateNestedInput[] | ItemUpdateNestedInput
  upsert?: ItemUpsertNestedInput[] | ItemUpsertNestedInput
}

export interface SaleUpdateInput {
  price?: Float
  seller?: UserUpdateOneWithoutSalesInput
  product?: ProductUpdateOneWithoutSalesInput
  items?: ItemUpdateManyWithoutSaleInput
}

export interface ItemUpdateManyWithoutProductInput {
  create?: ItemCreateWithoutProductInput[] | ItemCreateWithoutProductInput
  connect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  disconnect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  delete?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  update?: ItemUpdateWithoutProductInput[] | ItemUpdateWithoutProductInput
  upsert?: ItemUpsertWithoutProductInput[] | ItemUpsertWithoutProductInput
}

export interface ItemUpsertWithoutProductInput {
  where: ItemWhereUniqueInput
  update: ItemUpdateWithoutProductDataInput
  create: ItemCreateWithoutProductInput
}

export interface ItemUpdateWithoutProductInput {
  where: ItemWhereUniqueInput
  data: ItemUpdateWithoutProductDataInput
}

export interface UserUpsertWithoutSalesInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutSalesDataInput
  create: UserCreateWithoutSalesInput
}

export interface ItemUpdateWithoutProductDataInput {
  cost?: Float
  sale?: SaleUpdateOneWithoutItemsInput
}

export interface ItemUpdateDataInput {
  cost?: Float
  product?: ProductUpdateOneWithoutItemsInput
  sale?: SaleUpdateOneWithoutItemsInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  role?: UserRole
  role_not?: UserRole
  role_in?: UserRole[] | UserRole
  role_not_in?: UserRole[] | UserRole
  sales_every?: SaleWhereInput
  sales_some?: SaleWhereInput
  sales_none?: SaleWhereInput
  orders_every?: OrderWhereInput
  orders_some?: OrderWhereInput
  orders_none?: OrderWhereInput
  itemsReceived_every?: ItemWhereInput
  itemsReceived_some?: ItemWhereInput
  itemsReceived_none?: ItemWhereInput
}

export interface ProductCreateInput {
  description: String
  picture: String
  price: Float
  items?: ItemCreateManyWithoutProductInput
  sales?: SaleCreateManyWithoutProductInput
}

export interface OrderUpsertWithoutSellerInput {
  where: OrderWhereUniqueInput
  update: OrderUpdateWithoutSellerDataInput
  create: OrderCreateWithoutSellerInput
}

export interface ItemCreateWithoutProductInput {
  cost: Float
  sale?: SaleCreateOneWithoutItemsInput
}

export interface SaleUpdateWithoutItemsDataInput {
  price?: Float
  seller?: UserUpdateOneWithoutSalesInput
  product?: ProductUpdateOneWithoutSalesInput
}

export interface SaleCreateWithoutItemsInput {
  price: Float
  seller: UserCreateOneWithoutSalesInput
  product: ProductCreateOneWithoutSalesInput
}

export interface UserUpdateOneWithoutSalesInput {
  create?: UserCreateWithoutSalesInput
  connect?: UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput
  delete?: UserWhereUniqueInput
  update?: UserUpdateWithoutSalesInput
  upsert?: UserUpsertWithoutSalesInput
}

export interface UserCreateWithoutSalesInput {
  email: String
  password: String
  name: String
  role: UserRole
  orders?: OrderCreateManyWithoutSellerInput
  itemsReceived?: ItemCreateManyInput
}

export interface UserUpdateWithoutSalesInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutSalesDataInput
}

export interface OrderCreateWithoutSellerInput {
  sales?: SaleCreateManyInput
}

export interface UserUpdateWithoutSalesDataInput {
  email?: String
  password?: String
  name?: String
  role?: UserRole
  orders?: OrderUpdateManyWithoutSellerInput
  itemsReceived?: ItemUpdateManyInput
}

export interface SaleCreateInput {
  price: Float
  seller: UserCreateOneWithoutSalesInput
  product: ProductCreateOneWithoutSalesInput
  items?: ItemCreateManyWithoutSaleInput
}

export interface OrderUpdateManyWithoutSellerInput {
  create?: OrderCreateWithoutSellerInput[] | OrderCreateWithoutSellerInput
  connect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  disconnect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  delete?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  update?: OrderUpdateWithoutSellerInput[] | OrderUpdateWithoutSellerInput
  upsert?: OrderUpsertWithoutSellerInput[] | OrderUpsertWithoutSellerInput
}

export interface ProductCreateWithoutSalesInput {
  description: String
  picture: String
  price: Float
  items?: ItemCreateManyWithoutProductInput
}

export interface OrderUpdateWithoutSellerInput {
  where: OrderWhereUniqueInput
  data: OrderUpdateWithoutSellerDataInput
}

export interface SaleSubscriptionWhereInput {
  AND?: SaleSubscriptionWhereInput[] | SaleSubscriptionWhereInput
  OR?: SaleSubscriptionWhereInput[] | SaleSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SaleWhereInput
}

export interface OrderUpdateWithoutSellerDataInput {
  sales?: SaleUpdateManyInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  name?: String
  role?: UserRole
  sales?: SaleUpdateManyWithoutSellerInput
  orders?: OrderUpdateManyWithoutSellerInput
  itemsReceived?: ItemUpdateManyInput
}

export interface SaleUpdateManyInput {
  create?: SaleCreateInput[] | SaleCreateInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  disconnect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  delete?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  update?: SaleUpdateNestedInput[] | SaleUpdateNestedInput
  upsert?: SaleUpsertNestedInput[] | SaleUpsertNestedInput
}

export interface OrderWhereUniqueInput {
  id?: ID_Input
}

export interface SaleUpdateNestedInput {
  where: SaleWhereUniqueInput
  data: SaleUpdateDataInput
}

export interface SaleUpdateWithoutSellerDataInput {
  price?: Float
  product?: ProductUpdateOneWithoutSalesInput
  items?: ItemUpdateManyWithoutSaleInput
}

export interface SaleUpdateDataInput {
  price?: Float
  seller?: UserUpdateOneWithoutSalesInput
  product?: ProductUpdateOneWithoutSalesInput
  items?: ItemUpdateManyWithoutSaleInput
}

export interface UserUpdateWithoutOrdersInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutOrdersDataInput
}

export interface ProductUpdateOneWithoutSalesInput {
  create?: ProductCreateWithoutSalesInput
  connect?: ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput
  update?: ProductUpdateWithoutSalesInput
  upsert?: ProductUpsertWithoutSalesInput
}

export interface ItemUpdateInput {
  cost?: Float
  product?: ProductUpdateOneWithoutItemsInput
  sale?: SaleUpdateOneWithoutItemsInput
}

export interface ProductUpdateWithoutSalesInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutSalesDataInput
}

export interface ItemUpsertNestedInput {
  where: ItemWhereUniqueInput
  update: ItemUpdateDataInput
  create: ItemCreateInput
}

export interface ProductUpdateWithoutSalesDataInput {
  description?: String
  picture?: String
  price?: Float
  items?: ItemUpdateManyWithoutProductInput
}

export interface ItemCreateManyWithoutProductInput {
  create?: ItemCreateWithoutProductInput[] | ItemCreateWithoutProductInput
  connect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
}

export interface ProductUpsertWithoutSalesInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutSalesDataInput
  create: ProductCreateWithoutSalesInput
}

export interface UserCreateOneWithoutSalesInput {
  create?: UserCreateWithoutSalesInput
  connect?: UserWhereUniqueInput
}

export interface ItemUpdateManyWithoutSaleInput {
  create?: ItemCreateWithoutSaleInput[] | ItemCreateWithoutSaleInput
  connect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  disconnect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  delete?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
  update?: ItemUpdateWithoutSaleInput[] | ItemUpdateWithoutSaleInput
  upsert?: ItemUpsertWithoutSaleInput[] | ItemUpsertWithoutSaleInput
}

export interface SaleCreateManyInput {
  create?: SaleCreateInput[] | SaleCreateInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
}

export interface ItemUpdateWithoutSaleInput {
  where: ItemWhereUniqueInput
  data: ItemUpdateWithoutSaleDataInput
}

export interface ItemCreateManyWithoutSaleInput {
  create?: ItemCreateWithoutSaleInput[] | ItemCreateWithoutSaleInput
  connect?: ItemWhereUniqueInput[] | ItemWhereUniqueInput
}

export interface ItemUpdateWithoutSaleDataInput {
  cost?: Float
  product?: ProductUpdateOneWithoutItemsInput
}

export interface ItemSubscriptionWhereInput {
  AND?: ItemSubscriptionWhereInput[] | ItemSubscriptionWhereInput
  OR?: ItemSubscriptionWhereInput[] | ItemSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ItemWhereInput
}

export interface ProductUpdateOneWithoutItemsInput {
  create?: ProductCreateWithoutItemsInput
  connect?: ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput
  update?: ProductUpdateWithoutItemsInput
  upsert?: ProductUpsertWithoutItemsInput
}

export interface UserUpsertWithoutOrdersInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutOrdersDataInput
  create: UserCreateWithoutOrdersInput
}

export interface ProductUpdateWithoutItemsInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutItemsDataInput
}

export interface OrderUpdateInput {
  sales?: SaleUpdateManyInput
  seller?: UserUpdateOneWithoutOrdersInput
}

export interface ProductUpdateWithoutItemsDataInput {
  description?: String
  picture?: String
  price?: Float
  sales?: SaleUpdateManyWithoutProductInput
}

export interface ItemUpdateNestedInput {
  where: ItemWhereUniqueInput
  data: ItemUpdateDataInput
}

export interface SaleUpdateManyWithoutProductInput {
  create?: SaleCreateWithoutProductInput[] | SaleCreateWithoutProductInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  disconnect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  delete?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  update?: SaleUpdateWithoutProductInput[] | SaleUpdateWithoutProductInput
  upsert?: SaleUpsertWithoutProductInput[] | SaleUpsertWithoutProductInput
}

export interface OrderCreateManyWithoutSellerInput {
  create?: OrderCreateWithoutSellerInput[] | OrderCreateWithoutSellerInput
  connect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
}

export interface SaleUpdateWithoutProductInput {
  where: SaleWhereUniqueInput
  data: SaleUpdateWithoutProductDataInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface ItemUpsertWithoutSaleInput {
  where: ItemWhereUniqueInput
  update: ItemUpdateWithoutSaleDataInput
  create: ItemCreateWithoutSaleInput
}

export interface ProductUpsertWithoutItemsInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutItemsDataInput
  create: ProductCreateWithoutItemsInput
}

export interface SaleUpsertWithoutProductInput {
  where: SaleWhereUniqueInput
  update: SaleUpdateWithoutProductDataInput
  create: SaleCreateWithoutProductInput
}

export interface SaleUpdateWithoutProductDataInput {
  price?: Float
  seller?: UserUpdateOneWithoutSalesInput
  items?: ItemUpdateManyWithoutSaleInput
}

export interface ItemWhereUniqueInput {
  id?: ID_Input
}

export interface ProductCreateOneWithoutSalesInput {
  create?: ProductCreateWithoutSalesInput
  connect?: ProductWhereUniqueInput
}

export interface SaleCreateOneWithoutItemsInput {
  create?: SaleCreateWithoutItemsInput
  connect?: SaleWhereUniqueInput
}

export interface SaleUpsertWithoutItemsInput {
  where: SaleWhereUniqueInput
  update: SaleUpdateWithoutItemsDataInput
  create: SaleCreateWithoutItemsInput
}

export interface SaleUpdateManyWithoutSellerInput {
  create?: SaleCreateWithoutSellerInput[] | SaleCreateWithoutSellerInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  disconnect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  delete?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  update?: SaleUpdateWithoutSellerInput[] | SaleUpdateWithoutSellerInput
  upsert?: SaleUpsertWithoutSellerInput[] | SaleUpsertWithoutSellerInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  name: String
  role: UserRole
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface SalePreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  price: Float
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface Product extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  description: String
  picture: String
  price: Float
  items?: Item[]
  sales?: Sale[]
}

/*
 * A connection to a list of items.

 */
export interface ProductConnection {
  pageInfo: PageInfo
  edges: ProductEdge[]
  aggregate: AggregateProduct
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface Item extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  product: Product
  cost: Float
  sale?: Sale
}

export interface AggregateOrder {
  count: Int
}

export interface BatchPayload {
  count: Long
}

/*
 * A connection to a list of items.

 */
export interface OrderConnection {
  pageInfo: PageInfo
  edges: OrderEdge[]
  aggregate: AggregateOrder
}

export interface OrderPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface SaleEdge {
  node: Sale
  cursor: String
}

export interface Order extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  sales?: Sale[]
  seller: User
}

export interface AggregateItem {
  count: Int
}

export interface OrderSubscriptionPayload {
  mutation: MutationType
  node?: Order
  updatedFields?: String[]
  previousValues?: OrderPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface ItemConnection {
  pageInfo: PageInfo
  edges: ItemEdge[]
  aggregate: AggregateItem
}

export interface ProductSubscriptionPayload {
  mutation: MutationType
  node?: Product
  updatedFields?: String[]
  previousValues?: ProductPreviousValues
}

/*
 * An edge in a connection.

 */
export interface ProductEdge {
  node: Product
  cursor: String
}

export interface ProductPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  description: String
  picture: String
  price: Float
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface Sale extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  price: Float
  seller: User
  product: Product
  items?: Item[]
}

export interface AggregateSale {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface ItemEdge {
  node: Item
  cursor: String
}

export interface SaleSubscriptionPayload {
  mutation: MutationType
  node?: Sale
  updatedFields?: String[]
  previousValues?: SalePreviousValues
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  name: String
  role: UserRole
  sales?: Sale[]
  orders?: Order[]
  itemsReceived?: Item[]
}

export interface ItemPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  cost: Float
}

export interface ItemSubscriptionPayload {
  mutation: MutationType
  node?: Item
  updatedFields?: String[]
  previousValues?: ItemPreviousValues
}

export interface AggregateProduct {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface SaleConnection {
  pageInfo: PageInfo
  edges: SaleEdge[]
  aggregate: AggregateSale
}

/*
 * An edge in a connection.

 */
export interface OrderEdge {
  node: Order
  cursor: String
}

export interface AggregateUser {
  count: Int
}

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

export type DateTime = string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  products: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Product[]>
  items: (args: { where?: ItemWhereInput, orderBy?: ItemOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Item[]>
  sales: (args: { where?: SaleWhereInput, orderBy?: SaleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Sale[]>
  orders: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Order[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  product: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  item: (args: { where: ItemWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Item | null>
  sale: (args: { where: SaleWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Sale | null>
  order: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  productsConnection: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ProductConnection>
  itemsConnection: (args: { where?: ItemWhereInput, orderBy?: ItemOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ItemConnection>
  salesConnection: (args: { where?: SaleWhereInput, orderBy?: SaleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<SaleConnection>
  ordersConnection: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createProduct: (args: { data: ProductCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  createItem: (args: { data: ItemCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Item>
  createSale: (args: { data: SaleCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Sale>
  createOrder: (args: { data: OrderCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateProduct: (args: { data: ProductUpdateInput, where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  updateItem: (args: { data: ItemUpdateInput, where: ItemWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Item | null>
  updateSale: (args: { data: SaleUpdateInput, where: SaleWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Sale | null>
  updateOrder: (args: { data: OrderUpdateInput, where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteProduct: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  deleteItem: (args: { where: ItemWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Item | null>
  deleteSale: (args: { where: SaleWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Sale | null>
  deleteOrder: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  upsertProduct: (args: { where: ProductWhereUniqueInput, create: ProductCreateInput, update: ProductUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  upsertItem: (args: { where: ItemWhereUniqueInput, create: ItemCreateInput, update: ItemUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Item>
  upsertSale: (args: { where: SaleWhereUniqueInput, create: SaleCreateInput, update: SaleUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Sale>
  upsertOrder: (args: { where: OrderWhereUniqueInput, create: OrderCreateInput, update: OrderUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateManyProducts: (args: { data: ProductUpdateInput, where: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyItems: (args: { data: ItemUpdateInput, where: ItemWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManySales: (args: { data: SaleUpdateInput, where: SaleWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOrders: (args: { data: OrderUpdateInput, where: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyProducts: (args: { where: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyItems: (args: { where: ItemWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManySales: (args: { where: SaleWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOrders: (args: { where: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  product: (args: { where?: ProductSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ProductSubscriptionPayload>>
  item: (args: { where?: ItemSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ItemSubscriptionPayload>>
  sale: (args: { where?: SaleSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<SaleSubscriptionPayload>>
  order: (args: { where?: OrderSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OrderSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Product: (where: ProductWhereInput): Promise<boolean> => super.existsDelegate('query', 'products', { where }, {}, '{ id }'),
    Item: (where: ItemWhereInput): Promise<boolean> => super.existsDelegate('query', 'items', { where }, {}, '{ id }'),
    Sale: (where: SaleWhereInput): Promise<boolean> => super.existsDelegate('query', 'sales', { where }, {}, '{ id }'),
    Order: (where: OrderWhereInput): Promise<boolean> => super.existsDelegate('query', 'orders', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }')
  }

  query: Query = {
    products: (args, info): Promise<Product[]> => super.delegate('query', 'products', args, {}, info),
    items: (args, info): Promise<Item[]> => super.delegate('query', 'items', args, {}, info),
    sales: (args, info): Promise<Sale[]> => super.delegate('query', 'sales', args, {}, info),
    orders: (args, info): Promise<Order[]> => super.delegate('query', 'orders', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    product: (args, info): Promise<Product | null> => super.delegate('query', 'product', args, {}, info),
    item: (args, info): Promise<Item | null> => super.delegate('query', 'item', args, {}, info),
    sale: (args, info): Promise<Sale | null> => super.delegate('query', 'sale', args, {}, info),
    order: (args, info): Promise<Order | null> => super.delegate('query', 'order', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    productsConnection: (args, info): Promise<ProductConnection> => super.delegate('query', 'productsConnection', args, {}, info),
    itemsConnection: (args, info): Promise<ItemConnection> => super.delegate('query', 'itemsConnection', args, {}, info),
    salesConnection: (args, info): Promise<SaleConnection> => super.delegate('query', 'salesConnection', args, {}, info),
    ordersConnection: (args, info): Promise<OrderConnection> => super.delegate('query', 'ordersConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createProduct: (args, info): Promise<Product> => super.delegate('mutation', 'createProduct', args, {}, info),
    createItem: (args, info): Promise<Item> => super.delegate('mutation', 'createItem', args, {}, info),
    createSale: (args, info): Promise<Sale> => super.delegate('mutation', 'createSale', args, {}, info),
    createOrder: (args, info): Promise<Order> => super.delegate('mutation', 'createOrder', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    updateProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'updateProduct', args, {}, info),
    updateItem: (args, info): Promise<Item | null> => super.delegate('mutation', 'updateItem', args, {}, info),
    updateSale: (args, info): Promise<Sale | null> => super.delegate('mutation', 'updateSale', args, {}, info),
    updateOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'updateOrder', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    deleteProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'deleteProduct', args, {}, info),
    deleteItem: (args, info): Promise<Item | null> => super.delegate('mutation', 'deleteItem', args, {}, info),
    deleteSale: (args, info): Promise<Sale | null> => super.delegate('mutation', 'deleteSale', args, {}, info),
    deleteOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'deleteOrder', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    upsertProduct: (args, info): Promise<Product> => super.delegate('mutation', 'upsertProduct', args, {}, info),
    upsertItem: (args, info): Promise<Item> => super.delegate('mutation', 'upsertItem', args, {}, info),
    upsertSale: (args, info): Promise<Sale> => super.delegate('mutation', 'upsertSale', args, {}, info),
    upsertOrder: (args, info): Promise<Order> => super.delegate('mutation', 'upsertOrder', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    updateManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyProducts', args, {}, info),
    updateManyItems: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyItems', args, {}, info),
    updateManySales: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManySales', args, {}, info),
    updateManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOrders', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    deleteManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyProducts', args, {}, info),
    deleteManyItems: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyItems', args, {}, info),
    deleteManySales: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManySales', args, {}, info),
    deleteManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOrders', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info)
  }

  subscription: Subscription = {
    product: (args, infoOrQuery): Promise<AsyncIterator<ProductSubscriptionPayload>> => super.delegateSubscription('product', args, {}, infoOrQuery),
    item: (args, infoOrQuery): Promise<AsyncIterator<ItemSubscriptionPayload>> => super.delegateSubscription('item', args, {}, infoOrQuery),
    sale: (args, infoOrQuery): Promise<AsyncIterator<SaleSubscriptionPayload>> => super.delegateSubscription('sale', args, {}, infoOrQuery),
    order: (args, infoOrQuery): Promise<AsyncIterator<OrderSubscriptionPayload>> => super.delegateSubscription('order', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery)
  }
}