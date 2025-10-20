import { useLoginMutation, useSignupMutation } from "@/redux/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const useLogin = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router =useRouter()
  return {
    mutate: async (form, options) => {
      try {
        const data = await login(form).unwrap();
        dispatch(setCredentials(data));
        toast.success("Login successful");
        router.push("/dashboard");
        if (options?.onSuccess) options.onSuccess(data);
      } catch (err) {
        toast.error(err?.data?.message );
      }
    },
  };
};

export const useSignup = () => {
  const [signup] = useSignupMutation();
  return {
    mutate: async (form) => {
      try {
        await signup(form).unwrap();
        toast.success("Signup successful");
        router.push("/");
      } catch (err) {
        toast.error(err?.data?.message);
      }
    },
  };
};
