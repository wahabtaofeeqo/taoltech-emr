import { IconType } from "react-icons";

interface StaffContactProps {
  name: string;
  email: string;
  imageUrl: string;
  Icons?: {
    Icon: IconType;
    onClick?: () => void;
  }[];
}

const StaffContact = ({
  name,
  email,
  imageUrl,
  Icons,
}:StaffContactProps) => {
  return (
    <section className="border-b border-gray-200 w-full flex items-center py-3">
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={imageUrl}
          alt={`${name}'s profile`}
        />
        <div>
          <h2 className="text-lg tracking-tighter font-semibold">{name}</h2>
          <p className="text-gray-600 text-sm">{email}</p>
        </div>
      </div>

      {Icons && (
        <div className="flex items-end justify-end ml-auto gap-x-2">
          {Icons.map((iconData, index) => (
            <button
              key={index}
              onClick={iconData.onClick}
              className="text-blue-500"
            >
              <iconData.Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default StaffContact;
