"use server";
import { post } from '@/Api/RestClient';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getHttpHeaders = (isAuthenticated = true, token) => {
  if (isAuthenticated) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
};

export async function LogIn(data) {
    let resp;
    await post(
      `${process.env.api_endpoint}/auth/local`,
      data,
      getHttpHeaders(false, '')
    ).then(response => {
      resp = response.data
      cookies().set('jwt', response.data.jwt);
    }).catch(error => {
      resp = error.response.data
    });
    return resp;
}

export async function LogOut() {
  cookies().delete("jwt");
  redirect("/");
}
