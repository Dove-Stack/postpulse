/* "use client";

import { useRouter } from "next/router";
import { useState } from "react";

interface OnboardingFormProps {
  user: any;
}

export function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormdata] = useState({
    orgName: "",
    orgType: "",
    teamSize: "",
    useCase: "",
  });

  const orgTypes = [
    { value: "agency", label: "Marketing Agency" },
    { value: "startup", label: "Startup" },
    { value: "enterprise", label: "Enterprise" },
    { value: "freelancer", label: "Freelancer" },
    { value: "other", label: "Other" },
  ];

  const teamSizes = [
    { value: "1", label: "Just me" },
    { value: "2-5", label: "2-5 people" },
    { value: "6-10", label: "6-10 people" },
    { value: "11-50", label: "11-50 people" },
    { value: "50+", label: "50+ people" },
  ];

  const useCases = [
    { value: "scheduling", label: "Schedule social media posts" },
    { value: "analytics", label: "Track performance analytics" },
    { value: "collaboration", label: "Team Collboration" },
    { value: "all", label: "All of the above" },
  ];

  const

}
 */

// apps/web/src/components/ui/onboarding/onboarding-form.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { FormField } from "@/components/ui/form/form-field";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
  onboardingSchema,
  type OnboardingFormData,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "@postpulse/validators";
import { useUser } from "@clerk/nextjs";

interface OnboardingFormProps {
  user: {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  };
}
const orgTypes = [
  {
    value: "agency",
    label: "Marketing Agency",
    description: "Manage multiple client accounts",
  },
  {
    value: "startup",
    label: "Startup",
    description: "Build your brand presence",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "Large-scale operations",
  },
  {
    value: "freelancer",
    label: "Freelancer",
    description: "Personal brand management",
  },
  { value: "other", label: "Other", description: "Something else" },
] as const;

const teamSizes = [
  { value: "1", label: "Just me", icon: "👤" },
  { value: "2-5", label: "2-5 people", icon: "👥" },
  { value: "6-10", label: "6-10 people", icon: "👨‍👩‍👧" },
  { value: "11-50", label: "11-50 people", icon: "👨‍👩‍👧‍👦" },
  { value: "50+", label: "50+ people", icon: "🏢" },
] as const;

const useCases = [
  { value: "scheduling", label: "Schedule social media posts", icon: "📅" },
  { value: "analytics", label: "Track performance analytics", icon: "📊" },
  { value: "collaborations", label: "Team collaboration", icon: "🤝" },
  { value: "all", label: "All of the above", icon: "🚀" },
] as const satisfies readonly {
  value: OnboardingFormData["useCase"];
  label: string;
  icon: string;
}[];

export function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      orgName: "",
      orgType: undefined,
      teamSize: undefined,
      useCase: undefined,
    },
  });

  const formValues = watch();

  const validateStep = async (stepNumber: number) => {
    let isValid = false;

    switch (stepNumber) {
      case 1:
        isValid = await trigger("orgName");
        break;
      case 2:
        isValid = await trigger("orgType");
        break;
      case 3:
        isValid = await trigger("teamSize");
        break;
      case 4:
        isValid = await trigger("useCase");
        break;
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(step);
    if (isValid && step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    setLoading(true);

    try {
      // TODO: Save to database via tRPC (Part 9)
      console.log("✅ Valid onboarding data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return (
          formValues.orgName &&
          formValues.orgName.length >= 2 &&
          !errors.orgName
        );
      case 2:
        return !!formValues.orgType && !errors.orgType;
      case 3:
        return !!formValues.teamSize && !errors.teamSize;
      case 4:
        return !!formValues.useCase && !errors.useCase;
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome to PostPulse, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600">
          Let's set up your workspace in a few quick steps
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  s < step
                    ? "bg-violet-600 text-white"
                    : s === step
                    ? "bg-violet-600 text-white ring-4 ring-violet-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-16 md:w-24 h-1 mx-2 rounded transition-all ${
                    s < step ? "bg-violet-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-2">
          <span>Organization</span>
          <span className="hidden md:inline">Type</span>
          <span>Team</span>
          <span className="hidden md:inline">Use Case</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Organization Name */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900">
              What's your organization name?
            </h2>
            <FormField
              label="Organization Name"
              required
              error={errors.orgName?.message}
            >
              <Input
                {...register("orgName")}
                placeholder="Acme Inc."
                error={errors.orgName?.message}
                autoFocus
              />
            </FormField>
            <p className="text-sm text-gray-500">
              This will be your workspace name. You can change it later.
            </p>
          </div>
        )}

        {/* Step 2: Organization Type */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900">
              What type of organization is this?
            </h2>
            {errors.orgType && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.orgType.message}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orgTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setValue("orgType", type.value, { shouldValidate: true })
                  }
                  className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                    formValues.orgType === type.value
                      ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
                      : "border-gray-200 hover:border-violet-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Team Size */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900">
              How big is your team?
            </h2>
            {errors.teamSize && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.teamSize.message}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {teamSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() =>
                    setValue("teamSize", size.value, { shouldValidate: true })
                  }
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    formValues.teamSize === size.value
                      ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
                      : "border-gray-200 hover:border-violet-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{size.icon}</span>
                    <span className="font-medium text-gray-900">
                      {size.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Use Case */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900">
              What do you want to accomplish?
            </h2>
            {errors.useCase && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.useCase.message}
              </div>
            )}
            <div className="grid grid-cols-1 gap-3">
              {useCases.map((useCase) => (
                <button
                  key={useCase.value}
                  type="button"
                  onClick={() =>
                    setValue("useCase", useCase.value, { shouldValidate: true })
                  }
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    formValues.useCase === useCase.value
                      ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
                      : "border-gray-200 hover:border-violet-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{useCase.icon}</span>
                    <span className="font-medium text-gray-900">
                      {useCase.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-6">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={loading}
              className="flex-1"
            >
              Back
            </Button>
          )}

          {step < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!canProceed() || loading}
              className="flex-1 bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Setting up...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          )}
        </div>
      </form>

      {/* Skip Option */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-sm text-gray-500 hover:text-violet-600 transition"
          disabled={loading}
        >
          Skip for now →
        </button>
      </div>
    </div>
  );
}
