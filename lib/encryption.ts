//file:lib/encryption.ts
import crypto from 'crypto';

export class EncryptionService {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32; // 256 bits
  private static readonly SALT_LENGTH = 16;
  private static readonly IV_LENGTH = 12;
  private static readonly AUTH_TAG_LENGTH = 16;
  
  /**
   * Generates a secure encryption key from a password using PBKDF2
   */
  private static async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        100000, // iterations
        this.KEY_LENGTH,
        'sha256',
        (err, key) => {
          if (err) reject(err);
          resolve(key);
        }
      );
    });
  }

  /**
   * Encrypts data using AES-256-GCM
   */
  static async encrypt(data: string, masterPassword: string): Promise<string> {
    // Generate salt and IV
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    const iv = crypto.randomBytes(this.IV_LENGTH);

    // Derive key from master password
    const key = await this.deriveKey(masterPassword, salt);

    // Create cipher
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    // Encrypt data
    let encryptedData = cipher.update(data, 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    // Get auth tag
    const authTag = cipher.getAuthTag();

    // Combine all components
    const combinedData = Buffer.concat([
      salt,
      iv,
      authTag,
      Buffer.from(encryptedData, 'base64')
    ]);

    return combinedData.toString('base64');
  }

  /**
   * Decrypts data using AES-256-GCM
   */
  static async decrypt(encryptedData: string, masterPassword: string): Promise<string> {
    try {
      // Convert base64 to buffer
      const data = Buffer.from(encryptedData, 'base64');

      // Extract components
      const salt = data.slice(0, this.SALT_LENGTH);
      const iv = data.slice(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH);
      const authTag = data.slice(
        this.SALT_LENGTH + this.IV_LENGTH,
        this.SALT_LENGTH + this.IV_LENGTH + this.AUTH_TAG_LENGTH
      );
      const encrypted = data.slice(this.SALT_LENGTH + this.IV_LENGTH + this.AUTH_TAG_LENGTH);

      // Derive key from master password
      const key = await this.deriveKey(masterPassword, salt);

      // Create decipher
      const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
      decipher.setAuthTag(authTag);

      // Decrypt data
      let decrypted = decipher.update(encrypted.toString('base64'), 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('auth')) {
          throw new Error('Decryption failed: Invalid password');
        } else if (error.message.includes('bad decrypt')) {
          throw new Error('Decryption failed: Corrupted data');
        }
      }
      throw new Error('Decryption failed: Unknown error occurred');
    }
  }

  /**
   * Generates a secure random password
   */
  static generatePassword(length: number = 16, options = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  }): string {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let allowedChars = '';
    if (options.uppercase) allowedChars += chars.uppercase;
    if (options.lowercase) allowedChars += chars.lowercase;
    if (options.numbers) allowedChars += chars.numbers;
    if (options.symbols) allowedChars += chars.symbols;

    if (allowedChars.length === 0) {
      throw new Error('At least one character type must be selected');
    }

    let password = '';
    const randomBytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
      password += allowedChars[randomBytes[i] % allowedChars.length];
    }

    return password;
  }
}

export default EncryptionService;

export const encrypt = async (data: string) => {
  const masterPassword = process.env.ENCRYPTION_KEY || 'default-master-key';
  return await EncryptionService.encrypt(data, masterPassword);
}

export const decrypt = async (data: string) => {
  const masterPassword = process.env.ENCRYPTION_KEY || 'default-master-key';
  return await EncryptionService.decrypt(data, masterPassword);
}