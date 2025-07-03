import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteContactModalProps {
  contact: {
    id: number;
    name?: string;
    first_name?: string;
    last_name?: string;
  } | null;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  confirmDelete: () => void;
  isDeleting?: boolean;
}

const DeleteContactModal: React.FC<DeleteContactModalProps> = ({
  contact,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  confirmDelete,
  isDeleting = false
}) => {
  // Get contact name for display
  const getContactName = () => {
    if (!contact) return 'this contact';
    return contact.name ||
      (contact.first_name && contact.last_name ? `${contact.first_name} ${contact.last_name}` :
        contact.first_name ||
        contact.last_name ||
        'this contact');
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent className="sm:max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] top-[10%] translate-y-0">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-slate-900">
                Delete Contact
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-slate-600 mt-4">
            Are you sure you want to delete "<span className="font-medium text-slate-900">{getContactName()}</span>"?
            This action cannot be undone and will permanently remove the contact and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel
            disabled={isDeleting}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-700"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Contact
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContactModal;