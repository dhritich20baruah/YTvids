import { db } from "../../../../utils/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Mehod Not Allowed' })
    }

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
        const protocol = req.headers['x-forwarded-photo'] || (process.env.NODE_ENV === 'production' ? 'https' : 'http')
        const host = req.headers.host;
        const shortUrl = `${protocol}://${host}/${shortCode}`;

        return NextResponse.json({ shortUrl })
    } catch (error) {
        console.error('Error shortening URL:', error);
        return NextResponse.json({ message: 'Internal Server Error' });
    }
}