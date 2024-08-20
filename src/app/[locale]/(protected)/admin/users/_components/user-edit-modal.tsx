import { DialogClose } from "@radix-ui/react-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function UserEditModal() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="text-lg font-bold">User Name</div>
                <div className="text-muted-foreground">User Email</div>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="text-sm font-bold">Trading Accounts</div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
