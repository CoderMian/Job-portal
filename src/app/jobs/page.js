import {
  createFilterCategoryAction,
  fetchCandidateJobs,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchRecruiterJobs,
  getProfileInfo,
} from "@/actions";
import JobsList from "@/components/jobs-list";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage({ searchParams }) {
  const user = await currentUser();

  const profileInfo = await getProfileInfo(user?.id);
  const jobsList =
    profileInfo?.role === "candidate"
      ? await fetchCandidateJobs(searchParams)
      : await fetchRecruiterJobs(user?.id);

  const getJobApplicationsList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  const fetchFilterCategories = await createFilterCategoryAction();

  return (
    <JobsList
      filterCategories={fetchFilterCategories}
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobsList={jobsList}
      jobApplications={getJobApplicationsList}
    />
  );
}
