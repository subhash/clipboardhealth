# fullstack-candidate-testing

## Submission

**Demo**: 
https://fullstack-candidate-testing.subhash.vercel.app

**Run**:
`npm install`
`next run dev`

**Test**: 
`npm install`
`npx mocha`

**Open Questions**:
1. Instruction no:3 in the README states that the data in both json files need to be used. But filters.json seems to be summary statistics about the jobs being presented and since this is dynamic, I don't see how the static file (or the corresponding endpong) can be used. I have instead implemented a dynamic report of the job statistics based on the current set of jobs (subject to search). Is this what is expected? Can I ignore filters.json altogether?

2. The instructions do not talk about what the sort columns map to. For eg.
Location: probably maps to job.city - OK
Role: job.job_title, job.job_type or job.type?
Department: This is multi-valued for each job. When you sort by Dept ASC, where do you place a job that has both Anaesthesiology and Pathology
Education: Multiple fields can map - required_skills, required_credentials. Both are array values, so same question as above
Experience: maps to job.experience. OK

3. It is not clear what attributes should be searchable. The search box says any keyword. Does this mean a full text search on all the job attributes? I hope not :-)