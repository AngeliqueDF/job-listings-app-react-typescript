import "./css/reset.css";
import "./css/style.scss";

import FilterBar from "./components/FilterBar.tsx";
import SingleJob from "./components/SingleJob.tsx";

import { useState, useEffect } from "react";
import axios from "axios";

export type Job = {
	id: number;
	company: string;
	logo: string;
	new: true;
	featured: true;
	position: string;
	role: string;
	level: string;
	postedAt: string;
	contract: string;
	location: string;
	languages: Array<string>;
	tools: Array<string>;
};

const App = () => {
	/**
	 * Stores the list of jobs
	 */
	const [jobs, setJobs] = useState([]);

	// Get the list of jobs from data.json
	useEffect(() => {
		axios("/data.json")
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
	const handleAddFilter = (newFilter: string): void => {
		const isInFilters = filters.find((f) => newFilter === f);
		if (!isInFilters) {
			setFilters([...filters, newFilter]);
		}
	};
	const handleRemoveFilter = (filterToRemove: string): void => {
		const newFilters = filters.filter((f) => f !== filterToRemove);
		setFilters(newFilters);
	};
	const handleClearFilters = (): void => {
		setFilters([]);
	};

	/**
	 * Filters jobs. Retains jobs who match with all of the current filters.
	 */
	const filterJobs = (filters: Array<string>): Array<Job> => {
		/**
		 * Checks the current job has all of the current filters either as its role, level, languages, or tools.
		 */
		const matches = (jobFilterTerms: Array<string>): boolean =>
			filters.every((filter) => jobFilterTerms.includes(filter));

		const filteredJobs: Array<Job> = jobs.filter((job) => {
			// Create an array with all of the job's terms
			const filterTerms = [job.role, job.level, ...job.languages, ...job.tools];

			return matches(filterTerms);
		});

		return filteredJobs;
	};

	let displayedJobs: Array<Job>;
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
