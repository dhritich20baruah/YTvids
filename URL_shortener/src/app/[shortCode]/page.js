import { db } from "../../../utils/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";

export default async function ShortCodePage({params}) {
  const { shortCode } = await params.shortCode;
  console.log(params)

  if (!shortCode) {
    console.log("no short code")
    redirect('/')
  }

  try {
    const q = query(collection(db, 'urls'), where('shortCode', '==', shortCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      redirect('/404')
    }

    // Assuming short codes are unique, get the first document
    const docData = querySnapshot.docs[0].data();
    const longUrl = docData.longUrl;

    // Perform the permanent redirect
    redirect(longUrl);
  } catch (error) {
    console.error('Error fetching URL for redirection:', error);
    // You might want to show a generic error page or redirect to home
    redirect('/')
  }

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-700">Redirecting...</p>
    </div>
  );
}

