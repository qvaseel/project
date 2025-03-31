import React from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/authStore";
import { Button, Link, Text, TextField } from "@radix-ui/themes";
import { redirect } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { login } = useAuthStore();

  const onSubmit = async (data: LoginFormInputs) => {
    const success = await login(data.email, data.password);
    if (success) {
      console.log("Вход успешен");

      redirect("/dashboard");
    } else {
      alert("Не удалось войти. Проверьте почту и пароль");
    }
  };

  return (
    <div className="w-fit p-6 flex flex-col items-center gap-10 mx-auto shadow-2xl rounded-lg bg-white">
      <Text size="6" weight="medium" align="center" highContrast>
        Вход в систему
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 w-[400px]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <TextField.Root
              size="3"
              variant="classic"
              type="email"
              {...register("email", { required: "Введите почту" })}
              placeholder="Почта"
            />
            {errors.email && (
              <span className="text-red-700">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <TextField.Root
              size="3"
              variant="classic"
              type="password"
              {...register("password", { required: "Введите пароль" })}
              placeholder="Пароль"
            />
            {errors.password && (
              <span className="text-red-700">{errors.password.message}</span>
            )}
          </div>
        </div>
        <Button security="4" variant="solid" type="submit">
          Войти
        </Button>
      </form>
      <Link href="#" size="1" weight="light" underline="always" highContrast>
         Забыли пароль?
      </Link>
    </div>
  );
};

export default LoginForm;
