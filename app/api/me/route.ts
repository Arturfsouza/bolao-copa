import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const session = await auth();

  return Response.json({
    name: session?.user?.name ?? null,
    email: session?.user?.email ?? null,
    isAdmin: isAdmin(session?.user?.email),
  });
}