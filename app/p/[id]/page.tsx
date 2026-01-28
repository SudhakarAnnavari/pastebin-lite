import { notFound } from "next/navigation";

async function getPaste(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pastes/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function PastePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paste = await getPaste(id);
  if (!paste) notFound();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Paste Content
        </h1>

        <pre className="bg-gray-50 p-6 rounded-lg overflow-x-auto text-black whitespace-pre-wrap">
          {paste.content}
        </pre>

        {paste.expires_at && (
          <p className="mt-4 text-black">
            Expires at: {new Date(paste.expires_at).toLocaleString()}
          </p>
        )}

        {paste.remaining_views !== null && (
          <p className="text-black">
            Remaining Views: {paste.remaining_views}
          </p>
        )}
      </div>
    </div>
  );
}
