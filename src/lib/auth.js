import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Define authentication options using NextAuthOptions interface
export const authOptions = {
    // Customize authentication pages
    pages: {
        signIn: "/login", // Redirect users to "/login" when signing in
    },
    // Configure session management
    session: {
        strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
    },
    // added secret key
    secret: process.env.NEXT_PUBLIC_SECRET,
    // Configure authentication providers
    providers: [
        GoogleProvider({
            // Configure Google authentication provider with environment variables
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            // Configure GitHub authentication provider with environment variables
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // Configure GitHub authentication provider with environment variables
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        // CredentialsProvider({}), // Include a Credentials provider (username/password)
    ],
};