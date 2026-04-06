export const initMSW = async () => {
  if (typeof window === "undefined") return;

  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    const { worker } = await import("./browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
};