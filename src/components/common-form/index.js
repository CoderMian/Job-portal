import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
export default function Commonform({
  action,
  buttonText,
  isBtnDisabled,
  formControls,
  btnType,
  formData,
  setFormData,
  handleFileChange,
}) {
  function renderInputByComponentType(getCurrentControl) {
    let content = null;
    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div
            className="relative flex items-center mt-8"
            key={getCurrentControl.name}
          >
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[60px] border bg-gray-100 
              outline-none drop-shadow-sm
            transition-all duration-200 ease-in-out
            focus:bg-white focus:drop-shadow-lg
            focus-visible:outline-none
            focus-visible:ring-0
            focus-visible:ring-offset-0
            "
            />
          </div>
        );
        break;
      case "file":
        content = (
          <Label
            htmlFor={getCurrentControl.name}
            className="bg-gray-100 items-center px-3 py-3 flex
             text-center border-2 border-dashed rounded-lg cursor-pointer"
            key={getCurrentControl.name}
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurrentControl.name}
              type="file"
              className="bg-white"
            ></Input>
          </Label>
        );
        break;
      default:
        content = (
          <div
            className="relative flex items-center mt-8"
            key={getCurrentControl.name}
          >
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[60px] border bg-gray-100 
                outline-none drop-shadow-sm
              transition-all duration-200 ease-in-out
              focus:bg-white focus:drop-shadow-lg
              focus-visible:outline-none
              focus-visible:ring-0
              focus-visible:ring-offset-0
              "
            />
          </div>
        );
        break;
    }
    return content;
  }
  return (
    <form action={action}>
      {formControls.map((control) => renderInputByComponentType(control))}
      <div className="mt-6 w-full">
        <Button
          type={btnType || "submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
          disabled={isBtnDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
