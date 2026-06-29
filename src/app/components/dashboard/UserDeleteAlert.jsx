"use client";

import {AlertDialog, Button} from "@heroui/react";
import { RiDeleteBin6Line } from "react-icons/ri";

export function UserDeleteAlert({userId}) {

    const handleDeleteUser = async () =>{
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/UserDelete/${userId}`,{
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        // console.log(data)
        window.location.reload();
    }
  return (
    <AlertDialog>
      <Button variant="outline" className={"text-xs font-medium bg-rose-950/20 hover:bg-rose-950/50 text-rose-400 border border-rose-900/30 px-2.5 py-1.5 rounded-md transition-colors"}><RiDeleteBin6Line /><span>Delete</span></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog >
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete card permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDeleteUser} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}