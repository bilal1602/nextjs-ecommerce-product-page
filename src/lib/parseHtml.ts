import React from "react";

/**
 * A simple function to convert simple HTML strings to React elements
 * This only handles basic p, strong, em, and br tags
 * For more complex HTML, consider a library like html-react-parser
 */
export function parseHtmlString(htmlString: string): JSX.Element[] {
    if (!htmlString?.trim()) {
        return [];
    }

    // Split on paragraph tags
    const paragraphs = htmlString
        .trim()
        .split(/<\/?p>/)
        .filter(Boolean)
        .map(str => str.trim())
        .filter(Boolean);

    return paragraphs.map((paragraph, index) => {
        // Handle strong tags
        const contentWithTags = paragraph.replace(
            /<strong>(.*?)<\/strong>/g,
            (_, text) => `__STRONG_START__${text}__STRONG_END__`
        );

        // Handle em tags
        const contentWithAllTags = contentWithTags.replace(
            /<em>(.*?)<\/em>/g,
            (_, text) => `__EM_START__${text}__EM_END__`
        );

        // Split by our markers and rebuild with React elements
        const parts = contentWithAllTags.split(/__(?:STRONG|EM)_(?:START|END)__/);
        const elements: (string | JSX.Element)[] = [];

        parts.forEach((part, i) => {
            if (i % 2 === 0) {
                elements.push(part);
            } else {
                if (contentWithAllTags.includes(`__STRONG_START__${part}__STRONG_END__`)) {
                    elements.push(React.createElement("strong", { key: `strong-${i}` }, part));
                } else if (contentWithAllTags.includes(`__EM_START__${part}__EM_END__`)) {
                    elements.push(React.createElement("em", { key: `em-${i}` }, part));
                } else {
                    elements.push(part);
                }
            }
        });

        return React.createElement("p", { key: index, className: "mb-4 last:mb-0" }, elements);
    });
}
