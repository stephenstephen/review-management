import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/features/auth/services/auth.service";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/types/validations/login.schema";
import { useAuth } from "../context/AuthContext";

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.access_token as string);
      navigate("/dashboard");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Connexion</h1>
            <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <Input type="password" placeholder="Mot de passe" {...register("password")} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
