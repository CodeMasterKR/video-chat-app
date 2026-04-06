import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json() as { email: string; password: string };

    if (body.email === "test@gmail.com" && body.password === "123456") {
      return HttpResponse.json({
        success: true,
        message: "Login successful",
        data: {
          access_token: "fake-jwt-token",
          user: {
            id: "1",
            username: "Kamronbek",
            email: "test@gmail.com",
            avatar_url: null,
            status: "ONLINE",
            created_at: new Date().toISOString(),
          },
        },
      });
    }

    return HttpResponse.json(
      { success: false, message: "Email yoki parol noto'g'ri" },
      { status: 401 }
    );
  }),

  http.post("/auth/register", async ({ request }) => {
    const body = await request.json() as {
      username: string;
      email: string;
      password: string;
    };

    return HttpResponse.json({
      success: true,
      message: "Register successful",
      data: {
        access_token: "fake-jwt-token",
        user: {
          id: "1",
          username: body.username,
          email: body.email,
          avatar_url: null,
          status: "ONLINE",
          created_at: new Date().toISOString(),
        },
      },
    });
  }),

  http.post("/auth/logout", () => {
    return HttpResponse.json({ success: true, message: "Logged out" });
  }),

  http.get("/auth/me", () => {
    return HttpResponse.json({
      success: true,
      message: "OK",
      data: {
        access_token: "fake-jwt-token",
        user: {
          id: "1",
          username: "Kamronbek",
          email: "test@gmail.com",
          avatar_url: null,
          status: "ONLINE",
          created_at: new Date().toISOString(),
        },
      },
    });
  }),
];