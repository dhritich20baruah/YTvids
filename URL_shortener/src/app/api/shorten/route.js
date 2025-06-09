import { db } from "../../../../utils/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    const { longUrl } = await req.json();

    if (!longUrl || typeof longUrl !== 'string' || !longUrl.startsWith('http')) {
        return NextResponse.json({ message: 'Invalid URL provided.' })
    }

    try {
        const shortCode = nanoid(7);

        const q = query(collection(db, 'urls'), where('shortCode', '==', shortCode))
        const querySnapShot = await getDocs(q);

        if (!querySnapShot.empty) {
            return NextResponse.json({ message: 'Failed to generated unique short URL' })
        }

        //Save the mapping to firestore
        await addDoc(collection(db, 'urls'), {
            longUrl: longUrl,
            shortCode: shortCode,
            createdAt: new Date(),
        })

        //Construct the full shortened URL
        // In production, replace req.headers.host with your actual domain (e.g., 'yourshortener.com')
        // For local development, req.headers.host should typically be 'localhost:3000' or similar.
        // We add a fallback in case host header is undefined in certain environments.
        const protocol = req.headers['x-forwarded-photo'] || (process.env.NODE_ENV === 'production' ? 'https' : 'http')
        const host = req.headers.host || (process.env.NODE_ENV === 'development' ? 'localhost:3000' : null); // Fallback for host

        if (!host) {
            console.error('Failed to determine host for short URL construction.');
            return NextResponse.json({ message: 'Could not determine host for short URL.' });
        }
        const shortUrl = `${protocol}://${host}/${shortCode}`;

        return NextResponse.json({ shortUrl })
    } catch (error) {
        console.error('Error shortening URL:', error);
        return NextResponse.json({ message: 'Internal Server Error' });
    }
}