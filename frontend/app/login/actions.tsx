'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import client from '@/lib/api'

export async function login(formData: FormData) {
  const { data, error } = await client.POST("/api/v1/login/access-token",{
    body: {
      grant_type: "",
      username: "admin@example.com",
      password: "changethis",
      scope: "",
      client_id: "",
      client_secret: "",
    },
    bodySerializer(body: any) {
      const fd = new FormData()
      for (const name in body) {
        fd.append(name, body[name])
      }
      return fd;
    },
  })
  if (error) {
    console.log(error)
    redirect('/login?message=Could not authenticate user. Please make sure your credentials are correct.')
  }
  cookies().set('access_token', data.access_token)
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// export async function signup(formData: FormData) {
//   const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/login?message=Check your email to continue sign in process') 
// }
