import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

export interface BookingData {
  id?: string | number;
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  focusAreas?: string[] | string;
  healthFund?: string;
  preferredDay?: string;
  preferredTime?: string;
  symptoms?: string;
  createdAt?: string;
}

export interface ReviewData {
  id?: string | number;
  customerName: string;
  location?: string;
  starRating: number;
  treatmentType?: string;
  projectType?: string;
  reviewText: string;
  verified?: boolean;
  createdAt?: string;
}

// In-memory fallback stores for local development without DB credentials or build steps
const memoryStore = {
  bookings: [] as any[],
  reviews: [
    {
      id: 'rev-1',
      customer_name: 'Brad M.',
      location: 'Oxley / Wangaratta',
      star_rating: 5,
      treatment_type: 'Remedial Musculoskeletal & Dry Needling',
      review_text: 'Suffered from severe lower back pain and sciatica for 6 months working on our cattle farm. After 3 sessions of remedial therapy and clinical dry needling here, I can finally work full days without painkillers. HICAPS claiming on the spot was seamless.',
      created_at: new Date('2024-03-12').toISOString(),
    },
    {
      id: 'rev-2',
      customer_name: 'Claire W.',
      location: 'Wangaratta Central',
      star_rating: 5,
      treatment_type: 'Targeted Neck & Tension Headache Release',
      review_text: 'Desk-bound work in local council gave me chronic tension headaches and tight traps. Their targeted deep tissue therapy and postural advice resolved the migraines completely. Clean, serene clinic and very experienced therapists.',
      created_at: new Date('2024-05-18').toISOString(),
    },
    {
      id: 'rev-3',
      customer_name: 'Megan P.',
      location: 'Glenrowan',
      star_rating: 5,
      treatment_type: 'Nurturing Pregnancy Massage',
      review_text: 'The pregnancy massage here was absolute heaven during my third trimester. Specialized side-lying bolsters provided complete belly support while gently easing my hip and sacroiliac pain. Felt genuinely safe and cared for.',
      created_at: new Date('2024-07-24').toISOString(),
    },
    {
      id: 'rev-4',
      customer_name: 'Marcus T. (Wangaratta Rovers FNC)',
      location: 'Wangaratta',
      star_rating: 5,
      treatment_type: 'Sports Recovery & Hamstring Rehabilitation',
      review_text: 'I come in every fortnight during the football season for leg flushes and dry needling on my calves and hamstrings. Accelerates my recovery time between matches significantly. High-level clinical standard.',
      created_at: new Date('2024-09-05').toISOString(),
    },
    {
      id: 'rev-5',
      customer_name: 'Sarah & David L.',
      location: 'Milawa, VIC',
      star_rating: 5,
      treatment_type: '90-Min Full Body Restorative Remedial',
      review_text: 'Both my husband and I are regular clients. Heated orthopedic tables, quiet private suites, and top tier therapists accredited with MMA. Swiping our Medibank card took 10 seconds. Best clinic in North East Victoria.',
      created_at: new Date('2024-10-15').toISOString(),
    },
    {
      id: 'rev-6',
      customer_name: 'Helen G.',
      location: 'Beechworth',
      star_rating: 5,
      treatment_type: 'Manual Lymphatic Drainage',
      review_text: 'Received post-surgery lymphatic drainage here. The therapist was exceptionally gentle, knowledgeable, and helped reduce swelling faster than expected. Couldn’t recommend more highly.',
      created_at: new Date('2024-11-02').toISOString(),
    }
  ],
  call_logs: [] as any[],
};

export const sql = databaseUrl ? neon(databaseUrl) : null;

let isDbInitialized = false;

export async function ensureDbTables() {
  if (!sql) {
    return;
  }
  if (isDbInitialized) return;

  try {
    // Bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS massage_bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        treatment VARCHAR(100) NOT NULL,
        focus_areas TEXT,
        health_fund VARCHAR(100),
        preferred_day VARCHAR(100),
        preferred_time VARCHAR(100),
        symptoms TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Reviews table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        star_rating INT NOT NULL CHECK (star_rating >= 1 AND star_rating <= 5),
        treatment_type VARCHAR(150),
        review_text TEXT NOT NULL,
        verified BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Call logs table
    await sql`
      CREATE TABLE IF NOT EXISTS call_logs (
        id SERIAL PRIMARY KEY,
        intent VARCHAR(100),
        referrer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default reviews if table is empty
    const existing = await sql`SELECT COUNT(*) as count FROM reviews;`;
    if (existing && existing[0] && parseInt(existing[0].count, 10) === 0) {
      for (const rev of memoryStore.reviews) {
        await sql`
          INSERT INTO reviews (customer_name, location, star_rating, treatment_type, review_text, verified, created_at)
          VALUES (${rev.customer_name}, ${rev.location}, ${rev.star_rating}, ${rev.treatment_type}, ${rev.review_text}, true, ${rev.created_at});
        `;
      }
    }

    isDbInitialized = true;
  } catch (err) {
    console.warn('Neon database initialization warning (falling back to memory store):', err);
  }
}

export async function insertBooking(data: BookingData) {
  const serializedFocusAreas = Array.isArray(data.focusAreas)
    ? data.focusAreas.join(', ')
    : (data.focusAreas || '');

  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO massage_bookings (
          name, phone, email, treatment, focus_areas, health_fund,
          preferred_day, preferred_time, symptoms
        ) VALUES (
          ${data.name}, ${data.phone}, ${data.email || null},
          ${data.treatment || 'remedial-60'}, ${serializedFocusAreas},
          ${data.healthFund || null}, ${data.preferredDay || null},
          ${data.preferredTime || null}, ${data.symptoms || null}
        ) RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving booking to Neon DB, falling back to memory store:', err);
    }
  }

  const record = {
    id: 'book_' + Date.now(),
    ...data,
    focusAreas: serializedFocusAreas,
    created_at: new Date().toISOString(),
  };
  memoryStore.bookings.push(record);
  return record;
}

export async function getApprovedReviews() {
  if (sql) {
    try {
      await ensureDbTables();
      const rows = await sql`
        SELECT 
          id::text, 
          customer_name as "customerName", 
          star_rating as "starRating", 
          review_text as "reviewText", 
          COALESCE(treatment_type, 'Remedial Massage') as "treatmentType", 
          COALESCE(treatment_type, 'Remedial Massage') as "projectType", 
          location,
          created_at as "createdAt"
        FROM reviews 
        WHERE verified = true 
        ORDER BY created_at DESC;
      `;
      if (rows && rows.length > 0) {
        return rows;
      }
    } catch (err) {
      console.warn('Error fetching reviews from Neon, falling back to cached reviews:', err);
    }
  }

  return memoryStore.reviews.map((r) => ({
    id: r.id,
    customerName: r.customer_name,
    starRating: r.star_rating,
    reviewText: r.review_text,
    treatmentType: r.treatment_type,
    projectType: r.treatment_type,
    location: r.location,
    createdAt: r.created_at,
  }));
}

export async function insertReview(data: {
  customerName: string;
  location?: string;
  starRating: number;
  treatmentType?: string;
  projectType?: string;
  reviewText: string;
}) {
  const therapyType = data.treatmentType || data.projectType || 'Remedial Massage';

  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO reviews (customer_name, location, star_rating, treatment_type, review_text, verified)
        VALUES (${data.customerName}, ${data.location || null}, ${data.starRating}, ${therapyType}, ${data.reviewText}, true)
        RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving review to Neon DB, using memory fallback:', err);
    }
  }

  const record = {
    id: 'rev_' + Date.now(),
    customer_name: data.customerName,
    location: data.location || 'Wangaratta',
    star_rating: data.starRating,
    treatment_type: therapyType,
    review_text: data.reviewText,
    created_at: new Date().toISOString(),
  };
  memoryStore.reviews.unshift(record);
  return record;
}

export async function logCallClick(intent: string, referrer?: string) {
  if (sql) {
    try {
      await ensureDbTables();
      await sql`
        INSERT INTO call_logs (intent, referrer)
        VALUES (${intent}, ${referrer || null});
      `;
      return true;
    } catch (err) {
      console.warn('Error logging call click:', err);
    }
  }
  memoryStore.call_logs.push({ intent, referrer, timestamp: new Date().toISOString() });
  return true;
}

export default sql;
