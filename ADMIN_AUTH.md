# Simple Admin Authentication System

This system has been updated to use a simple JWT-based authentication instead of Supabase Auth.

## Admin Credentials

**Default Login:**
- Email: `admin@allaitools.com`
- Password: `admin123`

## How It Works

1. **Login**: Admin enters email/password on `/admin/login`
2. **Verification**: System checks credentials against hardcoded list
3. **JWT Token**: If valid, creates a JWT token stored in httpOnly cookie
4. **Protection**: Admin routes verify the JWT token

## Files Updated

- `contexts/AuthContext.tsx` - Removed Supabase, added JWT auth
- `app/api/admin/login/route.ts` - JWT-based login endpoint
- `app/api/admin/logout/route.ts` - Logout endpoint
- `app/api/admin/me/route.ts` - Check current auth status
- `lib/auth.ts` - JWT verification utilities
- `app/api/admin/submissions/route.ts` - Added auth checks

## To Add New Admin Users

1. Run the password generation script:
   ```
   node scripts/generate-admin-password.js
   ```

2. Update `ADMIN_CREDENTIALS` in `app/api/admin/login/route.ts`:
   ```typescript
   const ADMIN_CREDENTIALS = [
     {
       email: 'admin@allaitools.com',
       password: '$2b$10$...' // hashed password
     },
     {
       email: 'newadmin@example.com',
       password: '$2b$10$...' // another hashed password
     }
   ]
   ```

## Environment Variables

Add to your `.env.local`:
```
JWT_SECRET=your-secure-jwt-secret-key
```

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- Cookies are httpOnly and secure
- Production should use strong JWT secret

## No Database Required

The admin system no longer requires any database tables - it's completely self-contained using environment variables and hardcoded credentials.
