"use client";
import { useState } from "react";
import { BookOpen, ListChecks, MessageCircleQuestion, Star } from "lucide-react";
import { ReviewForm } from "./review-form";

type Review = {
  id: string;
  rating: number;
  author_name: string;
  title: string | null;
  body: string | null;
  created_at: string;
  published_at: string | null;
};

interface Props {
  productId?: string;
  description: string | null;
  specifications: Record<string, string> | null | undefined;
  faqs: { q: string; a: string }[] | null | undefined;
  reviews?: Review[];
  reviewsCount?: number;
  avgRating?: number | null;
}

type TabKey = "beschrijving" | "specs" | "faq" | "reviews";

function StarRow({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= value ? "fill-amber-400 text-amber-400" : "text-border-strong"}
        />
      ))}
    </div>
  );
}

export function ProductTabs({
  productId,
  description,
  specifications,
  faqs,
  reviews = [],
  reviewsCount,
  avgRating,
}: Props) {
  const count = reviewsCount ?? reviews.length;
  const tabs: { key: TabKey; label: string; icon: typeof BookOpen; visible: boolean }[] = [
    { key: "beschrijving", label: "Beschrijving", icon: BookOpen, visible: !!description },
    { key: "specs", label: "Specificaties", icon: ListChecks, visible: !!specifications && Object.keys(specifications).length > 0 },
    { key: "faq", label: "FAQ", icon: MessageCircleQuestion, visible: !!faqs && faqs.length > 0 },
    { key: "reviews", label: `Reviews${count ? ` (${count})` : ""}`, icon: Star, visible: true },
  ];
  const visibleTabs = tabs.filter((t) => t.visible);
  const [tab, setTab] = useState<TabKey>(visibleTabs[0]?.key || "beschrijving");

  if (visibleTabs.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="border-b border-border flex flex-wrap gap-1">
        {visibleTabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                active
                  ? "border-accent text-accent"
                  : "border-transparent text-text-muted hover:text-text hover:border-border-strong"
              }`}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 max-w-3xl">
        {tab === "beschrijving" && description && (
          <div
            className="prose prose-sm max-w-none text-text [&>p]:my-3 [&>h2]:font-display [&>h2]:text-xl [&>h2]:mt-6 [&>h3]:font-display [&>h3]:text-lg [&>h3]:mt-5 [&>ul]:my-3 [&>ul]:pl-6 [&>ul]:list-disc [&>a]:text-accent [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {tab === "specs" && specifications && (
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {Object.entries(specifications).map(([key, value]) => (
                  <tr key={key} className="bg-paper-soft hover:bg-surface">
                    <td className="px-4 py-3 font-medium text-text w-1/3">{key}</td>
                    <td className="px-4 py-3 text-text-muted">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "faq" && faqs && (
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-lg border border-border bg-paper-soft hover:border-accent transition-colors">
                <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-sm font-medium text-text">
                  {f.q}
                  <span className="text-accent text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-text-muted leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-4">
            {reviews.length > 0 ? (
              <>
                {avgRating != null && count > 0 && (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-paper-soft p-4">
                    <div className="text-3xl font-display tabular-nums">{avgRating.toFixed(1)}</div>
                    <div>
                      <StarRow value={Math.round(avgRating)} size={16} />
                      <p className="mt-0.5 text-xs text-text-muted">{count} {count === 1 ? "review" : "reviews"}</p>
                    </div>
                  </div>
                )}

                <ul className="space-y-3">
                  {reviews.map((r) => (
                    <li key={r.id} className="rounded-lg border border-border bg-paper-soft p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <StarRow value={r.rating} />
                          <span className="text-sm font-medium text-text">{r.author_name}</span>
                        </div>
                        <time className="text-xs text-text-subtle tabular-nums">
                          {new Date(r.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                        </time>
                      </div>
                      {r.title && <p className="mt-2 text-sm font-semibold text-text">{r.title}</p>}
                      {r.body && <p className="mt-1 whitespace-pre-line text-sm text-text-muted leading-relaxed">{r.body}</p>}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <Star className="mx-auto h-8 w-8 text-text-subtle" />
                <p className="mt-3 text-sm text-text-muted">Nog geen reviews voor dit product.</p>
                <p className="mt-1 text-xs text-text-subtle">Wees de eerste die een review achterlaat.</p>
              </div>
            )}

            {productId && <ReviewForm productId={productId} />}
          </div>
        )}
      </div>
    </div>
  );
}
