import { router } from "expo-router";

/** Pops the stack when possible; otherwise replaces with tabs (no GO_BACK error). */
export function safeRouterBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/(tabs)");
  }
}
