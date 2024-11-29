const RadioBox = ({ prices, handleFilters }) => {
    const handleChange = e => {
        handleFilters(e.target.value);
    }

    return prices.map(price => (
        <div key={price.id} className="flex ml-1">
            <input
                onChange={handleChange}
                value={price.id}
                name="price_filter"
                type="radio"
                className="mr-2 " />
            <label className="form-check-lable mr-4 mt-1.5 text-sm">{price.name}</label>
        </div>
    ))
}

export default RadioBox;