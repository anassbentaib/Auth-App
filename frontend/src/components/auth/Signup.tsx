import { Image, Link } from "@chakra-ui/react";
import Input from "../../Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { ReactNode, useState } from "react";
import Button from "../Button/Button";
import { Signup } from "../../api";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useNavigate();
  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" })
      .refine(
        (email: any) =>
          email.endsWith("@gmail.com") || email.endsWith("@yahoo.com"),
        {
          message: "Invalid email",
        }
      ),
    username: z.string().min(3, { message: "Username is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: async (data) => {
      try {
        await schema.parseAsync(data);
        return {
          values: data,
          errors: {},
        };
      } catch (error: any) {
        return {
          values: {},
          errors: error.errors.reduce((acc: any, curr: any) => {
            const fieldName = curr.path.join(".");
            acc[fieldName] = curr.message;
            return acc;
          }, {}),
        };
      }
    },
  });

  const handleSignup = async (formData: any) => {
    try {
      const response = await Signup(formData);
      setMessage(response.data.message);
      toast.success("success");
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      setMessage(errorMessage);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    try {
      await handleSignup(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative w-full mx-auto bg-gradient-to-b from-[#242424] to-[#000] min-h-[100vh] ">
      <div>
        <div className="h-[100px] bg-[#000] w-full p-8 lg:mb-[30px] xl:mb-[30px] md:mb-[30px] sm:mb-0  ">
          <div className="ml-5">
            <Link href="/">
              <Image src={logo} w="70px" h="70px" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto   max-w-[900px] lg:max-w-[730px] min-h-[80vh] md:max-w-[500px] sm:max-w-[100%] px-10 rounded-[7px]">
        <div className=" justify-center">
          <div className="pt-20  mx-auto text-center max-w-[400px]">
            <h5 className="xl:text-[2.1rem] lg:text-[2.1rem] md:text-[2rem] sm:text-[1.9rem] font-[700] text-white pb-8">
              Create App account
            </h5>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Input
                  id="email"
                  label="Email"
                  type="text"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <span className="text-rose-500">
                  {errors?.email as ReactNode}
                </span>
              </div>

              <div className="mb-3">
                <Input
                  id="username"
                  label="Userame"
                  type="text"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                {errors && (
                  <span className="text-rose-500">
                    {errors?.username as ReactNode}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <span className="text-rose-500">
                  {errors?.password as ReactNode}
                </span>
              </div>
              <div className="mb-3">
                {message && <span className="text-rose-500">{message}</span>}
              </div>

              <div className="mb-3">
                <Button label="Sign up" />
              </div>
              <div className="flex items-center justify-center my-4 text-white text-lg font-semibold ">
                <p>
                  already have an account?{" "}
                  <span
                    onClick={() => router("/login")}
                    className="cursor-pointer text-green-500"
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
