"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  nid?: string;
  contact?: string;
  createdAt: string;
}

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else {
      fetchUserProfile();
    }
  }, [session, status, router]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          nid: user.nid,
          contact: user.contact,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container section">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
              User Profile
            </h1>

            {user && (
              <>
                {!isEditing ? (
                  <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="text-center pb-4 border-b border-border">
                      <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>

                    {/* Profile Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary text-sm">🆔</span>
                          </div>
                          <h3 className="font-semibold text-foreground">NID</h3>
                        </div>
                        <p className="text-foreground ml-11">{user.nid || "Not provided"}</p>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary text-sm">📞</span>
                          </div>
                          <h3 className="font-semibold text-foreground">Contact</h3>
                        </div>
                        <p className="text-foreground ml-11">{user.contact || "Not provided"}</p>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg md:col-span-2">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary text-sm">📅</span>
                          </div>
                          <h3 className="font-semibold text-foreground">Member Since</h3>
                        </div>
                        <p className="text-foreground ml-11">{new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4 border-t border-border">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <span>✏️</span>
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="auth-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={user.email}
                        className="auth-input"
                        disabled
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Email cannot be changed here. Contact support if needed.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="nid" className="block text-sm font-medium text-foreground mb-1">
                        NID
                      </label>
                      <input
                        type="text"
                        id="nid"
                        value={user.nid || ""}
                        onChange={(e) => setUser({ ...user, nid: e.target.value })}
                        className="auth-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-1">
                        Contact
                      </label>
                      <input
                        type="text"
                        id="contact"
                        value={user.contact || ""}
                        onChange={(e) => setUser({ ...user, contact: e.target.value })}
                        className="auth-input"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                      >
                        {loading ? "Updating..." : "Update Profile"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}