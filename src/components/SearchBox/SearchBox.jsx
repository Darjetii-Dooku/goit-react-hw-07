import { useDispatch, useSelector } from "react-redux"
import { changeFilter } from "../../redux/filters/filterSlice";

const SearchBox = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => {
        return state.filters.name
    })
    const onChangeFilter = (evt) => {
        const action = changeFilter(evt.target.value)
        dispatch(action)
       }; 
       
    return(
        <section>
            <h3>Search by username</h3>
            <input 
            type="text" 
            placeholder="Search..." 
            onChange={onChangeFilter} 
            value={filter} />
        </section>
    )
}
export default SearchBox