import "./css/reset.css";
import "./css/style.css";

import FilterBar from "./components/FilterBar";
import SingleJob from "./components/SingleJob";

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	/**
	 * Stores the list of jobs
	 */
	const [jobs, setJobs] = useState([]);

	// Get the list of jobs from data.json
	useEffect(() => {
		axios("data.json")
			.then((response) => response.data)
			.then((jobs) => {
				console.log(jobs);
				setJobs(jobs);
			});
	}, []);

	/**
	 * Tracks filters selected by the user
	 */
	const [filters, setFilters] = useState([]);
	/**
	 * Adds the clicked/tapped filter if it isn't already selected
	 * @param {string} newFilter
	 */
	const handleAddFilter = (newFilter) => {
		const isInFilters = filters.find((f) => newFilter === f);
		if (!isInFilters) {
			setFilters([...filters, newFilter]);
		}
	};
	const handleRemoveFilter = (removedFilter) => {
		const newFilters = filters.filter((f) => f !== removedFilter);
		setFilters(newFilters);
	};
	const handleClearFilters = () => {
		setFilters([]);
	};

	/**
	 * Filters jobs. Only those who match with all the current filters are included
	 * @param {Array} filters
	 * @returns the filtered jobs
	 */
	const filterJobs = (filters) => {
		const filteredJobs = jobs.filter((j, index, array) => {
			const filterTerms = [j.role, j.level, ...j.languages, ...j.tools];
			return filters.every((elem) => filterTerms.includes(elem));
		});

		return filteredJobs;
	};

	let displayedJobs;
	if (filters.length > 0) {
		displayedJobs = filterJobs(filters);
	} else {
		displayedJobs = jobs;
	}

	return (
		<main className={filters.length ? "filtered-jobs" : null}>
			<FilterBar
				filters={filters}
				removeFilter={handleRemoveFilter}
				clearFilters={handleClearFilters}
			/>
			{displayedJobs.map((job) => (
				<SingleJob key={job.id} job={job} addFilter={handleAddFilter} />
			))}
		</main>
	);
};

export default App;
