import { revalidateSecret } from 'lib/sanity.api'
import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function PATCH(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      _id: string
      slug: string
      language: string
    }>(req, revalidateSecret)
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(message, { status: 401 })
    }

    if (!body?._type || !body?.slug || !body?.language) {
      return new Response('Bad Request', { status: 400 })
    }

    revalidatePath('/', 'layout')

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}
