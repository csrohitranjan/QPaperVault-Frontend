import React, { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";

export default function UserProfile({ user }) {
  const initialProfile = {
    fullName: user?.fullName || "John Doe",
    email: user?.email || "john.doe@example.com",
    mobile: user?.mobile || "+1 (123) 456-7890",
    department: user?.department || "Computer Science",
    programme: user?.programme || "B.Tech",
    enrollmentNumber: user?.enrollmentNumber || "CS1234567",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const editableFields = ["email", "mobile"];
  const [hasProfileChanges, setHasProfileChanges] = useState(false);

  // Password section state
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle profile input changes
  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Check if profile fields changed
  useEffect(() => {
    const changed = editableFields.some(
      (field) => profile[field] !== initialProfile[field]
    );
    setHasProfileChanges(changed);
  }, [profile, initialProfile]);

  // Validate password fields whenever they change
  useEffect(() => {
    if (!showPasswordFields) {
      setPasswordError("");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }
    setPasswordError("");
  }, [showPasswordFields, currentPassword, newPassword, confirmPassword]);

  const canSubmit =
    (hasProfileChanges && isEditing) ||
    (showPasswordFields && passwordError === "");

  const handleSave = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Your API calls here...

    console.log("Profile updated:", profile);
    if (showPasswordFields) {
      console.log("Password changed:", { currentPassword, newPassword });
      // Reset password fields after update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordFields(false);
    }

    setIsEditing(false);
    setHasProfileChanges(false);
  };

  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-end mb-6 gap-4">
        <button
          type="button"
          onClick={() => {
            setIsEditing((prev) => !prev);
            if (isEditing) {
              setShowPasswordFields(false);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setPasswordError("");
            }
          }}
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
        >
          {isEditing ? (
            <>
              <X size={16} /> Cancel
            </>
          ) : (
            <>
              <Pencil size={16} /> Edit
            </>
          )}
        </button>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 text-gray-700 text-sm"
        noValidate
      >
        {Object.entries(profile).map(([key, value]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1"
            >
              {formatLabel(key)}
            </label>
            {isEditing && editableFields.includes(key) ? (
              <input
                id={key}
                type={key === "email" ? "email" : "text"}
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base py-1"
                autoComplete="off"
                required
              />
            ) : (
              <p className="text-base font-medium text-gray-900">{value}</p>
            )}
          </div>
        ))}

        {isEditing && (
          <>
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={() => setShowPasswordFields((prev) => !prev)}
                className="text-indigo-600 text-sm font-medium hover:underline"
              >
                {showPasswordFields
                  ? "Cancel Password Change"
                  : "Change Password"}
              </button>
            </div>

            {showPasswordFields && (
              <>
                {/* Password inputs container with 3 columns for compact layout */}
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1"
                    >
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base py-1"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base py-1"
                      autoComplete="new-password"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base py-1"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                {passwordError && (
                  <div className="sm:col-span-2 text-red-600 text-xs mt-1">
                    {passwordError}
                  </div>
                )}
              </>
            )}

            <div className="sm:col-span-2 pt-6 flex justify-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`px-4 py-1.5 text-xs font-semibold text-white transition rounded ${
                  canSubmit
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 cursor-not-allowed"
                }`}
              >
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </section>
  );
}
