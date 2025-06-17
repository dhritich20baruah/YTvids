import { db } from "../../utils/firebaseConfig";

import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getServerSideProps(context) {
  const { shortCode } = context.params;

  if (!shortCode) {
    return {
      notFound: true, // Return 404 if no shortCode is provided
    };
  }

  try {
    const q = query(collection(db, 'urls'), where('shortCode', '==', shortCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        notFound: true, // Short code not found in database
      };
    }

    // Assuming short codes are unique, get the first document
    const docData = querySnapshot.docs[0].data();
    const longUrl = docData.longUrl;

    // Perform the permanent redirect
    return {
      redirect: {
        destination: longUrl,
        permanent: true, // Use 301 for permanent redirect
      },
    };
  } catch (error) {
    console.error('Error fetching URL for redirection:', error);
    // You might want to show a generic error page or redirect to home
    return {
      redirect: {
        destination: '/', // Redirect to home on error
        permanent: false,
      },
    };
  }
}

// This component will not be rendered as getServerSideProps performs a redirect.
// It's still required for Next.js to recognize the page.
export default function ShortCodePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-700">Redirecting...</p>
    </div>
  );
}

