# Mochi V1.0

V1.0 menambahkan authentication foundation + Career Profile + Resume/CV Management.

## Fitur
- Register / Login / Logout
- Password hashing dengan bcrypt
- HTTP-only session cookie 7 hari
- Role: JOB_SEEKER / COMPANY / ADMIN / MODERATOR
- Career Profile
- Upload CV PDF maksimal 5 MB
- Resume versioning; upload terbaru menjadi ACTIVE, versi lama ARCHIVED
- Metadata CV tersimpan di PostgreSQL
- Storage: Vercel Blob untuk production; local fallback ke `public/uploads` saat `BLOB_READ_WRITE_TOKEN` kosong
- Ownership check pada resume berdasarkan user session

## Setup
1. Copy `.env.example` menjadi `.env`.
2. Isi `DATABASE_URL`.
3. Untuk production/Vercel, buat Vercel Blob dan isi `BLOB_READ_WRITE_TOKEN`.
4. Jalankan:

```bash
npm install
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

## Demo
- Job Seeker: `seeker@mochi.local` / `MochiDemo123!`
- Company: `company@mochi.local` / `MochiDemo123!`

## Routes
- `/login`
- `/register`
- `/profile`
- `/resumes`
- `/jobs`
- `/applications`
- `/company`

## API
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`
- GET/PUT `/api/profile`
- GET/POST `/api/resumes`
- DELETE `/api/resumes/:id`

## Next
V1.1: CV parsing + Mochi AI analysis (skill extraction, experience extraction, CV feedback, and explainable Mochi Score).
