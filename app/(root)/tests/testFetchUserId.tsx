import { fetchUser } from "@/lib/actions/user.actions";

(async () => {
  try {
    const user = await fetchUser("674965c4191a1a660d2e862c"); // Replace with a valid user ID from your database
    console.log("Test User Fetch Result:", user);
  } catch (error: any) {
    console.error("Test Fetch Error:", error.message);
  }
})();
