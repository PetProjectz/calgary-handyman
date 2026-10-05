import * as React from 'react';

/**
 * Renders a schema.org graph as an `application/ld+json` script tag.
 *
 * `<` is escaped to `<` so a stray `</script>` inside any string value
 * can't terminate the tag early. Everything we pass is static content from our
 * own modules, but the escape keeps that true if a value ever becomes dynamic.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
