"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export async function createProfile(formData, pathToRevalidate) {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function getProfileInfo(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function createNewJobAction(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function fetchRecruiterJobs(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchCandidateJobs(filterParams = {}) {
  await connectToDB();
  let updatedParams = {};
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );
  return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserID: candidateID });

  return JSON.parse(JSON.stringify(result));
}

export async function fetchJobApplicationsForRecruiter(recruiterID) {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: recruiterID });
  return JSON.parse(JSON.stringify(result));
}

export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDB();
  const result = await Profile.findOne({ userId: currentCandidateID });

  return JSON.parse(JSON.stringify(result));
}

export async function createFilterCategoryAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

export async function updateProfileAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;

  await Profile.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );

  revalidatePath(pathToRevalidate);
}
