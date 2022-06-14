import { query as q } from "faunadb";
import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";

import { fauna } from '../../../services/fauna'

export default NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
        }),
    ],
    debug: true,
    callbacks: {
        async signIn(user, account, profile) {
            const { email } = user.user

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(email)
                            )
                        )
                    )
                )

                return true
            } catch {
                return false
            }
        }
    }
})