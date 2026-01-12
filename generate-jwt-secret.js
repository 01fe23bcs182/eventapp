const crypto = require('crypto');

// Generate secure JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('=== JWT SECRET GENERATED ===');
console.log('Copy this to your .env file:');
console.log('');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('');
console.log('✅ This is a cryptographically secure 64-byte hex secret');
