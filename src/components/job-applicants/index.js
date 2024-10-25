import CandidateList from "../candidate-list";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

export default function JobApplicants({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  jobApplications,
}) {
  return (
    <>
      <Drawer
        open={showApplicantsDrawer}
        onOpenChange={setShowApplicantsDrawer}
      >
        <DrawerContent className="max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <DrawerDescription></DrawerDescription>
          <ScrollArea className="h-auto overflow-y-auto">
            <CandidateList
              currentCandidateDetails={currentCandidateDetails}
              setCurrentCandidateDetails={setCurrentCandidateDetails}
              jobApplications={jobApplications}
              showCurrentCandidateDetailsModal={
                showCurrentCandidateDetailsModal
              }
              setShowCurrentCandidateDetailsModal={
                setShowCurrentCandidateDetailsModal
              }
            />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}
