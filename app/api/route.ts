// app/api/product/route.ts
import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Falta el parámetro slug" }, { status: 400 });
  }

  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description
  }`;

  const product = await client.fetch(query, { slug });

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json(product);
}
