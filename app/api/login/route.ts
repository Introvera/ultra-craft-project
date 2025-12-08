import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

type AdminRow = {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
};

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json()) as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    // 1) Find admin by username
    const result = await query<AdminRow>(
      `
        SELECT id, username, password_hash, created_at
        FROM admins
        WHERE username = $1
        LIMIT 1
      `,
      [username],
    );

    if (result.rowCount === 0) {
      // Do not reveal which field is wrong
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    const admin = result.rows[0];

    // 2) Compare plain password with stored bcrypt hash
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    // 3) Successful login – for now just return some basic info.
    // Later you can set an HttpOnly cookie / JWT here.
    return NextResponse.json(
      {
        id: admin.id,
        username: admin.username,
        // created_at: admin.created_at, // include if needed
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in admin login:", error);
    return NextResponse.json(
      { error: "Failed to login admin" },
      { status: 500 },
    );
  }
}