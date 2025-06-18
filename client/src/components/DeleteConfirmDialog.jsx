import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";

const DeleteConfirmDialog = ({ onDelete }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="p-2">
            <MdDelete className="text-red-600 text-xl cursor-pointer" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr>
                <th colSpan="2" className="p-4">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-bold">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-gray-600">
                      This action cannot be undone. This will permanently delete
                      the data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">
                  <AlertDialogCancel className="w-full bg-gray-200 text-black hover:bg-gray-300 rounded px-4 py-2">
                    Cancel
                  </AlertDialogCancel>
                </td>
                <td className="p-3">
                  <AlertDialogAction
                    onClick={onDelete}
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2"
                  >
                    Continue
                  </AlertDialogAction>
                </td>
              </tr>
            </tbody>
          </table>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirmDialog;
