import { VscClose } from "react-icons/vsc";

const UsedSpace = () => {
  return (
    <div className="bg-health-secondary-cyan text-xs p-4 rounded-md">
      <div className="flex items-center justify-between text-white">
        <p>Used Space</p>
        <VscClose className="cursor-pointer" size={20} />
      </div>
      <p className="mt-2">
        Your team has used 80% of your available space. Need more?
      </p>

      <div className="w-full bg-health-primary-blue rounded-full h-2 my-2">
        <div
          className="bg-health-off-white h-2 rounded-full"
          style={{ width: `80%` }}
        ></div>
      </div>
      <div className="flex items-center gap-2  mt-2">
        <p className="text-health-off-white cursor-pointer">Dismiss all</p>
        <p className="text-white cursor-pointer">Upgrade Plan</p>
      </div>
    </div>
  );
};

export default UsedSpace;
