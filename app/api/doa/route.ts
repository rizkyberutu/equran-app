import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://equran.id/api/doa";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    let url = BASE_URL;

    if (id) {
      // Get specific doa by ID
      url = `${BASE_URL}/${id}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Doa API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch doa data" },
      { status: 500 }
    );
  }
}
