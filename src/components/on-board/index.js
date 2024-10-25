"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import Commonform from "../common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions";
import { createClient } from "@supabase/supabase-js";
export default function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const supabaseClient = createClient(
    "https://fjnduhjfyjmvtcpydfeu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqbmR1aGpmeWptdnRjcHlkZmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0OTQ5MTcsImV4cCI6MjA0NDA3MDkxN30.XTiO0D8tuuV9yU9ChZMuXyJqxC91gvH7IxKQerHLZYY"
  );
  const [file, setFile] = useState(null);
  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  async function handleUploadToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("Job-portal-public")
      .upload(`public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
    if (error) {
      console.log("supabase erros", error);
    }
  }
  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }
  useEffect(() => {
    if (file) {
      handleUploadToSupabase();
    }
  }, [file]);

  function handleTabChange(value) {
    setCurrentTab(value);
  }
  function handleRecruiterFormValidation() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== " " &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValidation() {
    return Object.keys(candidateFormData).every((key) => {
      candidateFormData[key].trim() !== " ";
    });
  }
  async function createProfileAction() {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };
    await createProfile(data, "/onboard");
  }
  return (
    <section className="onboard-section bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-light text-gray-900">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <Commonform
            formControls={candidateOnboardFormControls}
            buttonText={"Onboard as candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            action={createProfileAction}
            isBtnDisabled={!handleCandidateFormValidation}
          ></Commonform>
        </TabsContent>
        <TabsContent value="recruiter">
          <Commonform
            formControls={recruiterOnBoardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValidation()}
            action={createProfileAction}
          ></Commonform>
        </TabsContent>
      </Tabs>
    </section>
  );
}
