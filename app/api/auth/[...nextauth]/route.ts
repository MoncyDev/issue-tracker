import NextAuth from 'next-auth';
import GoggleProvider from 'next-auth/providers/google'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import prisma from '@/prisma/client';

const handler= NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoggleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt",
      },

})

export {handler as GET, handler as POST}