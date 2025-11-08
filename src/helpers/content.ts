import type { CollectionEntry } from "astro:content";

type Entry = CollectionEntry<'blog'> | CollectionEntry<'projects'>

export function formatDataForMetaDescription(value: Entry, limit = 300): string {
    if('subtitle' in value.data && value.data.subtitle) return value.data.subtitle

    return value.body?.replace(/[\n\r\t]/gm, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/_/g, "")
    .slice(0, limit) + "...";
}
