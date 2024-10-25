"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogHeader } from "../ui/dialog";
import { DialogContent, DialogTitle } from "../ui/dialog";
import Commonform from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { createNewJobAction } from "@/actions";

export default function PostNewJob({ profileInfo, user }) {
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  function postJobValidation() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control]?.trim() !== ""
    );
  }
  async function postNewJob() {
    await createNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );
    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  }
  return (
    <>
      <div className="postjob__main">
        <Button
          onClick={() => {
            setShowJobDialog(true);
          }}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
        >
          Post A Job
        </Button>
        <Dialog
          open={showJobDialog}
          onOpenChange={() => {
            setShowJobDialog(false);
            setJobFormData({
              ...initialPostNewJobFormData,
              companyName: profileInfo.recruiterInfo?.companyName,
            });
          }}
        >
          <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
            <DialogHeader>
              <DialogTitle>Post New Job</DialogTitle>
              <div className="grid gap-4 py-4">
                <Commonform
                  buttonText={"Add"}
                  formData={jobFormData}
                  setFormData={setJobFormData}
                  formControls={postNewJobFormControls}
                  isBtnDisabled={!postJobValidation()}
                  action={postNewJob}
                ></Commonform>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
