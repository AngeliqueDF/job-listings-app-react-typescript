const FilterBar = ({ filters, removeFilter, clearFilters }) => {
	const handleRemove = (event: React.MouseEvent<HTMLButtonElement>): void => {
		const removeButton: HTMLButtonElement = event.currentTarget;
		removeFilter(removeButton.value);
	};

	const handleClear = (): void => {
		clearFilters();
	};

	return (
		<>
			<div
				className="filter-bar"
				// The component bar will only be visible if there are filter terms
				style={{
					display: filters.length === 0 ? "none" : "flex",
				}}
			>
				<ul className="filters-list">
					{/* Displays the filters selected */}
					{filters.map((f: string, index: number) => (
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
