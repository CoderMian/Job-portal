"use client";
import {
  candidateOnboardFormControls,
  initialCandidateAccountFormData,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/utils";
import React, { useEffect, useState } from "react";
import Commonform from "../common-form";
import { updateProfileAction } from "@/actions";
const AccountInfo = ({ profileInfo }) => {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiter?.info);
    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  async function handleUpdateAccount() {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/account"
    );
  }
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between pb-6 border-b pt-24">
          <h1 className="tex-4xl font-bold tracking-tight text-gray-950">
            Account Details
          </h1>
        </div>
        <div className="py-20 pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <Commonform
              formControls={
                profileInfo?.role === "candidate"
                  ? candidateOnboardFormControls.filter(
                      (formControl) => formControl.name !== "resume"
                    )
                  : recruiterOnBoardFormControls
              }
              formData={
                profileInfo?.role === "candidate"
                  ? candidateFormData
                  : recruiterFormData
              }
              setFormData={
                profileInfo?.role === "candidate"
                  ? setCandidateFormData
                  : setRecruiterFormData
              }
              buttonText="Update Profile"
              action={handleUpdateAccount}
            ></Commonform>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
