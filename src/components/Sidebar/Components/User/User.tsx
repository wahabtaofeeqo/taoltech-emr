import { LuLogOut } from "react-icons/lu";
import placeholder from "../../../../assets/Sidebar/adeola.png";

const User = () => {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <img
            src={placeholder}
            alt="profile"
            className="w-[35px] h-[35px] object-cover rounded-full"
          />

          <div>
            <p>Markgimmons@gmail.com</p>
            <p>Cynthia Markins</p>
          </div>
        </div>

        <div className="cursor-pointer">
          <LuLogOut size={20} />
        </div>
      </div>
    </div>
  );
};

export default User;
