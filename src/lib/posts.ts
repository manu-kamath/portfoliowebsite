export interface Post {
  slug: string;
  title: string;
  dek: string;
  date: string;        // ISO: "2026-05-14"
  dateDisplay: string; // "2026.05"
  tags: string[];
  readTime: number;    // minutes
  body: string;        // markdown-ish prose, rendered as HTML
}

export const posts: Post[] = [
  {
    slug: "intent-over-taste",
    title: "Intent is the new differentiator",
    dek: "Not taste. Not process. Intent. AI has raised the baseline for everyone — so the question is no longer whether you can make something that looks good. The question is whether what you make means something.",
    date: "2026-06-16",
    dateDisplay: "2026.06",
    tags: ["design", "ai", "leadership"],
    readTime: 5,
    body: `
There's an ongoing discourse in design right now that goes something like this: AI has killed the design process. Research decks, flow diagrams, lengthy documentation — all of it is being compressed or automated. What will make designers stand out, the argument goes, is taste. The ability to know what good looks like.

I think that's the wrong conversation.

Not because taste doesn't matter. It does. But taste is now the floor — not the ceiling. AI has raised the baseline for everyone. A motivated non-designer with the right tools and a good eye can produce something that looks considered. The question is no longer whether you can make something that looks good. The question is whether what you make *means something*.

What will separate designers in the AI era is intent.

---

## What I mean by intent

Intent isn't a soft concept. It's the combination of two things that, in my view, can't be separated:

**Strategic clarity** — knowing what you're trying to achieve and why, before you touch any tool. Not just "I want it to look clean" but "this is who this is for, this is what they need to feel, this is the decision this design needs to support."

**Taste with conviction** — not just having aesthetic sensibility but being able to defend and direct it deliberately. Knowing why you made the choices you made, and being willing to push back when something looks good but doesn't serve the intent.

Together, these are intent. And working with AI makes the gap between designers who have it and designers who don't much, much wider.

---

## I rebuilt my portfolio using AI end-to-end

Earlier this year I decided to rebuild my portfolio. I've tried this before — usually it goes like this: I carve out a weekend, work in a frenzy, hit a creative block, run out of time, and end up with something rushed that I'm not proud of. The constraint was always time. I'd make decisions not because they were right but because they were the only ones I could fit into the window I had.

This time I tried something different. I broke the entire process into phases — creative direction, structure and content, design, build, QA — and ran each one in a dedicated AI session with a handoff document that carried context forward between sessions.

This meant I could work for two hours on a Tuesday, close the laptop, come back three weeks later, and pick up exactly where I left off. The AI had full context. I had full context. Nothing was lost.

What surprised me was what that did to the quality of my decisions.

When you're not racing against a clock, you make different choices. I'd finish a session, sit with what we'd produced, think about it in the background while doing other things, and come back with a clearer point of view. The work got more intentional — not because AI made me more intentional, but because the structure gave me the space to *be* intentional.

---

## The double diamond finally worked the way it's supposed to

Most designers know the double diamond — diverge, converge, diverge, converge. In theory it's a beautiful model. In practice, most design processes collapse it under time pressure. You end up with a diamond and a half, maybe. The second convergence is always the one that gets rushed.

Working with AI gave me the ability to actually run the double diamond at the pace it deserves. I could diverge broadly — explore directions, try framings, question assumptions — and then converge deliberately when I was ready. Not when the deadline forced me to.

The context window constraint, which sounds like a limitation, turned out to be a feature. Keeping each phase in its own session meant I was forced to be crisp about what mattered. I couldn't ramble. I had to know what I wanted before I asked for it. That discipline — of knowing what to ask — is exactly what intent looks like in practice.

---

## The pipeline that unlocked everything

The part that genuinely surprised me was the Claude → Figma → Code pipeline.

Once I'd done the thinking work — the creative direction, the content structure, the narrative decisions — feeding that into a design session in Figma via MCP was remarkably clean. The design system came together quickly because the constraints were already defined. I wasn't making decisions about color and typography from scratch; I was executing decisions I'd already thought through.

And once the design system existed in Figma, the build phase followed the same logic. The component architecture was already implicit in the design. The code reflected the design because the design reflected the intent.

This is the thing I want designers to understand: the quality of the output tracked directly with the quality of the thinking I brought in at the start. When I was clear, the AI was useful. When I was vague, the output was generic. The tool amplified what I gave it — for better or worse.

---

## What this means for how we think about design

The old portfolio showed process *and* taste. Lengthy documentation demonstrated the depth of your thinking; the final designs demonstrated your eye. Both were on display, and both mattered.

AI compresses the process artifact. Documentation, flows, research synthesis — these can be produced faster and more completely than before. That's genuinely good. It means more time for the thinking that generates them.

But here's the trap: if you use AI to skip the thinking rather than to execute it faster, you end up with output that has no weight. It looks like process. It looks like taste. But it doesn't mean anything, because no one made an intentional decision anywhere in the chain.

The designers who thrive in this era won't be the ones who use AI the most. They'll be the ones who think the clearest before they touch it. Who know what they're trying to say before they ask anything to say it for them.

Intent isn't a new concept. It's always been what separates good design from great design. What's new is that everything else — the execution, the documentation, the production — has gotten easier. So intent is all that's left to compete on.
    `.trim(),
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
