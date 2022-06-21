import JobDescriptionTerm from "./JobDescriptionTerm.tsx";

const SingleJob = ({
	job: {
		company,
		position,
		postedAt,
		contract,
		role,
		location,
		level,
		logo,
		languages,
		tools,
		featured: isFeatured,
		new: isNew,
	},
	addFilter,
}) => {
	/**
	 * Displays "Featured" or "New!" if
	 */
	const TagListElement = ({
		tag,
		content,
		customClass,
	}: {
		tag: boolean;
		content: string;
		customClass: string;
	}): JSX.Element => {
		if (tag) {
			return <li className={`tag ${customClass}`}>{content}</li>;
		}
	};
	return (
		<>
			{" "}
			<article className={`listing ${isFeatured ? "featured-job" : ""}`}>
				<header>
					<img className="company-logo" src={logo} alt={`Logo of ${company}`} />
					<div>
						{/* ".job-position" and ".job-subtitle" have been reversed in the CSS */}
						<h2 className="job-position">{position}</h2>
						<div className="job-subtitle">
							<p className="company-name">{company}</p>

							{/* Conditionnally render the "NEW" and "Featured!" tag TagListElement is not rendered if its tag is === false */}
							{isNew || isFeatured ? (
								<ul>
									<TagListElement
										tag={isNew}
										content="New!"
										customClass="new-tag"
									/>
									<TagListElement
										tag={isFeatured}
										content="featured"
										customClass="featured-tag"
									/>
								</ul>
							) : null}
						</div>
						<ul className="job-meta">
							<li className="publication-date">{postedAt}</li>
							<li className="contract">{contract}</li>
							<li className="location">{location}</li>
						</ul>
					</div>
				</header>

				<ul className="keywords-list">
					{[role, level, ...languages, ...tools].map((term) => (
						<JobDescriptionTerm key={term} term={term} addFilter={addFilter} />
					))}
				</ul>
			</article>
		</>
	);
};

export default SingleJob;
