---
title: "md-fix"
description: "Checks and fixes blogs written in Markdown format for common isssues"
---

# md-fix

## Steps

The user will specify the path to markdown file(s).
You will modify the content of the file(s) in place.
Run the skill on each file acording to the following steps:

### Fill in the blank

In some cases, the text may have placeholders (usually links) that will be
surrounded by comparison symbols `< .. >`. Ensure the placeholder is filled in
with the correct content. If you are not sure what the correct content is,
notify the user directly for feedback and continue with the next step.

### Grammar and Spelling Check

Check the content for grammar and spelling issues. Keep as much of the original
text as possible and infer the intended meaning when making corrections. Ensure
the text uses American spelling, the Oxford comma, and Logical English
punctuation.

Sometimes the text may purposefully use non-standard grammar or spelling for
stylistic reasons. Ignore these cases and do not make changes to the text.

### Coherency And Clarity Check

Ensure the text is coherent. Any mentions of "this" or "that" should be clear in
context. If not, modify the text to clarify the reference.

The target audience is a general audience that has some basic technical
knowledge. If the text mentions any technical terms, tools, or concepts, ensure
that the word mentioned is linked to a relevant resource or documentation. (A
documentation page, wikipedia page, or github repository)

### Fact Check

Any claims in the page that is represented as fact should be verified. If the
claim is not true, notify the user directly for feedback and continue with the
next step.

### Link Check

Any links (e.g. Internal images, site links, external links) should be checked
to ensure they are present and valid. If a link is broken, notify the user
directly for feedback and continue with the next step. 

### Markdown Formatting Check

- Ensure Markdown Frontmatter is present and correctly formatterd.
  This is the list of valid frontmatter properties.
  - Property	Description	Remark
  - title	Title of the post. (h1)	required*
  - description	Description of the post. Used in post excerpt and site description of the post.	required*
  - pubDatetime	Published datetime in ISO 8601 format.	required*
  - modDatetime	Modified datetime in ISO 8601 format. (only add this property when a blog post is modified)	optional
  - author	Author of the post.	default = site.author
  - featured	Whether or not to display this post in the featured section of the home page.	default = false
  - draft	Mark this post as ‘unpublished’.	default = false
  - tags	Related keywords for this post. Written in array YAML format.	default = others
  - ogImage	OG image of the post. Useful for social media sharing and SEO. Can be a remote URL or an image path relative to the current folder.	default = site.ogImage or generated OG image
  - canonicalURL	Canonical URL (absolute), in case the article already exists on another source.	default = Astro.site + Astro.url.pathname
  - hideEditPost	Hide the edit-post button under the post title. Applies only to the current post.	default = false
  - timezone	Specify a timezone in IANA format for the current post. Overrides the global site.timezone config for this post only.
  Never set draft:true unless the usually explicitly states otherwise (do not infer from it being in progress). Since it will not show up during debugging.
- Use `*xxx*` for italic text, `**xxx**` for bold text, and `-` for
  bulleted points.
- Ensure that code blocks are properly formatted with triple backticks and the
  correct language specified. Also ensure that the inline code is syntactically
  correct as well. 
- Ensure proper inlined LaTeX formatting is used for mathematical equations. Use
  `$...$` for inline equations and `$$...$$` for block equations.
- Ensure the text is properly formatted with headings, subheadings, lists, and
  tables where appropriate.
- You may choose to bold or italicize certain words or phrases to emphasize them.

## Output

Aside from the aforementioned notifications to the user, the skill will output
which files were changed and what was filled in and corrected. This should only contain
fact based changes and fill in the blank.
