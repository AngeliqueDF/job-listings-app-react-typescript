const FilterBar = ({ filters, removeFilter, clearFilters }) => {
	// The component bar is only visible if there are filter terms
	const styles = {
		display: filters.length === 0 ? "none" : "flex",
	};

	const handleRemove = (e) => {
		console.log(e.target.value);
		removeFilter(e.target.value);
	};

	const handleClear = (e) => {
		clearFilters(e.target.value);
	};
	return (
		<>
			<div className="filter-bar" style={styles}>
				<ul className="filters-list">
					{/* Displays the filters selected */}
					{filters.map((f, index) => (
						<li key={f + index} className="filter">
							<span className="filter-term">{f}</span>
							<button onClick={handleRemove} value={f}></button>
						</li>
					))}
				</ul>
				<button onClick={handleClear} className="clear-filters">
					Clear
				</button>
			</div>
		</>
	);
};

export default FilterBar;
