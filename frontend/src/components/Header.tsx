import { useAppStore } from "../store";
import { User, BookOpen } from "lucide-react";

export default function Header() {
  const user = useAppStore((state) => state.user);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-[#00A699]" />
            <span className="text-lg font-semibold text-[#484848]">BlogsPortal</span>
          </div>

          {/* Right side - User Profile */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {
                user?.user?.profilePic ? <img src={user?.user?.profilePic} className="w-8 h-8 rounded-full object-cover" alt="" /> :
                  <div className="w-8 h-8 rounded-full bg-[#00A699] flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
              }
              <span className="text-sm font-medium text-[#484848]">
                {user?.user?.name || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}