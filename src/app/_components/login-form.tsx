"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client"
import { handleClientScriptLoad } from "next/script"


const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(formData: LoginFormValues) {
    await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/dashboard"
    }, {
      onRequest: (ctx) => {},
      onSuccess: (ctx) => {
        console.log("LOGADO: ",ctx)
        router.replace("/dashboard")
      },
      onError: (ctx) => {
        console.log("ERRO AO LOGAR: ", ctx)
        if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
          alert("Email ou senha incorretos")
        }
      }
    })
  }

async function handleGithubSignIn() {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard"
  }, {
    onRequest: (ctx) => setIsLoading(true),
    // Remova o router.replace("/dashboard") daqui!
    onSuccess: (ctx) => {
      console.log("LOGADO COM GITHUB: ", ctx)
      // NÃO redirecione manualmente!
    },
    onError: (ctx) => {
      console.log("ERRO AO LOGAR COM GITHUB: ", ctx)
      alert("Erro ao logar com GitHub")
    }
  })
}
  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
  }, {
    onRequest: (ctx) => setIsLoading(true),
    // Remova o router.replace("/dashboard") daqui!
    onSuccess: (ctx) => {
      console.log("LOGADO COM GITHUB: ", ctx)
      // NÃO redirecione manualmente!
    },
    onError: (ctx) => {
      console.log("ERRO AO LOGAR COM GITHUB: ", ctx)
      alert("Erro ao logar com GitHub")
    }
  })
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" type="email" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full bg-[#3939ff] text-white hover:bg-[#516aa0] hover:text-white cursor-pointer"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
        >
          <GoogleLogoIcon className="mr-2 h-4 w-4" />
          Entrar com Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full bg-[#303031] text-white hover:bg-[#232324] hover:text-white cursor-pointer"
          disabled={isLoading}
          onClick={handleGithubSignIn}
        >
          <GithubLogoIcon className="mr-2 h-4 w-4" />
          Entrar com GitHub
        </Button>
      </form>
    </Form>
  )
}
