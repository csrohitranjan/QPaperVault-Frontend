// src/components/UserProfile.jsx

import React, { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { updateUserProfile, changeUserPassword } from "../services/authService";
import { toast } from "react-toastify";

export default function UserProfile({ user }) {
  const initialProfile = {
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    department: user?.department,
    programme: user?.programme,
    enrollmentNumber: user?.enrollmentNumber,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfileChanges, setHasProfileChanges] = useState(false);

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const editableFields = ["phoneNumber"];
  if (!initialProfile.department) editableFields.push("department");
  if (!initialProfile.programme) editableFields.push("programme");

  useEffect(() => {
    const changed = editableFields.some(
      (field) => profile[field] !== initialProfile[field]
    );
    setHasProfileChanges(changed);
  }, [profile]);

  useEffect(() => {
    if (!showPasswordFields) {
      setPasswordError("");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required");
    } else if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
    } else if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  }, [showPasswordFields, currentPassword, newPassword, confirmPassword]);

  const canSubmit =
    (hasProfileChanges && isEditing) ||
    (showPasswordFields && passwordError === "");

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const token = localStorage.getItem("accessToken");

      const updatePayload = {};
      editableFields.forEach((field) => {
        if (profile[field] !== initialProfile[field]) {
          updatePayload[field] = profile[field];
        }
      });

      if (Object.keys(updatePayload).length > 0) {
        const resProfile = await updateUserProfile(updatePayload, token);
        toast.success(resProfile?.data?.message);

        // Update initialProfile to keep latest profile after successful update
        Object.assign(initialProfile, updatePayload);
      }

      if (showPasswordFields) {
        const resPassword = await changeUserPassword(
          {
            oldPassword: currentPassword,
            newPassword,
            confirmPassword,
          },
          token
        );
        toast.success(resPassword?.data?.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordFields(false);
      }

      setIsEditing(false);
      setHasProfileChanges(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      console.error("Update error:", error);
    }
  };

  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-end mb-6 gap-4">
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              setProfile(initialProfile);
              setShowPasswordFields(false);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setPasswordError("");
              setHasProfileChanges(false);
            }
            setIsEditing((prev) => !prev);
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
                value={value || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base py-1"
                autoComplete="off"
                required
              />
            ) : (
              <p className="text-base font-medium text-gray-900">
                {value || "—"}
              </p>
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
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1"
                    >
                      Old Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base py-1"
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
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base py-1"
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
