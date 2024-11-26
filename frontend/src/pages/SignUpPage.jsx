{/* Previous imports remain the same */}

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Previous JSX remains the same until password field */}

      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            },
            validate: {
              hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
              hasLowerCase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
              hasNumber: value => /\d/.test(value) || "Password must contain at least one number"
            }
          })}
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: value => value === password || "Passwords do not match"
          })}
          type={showConfirmPassword ? "text" : "password"}
          className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
          placeholder="Confirm password"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Rest of the JSX remains the same */}
    </div>
  );
};

export default SignUpPage;