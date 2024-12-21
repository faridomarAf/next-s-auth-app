import { Dispatch, SetStateAction } from "react";

interface HandleFormSubmitProps<T> {
  action: (values: T) => Promise<{ error?: string; success?: string; twoFactor?: boolean }>;
  setError: Dispatch<SetStateAction<string | undefined>>;
  setSuccess: Dispatch<SetStateAction<string | undefined>>;
  setTwoFactor?: Dispatch<SetStateAction<boolean>>;
}

export const handleFormSubmit = async <T>(
  values: T,
  { action, setError, setSuccess, setTwoFactor }: HandleFormSubmitProps<T>
) => {
  setError("");
  setSuccess("");

  try {
    const { error, success, twoFactor } = await action(values);

    if (error) setError(error);
    if (success) setSuccess(success);
    if (twoFactor && setTwoFactor) setTwoFactor(true);
  } catch {
    setError("Something went wrong. Please try again.");
  }
};
