import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://equran.id/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "v2";
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  try {
    let url = "";

    if (type === "list") {
      // Get all surahs list
      url = `${BASE_URL}/${locale}/surah`;
    } else if (type === "detail" && id) {
      // Get specific surah detail
      url = `${BASE_URL}/${locale}/surah/${id}`;
    } else if (type === "tafsir" && id) {
      // Get tafsir for specific surah
      url = `${BASE_URL}/${locale}/tafsir/${id}`;
    } else {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
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
    console.error("Surah API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch surah data" },
      { status: 500 }
    );
  }
}
