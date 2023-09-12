
import SearchField from "./SearchField";
import searchQuotes from "./searchQuotes";

export default async function search() {

  return (
    <main className="m-12 text-center">
     <SearchField searchQuotes={searchQuotes}/>    
    </main>
  );
}
