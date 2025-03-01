import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border border-purple-500/20">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
          <AvatarFallback className="bg-purple-500/10 text-purple-500">JL</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-xs text-muted-foreground">jackson.lee@example.com</p>
        </div>
        <div className="font-medium text-green-500">+$250.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border border-purple-500/20">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
          <AvatarFallback className="bg-purple-500/10 text-purple-500">SD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-xs text-muted-foreground">sofia.davis@example.com</p>
        </div>
        <div className="font-medium text-green-500">+$150.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border border-purple-500/20">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
          <AvatarFallback className="bg-purple-500/10 text-purple-500">MC</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Michael Chen</p>
          <p className="text-xs text-muted-foreground">michael.chen@example.com</p>
        </div>
        <div className="font-medium text-green-500">+$350.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border border-purple-500/20">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
          <AvatarFallback className="bg-purple-500/10 text-purple-500">AR</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Aisha Rodriguez</p>
          <p className="text-xs text-\

\

