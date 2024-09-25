import NextAuth from 'next-auth';
import GoggleProvider from 'next-auth/providers/google'

const handler= NextAuth({
    providers: [
        GoggleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]

})

export {handler as GET, handler as POST}