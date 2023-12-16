"use server";
import { post } from '@/Src/Api/RestClient';

const getHttpHeaders = (isAuthenticated = true, token) => {
  if (isAuthenticated) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

export async function createParticipantApplication(data) {
  // const res = await currentSession();
  // const token = res.getIdToken().getJwtToken();

  return await post(
    `${process.env.api_endpoint}/participants`,
    { data: data },
    await getHttpHeaders(false)
  );
}
