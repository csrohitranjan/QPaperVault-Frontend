import React, { useState, useEffect } from "react";
import { Pencil, X, Mail, Phone, Lock, Settings, ShieldCheck, User } from "lucide-react";
import { updateUserProfile, changeUserPassword } from "../api/authService";
import { toast } from "react-toastify";

export default function UserProfile({ user }) {
  const initialProfile = {
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
      if (hasProfileChanges) {
        const updatePayload = {};
        editableFields.forEach((field) => {
          if (profile[field] !== initialProfile[field]) {
            updatePayload[field] = profile[field];
          }
        });

        if (Object.keys(updatePayload).length > 0) {
          const resProfile = await updateUserProfile(updatePayload);
          toast.success(resProfile?.data?.message || "Profile Unified");
          Object.assign(initialProfile, updatePayload);
        }
      }

      if (showPasswordFields && !passwordError) {
        const resPassword = await changeUserPassword({
          oldPassword: currentPassword,
          newPassword,
          confirmPassword,
        });
        toast.success(resPassword?.data?.message || "Security Key Rotated");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordFields(false);
      }

      setIsEditing(false);
      setHasProfileChanges(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Protocol Failure");
      console.error("Update error:", error);
    }
  };

  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      {/* Identity Summary */}
      <div className="flex items-center gap-4 sm:gap-5 mb-8">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-xl sm:text-2xl font-black text-white shadow-lg shrink-0">
          {user?.fullName?.charAt(0) || "U"}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase italic truncate">{user?.fullName}</h1>
            <span className="px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest leading-loose shrink-0">
              {user?.role}
            </span>
          </div>
          <p className="text-zinc-500 text-sm font-medium flex items-center gap-2 mt-1 truncate">
            <Mail size={14} className="opacity-40 shrink-0" /> <span className="truncate">{user?.email}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end mb-4 gap-4">
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              setProfile(initialProfile);
              setHasProfileChanges(false);
            }
            setIsEditing((prev) => !prev);
          }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
        >
          {isEditing ? (
            <>
              <X size={14} /> Cancel
            </>
          ) : (
            <>
              <Pencil size={14} /> Edit
            </>
          )}
        </button>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6"
        noValidate
      >
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-2 group">
            <label
              htmlFor={key}
              className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-indigo-400/60 transition-colors"
            >
              {formatLabel(key)}
            </label>
            {isEditing && editableFields.includes(key) ? (
              <input
                id={key}
                type={key === "email" ? "email" : "text"}
                value={value || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="w-full bg-transparent border-b border-white/10 focus:border-indigo-500 focus:outline-none text-base py-1 font-bold text-white transition-all"
                autoComplete="off"
                required
              />
            ) : (
              <p className="text-base font-bold text-white py-1 flex justify-between items-center">
                {value || "—"}
                {!editableFields.includes(key) && <Lock size={12} className="opacity-20" />}
              </p>
            )}
          </div>
        ))}        {/* Password Feature always accessible */}
        <div className="sm:col-span-2 pt-4 pb-2 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <ShieldCheck size={16} className="text-indigo-500" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Security</h3>
           </div>
          <button
            type="button"
            onClick={() => {
              if (showPasswordFields) {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setPasswordError("");
              }
              setShowPasswordFields((prev) => !prev);
            }}
            className="text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            {showPasswordFields
              ? "Cancel"
              : "Change Password"}
          </button>
        </div>

        {showPasswordFields && (
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="currentPassword"
                className="text-[9px] font-black uppercase tracking-widest text-zinc-500"
              >
                Old Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 focus:border-indigo-500 focus:outline-none text-base py-1 font-bold text-white transition-all tracking-widest"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="newPassword"
                className="text-[9px] font-black uppercase tracking-widest text-zinc-500"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 focus:border-indigo-500 focus:outline-none text-base py-1 font-bold text-white transition-all tracking-widest"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-[9px] font-black uppercase tracking-widest text-zinc-500"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 focus:border-indigo-500 focus:outline-none text-base py-1 font-bold text-white transition-all tracking-widest"
                required
              />
            </div>
          </div>
        )}
        {passwordError && showPasswordFields && (
          <div className="sm:col-span-2 text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 italic leading-relaxed">
            {passwordError}
          </div>
        )}

        {(isEditing || showPasswordFields) && (
          <div className="sm:col-span-2 pt-6 flex justify-center">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all rounded-xl shadow-xl ${
                canSubmit
                  ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:-translate-y-1 shadow-indigo-500/30"
                  : "bg-white/5 text-zinc-700 border border-white/5 cursor-not-allowed"
              }`}
            >
              {isEditing && showPasswordFields ? "Save All Changes" : isEditing ? "Save Profile" : "Update Password"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
