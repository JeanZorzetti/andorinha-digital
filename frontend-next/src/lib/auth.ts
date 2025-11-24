import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // TODO: Replace with environment variables or database check
                const validUsername = process.env.ADMIN_USERNAME || "admin";
                const validPassword = process.env.ADMIN_PASSWORD || "admin";

                if (
                    credentials?.username === validUsername &&
                    credentials?.password === validPassword
                ) {
                    return { id: "1", name: "Admin", email: "admin@andorinha.com" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = "admin";
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        }
    }
};
