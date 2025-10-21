import CustomButton from "@/components/ui/Button";
import CustomCheckbox from "@/components/ui/Checkbox";
import CustomInput from "@/components/ui/Input";
import CustomToggle from "@/components/ui/Toggle";
import CustomRadio from "@/components/ui/Radio";
import React, { useState, useEffect } from "react";
import {
  MdSave,
  MdUpload,
  MdDelete,
  MdPalette,
  MdNotifications,
  MdSettings,
  MdExpandMore,
} from "react-icons/md";

// Custom Select Component matching your design system
interface CustomSelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  disabled = false,
  size = "md",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-base",
    lg: "py-4 px-5 text-lg",
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full border border-gray-300 rounded-lg bg-white transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${sizeClasses[size]}
            flex items-center justify-between
          `}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : "Select an option..."}
          </span>
          <MdExpandMore
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors
                    ${
                      value === option.value
                        ? "bg-primary-blue text-white hover:bg-primary-blue/90"
                        : "text-gray-900"
                    }
                    ${sizeClasses[size]}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface SettingsData {
  branding: {
    hospitalName: string;
    logo: string | null;
    showLogo: boolean;
    theme: "light" | "dark" | "auto";
    region: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  notifications: {
    pushEnabled: boolean;
    messageNotifications: boolean;
    replyNotifications: boolean;
    appointmentAlerts: boolean;
    realTimeUpdates: boolean;
    labTestResults: boolean;
    dailyDigest: boolean;
    pharmacyUpdates: boolean;
    weeklyDigest: boolean;
    billingAlerts: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    branding: {
      hospitalName: "General Hospital",
      logo: null,
      showLogo: true,
      theme: "light",
      region: "UTC+1:00 Europe/London",
    },
    colors: {
      primary: "#001019",
      secondary: "#1992D4",
      accent: "#FF6B35",
      text: "#1A202C",
      background: "#F0FAFF",
    },
    notifications: {
      pushEnabled: true,
      messageNotifications: true,
      replyNotifications: false,
      appointmentAlerts: true,
      realTimeUpdates: true,
      labTestResults: true,
      dailyDigest: false,
      pharmacyUpdates: true,
      weeklyDigest: false,
      billingAlerts: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "branding" | "notifications" | "security" | "colors"
  >("branding");
  const [isLoading, setIsLoading] = useState(false);

  // Region options
  const regionOptions = [
    { value: "UTC+1:00 Europe/London", label: "UTC+1:00 Europe/London" },
    { value: "UTC+0:00 West Africa", label: "UTC+0:00 West Africa" },
    { value: "UTC+2:00 Europe/Berlin", label: "UTC+2:00 Europe/Berlin" },
    { value: "UTC-5:00 America/New_York", label: "UTC-5:00 America/New_York" },
  ];

  // Session timeout options
  const sessionTimeoutOptions = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "120", label: "2 hours" },
  ];

  // Password expiry options
  const passwordExpiryOptions = [
    { value: "30", label: "30 days" },
    { value: "60", label: "60 days" },
    { value: "90", label: "90 days" },
    { value: "180", label: "180 days" },
  ];

  // File upload handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setSettings((prev) => ({
          ...prev,
          branding: { ...prev.branding, logo: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setSelectedFile(null);
    setPreview(null);
    setSettings((prev) => ({
      ...prev,
      branding: { ...prev.branding, logo: null },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would send the settings to your backend
    console.log("Saving settings:", settings);

    setIsLoading(false);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      setSettings({
        branding: {
          hospitalName: "General Hospital",
          logo: null,
          showLogo: true,
          theme: "light",
          region: "UTC+1:00 Europe/London",
        },
        colors: {
          primary: "#001019",
          secondary: "#1992D4",
          accent: "#FF6B35",
          text: "#1A202C",
          background: "#F0FAFF",
        },
        notifications: {
          pushEnabled: true,
          messageNotifications: true,
          replyNotifications: false,
          appointmentAlerts: true,
          realTimeUpdates: true,
          labTestResults: true,
          dailyDigest: false,
          pharmacyUpdates: true,
          weeklyDigest: false,
          billingAlerts: true,
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: 30,
          passwordExpiry: 90,
        },
      });
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const updateBranding = (key: keyof SettingsData["branding"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      branding: { ...prev.branding, [key]: value },
    }));
  };

  const updateColors = (key: keyof SettingsData["colors"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const updateNotifications = (
    key: keyof SettingsData["notifications"],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  const updateSecurity = (key: keyof SettingsData["security"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: value },
    }));
  };

  const tabs = [
    { id: "branding" as const, label: "Branding", icon: MdSettings },
    { id: "colors" as const, label: "Colors", icon: MdPalette },
    {
      id: "notifications" as const,
      label: "Notifications",
      icon: MdNotifications,
    },
    { id: "security" as const, label: "Security", icon: MdSettings },
  ];

  return (
    <main>
      <div className="py-3 px-6 bg-primary-blue text-black mb-4">
        <h1 className="font-lora text-2xl font-bold">Settings</h1>
      </div>

      <div className="p-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 px-4 border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-blue text-primary-blue"
                    : "border-transparent text-gray-600 hover:text-primary-blue"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className=" p-4 bg-off-white rounded-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Branding Tab */}
              {activeTab === "branding" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Brand Customization
                  </h2>

                  <div className="space-y-6">
                    {/* Logo Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Hospital Logo
                      </label>
                      <div className="flex flex-col items-center">
                        {!preview ? (
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                          >
                            <p className="text-sm text-gray-500 mb-2">
                              Drag your file(s) to start uploading
                            </p>
                            <CustomButton
                              variant="secondary"
                              size="sm"
                              icon={MdUpload}
                            >
                              Browse files
                            </CustomButton>
                            <input
                              id="file-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        ) : (
                          <div className="flex flex-col items-center">
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-40 h-40 rounded-md object-cover mb-3"
                            />
                            <CustomButton
                              variant="outline"
                              size="sm"
                              icon={MdDelete}
                              onClick={removeLogo}
                            >
                              Remove
                            </CustomButton>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hospital Name */}
                    <CustomInput
                      name="hospitalName"
                      label="Hospital Name"
                      value={settings.branding.hospitalName}
                      onChange={(e) =>
                        updateBranding("hospitalName", e.target.value)
                      }
                      placeholder="Enter hospital name"
                      size="md"
                    />

                    {/* Settings Group */}
                    <div className="space-y-4">
                      <CustomToggle
                        name="showLogo"
                        checked={settings.branding.showLogo}
                        onChange={(checked) =>
                          updateBranding("showLogo", checked)
                        }
                        label="Show logo on login screen"
                        size="md"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Theme Preference
                        </label>
                        <CustomRadio
                          options={[
                            { value: "light", label: "Light" },
                            { value: "dark", label: "Dark" },
                            { value: "auto", label: "Auto (System)" },
                          ]}
                          name="theme"
                          value={settings.branding.theme}
                          onChange={(e) =>
                            updateBranding("theme", e.target.value)
                          }
                          orientation="horizontal"
                        />
                      </div>

                      <CustomSelect
                        label="Timezone & Region"
                        options={regionOptions}
                        value={settings.branding.region}
                        onChange={(value) => updateBranding("region", value)}
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Colors Tab */}
              {activeTab === "colors" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Brand Colors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      name="primaryColor"
                      label="Primary Color"
                      type="color"
                      value={settings.colors.primary}
                      onChange={(e) => updateColors("primary", e.target.value)}
                      inputClassName="h-12"
                    />
                    <CustomInput
                      name="secondaryColor"
                      label="Secondary Color"
                      type="color"
                      value={settings.colors.secondary}
                      onChange={(e) =>
                        updateColors("secondary", e.target.value)
                      }
                      inputClassName="h-12"
                    />
                    <CustomInput
                      name="accentColor"
                      label="Accent Color"
                      type="color"
                      value={settings.colors.accent}
                      onChange={(e) => updateColors("accent", e.target.value)}
                      inputClassName="h-12"
                    />
                    <CustomInput
                      name="textColor"
                      label="Text Color"
                      type="color"
                      value={settings.colors.text}
                      onChange={(e) => updateColors("text", e.target.value)}
                      inputClassName="h-12"
                    />
                    <CustomInput
                      name="bgColor"
                      label="Background Color"
                      type="color"
                      value={settings.colors.background}
                      onChange={(e) =>
                        updateColors("background", e.target.value)
                      }
                      inputClassName="h-12"
                    />
                  </div>

                  {/* Color Preview */}
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Color Preview
                    </h3>
                    <div className="flex gap-2">
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: settings.colors.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: settings.colors.secondary }}
                      />
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: settings.colors.accent }}
                      />
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: settings.colors.text }}
                      />
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: settings.colors.background }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Notification Settings
                  </h2>

                  <div className="space-y-6">
                    {/* Push Notifications */}
                    <div className="space-y-4">
                      <CustomToggle
                        name="pushNotification"
                        checked={settings.notifications.pushEnabled}
                        onChange={(checked) =>
                          updateNotifications("pushEnabled", checked)
                        }
                        label="Push notification (App/Desktop)"
                        size="md"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                        <CustomToggle
                          name="messageNotif"
                          checked={settings.notifications.messageNotifications}
                          onChange={(checked) =>
                            updateNotifications("messageNotifications", checked)
                          }
                          label="Message"
                          size="sm"
                        />
                        <CustomToggle
                          name="replyNotif"
                          checked={settings.notifications.replyNotifications}
                          onChange={(checked) =>
                            updateNotifications("replyNotifications", checked)
                          }
                          label="Reply"
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Notification Categories */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Notification Categories
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomCheckbox
                          label="Appointments"
                          checked={settings.notifications.appointmentAlerts}
                          onChange={(e) =>
                            updateNotifications(
                              "appointmentAlerts",
                              e.target.checked
                            )
                          }
                        />
                        <CustomCheckbox
                          label="Real-time Updates"
                          checked={settings.notifications.realTimeUpdates}
                          onChange={(e) =>
                            updateNotifications(
                              "realTimeUpdates",
                              e.target.checked
                            )
                          }
                        />
                        <CustomCheckbox
                          label="Lab Test Results"
                          checked={settings.notifications.labTestResults}
                          onChange={(e) =>
                            updateNotifications(
                              "labTestResults",
                              e.target.checked
                            )
                          }
                        />
                        <CustomCheckbox
                          label="Daily Digest"
                          checked={settings.notifications.dailyDigest}
                          onChange={(e) =>
                            updateNotifications("dailyDigest", e.target.checked)
                          }
                        />
                        <CustomCheckbox
                          label="Pharmacy Updates"
                          checked={settings.notifications.pharmacyUpdates}
                          onChange={(e) =>
                            updateNotifications(
                              "pharmacyUpdates",
                              e.target.checked
                            )
                          }
                        />
                        <CustomCheckbox
                          label="Weekly Digest"
                          checked={settings.notifications.weeklyDigest}
                          onChange={(e) =>
                            updateNotifications(
                              "weeklyDigest",
                              e.target.checked
                            )
                          }
                        />
                        <CustomCheckbox
                          label="Billing & Payment"
                          checked={settings.notifications.billingAlerts}
                          onChange={(e) =>
                            updateNotifications(
                              "billingAlerts",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <CustomToggle
                      name="twoFactorAuth"
                      checked={settings.security.twoFactorAuth}
                      onChange={(checked) =>
                        updateSecurity("twoFactorAuth", checked)
                      }
                      label="Enable Two-Factor Authentication"
                      size="md"
                    />

                    <CustomSelect
                      label="Session Timeout"
                      options={sessionTimeoutOptions}
                      value={settings.security.sessionTimeout.toString()}
                      onChange={(value) =>
                        updateSecurity("sessionTimeout", parseInt(value))
                      }
                      size="md"
                    />

                    <CustomSelect
                      label="Password Expiry"
                      options={passwordExpiryOptions}
                      value={settings.security.passwordExpiry.toString()}
                      onChange={(value) =>
                        updateSecurity("passwordExpiry", parseInt(value))
                      }
                      size="md"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Panel */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <CustomButton
                    onClick={handleSave}
                    fullWidth
                    icon={MdSave}
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Save Changes
                  </CustomButton>
                  <CustomButton
                    variant="outline"
                    onClick={handleReset}
                    fullWidth
                  >
                    Reset to Default
                  </CustomButton>
                </div>
              </div>

              {/* Preview Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Preview
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hospital:</span>
                    <span className="font-medium">
                      {settings.branding.hospitalName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Theme:</span>
                    <span className="font-medium capitalize">
                      {settings.branding.theme}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Region:</span>
                    <span className="font-medium">
                      {settings.branding.region}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Logo:</span>
                    <span className="font-medium">
                      {preview ? "Uploaded" : "Not set"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
