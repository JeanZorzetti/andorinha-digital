import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Use singleton
import { headers } from "next/headers";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@andorinha.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log('❌ Auth: Missing credentials');
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    console.log('❌ Auth: User not found:', credentials.email);
                    return null;
                }

                console.log('✅ Auth: User found:', user.email, 'Role:', user.role);

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    console.log('❌ Auth: Invalid password for:', user.email);
                    return null;
                }

                console.log('✅ Auth: Login successful for:', user.email, 'Role:', user.role);

                // Registrar login no audit log
                try {
                    const headersList = await headers();
                    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
                    const userAgent = headersList.get("user-agent") || "unknown";

                    await prisma.auditLog.create({
                        data: {
                            userId: user.id,
                            action: "LOGIN",
                            resource: "USER",
                            resourceId: user.id,
                            details: `Login bem-sucedido`,
                            ipAddress,
                            userAgent,
                        },
                    });
                } catch (error) {
                    console.error('Error creating audit log for login:', error);
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                };
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    }
};
