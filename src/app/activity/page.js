import {
  fetchJobApplicationsForCandidate,
  fetchCandidateJobs,
} from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";

export default async function Activity() {
  const user = await currentUser();
  const jobList = await fetchCandidateJobs();
  const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);

  return (
    <>
      <CandidateActivity jobApplicants={jobApplicants} jobList={jobList} />
    </>
  );
}
