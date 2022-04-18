const JobDescriptionTerm = ({ term, addFilter, removeFilter }) => {
	const handleClick = (e) => {
		addFilter(e.target.value);
	};

	return (
		<li className="filter-term">
			<button onClick={handleClick} value={term}>
				{term}
			</button>
		</li>
	);
};

export default JobDescriptionTerm;
