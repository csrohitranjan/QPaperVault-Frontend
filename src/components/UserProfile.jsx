import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  GraduationCap,
  Hash,
  Lock,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { updateUserProfile, changeUserPassword } from "../api/authService";
import { toast } from "react-toastify";

export default function UserProfile({ user }) {
  const baseProfile = useMemo(
    () => ({
      phoneNumber: user?.phoneNumber || "",
      department: user?.department || "",
      programme: user?.programme || "",
      enrollmentNumber: user?.enrollmentNumber || "",
    }),
    [user?.phoneNumber, user?.department, user?.programme, user?.enrollmentNumber]
  );

  const [profile, setProfile] = useState(baseProfile);
  const [savedProfile, setSavedProfile] = useState(baseProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfileChanges, setHasProfileChanges] = useState(false);

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const fieldMeta = {
    phoneNumber: { label: "Phone Number", icon: Phone },
    department: { label: "Department", icon: Building2 },
    programme: { label: "Programme", icon: GraduationCap },
    enrollmentNumber: { label: "Enrollment Number", icon: Hash },
  };

  const fieldOrder = [
    "phoneNumber",
    "department",
    "programme",
    "enrollmentNumber",
  ];

  const editableFields = useMemo(() => {
    const fields = ["phoneNumber"];
    if (!savedProfile.department) fields.push("department");
    if (!savedProfile.programme) fields.push("programme");
    return fields;
  }, [savedProfile.department, savedProfile.programme]);

  useEffect(() => {
    setProfile(baseProfile);
    setSavedProfile(baseProfile);
    setIsEditing(false);
    setHasProfileChanges(false);
  }, [baseProfile]);

  useEffect(() => {
    const changed = editableFields.some(
      (field) => profile[field] !== savedProfile[field]
    );
    setHasProfileChanges(changed);
  }, [editableFields, profile, savedProfile]);

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
      let nextSavedProfile = { ...savedProfile };

      if (hasProfileChanges) {
        const updatePayload = {};
        editableFields.forEach((field) => {
          if (profile[field] !== savedProfile[field]) {
            updatePayload[field] = profile[field];
          }
        });

        if (Object.keys(updatePayload).length > 0) {
          const resProfile = await updateUserProfile(updatePayload);
          toast.success(resProfile?.data?.message || "Profile Unified");
          nextSavedProfile = { ...savedProfile, ...updatePayload };
          setSavedProfile(nextSavedProfile);
          setProfile(nextSavedProfile);
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

  const togglePasswordEditor = () => {
    if (showPasswordFields) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    }
    setShowPasswordFields((prev) => !prev);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-0 py-2 sm:py-3 animate-fade-in">
      <div className="ui-card !p-4 sm:!p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primaryOrange to-orange-500 flex items-center justify-center text-lg font-black text-white shadow-[0_8px_22px_rgba(254,82,56,0.32)] shrink-0">
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white truncate uppercase">
                  {user?.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-primaryOrange/10 border border-primaryOrange/25 text-primaryOrange text-[8px] font-black uppercase tracking-[0.12em]">
                  {user?.role || "Member"}
                </span>
              </div>
              <p className="text-textMuted text-[13px] font-medium flex items-center gap-1.5 mt-0.5 truncate">
                <Mail size={13} className="opacity-60 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                setProfile(savedProfile);
                setHasProfileChanges(false);
              }
              setIsEditing((prev) => !prev);
            }}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-[0.13em] transition-all focus-visible:outline-none focus-visible:ring-2 ${
              isEditing
                ? "border-red-400/30 text-red-300 hover:text-white hover:bg-red-500/20 focus-visible:ring-red-400/50"
                : "border-primaryOrange/35 text-primaryOrange hover:text-white hover:bg-primaryOrange/20 focus-visible:ring-primaryOrange/60"
            }`}
          >
            {isEditing ? (
              <>
                <X size={14} /> Cancel Edit
              </>
            ) : (
              <>
                <Pencil size={14} /> Edit Profile
              </>
            )}
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fieldOrder.map((key) => {
              const value = profile[key];
              const meta = fieldMeta[key] || { label: formatLabel(key), icon: Hash };
              const Icon = meta.icon;
              const editable = editableFields.includes(key);

              return (
                <div
                  key={key}
                  className="rounded-xl border border-white/5 bg-[#10131c] px-3.5 py-3 hover:border-primaryOrange/30 transition-colors"
                >
                  <label
                    htmlFor={key}
                    className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <Icon size={12} className="opacity-65" />
                    {meta.label}
                  </label>

                  {isEditing && editable ? (
                    <input
                      id={key}
                      type="text"
                      value={value || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="mt-1.5 w-full bg-transparent border-b border-white/10 focus:border-primaryOrange/60 focus:outline-none text-sm py-1.5 font-bold text-white transition-all"
                      autoComplete="off"
                      required
                    />
                  ) : (
                    <div className="mt-1.5 flex items-center justify-between gap-2.5">
                      <p className="text-sm font-bold text-zinc-100 break-words">
                        {value || "--"}
                      </p>
                      {!editable && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.03] border border-white/10 text-zinc-500 shrink-0">
                          <Lock size={11} />
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-white/5 bg-[#10131c] px-3.5 py-3.5">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/8">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-primaryOrange" />
                <h3 className="text-[9px] font-black uppercase tracking-[0.12em] text-zinc-500">Security Settings</h3>
              </div>
              <button
                type="button"
                onClick={togglePasswordEditor}
                className="text-primaryOrange text-[9px] font-black uppercase tracking-[0.11em] hover:text-white transition-colors"
              >
                {showPasswordFields ? "Cancel" : "Change Password"}
              </button>
            </div>

            {showPasswordFields && (
              <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-300">
                <div>
                  <label htmlFor="currentPassword" className="ui-label ml-0">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="ui-input-dark mt-1 !py-2.5"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="ui-label ml-0">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="ui-input-dark mt-1 !py-2.5"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="ui-label ml-0">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="ui-input-dark mt-1 !py-2.5"
                    required
                  />
                </div>
              </div>
            )}

            {passwordError && showPasswordFields && (
              <div className="pt-2.5 text-red-400 text-[9px] font-black uppercase tracking-[0.1em]">
                {passwordError}
              </div>
            )}
          </div>

          {(isEditing || showPasswordFields) && (
            <div className="pt-0.5 flex justify-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className="ui-btn-primary !text-[10px] !py-2.5 px-5"
              >
                {isEditing && showPasswordFields
                  ? "Save All Changes"
                  : isEditing
                  ? "Save Profile"
                  : "Update Password"}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
