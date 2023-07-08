import SearchInput from "./SearchInput"
import searchResult from "./searchResult"

export default function search(){
    return(
        <div className="m-10">
            <h1 className="text-center">SEARCH</h1>
            <SearchInput searchResult={searchResult}/>
        </div>
    )
}