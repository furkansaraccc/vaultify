//file:lib/constants.ts
// Route Constants
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    VAULT: '/vault',
    SETTINGS: '/settings',
    SECURITY: '/security',
    REPORTS: '/reports',
    ERROR: '/error',
  } as const;
  
  // API Endpoints
  export const API_ROUTES = {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
    },
    VAULT: {
      CREATE: '/api/vault/create',
      UPDATE: '/api/vault/update',
      DELETE: '/api/vault/delete',
      SHARE: '/api/vault/share',
    },
    USER: {
      PROFILE: '/api/user/profile',
      SETTINGS: '/api/user/settings',
    },
  } as const;
  
  // Authentication Constants
  export const AUTH_CONFIG = {
    JWT_EXPIRY: '30d',
    PASSWORD_MIN_LENGTH: 12,
    PASSWORD_REQUIREMENTS: {
      UPPERCASE: true,
      LOWERCASE: true,
      NUMBER: true,
      SPECIAL_CHAR: true,
    },
    SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days in seconds
  } as const;
  
  // Encryption Constants
  export const ENCRYPTION_CONFIG = {
    ALGORITHM: 'aes-256-gcm',
    KEY_LENGTH: 32,
    IV_LENGTH: 16,
    SALT_LENGTH: 32,
    TAG_LENGTH: 16,
    ITERATIONS: 100000,
  } as const;
  
  // UI Constants
  export const UI_CONFIG = {
    TOAST_DURATION: 5000,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_FILE_TYPES: [
      'text/plain',
      'application/pdf',
      'image/jpeg',
      'image/png',
    ],
    PAGINATION: {
      DEFAULT_PAGE_SIZE: 10,
      MAX_PAGE_SIZE: 100,
    },
  } as const;
  
  // Error Messages
  export const ERROR_MESSAGES = {
    AUTH: {
      INVALID_CREDENTIALS: 'Invalid email or password',
      USER_NOT_FOUND: 'User not found',
      EMAIL_IN_USE: 'Email already in use',
      WEAK_PASSWORD: 'Password does not meet security requirements',
      SESSION_EXPIRED: 'Your session has expired. Please log in again',
    },
    VAULT: {
      CREATE_FAILED: 'Failed to create vault item',
      UPDATE_FAILED: 'Failed to update vault item',
      DELETE_FAILED: 'Failed to delete vault item',
      SHARE_FAILED: 'Failed to share vault item',
      NOT_FOUND: 'Vault item not found',
      PERMISSION_DENIED: 'You do not have permission to access this item',
    },
  } as const;
  
  // Success Messages
  export const SUCCESS_MESSAGES = {
    AUTH: {
      LOGIN_SUCCESS: 'Successfully logged in',
      REGISTER_SUCCESS: 'Account created successfully',
      LOGOUT_SUCCESS: 'Successfully logged out',
    },
    VAULT: {
      CREATE_SUCCESS: 'Item added to vault',
      UPDATE_SUCCESS: 'Item updated successfully',
      DELETE_SUCCESS: 'Item deleted successfully',
      SHARE_SUCCESS: 'Item shared successfully',
    },
  } as const;