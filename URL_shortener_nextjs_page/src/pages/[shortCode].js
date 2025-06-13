import dbConnect from "../../lib/mongodb";
import Url from "../../model/Url";

export async function getServerSideProps({ params }) {
  const { shortCode } = params;

  await dbConnect();

  const result = await Url.findOne({ shortCode });

  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: result.longUrl,
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}
