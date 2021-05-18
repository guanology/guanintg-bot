import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { resolve } from 'path'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition (t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      }
    })
  }
})

const Mutation = objectType({
  name: 'Mutation',
  definition (t) {
    t.nonNull.field('signupUser', {
      type: 'User',
      args: {
        data: nonNull(
          arg({
            type: 'UserCreateInput'
          })
        )
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.user.create({
          data: {
            name: args.data.name
          }
        })
      }
    })
  }
})

const User = objectType({
  name: 'User',
  definition (t) {
    t.nonNull.int('id')
    t.string('name')
  }
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc']
})

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition (t) {
    t.int('id')
  }
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition (t) {
    t.string('name')
  }
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    User,
    UserUniqueInput,
    UserCreateInput,
    SortOrder,
    DateTime
  ],
  outputs: {
    schema: resolve(__dirname, '..', 'schema.graphql'),
    typegen: resolve(__dirname, 'generated', 'nexus.ts')
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
})
