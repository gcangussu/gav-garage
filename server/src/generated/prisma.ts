import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
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
  createdBy(where: UserWhereInput): User!
  description: String!
  picture: String!
  unitPrice: Float!
  quantity: Int!
  receipts(where: ReceiptWhereInput, orderBy: ReceiptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Receipt!]
  sales(where: SaleWhereInput, orderBy: SaleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sale!]
}

type Receipt implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  receivedBy(where: UserWhereInput): User!
  product(where: ProductWhereInput): Product!
  unitCost: Float!
  quantity: Int!
}

type Sale implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  product(where: ProductWhereInput): Product!
  unitPrice: Float!
  quantity: Int!
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  name: String!
  role: UserRole!
  receipts(where: ReceiptWhereInput, orderBy: ReceiptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Receipt!]
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order!]
}

type AggregateOrder {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateReceipt {
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
  unitPrice: Float!
  quantity: Int!
  createdBy: UserCreateOneInput!
  receipts: ReceiptCreateManyWithoutProductInput
  sales: SaleCreateManyWithoutProductInput
}

input ProductCreateOneWithoutReceiptsInput {
  create: ProductCreateWithoutReceiptsInput
  connect: ProductWhereUniqueInput
}

input ProductCreateOneWithoutSalesInput {
  create: ProductCreateWithoutSalesInput
  connect: ProductWhereUniqueInput
}

input ProductCreateWithoutReceiptsInput {
  description: String!
  picture: String!
  unitPrice: Float!
  quantity: Int!
  createdBy: UserCreateOneInput!
  sales: SaleCreateManyWithoutProductInput
}

input ProductCreateWithoutSalesInput {
  description: String!
  picture: String!
  unitPrice: Float!
  quantity: Int!
  createdBy: UserCreateOneInput!
  receipts: ReceiptCreateManyWithoutProductInput
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
  unitPrice_ASC
  unitPrice_DESC
  quantity_ASC
  quantity_DESC
}

type ProductPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  picture: String!
  unitPrice: Float!
  quantity: Int!
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
  unitPrice: Float
  quantity: Int
  createdBy: UserUpdateOneInput
  receipts: ReceiptUpdateManyWithoutProductInput
  sales: SaleUpdateManyWithoutProductInput
}

input ProductUpdateOneWithoutReceiptsInput {
  create: ProductCreateWithoutReceiptsInput
  connect: ProductWhereUniqueInput
  disconnect: ProductWhereUniqueInput
  delete: ProductWhereUniqueInput
  update: ProductUpdateWithoutReceiptsInput
  upsert: ProductUpsertWithoutReceiptsInput
}

input ProductUpdateOneWithoutSalesInput {
  create: ProductCreateWithoutSalesInput
  connect: ProductWhereUniqueInput
  disconnect: ProductWhereUniqueInput
  delete: ProductWhereUniqueInput
  update: ProductUpdateWithoutSalesInput
  upsert: ProductUpsertWithoutSalesInput
}

input ProductUpdateWithoutReceiptsDataInput {
  description: String
  picture: String
  unitPrice: Float
  quantity: Int
  createdBy: UserUpdateOneInput
  sales: SaleUpdateManyWithoutProductInput
}

input ProductUpdateWithoutReceiptsInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutReceiptsDataInput!
}

input ProductUpdateWithoutSalesDataInput {
  description: String
  picture: String
  unitPrice: Float
  quantity: Int
  createdBy: UserUpdateOneInput
  receipts: ReceiptUpdateManyWithoutProductInput
}

input ProductUpdateWithoutSalesInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutSalesDataInput!
}

input ProductUpsertWithoutReceiptsInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutReceiptsDataInput!
  create: ProductCreateWithoutReceiptsInput!
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
  unitPrice: Float
  """
  All values that are not equal to given value.
  """
  unitPrice_not: Float
  """
  All values that are contained in given list.
  """
  unitPrice_in: [Float!]
  """
  All values that are not contained in given list.
  """
  unitPrice_not_in: [Float!]
  """
  All values less than the given value.
  """
  unitPrice_lt: Float
  """
  All values less than or equal the given value.
  """
  unitPrice_lte: Float
  """
  All values greater than the given value.
  """
  unitPrice_gt: Float
  """
  All values greater than or equal the given value.
  """
  unitPrice_gte: Float
  quantity: Int
  """
  All values that are not equal to given value.
  """
  quantity_not: Int
  """
  All values that are contained in given list.
  """
  quantity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  quantity_not_in: [Int!]
  """
  All values less than the given value.
  """
  quantity_lt: Int
  """
  All values less than or equal the given value.
  """
  quantity_lte: Int
  """
  All values greater than the given value.
  """
  quantity_gt: Int
  """
  All values greater than or equal the given value.
  """
  quantity_gte: Int
  createdBy: UserWhereInput
  receipts_every: ReceiptWhereInput
  receipts_some: ReceiptWhereInput
  receipts_none: ReceiptWhereInput
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
type ReceiptConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ReceiptEdge]!
  aggregate: AggregateReceipt!
}

input ReceiptCreateInput {
  unitCost: Float!
  quantity: Int!
  receivedBy: UserCreateOneWithoutReceiptsInput!
  product: ProductCreateOneWithoutReceiptsInput!
}

input ReceiptCreateManyWithoutProductInput {
  create: [ReceiptCreateWithoutProductInput!]
  connect: [ReceiptWhereUniqueInput!]
}

input ReceiptCreateManyWithoutReceivedByInput {
  create: [ReceiptCreateWithoutReceivedByInput!]
  connect: [ReceiptWhereUniqueInput!]
}

input ReceiptCreateWithoutProductInput {
  unitCost: Float!
  quantity: Int!
  receivedBy: UserCreateOneWithoutReceiptsInput!
}

input ReceiptCreateWithoutReceivedByInput {
  unitCost: Float!
  quantity: Int!
  product: ProductCreateOneWithoutReceiptsInput!
}

"""
An edge in a connection.
"""
type ReceiptEdge {
  """
  The item at the end of the edge.
  """
  node: Receipt!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ReceiptOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  unitCost_ASC
  unitCost_DESC
  quantity_ASC
  quantity_DESC
}

type ReceiptPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  unitCost: Float!
  quantity: Int!
}

type ReceiptSubscriptionPayload {
  mutation: MutationType!
  node: Receipt
  updatedFields: [String!]
  previousValues: ReceiptPreviousValues
}

input ReceiptSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ReceiptSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ReceiptSubscriptionWhereInput!]
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
  node: ReceiptWhereInput
}

input ReceiptUpdateInput {
  unitCost: Float
  quantity: Int
  receivedBy: UserUpdateOneWithoutReceiptsInput
  product: ProductUpdateOneWithoutReceiptsInput
}

input ReceiptUpdateManyWithoutProductInput {
  create: [ReceiptCreateWithoutProductInput!]
  connect: [ReceiptWhereUniqueInput!]
  disconnect: [ReceiptWhereUniqueInput!]
  delete: [ReceiptWhereUniqueInput!]
  update: [ReceiptUpdateWithoutProductInput!]
  upsert: [ReceiptUpsertWithoutProductInput!]
}

input ReceiptUpdateManyWithoutReceivedByInput {
  create: [ReceiptCreateWithoutReceivedByInput!]
  connect: [ReceiptWhereUniqueInput!]
  disconnect: [ReceiptWhereUniqueInput!]
  delete: [ReceiptWhereUniqueInput!]
  update: [ReceiptUpdateWithoutReceivedByInput!]
  upsert: [ReceiptUpsertWithoutReceivedByInput!]
}

input ReceiptUpdateWithoutProductDataInput {
  unitCost: Float
  quantity: Int
  receivedBy: UserUpdateOneWithoutReceiptsInput
}

input ReceiptUpdateWithoutProductInput {
  where: ReceiptWhereUniqueInput!
  data: ReceiptUpdateWithoutProductDataInput!
}

input ReceiptUpdateWithoutReceivedByDataInput {
  unitCost: Float
  quantity: Int
  product: ProductUpdateOneWithoutReceiptsInput
}

input ReceiptUpdateWithoutReceivedByInput {
  where: ReceiptWhereUniqueInput!
  data: ReceiptUpdateWithoutReceivedByDataInput!
}

input ReceiptUpsertWithoutProductInput {
  where: ReceiptWhereUniqueInput!
  update: ReceiptUpdateWithoutProductDataInput!
  create: ReceiptCreateWithoutProductInput!
}

input ReceiptUpsertWithoutReceivedByInput {
  where: ReceiptWhereUniqueInput!
  update: ReceiptUpdateWithoutReceivedByDataInput!
  create: ReceiptCreateWithoutReceivedByInput!
}

input ReceiptWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ReceiptWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ReceiptWhereInput!]
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
  unitCost: Float
  """
  All values that are not equal to given value.
  """
  unitCost_not: Float
  """
  All values that are contained in given list.
  """
  unitCost_in: [Float!]
  """
  All values that are not contained in given list.
  """
  unitCost_not_in: [Float!]
  """
  All values less than the given value.
  """
  unitCost_lt: Float
  """
  All values less than or equal the given value.
  """
  unitCost_lte: Float
  """
  All values greater than the given value.
  """
  unitCost_gt: Float
  """
  All values greater than or equal the given value.
  """
  unitCost_gte: Float
  quantity: Int
  """
  All values that are not equal to given value.
  """
  quantity_not: Int
  """
  All values that are contained in given list.
  """
  quantity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  quantity_not_in: [Int!]
  """
  All values less than the given value.
  """
  quantity_lt: Int
  """
  All values less than or equal the given value.
  """
  quantity_lte: Int
  """
  All values greater than the given value.
  """
  quantity_gt: Int
  """
  All values greater than or equal the given value.
  """
  quantity_gte: Int
  receivedBy: UserWhereInput
  product: ProductWhereInput
}

input ReceiptWhereUniqueInput {
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
  unitPrice: Float!
  quantity: Int!
  product: ProductCreateOneWithoutSalesInput!
}

input SaleCreateManyInput {
  create: [SaleCreateInput!]
  connect: [SaleWhereUniqueInput!]
}

input SaleCreateManyWithoutProductInput {
  create: [SaleCreateWithoutProductInput!]
  connect: [SaleWhereUniqueInput!]
}

input SaleCreateWithoutProductInput {
  unitPrice: Float!
  quantity: Int!
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
  unitPrice_ASC
  unitPrice_DESC
  quantity_ASC
  quantity_DESC
}

type SalePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  unitPrice: Float!
  quantity: Int!
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
  unitPrice: Float
  quantity: Int
  product: ProductUpdateOneWithoutSalesInput
}

input SaleUpdateInput {
  unitPrice: Float
  quantity: Int
  product: ProductUpdateOneWithoutSalesInput
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

input SaleUpdateNestedInput {
  where: SaleWhereUniqueInput!
  data: SaleUpdateDataInput!
}

input SaleUpdateWithoutProductDataInput {
  unitPrice: Float
  quantity: Int
}

input SaleUpdateWithoutProductInput {
  where: SaleWhereUniqueInput!
  data: SaleUpdateWithoutProductDataInput!
}

input SaleUpsertNestedInput {
  where: SaleWhereUniqueInput!
  update: SaleUpdateDataInput!
  create: SaleCreateInput!
}

input SaleUpsertWithoutProductInput {
  where: SaleWhereUniqueInput!
  update: SaleUpdateWithoutProductDataInput!
  create: SaleCreateWithoutProductInput!
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
  unitPrice: Float
  """
  All values that are not equal to given value.
  """
  unitPrice_not: Float
  """
  All values that are contained in given list.
  """
  unitPrice_in: [Float!]
  """
  All values that are not contained in given list.
  """
  unitPrice_not_in: [Float!]
  """
  All values less than the given value.
  """
  unitPrice_lt: Float
  """
  All values less than or equal the given value.
  """
  unitPrice_lte: Float
  """
  All values greater than the given value.
  """
  unitPrice_gt: Float
  """
  All values greater than or equal the given value.
  """
  unitPrice_gte: Float
  quantity: Int
  """
  All values that are not equal to given value.
  """
  quantity_not: Int
  """
  All values that are contained in given list.
  """
  quantity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  quantity_not_in: [Int!]
  """
  All values less than the given value.
  """
  quantity_lt: Int
  """
  All values less than or equal the given value.
  """
  quantity_lte: Int
  """
  All values greater than the given value.
  """
  quantity_gt: Int
  """
  All values greater than or equal the given value.
  """
  quantity_gte: Int
  product: ProductWhereInput
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
  receipts: ReceiptCreateManyWithoutReceivedByInput
  orders: OrderCreateManyWithoutSellerInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutReceiptsInput {
  create: UserCreateWithoutReceiptsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutOrdersInput {
  email: String!
  password: String!
  name: String!
  role: UserRole!
  receipts: ReceiptCreateManyWithoutReceivedByInput
}

input UserCreateWithoutReceiptsInput {
  email: String!
  password: String!
  name: String!
  role: UserRole!
  orders: OrderCreateManyWithoutSellerInput
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

input UserUpdateDataInput {
  email: String
  password: String
  name: String
  role: UserRole
  receipts: ReceiptUpdateManyWithoutReceivedByInput
  orders: OrderUpdateManyWithoutSellerInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  role: UserRole
  receipts: ReceiptUpdateManyWithoutReceivedByInput
  orders: OrderUpdateManyWithoutSellerInput
}

input UserUpdateNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  disconnect: UserWhereUniqueInput
  delete: UserWhereUniqueInput
  update: UserUpdateNestedInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  connect: UserWhereUniqueInput
  disconnect: UserWhereUniqueInput
  delete: UserWhereUniqueInput
  update: UserUpdateWithoutOrdersInput
  upsert: UserUpsertWithoutOrdersInput
}

input UserUpdateOneWithoutReceiptsInput {
  create: UserCreateWithoutReceiptsInput
  connect: UserWhereUniqueInput
  disconnect: UserWhereUniqueInput
  delete: UserWhereUniqueInput
  update: UserUpdateWithoutReceiptsInput
  upsert: UserUpsertWithoutReceiptsInput
}

input UserUpdateWithoutOrdersDataInput {
  email: String
  password: String
  name: String
  role: UserRole
  receipts: ReceiptUpdateManyWithoutReceivedByInput
}

input UserUpdateWithoutOrdersInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutOrdersDataInput!
}

input UserUpdateWithoutReceiptsDataInput {
  email: String
  password: String
  name: String
  role: UserRole
  orders: OrderUpdateManyWithoutSellerInput
}

input UserUpdateWithoutReceiptsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutReceiptsDataInput!
}

input UserUpsertNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutOrdersInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutOrdersDataInput!
  create: UserCreateWithoutOrdersInput!
}

input UserUpsertWithoutReceiptsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutReceiptsDataInput!
  create: UserCreateWithoutReceiptsInput!
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
  receipts_every: ReceiptWhereInput
  receipts_some: ReceiptWhereInput
  receipts_none: ReceiptWhereInput
  orders_every: OrderWhereInput
  orders_some: OrderWhereInput
  orders_none: OrderWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Mutation {
  createProduct(data: ProductCreateInput!): Product!
  createReceipt(data: ReceiptCreateInput!): Receipt!
  createSale(data: SaleCreateInput!): Sale!
  createOrder(data: OrderCreateInput!): Order!
  createUser(data: UserCreateInput!): User!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateReceipt(data: ReceiptUpdateInput!, where: ReceiptWhereUniqueInput!): Receipt
  updateSale(data: SaleUpdateInput!, where: SaleWhereUniqueInput!): Sale
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteReceipt(where: ReceiptWhereUniqueInput!): Receipt
  deleteSale(where: SaleWhereUniqueInput!): Sale
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteUser(where: UserWhereUniqueInput!): User
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  upsertReceipt(where: ReceiptWhereUniqueInput!, create: ReceiptCreateInput!, update: ReceiptUpdateInput!): Receipt!
  upsertSale(where: SaleWhereUniqueInput!, create: SaleCreateInput!, update: SaleUpdateInput!): Sale!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyProducts(data: ProductUpdateInput!, where: ProductWhereInput!): BatchPayload!
  updateManyReceipts(data: ReceiptUpdateInput!, where: ReceiptWhereInput!): BatchPayload!
  updateManySales(data: SaleUpdateInput!, where: SaleWhereInput!): BatchPayload!
  updateManyOrders(data: OrderUpdateInput!, where: OrderWhereInput!): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput!): BatchPayload!
  deleteManyProducts(where: ProductWhereInput!): BatchPayload!
  deleteManyReceipts(where: ReceiptWhereInput!): BatchPayload!
  deleteManySales(where: SaleWhereInput!): BatchPayload!
  deleteManyOrders(where: OrderWhereInput!): BatchPayload!
  deleteManyUsers(where: UserWhereInput!): BatchPayload!
}

type Query {
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  receipts(where: ReceiptWhereInput, orderBy: ReceiptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Receipt]!
  sales(where: SaleWhereInput, orderBy: SaleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sale]!
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  product(where: ProductWhereUniqueInput!): Product
  receipt(where: ReceiptWhereUniqueInput!): Receipt
  sale(where: SaleWhereUniqueInput!): Sale
  order(where: OrderWhereUniqueInput!): Order
  user(where: UserWhereUniqueInput!): User
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  receiptsConnection(where: ReceiptWhereInput, orderBy: ReceiptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReceiptConnection!
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
  receipt(where: ReceiptSubscriptionWhereInput): ReceiptSubscriptionPayload
  sale(where: SaleSubscriptionWhereInput): SaleSubscriptionPayload
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}
`

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
  'unitPrice_ASC' |
  'unitPrice_DESC' |
  'quantity_ASC' |
  'quantity_DESC'

export type UserRole = 
  'SELLER' |
  'INVENTORY_MANAGER'

export type ReceiptOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'unitCost_ASC' |
  'unitCost_DESC' |
  'quantity_ASC' |
  'quantity_DESC'

export type OrderOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type SaleOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'unitPrice_ASC' |
  'unitPrice_DESC' |
  'quantity_ASC' |
  'quantity_DESC'

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

export interface UserCreateOneWithoutOrdersInput {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
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
  unitPrice?: Float
  unitPrice_not?: Float
  unitPrice_in?: Float[] | Float
  unitPrice_not_in?: Float[] | Float
  unitPrice_lt?: Float
  unitPrice_lte?: Float
  unitPrice_gt?: Float
  unitPrice_gte?: Float
  quantity?: Int
  quantity_not?: Int
  quantity_in?: Int[] | Int
  quantity_not_in?: Int[] | Int
  quantity_lt?: Int
  quantity_lte?: Int
  quantity_gt?: Int
  quantity_gte?: Int
  createdBy?: UserWhereInput
  receipts_every?: ReceiptWhereInput
  receipts_some?: ReceiptWhereInput
  receipts_none?: ReceiptWhereInput
  sales_every?: SaleWhereInput
  sales_some?: SaleWhereInput
  sales_none?: SaleWhereInput
}

export interface UserUpdateNestedInput {
  where: UserWhereUniqueInput
  data: UserUpdateDataInput
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

export interface UserUpdateDataInput {
  email?: String
  password?: String
  name?: String
  role?: UserRole
  receipts?: ReceiptUpdateManyWithoutReceivedByInput
  orders?: OrderUpdateManyWithoutSellerInput
}

export interface ReceiptWhereInput {
  AND?: ReceiptWhereInput[] | ReceiptWhereInput
  OR?: ReceiptWhereInput[] | ReceiptWhereInput
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
  unitCost?: Float
  unitCost_not?: Float
  unitCost_in?: Float[] | Float
  unitCost_not_in?: Float[] | Float
  unitCost_lt?: Float
  unitCost_lte?: Float
  unitCost_gt?: Float
  unitCost_gte?: Float
  quantity?: Int
  quantity_not?: Int
  quantity_in?: Int[] | Int
  quantity_not_in?: Int[] | Int
  quantity_lt?: Int
  quantity_lte?: Int
  quantity_gt?: Int
  quantity_gte?: Int
  receivedBy?: UserWhereInput
  product?: ProductWhereInput
}

export interface SaleCreateWithoutProductInput {
  unitPrice: Float
  quantity: Int
}

export interface ProductUpdateWithoutSalesInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutSalesDataInput
}

export interface OrderCreateManyWithoutSellerInput {
  create?: OrderCreateWithoutSellerInput[] | OrderCreateWithoutSellerInput
  connect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
}

export interface ReceiptUpdateManyWithoutReceivedByInput {
  create?: ReceiptCreateWithoutReceivedByInput[] | ReceiptCreateWithoutReceivedByInput
  connect?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
  disconnect?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
  delete?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
  update?: ReceiptUpdateWithoutReceivedByInput[] | ReceiptUpdateWithoutReceivedByInput
  upsert?: ReceiptUpsertWithoutReceivedByInput[] | ReceiptUpsertWithoutReceivedByInput
}

export interface OrderCreateWithoutSellerInput {
  sales?: SaleCreateManyInput
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

export interface SaleCreateManyInput {
  create?: SaleCreateInput[] | SaleCreateInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
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

export interface SaleCreateInput {
  unitPrice: Float
  quantity: Int
  product: ProductCreateOneWithoutSalesInput
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

export interface ProductCreateOneWithoutSalesInput {
  create?: ProductCreateWithoutSalesInput
  connect?: ProductWhereUniqueInput
}

export interface ProductWhereUniqueInput {
  id?: ID_Input
}

export interface ProductCreateWithoutSalesInput {
  description: String
  picture: String
  unitPrice: Float
  quantity: Int
  createdBy: UserCreateOneInput
  receipts?: ReceiptCreateManyWithoutProductInput
}

export interface SaleWhereUniqueInput {
  id?: ID_Input
}

export interface ReceiptCreateManyWithoutProductInput {
  create?: ReceiptCreateWithoutProductInput[] | ReceiptCreateWithoutProductInput
  connect?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface ReceiptCreateWithoutProductInput {
  unitCost: Float
  quantity: Int
  receivedBy: UserCreateOneWithoutReceiptsInput
}

export interface UserUpdateWithoutOrdersDataInput {
  email?: String
  password?: String
  name?: String
  role?: UserRole
  receipts?: ReceiptUpdateManyWithoutReceivedByInput
}

export interface UserCreateOneWithoutReceiptsInput {
  create?: UserCreateWithoutReceiptsInput
  connect?: UserWhereUniqueInput
}

export interface UserUpdateOneWithoutOrdersInput {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput
  delete?: UserWhereUniqueInput
  update?: UserUpdateWithoutOrdersInput
  upsert?: UserUpsertWithoutOrdersInput
}

export interface UserCreateWithoutReceiptsInput {
  email: String
  password: String
  name: String
  role: UserRole
  orders?: OrderCreateManyWithoutSellerInput
}

export interface SaleUpdateInput {
  unitPrice?: Float
  quantity?: Int
  product?: ProductUpdateOneWithoutSalesInput
}

export interface ReceiptCreateInput {
  unitCost: Float
  quantity: Int
  receivedBy: UserCreateOneWithoutReceiptsInput
  product: ProductCreateOneWithoutReceiptsInput
}

export interface UserUpsertNestedInput {
  where: UserWhereUniqueInput
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface OrderCreateInput {
  sales?: SaleCreateManyInput
  seller: UserCreateOneWithoutOrdersInput
}

export interface SaleUpsertNestedInput {
  where: SaleWhereUniqueInput
  update: SaleUpdateDataInput
  create: SaleCreateInput
}

export interface ReceiptUpdateWithoutProductInput {
  where: ReceiptWhereUniqueInput
  data: ReceiptUpdateWithoutProductDataInput
}

export interface ReceiptUpsertWithoutProductInput {
  where: ReceiptWhereUniqueInput
  update: ReceiptUpdateWithoutProductDataInput
  create: ReceiptCreateWithoutProductInput
}

export interface UserCreateWithoutOrdersInput {
  email: String
  password: String
  name: String
  role: UserRole
  receipts?: ReceiptCreateManyWithoutReceivedByInput
}

export interface UserUpdateWithoutReceiptsDataInput {
  email?: String
  password?: String
  name?: String
  role?: UserRole
  orders?: OrderUpdateManyWithoutSellerInput
}

export interface ProductUpdateInput {
  description?: String
  picture?: String
  unitPrice?: Float
  quantity?: Int
  createdBy?: UserUpdateOneInput
  receipts?: ReceiptUpdateManyWithoutProductInput
  sales?: SaleUpdateManyWithoutProductInput
}

export interface UserUpdateOneWithoutReceiptsInput {
  create?: UserCreateWithoutReceiptsInput
  connect?: UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput
  delete?: UserWhereUniqueInput
  update?: UserUpdateWithoutReceiptsInput
  upsert?: UserUpsertWithoutReceiptsInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput
  delete?: UserWhereUniqueInput
  update?: UserUpdateNestedInput
  upsert?: UserUpsertNestedInput
}

export interface ProductCreateInput {
  description: String
  picture: String
  unitPrice: Float
  quantity: Int
  createdBy: UserCreateOneInput
  receipts?: ReceiptCreateManyWithoutProductInput
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
  unitPrice?: Float
  unitPrice_not?: Float
  unitPrice_in?: Float[] | Float
  unitPrice_not_in?: Float[] | Float
  unitPrice_lt?: Float
  unitPrice_lte?: Float
  unitPrice_gt?: Float
  unitPrice_gte?: Float
  quantity?: Int
  quantity_not?: Int
  quantity_in?: Int[] | Int
  quantity_not_in?: Int[] | Int
  quantity_lt?: Int
  quantity_lte?: Int
  quantity_gt?: Int
  quantity_gte?: Int
  product?: ProductWhereInput
}

export interface UserCreateInput {
  email: String
  password: String
  name: String
  role: UserRole
  receipts?: ReceiptCreateManyWithoutReceivedByInput
  orders?: OrderCreateManyWithoutSellerInput
}

export interface ReceiptUpdateManyWithoutProductInput {
  create?: ReceiptCreateWithoutProductInput[] | ReceiptCreateWithoutProductInput
  connect?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
  disconnect?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
  delete?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
  update?: ReceiptUpdateWithoutProductInput[] | ReceiptUpdateWithoutProductInput
  upsert?: ReceiptUpsertWithoutProductInput[] | ReceiptUpsertWithoutProductInput
}

export interface ReceiptCreateWithoutReceivedByInput {
  unitCost: Float
  quantity: Int
  product: ProductCreateOneWithoutReceiptsInput
}

export interface ProductUpdateWithoutSalesDataInput {
  description?: String
  picture?: String
  unitPrice?: Float
  quantity?: Int
  createdBy?: UserUpdateOneInput
  receipts?: ReceiptUpdateManyWithoutProductInput
}

export interface ProductCreateWithoutReceiptsInput {
  description: String
  picture: String
  unitPrice: Float
  quantity: Int
  createdBy: UserCreateOneInput
  sales?: SaleCreateManyWithoutProductInput
}

export interface ReceiptUpdateWithoutReceivedByInput {
  where: ReceiptWhereUniqueInput
  data: ReceiptUpdateWithoutReceivedByDataInput
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
  receipts_every?: ReceiptWhereInput
  receipts_some?: ReceiptWhereInput
  receipts_none?: ReceiptWhereInput
  orders_every?: OrderWhereInput
  orders_some?: OrderWhereInput
  orders_none?: OrderWhereInput
}

export interface ReceiptUpdateWithoutReceivedByDataInput {
  unitCost?: Float
  quantity?: Int
  product?: ProductUpdateOneWithoutReceiptsInput
}

export interface ReceiptSubscriptionWhereInput {
  AND?: ReceiptSubscriptionWhereInput[] | ReceiptSubscriptionWhereInput
  OR?: ReceiptSubscriptionWhereInput[] | ReceiptSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ReceiptWhereInput
}

export interface ProductUpdateOneWithoutReceiptsInput {
  create?: ProductCreateWithoutReceiptsInput
  connect?: ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput
  update?: ProductUpdateWithoutReceiptsInput
  upsert?: ProductUpsertWithoutReceiptsInput
}

export interface ReceiptWhereUniqueInput {
  id?: ID_Input
}

export interface ProductUpdateWithoutReceiptsInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutReceiptsDataInput
}

export interface UserUpsertWithoutOrdersInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutOrdersDataInput
  create: UserCreateWithoutOrdersInput
}

export interface ProductUpdateWithoutReceiptsDataInput {
  description?: String
  picture?: String
  unitPrice?: Float
  quantity?: Int
  createdBy?: UserUpdateOneInput
  sales?: SaleUpdateManyWithoutProductInput
}

export interface OrderUpdateInput {
  sales?: SaleUpdateManyInput
  seller?: UserUpdateOneWithoutOrdersInput
}

export interface SaleUpdateManyWithoutProductInput {
  create?: SaleCreateWithoutProductInput[] | SaleCreateWithoutProductInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  disconnect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  delete?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
  update?: SaleUpdateWithoutProductInput[] | SaleUpdateWithoutProductInput
  upsert?: SaleUpsertWithoutProductInput[] | SaleUpsertWithoutProductInput
}

export interface OrderUpsertWithoutSellerInput {
  where: OrderWhereUniqueInput
  update: OrderUpdateWithoutSellerDataInput
  create: OrderCreateWithoutSellerInput
}

export interface SaleUpdateWithoutProductInput {
  where: SaleWhereUniqueInput
  data: SaleUpdateWithoutProductDataInput
}

export interface UserUpsertWithoutReceiptsInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutReceiptsDataInput
  create: UserCreateWithoutReceiptsInput
}

export interface SaleUpdateWithoutProductDataInput {
  unitPrice?: Float
  quantity?: Int
}

export interface ReceiptUpdateWithoutProductDataInput {
  unitCost?: Float
  quantity?: Int
  receivedBy?: UserUpdateOneWithoutReceiptsInput
}

export interface SaleUpsertWithoutProductInput {
  where: SaleWhereUniqueInput
  update: SaleUpdateWithoutProductDataInput
  create: SaleCreateWithoutProductInput
}

export interface ReceiptCreateManyWithoutReceivedByInput {
  create?: ReceiptCreateWithoutReceivedByInput[] | ReceiptCreateWithoutReceivedByInput
  connect?: ReceiptWhereUniqueInput[] | ReceiptWhereUniqueInput
}

export interface ProductUpsertWithoutReceiptsInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutReceiptsDataInput
  create: ProductCreateWithoutReceiptsInput
}

export interface SaleCreateManyWithoutProductInput {
  create?: SaleCreateWithoutProductInput[] | SaleCreateWithoutProductInput
  connect?: SaleWhereUniqueInput[] | SaleWhereUniqueInput
}

export interface ReceiptUpsertWithoutReceivedByInput {
  where: ReceiptWhereUniqueInput
  update: ReceiptUpdateWithoutReceivedByDataInput
  create: ReceiptCreateWithoutReceivedByInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  name?: String
  role?: UserRole
  receipts?: ReceiptUpdateManyWithoutReceivedByInput
  orders?: OrderUpdateManyWithoutSellerInput
}

export interface OrderUpdateManyWithoutSellerInput {
  create?: OrderCreateWithoutSellerInput[] | OrderCreateWithoutSellerInput
  connect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  disconnect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  delete?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  update?: OrderUpdateWithoutSellerInput[] | OrderUpdateWithoutSellerInput
  upsert?: OrderUpsertWithoutSellerInput[] | OrderUpsertWithoutSellerInput
}

export interface UserUpdateWithoutOrdersInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutOrdersDataInput
}

export interface OrderUpdateWithoutSellerInput {
  where: OrderWhereUniqueInput
  data: OrderUpdateWithoutSellerDataInput
}

export interface ProductUpsertWithoutSalesInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutSalesDataInput
  create: ProductCreateWithoutSalesInput
}

export interface OrderUpdateWithoutSellerDataInput {
  sales?: SaleUpdateManyInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
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

export interface ProductUpdateOneWithoutSalesInput {
  create?: ProductCreateWithoutSalesInput
  connect?: ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput
  update?: ProductUpdateWithoutSalesInput
  upsert?: ProductUpsertWithoutSalesInput
}

export interface SaleUpdateDataInput {
  unitPrice?: Float
  quantity?: Int
  product?: ProductUpdateOneWithoutSalesInput
}

export interface SaleUpdateNestedInput {
  where: SaleWhereUniqueInput
  data: SaleUpdateDataInput
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

export interface ProductCreateOneWithoutReceiptsInput {
  create?: ProductCreateWithoutReceiptsInput
  connect?: ProductWhereUniqueInput
}

export interface UserUpdateWithoutReceiptsInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutReceiptsDataInput
}

export interface ReceiptUpdateInput {
  unitCost?: Float
  quantity?: Int
  receivedBy?: UserUpdateOneWithoutReceiptsInput
  product?: ProductUpdateOneWithoutReceiptsInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

/*
 * A connection to a list of items.

 */
export interface ProductConnection {
  pageInfo: PageInfo
  edges: ProductEdge[]
  aggregate: AggregateProduct
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  name: String
  role: UserRole
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

export interface SalePreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  unitPrice: Float
  quantity: Int
}

export interface Product extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: User
  description: String
  picture: String
  unitPrice: Float
  quantity: Int
  receipts?: Receipt[]
  sales?: Sale[]
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  name: String
  role: UserRole
  receipts?: Receipt[]
  orders?: Order[]
}

export interface AggregateUser {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface BatchPayload {
  count: Long
}

/*
 * An edge in a connection.

 */
export interface OrderEdge {
  node: Order
  cursor: String
}

export interface Receipt extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  receivedBy: User
  product: Product
  unitCost: Float
  quantity: Int
}

export interface AggregateSale {
  count: Int
}

export interface Sale extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  product: Product
  unitPrice: Float
  quantity: Int
}

/*
 * A connection to a list of items.

 */
export interface SaleConnection {
  pageInfo: PageInfo
  edges: SaleEdge[]
  aggregate: AggregateSale
}

export interface OrderPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface ReceiptEdge {
  node: Receipt
  cursor: String
}

export interface ProductSubscriptionPayload {
  mutation: MutationType
  node?: Product
  updatedFields?: String[]
  previousValues?: ProductPreviousValues
}

export interface AggregateProduct {
  count: Int
}

export interface ProductPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  description: String
  picture: String
  unitPrice: Float
  quantity: Int
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface OrderSubscriptionPayload {
  mutation: MutationType
  node?: Order
  updatedFields?: String[]
  previousValues?: OrderPreviousValues
}

export interface AggregateOrder {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface SaleEdge {
  node: Sale
  cursor: String
}

export interface SaleSubscriptionPayload {
  mutation: MutationType
  node?: Sale
  updatedFields?: String[]
  previousValues?: SalePreviousValues
}

export interface Order extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  sales?: Sale[]
  seller: User
}

export interface ReceiptPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  unitCost: Float
  quantity: Int
}

export interface ReceiptSubscriptionPayload {
  mutation: MutationType
  node?: Receipt
  updatedFields?: String[]
  previousValues?: ReceiptPreviousValues
}

export interface AggregateReceipt {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface OrderConnection {
  pageInfo: PageInfo
  edges: OrderEdge[]
  aggregate: AggregateOrder
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface ProductEdge {
  node: Product
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface ReceiptConnection {
  pageInfo: PageInfo
  edges: ReceiptEdge[]
  aggregate: AggregateReceipt
}

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

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

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  products: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Product[]>
  receipts: (args: { where?: ReceiptWhereInput, orderBy?: ReceiptOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Receipt[]>
  sales: (args: { where?: SaleWhereInput, orderBy?: SaleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Sale[]>
  orders: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Order[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  product: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  receipt: (args: { where: ReceiptWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Receipt | null>
  sale: (args: { where: SaleWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Sale | null>
  order: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  productsConnection: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ProductConnection>
  receiptsConnection: (args: { where?: ReceiptWhereInput, orderBy?: ReceiptOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ReceiptConnection>
  salesConnection: (args: { where?: SaleWhereInput, orderBy?: SaleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<SaleConnection>
  ordersConnection: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createProduct: (args: { data: ProductCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  createReceipt: (args: { data: ReceiptCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Receipt>
  createSale: (args: { data: SaleCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Sale>
  createOrder: (args: { data: OrderCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateProduct: (args: { data: ProductUpdateInput, where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  updateReceipt: (args: { data: ReceiptUpdateInput, where: ReceiptWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Receipt | null>
  updateSale: (args: { data: SaleUpdateInput, where: SaleWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Sale | null>
  updateOrder: (args: { data: OrderUpdateInput, where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteProduct: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  deleteReceipt: (args: { where: ReceiptWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Receipt | null>
  deleteSale: (args: { where: SaleWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Sale | null>
  deleteOrder: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  upsertProduct: (args: { where: ProductWhereUniqueInput, create: ProductCreateInput, update: ProductUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  upsertReceipt: (args: { where: ReceiptWhereUniqueInput, create: ReceiptCreateInput, update: ReceiptUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Receipt>
  upsertSale: (args: { where: SaleWhereUniqueInput, create: SaleCreateInput, update: SaleUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Sale>
  upsertOrder: (args: { where: OrderWhereUniqueInput, create: OrderCreateInput, update: OrderUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateManyProducts: (args: { data: ProductUpdateInput, where: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyReceipts: (args: { data: ReceiptUpdateInput, where: ReceiptWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManySales: (args: { data: SaleUpdateInput, where: SaleWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOrders: (args: { data: OrderUpdateInput, where: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyProducts: (args: { where: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyReceipts: (args: { where: ReceiptWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManySales: (args: { where: SaleWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOrders: (args: { where: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  product: (args: { where?: ProductSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ProductSubscriptionPayload>>
  receipt: (args: { where?: ReceiptSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ReceiptSubscriptionPayload>>
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
    Receipt: (where: ReceiptWhereInput): Promise<boolean> => super.existsDelegate('query', 'receipts', { where }, {}, '{ id }'),
    Sale: (where: SaleWhereInput): Promise<boolean> => super.existsDelegate('query', 'sales', { where }, {}, '{ id }'),
    Order: (where: OrderWhereInput): Promise<boolean> => super.existsDelegate('query', 'orders', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }')
  }

  query: Query = {
    products: (args, info): Promise<Product[]> => super.delegate('query', 'products', args, {}, info),
    receipts: (args, info): Promise<Receipt[]> => super.delegate('query', 'receipts', args, {}, info),
    sales: (args, info): Promise<Sale[]> => super.delegate('query', 'sales', args, {}, info),
    orders: (args, info): Promise<Order[]> => super.delegate('query', 'orders', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    product: (args, info): Promise<Product | null> => super.delegate('query', 'product', args, {}, info),
    receipt: (args, info): Promise<Receipt | null> => super.delegate('query', 'receipt', args, {}, info),
    sale: (args, info): Promise<Sale | null> => super.delegate('query', 'sale', args, {}, info),
    order: (args, info): Promise<Order | null> => super.delegate('query', 'order', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    productsConnection: (args, info): Promise<ProductConnection> => super.delegate('query', 'productsConnection', args, {}, info),
    receiptsConnection: (args, info): Promise<ReceiptConnection> => super.delegate('query', 'receiptsConnection', args, {}, info),
    salesConnection: (args, info): Promise<SaleConnection> => super.delegate('query', 'salesConnection', args, {}, info),
    ordersConnection: (args, info): Promise<OrderConnection> => super.delegate('query', 'ordersConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createProduct: (args, info): Promise<Product> => super.delegate('mutation', 'createProduct', args, {}, info),
    createReceipt: (args, info): Promise<Receipt> => super.delegate('mutation', 'createReceipt', args, {}, info),
    createSale: (args, info): Promise<Sale> => super.delegate('mutation', 'createSale', args, {}, info),
    createOrder: (args, info): Promise<Order> => super.delegate('mutation', 'createOrder', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    updateProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'updateProduct', args, {}, info),
    updateReceipt: (args, info): Promise<Receipt | null> => super.delegate('mutation', 'updateReceipt', args, {}, info),
    updateSale: (args, info): Promise<Sale | null> => super.delegate('mutation', 'updateSale', args, {}, info),
    updateOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'updateOrder', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    deleteProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'deleteProduct', args, {}, info),
    deleteReceipt: (args, info): Promise<Receipt | null> => super.delegate('mutation', 'deleteReceipt', args, {}, info),
    deleteSale: (args, info): Promise<Sale | null> => super.delegate('mutation', 'deleteSale', args, {}, info),
    deleteOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'deleteOrder', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    upsertProduct: (args, info): Promise<Product> => super.delegate('mutation', 'upsertProduct', args, {}, info),
    upsertReceipt: (args, info): Promise<Receipt> => super.delegate('mutation', 'upsertReceipt', args, {}, info),
    upsertSale: (args, info): Promise<Sale> => super.delegate('mutation', 'upsertSale', args, {}, info),
    upsertOrder: (args, info): Promise<Order> => super.delegate('mutation', 'upsertOrder', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    updateManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyProducts', args, {}, info),
    updateManyReceipts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyReceipts', args, {}, info),
    updateManySales: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManySales', args, {}, info),
    updateManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOrders', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    deleteManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyProducts', args, {}, info),
    deleteManyReceipts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyReceipts', args, {}, info),
    deleteManySales: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManySales', args, {}, info),
    deleteManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOrders', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info)
  }

  subscription: Subscription = {
    product: (args, infoOrQuery): Promise<AsyncIterator<ProductSubscriptionPayload>> => super.delegateSubscription('product', args, {}, infoOrQuery),
    receipt: (args, infoOrQuery): Promise<AsyncIterator<ReceiptSubscriptionPayload>> => super.delegateSubscription('receipt', args, {}, infoOrQuery),
    sale: (args, infoOrQuery): Promise<AsyncIterator<SaleSubscriptionPayload>> => super.delegateSubscription('sale', args, {}, infoOrQuery),
    order: (args, infoOrQuery): Promise<AsyncIterator<OrderSubscriptionPayload>> => super.delegateSubscription('order', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery)
  }
}