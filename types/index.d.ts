//file:type/index.d.ts
// User and Authentication Types
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    twoFactorEnabled: boolean;
    securityPreferences: SecurityPreferences;
  }
  
  export interface SecurityPreferences {
    autoLockTimeout: number; // in minutes
    requireMasterPasswordTimeout: number; // in minutes
    allowBiometric: boolean;
    notifyOnNewLogin: boolean;
    notifyOnPasswordBreach: boolean;
  }
  
  // Vault Types
  export interface VaultItem {
    id: string;
    type: VaultItemType;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    lastAccessed?: Date;
    category?: string;
    tags?: string[];
    favorite: boolean;
    shared: boolean;
    encrypted: {
      data: string; // encrypted data
      iv: string; // initialization vector
    };
  }
  
  export enum VaultItemType {
    PASSWORD = 'password',
    SECURE_NOTE = 'secure_note',
    CREDIT_CARD = 'credit_card',
    IDENTITY = 'identity',
  }
  
  // Sharing Types
  export interface SharedVaultItem {
    id: string;
    vaultItemId: string;
    sharedBy: string;
    sharedWith: string;
    permissions: SharingPermissions;
    createdAt: Date;
    expiresAt?: Date;
  }
  
  export interface SharingPermissions {
    canView: boolean;
    canEdit: boolean;
    canShare: boolean;
    canDelete: boolean;
  }
  
  // Security and Reporting Types
  export interface SecurityReport {
    id: string;
    userId: string;
    scanDate: Date;
    vulnerabilities: Vulnerability[];
    overallScore: number;
    recommendations: SecurityRecommendation[];
  }
  
  export interface Vulnerability {
    type: VulnerabilityType;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    affectedItems: string[]; // IDs of affected vault items
    recommendedAction: string;
  }
  
  export enum VulnerabilityType {
    WEAK_PASSWORD = 'weak_password',
    REUSED_PASSWORD = 'reused_password',
    COMPROMISED_PASSWORD = 'compromised_password',
    OUTDATED_PASSWORD = 'outdated_password',
  }
  
  export interface SecurityRecommendation {
    id: string;
    type: RecommendationType;
    priority: 'low' | 'medium' | 'high';
    description: string;
    impact: string;
    steps: string[];
  }
  
  export enum RecommendationType {
    ENABLE_2FA = 'enable_2fa',
    UPDATE_WEAK_PASSWORDS = 'update_weak_passwords',
    REMOVE_DUPLICATE_PASSWORDS = 'remove_duplicate_passwords',
    REGULAR_PASSWORD_ROTATION = 'regular_password_rotation',
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
      code: string;
      message: string;
      details?: unknown;
    };
  }
  
  // Component Props Types
  export interface CardProps {
    className?: string;
    children: React.ReactNode;
  }
  
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    isLoading?: boolean;
  }
  
  // Theme Types
  export type Theme = 'light' | 'dark' | 'system';