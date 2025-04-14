
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, History, Mail, FileEdit } from "lucide-react";

export const ViewButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="default"
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      <Eye className="h-4 w-4 mr-1" />
      View
    </Button>
  );
};

export const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="default"
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      <Edit className="h-4 w-4 mr-1" />
      Edit
    </Button>
  );
};

export const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="destructive"
      className="bg-red-500 hover:bg-red-600 text-white"
    >
      <Trash2 className="h-4 w-4 mr-1" />
      Delete
    </Button>
  );
};

export const HistoryButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="default"
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      <History className="h-4 w-4 mr-1" />
      History
    </Button>
  );
};

export const EmailButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="default"
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      <Mail className="h-4 w-4 mr-1" />
      Email
    </Button>
  );
};

export const StatusButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="default"
      className="bg-yellow-500 hover:bg-yellow-600 text-white"
    >
      <FileEdit className="h-4 w-4 mr-1" />
      Status
    </Button>
  );
};
