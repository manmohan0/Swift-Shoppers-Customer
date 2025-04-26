import PrimaryButton from "./PrimaryButton";

export const EditableSection = ({
    title,
    isEditing,
    onEditToggle,
    editableContent,
    onSave
  }: {
    title: string;
    isEditing: boolean;
    onEditToggle: () => void;
    editableContent: React.ReactNode;
    onSave: () => void;
  }) => {
    return (
    <div className="space-y-2">
      <div className="flex space-x-4 items-center">
        <span className="font-bold">{title}</span>
        <span
          className="text-sm text-electric-blue hover:cursor-pointer"
          onClick={onEditToggle}
        >
          {isEditing ? "Cancel" : "Edit"}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {editableContent}
        { isEditing && <PrimaryButton text={"Save"} onClick={onSave}/> }
      </div>
    </div>
  )};