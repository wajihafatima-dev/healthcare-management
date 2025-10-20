"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
    else if (!allowedRoles.includes(user.role)) router.push("/unauthorized");
  }, [user, router]);

  return user && allowedRoles.includes(user.role) ? children : null;
}
