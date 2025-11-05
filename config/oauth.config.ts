/**
 * OAuth 2.0 / OpenID Connect Configuration
 * Configuration for authentication with the backend authorization server
 */

export const oauthConfig = {
  // Authorization server details
  issuer: process.env.NEXT_PUBLIC_OAUTH_ISSUER || 'https://localhost:9000',

  // Client configuration (using public client with PKCE)
  clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || 'public-client',

  // Redirect URIs
  redirectUri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || 'http://localhost:5000/auth/callback',
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_OAUTH_POST_LOGOUT_REDIRECT_URI || 'http://localhost:5000',

  // Scopes
  scope: 'openid profile read write offline_access',

  // Response type
  responseType: 'code',

  // PKCE is required for public client
  usePkce: true,

  // Token storage key
  tokenStorageKey: 'oauth_tokens',
} as const

export type OAuthConfig = typeof oauthConfig
