import { db } from '../../../utils/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { longUrl } = req.body;

  if (!longUrl || typeof longUrl !== 'string' || !longUrl.startsWith('http')) {
    return res.status(400).json({ message: 'Invalid URL provided.' });
  }

  try {
    // Generate a short code (e.g., 7 characters long)
    const shortCode = nanoid(7);

    // Check if the short code already exists to avoid collisions (unlikely with nanoid, but good practice)
    const q = query(collection(db, 'urls'), where('shortCode', '==', shortCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If a collision occurs, you might want to regenerate or handle differently
      return res.status(500).json({ message: 'Failed to generate unique short code. Please try again.' });
    }

    // Save the mapping to Firestore
    await addDoc(collection(db, 'urls'), {
      longUrl: longUrl,
      shortCode: shortCode,
      createdAt: new Date(),
    });

    // Construct the full shortened URL
    // In production, replace req.headers.host with your actual domain (e.g., 'yourshortener.com')
    // For local development, req.headers.host should typically be 'localhost:3000' or similar.
    // We add a fallback in case host header is undefined in certain environments.
    const protocol = req.headers['x-forwarded-proto'] || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
    const host = req.headers.host || (process.env.NODE_ENV === 'development' ? 'localhost:3000' : null); // Fallback for host

    if (!host) {
        console.error('Failed to determine host for short URL construction.');
        return res.status(500).json({ message: 'Could not determine host for short URL.' });
    }

    const shortUrl = `${protocol}://${host}/${shortCode}`;

    res.status(200).json({ shortUrl });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}