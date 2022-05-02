const JobDescriptionTerm = ({ term, addFilter }) => {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		const termButton: HTMLButtonElement = event.currentTarget;

		addFilter(termButton.value);
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
